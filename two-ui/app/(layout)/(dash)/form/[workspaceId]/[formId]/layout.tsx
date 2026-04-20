import FormEditTopbar from "@/components/navigation/FormEditTopbar";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex w-full flex-col">
        <FormEditTopbar />
        <main className="flex w-full items-center justify-center">
          {children}
        </main>
      </div>
    </>
  );
}
