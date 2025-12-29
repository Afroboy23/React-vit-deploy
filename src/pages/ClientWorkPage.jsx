import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

// Project Assets
import imgCRM from "../assets/crm.png";
import imgLogistics from "../assets/logistics.png";
import imgPrecision from "../assets/precision-auto.png";
import imgRestaurant from "../assets/resturant.png";
import imgApp from "../assets/our-app.png";
import imgNzala from "../assets/nzala-sc.png";

const PROJECTS = [
  {
    id: 1,
    title: "Precision Auto",
    category: "Website & Branding",
    image: imgPrecision,
  },
  {
    id: 2,
    title: "Logistics Dashboard",
    category: "System & Operations",
    image: imgLogistics,
  },
  {
    id: 3,
    title: "Custom CRM",
    category: "Internal Tooling",
    image: imgCRM,
  },
  {
    id: 4,
    title: "Restaurant Platform",
    category: "E-commerce & Web",
    image: imgRestaurant,
  },
  {
    id: 5,
    title: "ByCreair App",
    category: "Mobile Application",
    image: imgApp,
  },
  {
    id: 6,
    title: "Nzala SC",
    category: "Web Development",
    image: imgNzala,
  },
];

function ClientWorkPage() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/20 selection:text-cyan-200">

      {/* Background: Ethereal Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="ethereal-gradient absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-24 pb-32">

          {/* Header Section */}
          <div className="mb-24 px-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-8xl font-medium tracking-tighter text-white mb-8"
            >
              Selected <span className="text-cyan">Work</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl sm:text-2xl font-light text-white/60 max-w-3xl leading-relaxed"
            >
              A collection of our most recent deployments. From high-conversion landing pages to full-scale digital operating systems.
            </motion.p>
          </div>

          {/* Project Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <motion.div
                layoutId={`card-${project.id}`}
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/[0.03] border border-white/10 transition-all hover:border-cyan/50 cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.img
                    layoutId={`image-${project.id}`}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>

                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content Overlay */}
                <motion.div
                  layoutId={`content-${project.id}`}
                  className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                >
                  <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
                  <p className="text-xs tracking-widest text-cyan uppercase">{project.category}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </main>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-12 pointer-events-none">
            {/* Backprop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer pointer-events-auto"
            />

            {/* Card Modal */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 overflow-hidden rounded-sm shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] pointer-events-auto"
            >
              {/* Close Button Mobile */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 md:hidden z-20 text-white/50 hover:text-white bg-black/50 p-2 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="md:w-2/3 h-[40vh] md:h-auto relative">
                <motion.img
                  layoutId={`image-${selectedId}`}
                  src={selectedProject.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-8 flex flex-col justify-between bg-zinc-900 border-l border-white/5">
                <div>
                  <motion.div layoutId={`content-${selectedId}`}>
                    <h3 className="text-3xl font-medium text-white mb-2">{selectedProject.title}</h3>
                    <p className="text-sm tracking-widest text-cyan uppercase mb-6">{selectedProject.category}</p>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 leading-relaxed font-light text-sm"
                  >
                    Full implementation details for this project are available upon request. We handled the end-to-end design, development, and system integration.
                  </motion.p>
                </div>



                {/* Close Button Desktop */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="hidden md:block absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default ClientWorkPage;
