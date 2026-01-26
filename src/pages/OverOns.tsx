import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { CheckCircle, Users, Target, Heart, Shield } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Veiligheid",
    description: "Veiligheid staat altijd voorop. Wij werken volgens VCA** en hanteren de hoogste veiligheidsnormen op al onze projecten.",
  },
  {
    icon: Target,
    title: "Kwaliteit",
    description: "Wij leveren kwaliteitswerk, op tijd en binnen budget. Onze klanten kunnen rekenen op professionele uitvoering.",
  },
  {
    icon: Heart,
    title: "Duurzaamheid",
    description: "Met 98% recycling van sloopafval dragen wij bij aan een circulaire economie en een schonere toekomst.",
  },
  {
    icon: Users,
    title: "Vakmanschap",
    description: "Ons team bestaat uit ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat.",
  },
];

const timeline = [
  { year: "1999", title: "Oprichting", description: "TitanBrekers wordt opgericht in Rotterdam" },
  { year: "2005", title: "VCA Certificering", description: "Behalen van VCA** certificering" },
  { year: "2010", title: "SC-530 Erkenning", description: "Erkenning voor asbestverwijdering" },
  { year: "2015", title: "Landelijke Dekking", description: "Uitbreiding naar heel Nederland" },
  { year: "2020", title: "50 Medewerkers", description: "Groei naar 50+ vakmensen" },
  { year: "2024", title: "500+ Projecten", description: "Mijlpaal van 500 succesvolle projecten" },
];

const certifications = [
  "VCA** Gecertificeerd",
  "SC-530 Asbestverwijdering",
  "ISO 9001 Kwaliteitsmanagement",
  "ISO 14001 Milieumanagement",
  "Erkend Leerbedrijf",
  "Lid Vereniging Sloopbedrijven",
];

const OverOns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Over Ons
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              WIE ZIJN <span className="text-gradient">WIJ</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Al meer dan 25 jaar is TitanBrekers dé specialist in professioneel sloopwerk. 
              Met passie, vakmanschap en moderne apparatuur maken wij ruimte voor de toekomst.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl mb-6 text-foreground">
                ONS <span className="text-gradient">VERHAAL</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                TitanBrekers werd in 1999 opgericht door twee ervaren slopers met een duidelijke 
                missie: professioneel sloopwerk leveren met oog voor veiligheid, kwaliteit en milieu.
              </p>
              <p className="text-muted-foreground mb-6">
                Wat begon als een klein familiebedrijf is uitgegroeid tot een van de meest 
                gerespecteerde sloopbedrijven van Nederland. Met meer dan 50 medewerkers, 
                een modern machinepark en alle benodigde certificeringen pakken wij elk 
                project aan - groot of klein.
              </p>
              <p className="text-muted-foreground">
                Onze kracht zit in ons team. Ervaren vakmensen die trots zijn op hun werk 
                en altijd streven naar het beste resultaat. Samen met onze opdrachtgevers 
                vinden wij oplossingen voor de meest complexe sloopprojecten.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="card-industrial p-8 text-center">
                  <div className="font-display text-5xl text-primary mb-2">25+</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">Jaar Ervaring</div>
                </div>
                <div className="card-industrial p-8 text-center mt-8">
                  <div className="font-display text-5xl text-primary mb-2">500+</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">Projecten</div>
                </div>
                <div className="card-industrial p-8 text-center">
                  <div className="font-display text-5xl text-primary mb-2">50+</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">Medewerkers</div>
                </div>
                <div className="card-industrial p-8 text-center mt-8">
                  <div className="font-display text-5xl text-primary mb-2">98%</div>
                  <div className="text-muted-foreground text-sm uppercase tracking-wider">Recycling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              ONZE <span className="text-gradient">WAARDEN</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Deze kernwaarden vormen de basis van alles wat wij doen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-industrial text-center">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              ONZE <span className="text-gradient">GESCHIEDENIS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-8 mb-8 last:mb-0">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="font-display text-2xl text-primary">{item.year}</span>
                </div>
                <div className="relative pb-8">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full" />
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-px h-full bg-border" />
                  )}
                  <div className="pl-8">
                    <h3 className="font-display text-xl text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              CERTIFICERINGEN & <span className="text-gradient">ERKENNINGEN</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Wij voldoen aan de hoogste eisen op het gebied van veiligheid, kwaliteit en milieu.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert} className="card-industrial flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default OverOns;
