import { ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  isAddingToCart?: boolean;
}

export default function ProductCard({ product, onAddToCart, isAddingToCart }: ProductCardProps) {
  const stockStatus = product.stock > 10 
    ? { label: "In Stock", variant: "default" as const }
    : product.stock > 0
    ? { label: `Solo ${product.stock} rimasti`, variant: "secondary" as const }
    : { label: "Esaurito", variant: "destructive" as const };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(price));
  };

  return (
    <Card 
      className="group overflow-hidden hover-elevate transition-all duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
          {/* Stock badge overlay */}
          <div className="absolute top-3 right-3">
            <Badge variant={stockStatus.variant} data-testid={`badge-stock-${product.id}`}>
              {stockStatus.label}
            </Badge>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-3">
          {/* Category */}
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold line-clamp-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>

          {/* Part Number */}
          <p className="text-sm text-muted-foreground font-mono" data-testid={`text-part-number-${product.id}`}>
            P/N: {product.partNumber}
          </p>

          {/* Compatible Models */}
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.compatibleModels.slice(0, 3).map((model, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {model}
                </Badge>
              ))}
              {product.compatibleModels.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{product.compatibleModels.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Price */}
          <div className="pt-2">
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart?.(product.id)}
          disabled={product.stock === 0 || isAddingToCart}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAddingToCart ? "Aggiunta..." : "Aggiungi al Carrello"}
        </Button>
      </CardFooter>
    </Card>
  );
}
