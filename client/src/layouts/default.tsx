import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {/* <main className="container mx-auto max-w-7xl px-6 flex-grow md:w-3/4 pb-4"> */}
      <main className="mx-auto w-full px-6 flex-grow pt-1 pb-4 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
