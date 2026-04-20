import FormFieldbar from "@/components/form/FormFieldbar";
import FormFieldEditbar from "@/components/form/FormFieldEditbar";

export default function FormEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative flex h-[calc(100vh-52px)] w-full items-start justify-between overflow-hidden">
        <FormFieldbar />
        {children}
        <FormFieldEditbar />
      </main>
    </>
  );
}
