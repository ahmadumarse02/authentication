"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const memos = [
  {
    id: "01",
    title: "Operations memo",
    from: "Otor John",
    to: "Ibrahim Sadiq",
    status: "Pending",
  },
  {
    id: "02",
    title: "Operations project memo",
    from: "Fatima Faruk",
    to: "Shola Abiola",
    status: "Approved",
  },
  {
    id: "03",
    title: "Project onboard notice",
    from: "Otor John",
    to: "James Emeka",
    status: "Approved",
  },
  {
    id: "04",
    title: "Operations memo",
    from: "Ibrahim Musa",
    to: "Otor John",
    status: "Approved",
  },
];

export default function MemoTable() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Memo</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">S/N</TableHead>
              <TableHead className="font-semibold">Memo Title</TableHead>
              <TableHead className="font-semibold">Sent From</TableHead>
              <TableHead className="font-semibold">Sent To</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memos.map((memo) => (
              <TableRow key={memo.id}>
                <TableCell>{memo.id}</TableCell>
                <TableCell>{memo.title}</TableCell>
                <TableCell>{memo.from}</TableCell>
                <TableCell>{memo.to}</TableCell>
                <TableCell
                  className={
                    memo.status === "Approved"
                      ? "text-green-500"
                      : "text-orange-500"
                  }
                >
                  {memo.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
