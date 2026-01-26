import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    image: project1,
    title: "Oude Fabriek Rotterdam",
    location: "Rotterdam",
    category: "Industriële Sloop",
    description: "Complete demontage van een voormalige staalfabriek inclusief asbestsanering.",
  },
  {
    image: project2,
    title: "Kantoorcomplex Zuidas",
    location: "Amsterdam",
    category: "Gebouwen Sloop",
    description: "Gecontroleerde sloop van een 12-verdiepingen kantoorgebouw in stedelijk gebied.",
  },
  {
    image: project3,
    title: "Winkelcentrum Renovatie",
    location: "Utrecht",
    category: "Interieur Sloop",
    description: "Selectieve strip-out van 15.000m² winkelruimte voor herontwikkeling.",
  },
];

const Projects = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Onze Projecten
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              RECENT <span className="text-gradient">WERK</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Ontdek onze meest recente sloop- en demontageprojecten door heel Nederland.
            </p>
          </div>
          <Link to="/projecten" className="btn-outline-power flex items-center gap-2">
            Alle Projecten
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative overflow-hidden bg-background border border-border hover:border-primary transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-primary px-3 py-1">
                <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                  {project.category}
                </span>
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
  );
};

export default Projects;
