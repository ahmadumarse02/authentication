interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Auth</h1>
      <p className="text-sm">{label}</p>
    </div>
  );
};
