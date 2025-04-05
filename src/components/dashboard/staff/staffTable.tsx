"use client";

import { useEffect, useState } from "react";
import { getAllStaff } from "@/actions/staff/allStaff";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { staffFormSchema } from "@/schema/StaffFormSchema";
import Link from "next/link";

export default function StaffTable() {
  const [staffData, setStaffData] = useState<z.infer<typeof staffFormSchema>[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStaff();
        console.log("Fetched Staff Data:", data);
        setStaffData(data);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-md h-[650px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">All Staff</h1>
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
          {staffData.map((staff, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{staff.firstName}</TableCell>
              <TableCell>{staff.lastName}</TableCell>
              <TableCell>{staff.gender}</TableCell>
              <TableCell>{staff.staffId}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.designation}</TableCell>
              <TableCell>
                <Button variant="link">
                  <Link href="/staff/edit">View more</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
