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

export default function StaffTable() {
  const staffData = [
    {
      sn: "01",
      firstName: "Sandra",
      lastName: "Williams",
      gender: "Female",
      staffId: "0246AHR",
      phoneNumber: "08130000000",
      role: "Admin",
      designation: "Human Resources",
      action: "View more",
    },
    {
      sn: "02",
      firstName: "Abubakar",
      lastName: "Ibrahim",
      gender: "Male",
      staffId: "0251ITO",
      phoneNumber: "07062000033",
      role: "LT",
      designation: "Operations",
      action: "View more",
    },
    {
      sn: "03",
      firstName: "Ikechukwu",
      lastName: "Ugbonna",
      gender: "Male",
      staffId: "0340ITO",
      phoneNumber: "08130000000",
      role: "LT",
      designation: "Operations",
      action: "View more",
    },
  ];

  return (
    <div className="p-4">
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
          {staffData.map((staff) => (
            <TableRow key={staff.sn}>
              <TableCell>{staff.sn}</TableCell>
              <TableCell>{staff.firstName}</TableCell>
              <TableCell>{staff.lastName}</TableCell>
              <TableCell>{staff.gender}</TableCell>
              <TableCell>{staff.staffId}</TableCell>
              <TableCell>{staff.phoneNumber}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.designation}</TableCell>
              <TableCell>
                <button className="text-blue-600 hover:underline">
                  {staff.action}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}