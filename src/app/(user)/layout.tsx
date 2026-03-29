import Link from 'next/link';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TODO: Add User Header */}
      <header className="border-b bg-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold font-sans">TOEIC Dictation</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/lessons" className="hover:text-blue-600">
                  Lessons
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">{children}</main>

      {/* TODO: Add User Footer */}
      <footer className="border-t bg-gray-50 p-8">
        <div className="container mx-auto text-center text-gray-500">
          © 2026 TOEIC Dictation MVP
        </div>
      </footer>
    </div>
  );
}
