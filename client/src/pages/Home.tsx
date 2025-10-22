import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Wrench, Settings, Zap, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/Yamaha_motorcycle_hero_image_c672dc66.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

const categories = [
  { id: "engine", name: "Motore", icon: Settings, color: "bg-blue-500" },
  { id: "brakes", name: "Freni", icon: Wrench, color: "bg-red-500" },
  { id: "transmission", name: "Trasmissione", icon: Package, color: "bg-green-500" },
  { id: "electrical", name: "Elettrica", icon: Zap, color: "bg-yellow-500" },
];

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch featured products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.slice(0, 4), // Show first 4 as featured
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      await apiRequest("POST", "/api/cart", { productId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Aggiunto al carrello",
        description: "Il prodotto è stato aggiunto al tuo carrello",
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
        description: "Impossibile aggiungere al carrello. Riprova.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Yamaha Racing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ricambi Originali
            <span className="block text-primary">Yamaha</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Trova i ricambi perfetti per la tua moto Yamaha
          </p>
          <Button 
            size="lg" 
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
            asChild
            data-testid="button-shop-now"
          >
            <Link href="/shop">
              <a className="flex items-center">
                Esplora il Catalogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorie Popolari</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/shop?category=${category.id}`}>
                  <a data-testid={`link-category-${category.id}`}>
                    <Card className="hover-elevate active-elevate-2 cursor-pointer transition-all">
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Ricambi in Evidenza</h2>
            <Button variant="ghost" asChild data-testid="link-view-all">
              <Link href="/shop">
                <a className="flex items-center">
                  Vedi Tutti
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(id) => addToCartMutation.mutate(id)}
                  isAddingToCart={addToCartMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
