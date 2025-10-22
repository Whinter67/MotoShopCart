import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Truck, Award, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Yamaha_motorcycle_hero_image_c672dc66.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Yamaha Racing Motorcycle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/20 backdrop-blur-md text-primary-foreground border-primary/30" data-testid="badge-hero">
            Ricambi Originali Yamaha
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Prestazioni al
            <span className="block text-primary">Massimo Livello</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ricambi originali Yamaha per garantire le massime prestazioni della tua moto
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              asChild
              data-testid="button-hero-login"
            >
              <a href="/api/login">
                Inizia Ora
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            <div className="flex items-center gap-2 text-white/90">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Garanzia Ufficiale</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Spedizione Veloce</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Ricambi Certificati</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perché Sceglierci</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La tua moto merita solo il meglio. Forniamo ricambi originali Yamaha con la massima qualità
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8 px-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Garanzia Ufficiale</h3>
                <p className="text-muted-foreground">
                  Tutti i ricambi sono certificati e coperti da garanzia ufficiale Yamaha
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-12 pb-8 px-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Spedizione Rapida</h3>
                <p className="text-muted-foreground">
                  Spedizione veloce in tutta Italia. Ricevi i tuoi ricambi in 2-3 giorni lavorativi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-12 pb-8 px-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Qualità Certificata</h3>
                <p className="text-muted-foreground">
                  Ricambi originali testati e approvati secondo gli standard Yamaha
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto a Iniziare?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accedi ora per esplorare il nostro catalogo completo di ricambi Yamaha
          </p>
          <Button size="lg" asChild data-testid="button-cta-login">
            <a href="/api/login">
              Accedi al Catalogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
