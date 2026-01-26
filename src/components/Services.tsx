import { Link } from "react-router-dom";
import { Building2, Factory, Trash2, Recycle, Shovel, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Gebouwen Sloop",
    description: "Complete sloop van woningen, kantoren en commerciële gebouwen. Vakkundige demontage met oog voor veiligheid en milieu.",
  },
  {
    icon: Factory,
    title: "Industriële Demontage",
    description: "Specialistische demontage van fabrieken, opslagloodsen en industriële installaties. Inclusief afvoer van materialen.",
  },
  {
    icon: Trash2,
    title: "Asbest Sanering",
    description: "Gecertificeerde verwijdering van asbesthoudende materialen. Veilig en conform alle wettelijke eisen.",
  },
  {
    icon: Recycle,
    title: "Recycling & Afvoer",
    description: "Duurzame verwerking en recycling van sloopafval. Wij scheiden en verwerken alle materialen milieuvriendelijk.",
  },
  {
    icon: Shovel,
    title: "Grondwerk",
    description: "Ontgraving, egaliseren en bouwrijp maken van terreinen. Klaar voor uw nieuwbouwproject.",
  },
  {
    icon: Building2,
    title: "Interieur Sloop",
    description: "Strip-out werkzaamheden en selectieve sloop van interieurs. Perfect voor renovatieprojecten.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Onze Diensten
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            PROFESSIONEEL <span className="text-gradient">SLOOPWERK</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Van kleine stripwerken tot complete gebouwsloop - wij hebben de expertise en het materieel voor elk project.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-industrial group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-2xl mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Meer Info</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/diensten" className="btn-power inline-flex items-center gap-2">
            Alle Diensten Bekijken
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
