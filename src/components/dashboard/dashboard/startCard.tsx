"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets/data/assets";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">250</h1>
              <h1 className="text-[16px]">Total number of staff</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card1} alt="" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <ArrowUp className="text-green-400" />
            <h1 className="text-[#515151]">12 more than last quarter</h1>
          </div>
        </CardContent>
      </Card>

      {/* card2 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">10</h1>
              <h1 className="text-[16px]">Total projects</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card2} alt="" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <ArrowUp className="text-green-400" />
            <h1 className="text-[#515151]">+2% more than last quarter</h1>
          </div>
        </CardContent>
      </Card>
      {/* card3 */}
      <Card className="p-5 shadow-md">
        <CardContent className="flex flex-col p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">100</h1>
              <h1 className="text-[16px]">Total applications</h1>
            </div>
            <div className="rounded-full bg-[#FFF4E8] p-3">
              <Image src={assets.card3} alt="" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <ArrowDown className="text-red-400" />
            <h1 className="text-[#515151]">-0.2% lower than last quarter</h1>
          </div>
        </CardContent>
      </Card>
      {/* card4 */}
      <Card className="p-5 shadow-md">
        <CardContent className="p-0">
          <div className="flex justify-between items-center">
            <div className="">
              <h1 className="text-[28px] font-bold">10</h1>
              <h1 className="text-[16px]">Total departments</h1>
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
