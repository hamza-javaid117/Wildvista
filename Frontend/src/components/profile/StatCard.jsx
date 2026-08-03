import { motion } from "framer-motion";

export default function StatCard({ title, value, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]"
    >
      <p className="text-sm text-gray-400">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
      </div>
    </motion.div>
  );
}
