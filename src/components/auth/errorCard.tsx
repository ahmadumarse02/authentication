import CardWrapper from "./cardWrapper";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/error"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
