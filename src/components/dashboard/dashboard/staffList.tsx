import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const staffList = [
  {
    id: "01",
    name: "Abubakar Ismaila Goje",
    role: "Admin",
    designation: "Human Resource Dept.",
  },
  {
    id: "02",
    name: "Ifeanyi Obinna",
    role: "Admin",
    designation: "Management",
  },
  {
    id: "03",
    name: "Bankole Olanrewaju",
    role: "HOD I.T",
    designation: "Peoples and Operation",
  },
  {
    id: "04",
    name: "Chidinma Ebere",
    role: "HOD Account",
    designation: "Accounts",
  },
];

export default function StaffTable() {
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
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
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
