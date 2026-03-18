import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import doctorData from "../../data/doctorData.json";
import { scrollToSection } from "../../utils/helpers";

const tagColors = {
  Interventional: "bg-red-50 text-red-600",
  Diagnostic: "bg-blue-50 text-blue-600",
  Electrophysiology: "bg-purple-50 text-purple-600",
  Management: "bg-green-50 text-green-600",
  Imaging: "bg-amber-50 text-amber-600",
};

export default function Services() {
  const { services } = doctorData;

  return (
    <section id="services" className="section-padding bg-slate-50" aria-labelledby="services-heading">
      <div className="container-max mx-auto">
        <SectionTitle
          tag="What We Treat"
          title={services.heading}
          subtitle={services.subtitle}
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.list.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-6 group hover:-translate-y-1 cursor-default"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-teal-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Tag */}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[service.tag] || "bg-slate-100 text-slate-600"}`}>
                {service.tag}
              </span>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-slate-900 mt-3 mb-2 group-hover:text-primary-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* CTA link */}
              <button
                onClick={() => scrollToSection("appointment")}
                className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-semibold hover:gap-2 transition-all duration-200"
              >
                Book Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 mb-5">Not sure which service you need?</p>
          <button
            onClick={() => scrollToSection("appointment")}
            className="btn-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Book a Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
