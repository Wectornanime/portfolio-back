import { Link } from "@heroui/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center h-full">
      <h1 className="text-7xl font-bold">404</h1>
      <p>Não foi possível localizar esta página.</p>
      <Link href={"/"}>Voltar para a Home</Link>
    </section>
  );
}
