import { Card, CardContent } from '@/components/ui/card';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">TOEIC Dictation</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
