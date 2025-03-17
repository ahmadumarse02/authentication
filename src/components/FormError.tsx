import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-3 text-sm text-destructive/70">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
