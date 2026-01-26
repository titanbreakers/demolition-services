import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-demolition.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Gecertificeerd & Verzekerd
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            KRACHT IN
            <br />
            <span className="text-gradient">SLOOPWERK</span>
          </h1>

          {/* Description */}
          <p 
            className="text-xl text-muted-foreground max-w-xl mb-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            TitanBrekers is uw betrouwbare partner voor professioneel sloop- en demontagewerk. 
            Met meer dan 25 jaar ervaring maken wij ruimte voor uw toekomst.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 mb-16 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/contact" className="btn-power flex items-center gap-2">
              Gratis Offerte
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projecten" className="btn-outline-power">
              Bekijk Projecten
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="border-l-2 border-primary pl-4">
              <div className="font-display text-4xl text-foreground">25+</div>
              <div className="text-muted-foreground text-sm">Jaar Ervaring</div>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <div className="font-display text-4xl text-foreground">500+</div>
              <div className="text-muted-foreground text-sm">Projecten</div>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <div className="font-display text-4xl text-foreground">100%</div>
              <div className="text-muted-foreground text-sm">Veilig</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Snelle Respons</div>
                <div className="text-sm text-muted-foreground">Binnen 24 uur reactie</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Volledig Verzekerd</div>
                <div className="text-sm text-muted-foreground">Tot €5 miljoen dekking</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">VCA Gecertificeerd</div>
                <div className="text-sm text-muted-foreground">Hoogste veiligheidsnormen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
