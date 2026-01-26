import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const features = [
  "VCA** Gecertificeerd",
  "SC-530 Asbestverwijdering",
  "Volledig Verzekerd",
  "25+ Jaar Ervaring",
  "Eigen Materieel",
  "Landelijke Dekking",
];

const AboutPreview = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Over TitanBrekers
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              ERVARING EN <span className="text-gradient">VAKMANSCHAP</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Sinds 1999 is TitanBrekers dé specialist in professioneel sloopwerk. 
              Met een team van ervaren vakmensen en modern materieel pakken wij elk 
              project aan - van kleine stripwerken tot complete gebouwsloop.
            </p>
            <p className="text-muted-foreground mb-8">
              Veiligheid, kwaliteit en duurzaamheid staan bij ons centraal. 
              Wij werken volgens de hoogste veiligheidsnormen en zorgen voor 
              optimale recycling van alle sloopafval.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/over-ons" className="btn-power inline-flex items-center gap-2">
              Meer Over Ons
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right - Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="card-industrial p-8 text-center">
                <div className="font-display text-6xl text-primary mb-2">25+</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Jaar Actief</div>
              </div>
              <div className="card-industrial p-8 text-center mt-8">
                <div className="font-display text-6xl text-primary mb-2">500+</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Projecten</div>
              </div>
              <div className="card-industrial p-8 text-center">
                <div className="font-display text-6xl text-primary mb-2">50+</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Medewerkers</div>
              </div>
              <div className="card-industrial p-8 text-center mt-8">
                <div className="font-display text-6xl text-primary mb-2">98%</div>
                <div className="text-muted-foreground uppercase tracking-wider text-sm">Recycling</div>
              </div>
            </div>

            {/* Decorative Warning Stripe */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 warning-stripe opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
