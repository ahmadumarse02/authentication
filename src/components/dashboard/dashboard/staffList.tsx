"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { staffFormSchema } from "@/schema/staffFormSchema";
import { getAllStaff } from "@/actions/staff/allStaff";

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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Staff List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">S/N</TableHead>
              <TableHead className="font-semibold">Staff Name</TableHead>
              <TableHead className="font-semibold">Staff Role</TableHead>
              <TableHead className="font-semibold">Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{staff.firstName}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
