import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { MapPin } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    image: project1,
    title: "Oude Fabriek Rotterdam",
    location: "Rotterdam",
    category: "Industriële Sloop",
    year: "2024",
    description: "Complete demontage van een voormalige staalfabriek van 15.000m² inclusief asbestsanering en grondwerk.",
  },
  {
    image: project2,
    title: "Kantoorcomplex Zuidas",
    location: "Amsterdam",
    category: "Gebouwen Sloop",
    year: "2024",
    description: "Gecontroleerde sloop van een 12-verdiepingen kantoorgebouw in stedelijk gebied met minimale overlast.",
  },
  {
    image: project3,
    title: "Winkelcentrum Renovatie",
    location: "Utrecht",
    category: "Interieur Sloop",
    year: "2023",
    description: "Selectieve strip-out van 15.000m² winkelruimte voor herontwikkeling tot mixed-use complex.",
  },
  {
    image: project1,
    title: "Haventerrein Demontage",
    location: "Rotterdam",
    category: "Industriële Sloop",
    year: "2023",
    description: "Demontage van havenkranen, silo's en opslagloodsen op een voormalig haventerrein.",
  },
  {
    image: project2,
    title: "Woningbouwproject Den Haag",
    location: "Den Haag",
    category: "Gebouwen Sloop",
    year: "2023",
    description: "Sloop van verouderde portiekflats om plaats te maken voor 200 nieuwe duurzame woningen.",
  },
  {
    image: project3,
    title: "Ziekenhuis Renovatie",
    location: "Eindhoven",
    category: "Interieur Sloop",
    year: "2022",
    description: "Gefaseerde strip-out van ziekenhuisvleugels tijdens operationele bezetting van het gebouw.",
  },
];

const categories = ["Alle", "Industriële Sloop", "Gebouwen Sloop", "Interieur Sloop"];

const Projecten = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Portfolio
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              ONZE <span className="text-gradient">PROJECTEN</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Ontdek onze meest recente sloop- en demontageprojecten. Van industriële complexen 
              tot kantoorgebouwen - bekijk waar TitanBrekers het verschil heeft gemaakt.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 font-medium uppercase tracking-wider text-sm transition-colors ${
                  category === "Alle"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Category & Year Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-primary px-3 py-1">
                    <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm px-3 py-1">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
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

export default Projecten;
