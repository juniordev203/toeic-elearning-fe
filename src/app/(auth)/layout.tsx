export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-sans">TOEIC Dictation</h1>
          <p className="text-zinc-500 text-sm mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
