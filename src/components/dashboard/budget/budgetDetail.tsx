"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets/data/assets";

export default function BudgetDetailCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">₦23,000,000</h1>
              <h1 className="text-[16px]">Total annual budget</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card1} alt="" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <ArrowUp className="text-green-400" />
            <h1 className="text-[#515151]">5% more than last year</h1>
          </div>
        </CardContent>
      </Card>

      {/* card2 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">₦10,000,000</h1>
              <h1 className="text-[16px]">Amount used, YTD</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card2} alt="" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* card3 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">₦13,000,000</h1>
              <h1 className="text-[16px]">Total budget balance</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card3} alt="" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* card4 */}
      <Card className="p-5 shadow-md">
        <CardContent className="p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">48%</h1>
              <h1 className="text-[16px]">Budget % used</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card4} alt="" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
