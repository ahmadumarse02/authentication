"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MaintenceCard() {
  return (
    <Card className="w-full mt-8">
      <CardContent className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold">250</h1>
          <p className="text-sm text-[#515151]">Total number of staff</p>
        </div>
        <Link href="/maintence/create">
          <Button className="bg-gradient-custom w-full max-w-[180px] h-[46px]">
            Add New Staff
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
