import { Link, useLocation } from "wouter";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  // Fetch cart items count for authenticated users
  const { data: cartItems = [] } = useQuery<(CartItem & { product: any })[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getLinkClasses = (path: string) => {
    const isActive = location === path;
    return `text-base font-medium transition-colors ${
      isActive 
        ? "text-primary" 
        : "text-foreground hover:text-primary"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 hover-elevate active-elevate-2" data-testid="link-home">
            <div className="text-2xl font-bold text-primary">
              YAMAHA<span className="text-foreground">PARTS</span>
            </div>
          </a>
        </Link>

        {/* Navigation - Shop is always visible, Cart only for authenticated users */}
        <nav className="hidden md:flex items-center gap-8">
          {isAuthenticated && (
            <Link href="/">
              <a className={getLinkClasses("/")} data-testid="link-nav-home">
                Home
              </a>
            </Link>
          )}
          <Link href="/shop">
            <a className={getLinkClasses("/shop")} data-testid="link-nav-shop">
              Shop
            </a>
          </Link>
          {isAuthenticated && (
            <Link href="/cart">
              <a className={getLinkClasses("/cart")} data-testid="link-nav-cart">
                Carrello
              </a>
            </Link>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Cart button */}
              <Link href="/cart">
                <a data-testid="button-cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge 
                        className="absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        data-testid="badge-cart-count"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </a>
              </Link>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      {user?.profileImageUrl && (
                        <AvatarImage 
                          src={user.profileImageUrl} 
                          alt={user.firstName || "User"} 
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback>
                        {user?.firstName?.[0] || user?.email?.[0] || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col gap-1 p-2">
                    <p className="text-sm font-medium" data-testid="text-user-name">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : user?.email || "User"}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-muted-foreground" data-testid="text-user-email">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/api/logout" className="cursor-pointer" data-testid="button-logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Esci</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild data-testid="button-login">
              <a href="/api/login">Accedi</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
