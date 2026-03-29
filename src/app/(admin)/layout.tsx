export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          Admin CMS
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="block p-2 hover:bg-slate-800 rounded">
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/lessons"
                className="block p-2 hover:bg-slate-800 rounded"
              >
                Manage Lessons
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span>Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
