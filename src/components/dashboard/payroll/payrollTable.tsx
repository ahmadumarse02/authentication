"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PayrollTable() {
  return (
    <div className="p-4 bg-white rounded-md shadow-md h-[650px] overflow-y-auto mt-12">
      <div className="flex justify-between py-4">
        <h1 className="text-2xl font-bold mb-4">Sallary Defination</h1>
        <Link href="/payroll/add">
          <Button className="bg-gradient-custom w-full max-w-[180px] h-[46px]">
            Create Salary Defination
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of all staff members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Staff ID</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>firstName</TableCell>
            <TableCell>lastName</TableCell>
            <TableCell>gender</TableCell>
            <TableCell>staffId</TableCell>
            <TableCell>phone</TableCell>
            <TableCell>role</TableCell>
            <TableCell>designation</TableCell>
            <TableCell>
              <Button variant="link">
                <Link href="/staff/edit">View more</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
