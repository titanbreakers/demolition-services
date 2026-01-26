import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Building2, Factory, Trash2, Recycle, Shovel, Home, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Gebouwen Sloop",
    description: "Complete sloop van woningen, kantoren en commerciële gebouwen. Van monumentale panden tot moderne kantoorgebouwen - wij zorgen voor een veilige en efficiënte afbraak.",
    features: [
      "Woningen en appartementen",
      "Kantoorgebouwen",
      "Commercieel vastgoed",
      "Monumentale panden",
      "Inclusief vergunningaanvraag",
    ],
  },
  {
    icon: Factory,
    title: "Industriële Demontage",
    description: "Specialistische demontage van fabrieken, opslagloodsen en industriële installaties. Wij hebben ervaring met complexe industriële omgevingen.",
    features: [
      "Fabrieken en werkplaatsen",
      "Opslagloodsen",
      "Tanks en silo's",
      "Productie-installaties",
      "Kranen en hefbruggen",
    ],
  },
  {
    icon: Trash2,
    title: "Asbest Sanering",
    description: "Gecertificeerde verwijdering van asbesthoudende materialen volgens SC-530. Veilig voor mens en milieu, conform alle wettelijke eisen.",
    features: [
      "SC-530 gecertificeerd",
      "Asbestinventarisatie",
      "Veilige verwijdering",
      "Correcte afvoer",
      "Vrijgavemetingen",
    ],
  },
  {
    icon: Recycle,
    title: "Recycling & Afvoer",
    description: "Duurzame verwerking en recycling van sloopafval. Wij scheiden en verwerken alle materialen milieuvriendelijk met een recyclingpercentage van 98%.",
    features: [
      "Scheiding op locatie",
      "98% recycling",
      "Gecertificeerde verwerking",
      "Materiaalcertificaten",
      "Circulair bouwen",
    ],
  },
  {
    icon: Shovel,
    title: "Grondwerk",
    description: "Ontgraving, egaliseren en bouwrijp maken van terreinen. Van kleine kavels tot grote bouwterreinen - wij maken uw grond klaar voor nieuwbouw.",
    features: [
      "Ontgraving",
      "Egaliseren",
      "Bouwrijp maken",
      "Drainage aanleg",
      "Grondafvoer",
    ],
  },
  {
    icon: Home,
    title: "Interieur Sloop",
    description: "Strip-out werkzaamheden en selectieve sloop van interieurs. Perfect voor renovatieprojecten en herontwikkeling van bestaande panden.",
    features: [
      "Strip-out werkzaamheden",
      "Selectieve sloop",
      "Casco oplevering",
      "Behoud draagstructuur",
      "Renovatieprojecten",
    ],
  },
];

const Diensten = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Onze Diensten
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              WAT WIJ <span className="text-gradient">DOEN</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Van kleine stripwerken tot complete gebouwsloop - wij hebben de expertise, 
              het materieel en de certificeringen voor elk sloop- en demontageproject.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display text-4xl mb-4 text-foreground">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-[4/3] bg-card border border-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon className="w-32 h-32 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute bottom-0 left-0 w-full h-2 warning-stripe" />
                  </div>
                </div>
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

export default Diensten;
