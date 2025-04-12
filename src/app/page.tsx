import OptInForm from "@/components/OptinForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a nuestro servicio de Promociones
      </h1>
      <OptInForm />
    </div>
  );
}
