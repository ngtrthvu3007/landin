import { motion } from "framer-motion";

export default function RoadmapTimeline() {
  return (
    <section className="relative max-w-6xl py-20 mx-auto">
      {/* Timeline line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200"></div>

      <div className="relative flex justify-between">
        {roadmapItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center w-1/4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Line connector */}
            <div className="absolute top-1/2 h-8 w-[2px] bg-slate-300"></div>

            {/* Circle milestone */}
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-emerald-500"></div>

            {/* Info box */}
            <div className="mt-10 p-4 bg-white rounded-xl shadow-lg border border-slate-200 max-w-[200px] text-center">
              <p className="text-sm font-semibold text-slate-500">{item.month}</p>
              <h4 className="mt-1 font-bold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
