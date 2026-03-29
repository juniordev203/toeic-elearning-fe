export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Total Lessons
          </h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Total Sentences
          </h3>
          <p className="text-3xl font-bold mt-2">148</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Recent Attempts
          </h3>
          <p className="text-3xl font-bold mt-2">45</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
        <p className="text-slate-600">
          Admin panel for managing TOEIC Dictation content.
        </p>
      </div>
    </div>
  );
}
