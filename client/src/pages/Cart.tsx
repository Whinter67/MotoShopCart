import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import type { CartItem, Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Link } from "wouter";

type CartItemWithProduct = CartItem & { product: Product };

export default function Cart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  // Update cart item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Non autenticato",
          description: "Effettua il login per continuare...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Errore",
        description: "Impossibile aggiornare la quantità. Riprova.",
        variant: "destructive",
      });
    },
  });

  // Remove cart item
  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/cart/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Rimosso dal carrello",
        description: "Il prodotto è stato rimosso dal carrello",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Non autenticato",
          description: "Effettua il login per continuare...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Errore",
        description: "Impossibile rimuovere il prodotto. Riprova.",
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(price));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Skeleton className="w-32 h-32" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Il Tuo Carrello</h1>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Il carrello è vuoto</h2>
            <p className="text-muted-foreground mb-6">
              Aggiungi prodotti dal catalogo per iniziare lo shopping
            </p>
            <Button asChild data-testid="button-continue-shopping">
              <Link href="/shop">
                <a className="flex items-center">
                  Vai al Catalogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                        {item.product.imageUrl ? (
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1" data-testid={`text-cart-item-name-${item.id}`}>
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-mono mb-2">
                              P/N: {item.product.partNumber}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.product.category}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateQuantityMutation.mutate({
                                        id: item.id,
                                        quantity: item.quantity - 1,
                                      });
                                    }
                                  }}
                                  disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                                  data-testid={`button-decrease-${item.id}`}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span 
                                  className="px-4 text-sm font-medium min-w-[3rem] text-center"
                                  data-testid={`text-quantity-${item.id}`}
                                >
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    if (item.quantity < item.product.stock) {
                                      updateQuantityMutation.mutate({
                                        id: item.id,
                                        quantity: item.quantity + 1,
                                      });
                                    }
                                  }}
                                  disabled={
                                    item.quantity >= item.product.stock ||
                                    updateQuantityMutation.isPending
                                  }
                                  data-testid={`button-increase-${item.id}`}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeItemMutation.mutate(item.id)}
                                disabled={removeItemMutation.isPending}
                                data-testid={`button-remove-${item.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary" data-testid={`text-item-total-${item.id}`}>
                              {formatPrice((parseFloat(item.product.price) * item.quantity).toString())}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.product.price)} cad.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Riepilogo Ordine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotale</span>
                    <span data-testid="text-subtotal">{formatPrice(subtotal.toString())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spedizione</span>
                    <span data-testid="text-shipping">
                      {shipping === 0 ? "Gratis" : formatPrice(shipping.toString())}
                    </span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Spendi altri {formatPrice((100 - subtotal).toString())} per la spedizione gratuita
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Totale</span>
                    <span className="text-primary" data-testid="text-total">
                      {formatPrice(total.toString())}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" data-testid="button-checkout">
                    Procedi al Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
