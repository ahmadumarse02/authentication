import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButton {
  label: string;
  href: string;
}
const BackButton = ({ href, label }: BackButton) => {
  return (
    <>
      <Button variant="link" size="sm" className="font-normal w-full" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </>
  );
};

export default BackButton;
