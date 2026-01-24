
const Logo = () => {
  return (
    <div>
      <img src="/Form-Fluoce.svg" alt="Logo" className="h-8 w-8" />
    </div>
  );
};

export default Logo;

export const NameLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src="/Form-Fluoce.svg" alt="Logo" className="h-7 w-7" />
      <h1 className="SSN text-xl font-semibold">Fluoce Form</h1>
    </div>
  );
};
