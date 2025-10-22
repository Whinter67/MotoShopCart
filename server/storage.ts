// Database storage implementation for Yamaha Parts E-commerce
// Implements all CRUD operations for users, products, and cart

import {
  users,
  products,
  cartItems,
  type User,
  type UpsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Storage interface for all operations
export interface IStorage {
  // User operations (MANDATORY for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart operations
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  getCartItem(userId: string, productId: string): Promise<CartItem | undefined>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem>;
  deleteCartItem(id: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // ============================================================================
  // USER OPERATIONS (Required for Replit Auth)
  // ============================================================================

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // ============================================================================
  // PRODUCT OPERATIONS
  // ============================================================================

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.category, category))
      .orderBy(desc(products.createdAt));
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(productData)
      .returning();
    return product;
  }

  // ============================================================================
  // CART OPERATIONS
  // ============================================================================

  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select({
        cartItem: cartItems,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))
      .orderBy(desc(cartItems.createdAt));

    return items.map((item) => ({
      ...item.cartItem,
      product: item.product,
    }));
  }

  async getCartItem(userId: string, productId: string): Promise<CartItem | undefined> {
    const [item] = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
    return item;
  }

  async addCartItem(itemData: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existingItem = await this.getCartItem(itemData.userId, itemData.productId);
    
    const quantity = itemData.quantity ?? 1;
    
    if (existingItem) {
      // Update quantity if item already in cart
      return await this.updateCartItem(existingItem.id, existingItem.quantity + quantity);
    }

    // Create new cart item
    const [item] = await db
      .insert(cartItems)
      .values({ ...itemData, quantity })
      .returning();
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem> {
    const [item] = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();
    return item;
  }

  async deleteCartItem(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }
}

export const storage = new DatabaseStorage();
