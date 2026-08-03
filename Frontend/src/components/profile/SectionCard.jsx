export default function SectionCard({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-2xl ${className}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
