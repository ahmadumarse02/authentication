"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SearchHeader() {
  return (
    <Card className="w-full">
      <CardContent className="flex justify-between items-center">
        <div className="">
          <h1 className="text-2xl font-bold">250</h1>
          <p className="text-sm text-[#515151]">Total payment vouchers</p>
        </div>
        <div className="w-full max-w-[200px]">
          <p className="text-sm font-medium">Filter payment voucher</p>
          <Select>
            <SelectTrigger className="bg-[#F2F7FF] border border-[#ACC3E7] focus:outline-none rounded-lg px-3 py-2 w-full">
              <SelectValue placeholder="All memo" />
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
        <Link href="/payment-voucher/create">
          <Button className="bg-gradient-custom w-full max-w-[180px] h-[46px]">
          Create Payment Voucher
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
