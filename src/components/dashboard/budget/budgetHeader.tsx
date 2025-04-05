"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BudgetHeader() {
  return ( 
    <Card className="w-full mt-8">
      <CardContent className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold">Create a Budget</h1>
        </div>
        <Link href="/office-budget/create">
          <Button className="bg-gradient-custom w-full max-w-[180px] h-[46px]">
            Add New memo
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
