import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const vouchers = [
  {
    id: "01",
    subject: "Request for FARS for October 2022",
    date: "25/01/2023",
    status: "Pending",
  },
  {
    id: "02",
    subject: "Request for project proposal fee",
    date: "19/01/2023",
    status: "Approved",
  },
  {
    id: "03",
    subject: "Request for FARS for October 2022",
    date: "10/01/2023",
    status: "Approved",
  },
  {
    id: "04",
    subject: "Request for project proposal fee",
    date: "03/01/2023",
    status: "Pending",
  },
];

export default function PaymentVouchersTable() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Payment Vouchers</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">S/N</TableHead>
              <TableHead className="font-semibold">Subject</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.id}</TableCell>
                <TableCell>{voucher.subject}</TableCell>
                <TableCell>{voucher.date}</TableCell>
                <TableCell
                  className={`${
                    voucher.status === "Approved"
                      ? "text-green-500"
                      : "text-orange-500"
                  } font-medium`}
                >
                  {voucher.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
