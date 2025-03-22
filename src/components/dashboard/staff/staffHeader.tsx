"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuickSearchStaffCard() {
  return (
    <Card className="w-full">
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center justify-between border border-[#D0D0D0] px-3 py-1 rounded-lg h-[50px]">
          <input
            placeholder="Enter search word"
            className="border-none focus:outline-none"
          />
          <Search className="mr-4" />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">250</h1>
          <p className="text-sm text-[#515151]">Total number of staff</p>
        </div>
        <div className="w-full max-w-[200px]">
          <p className="text-sm font-medium">Filter staff</p>
          <Select>
            <SelectTrigger className="bg-[#F2F7FF] border border-[#ACC3E7] focus:outline-none rounded-lg px-3 py-2 w-full">
              <SelectValue placeholder="All staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All staff</SelectItem>
              <SelectItem value="active">Active staff</SelectItem>
              <SelectItem value="inactive">Inactive staff</SelectItem>
              <SelectItem value="Human Resources">
                Human Resources staff
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href="/staff/add">
        <Button className="bg-gradient-custom w-full max-w-[180px] h-[46px]">
          Add New Staff
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
