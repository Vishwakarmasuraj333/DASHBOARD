export default function StatCard({ title, value, growth, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
      <div className="flex items-center justify-between">
        <p className="text-gray-400">{title}</p>
        <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 text-4xl font-black">{value}</h3>
      <p className="mt-3 text-sm font-semibold text-green-400">{growth}</p>
    </div>
  );
}