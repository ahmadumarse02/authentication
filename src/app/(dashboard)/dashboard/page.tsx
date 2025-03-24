"use client";

import MemoTable from "@/components/dashboard/dashboard/memo";
import PaymentVouchersTable from "@/components/dashboard/dashboard/paymentVouchersTable";
import StaffTable from "@/components/dashboard/dashboard/staffList";
import StatsCards from "@/components/dashboard/dashboard/startCard";
import Header from "@/components/dashboard/header";

export default function Dashboard() {
  return (
    <div>
      <Header
        title="Welcome, Mr. Otor John 👍"
        description="Today is Saturday, 11th November 2022."
      />
      <div className="flex flex-col gap-5">
        <StatsCards />
        <div className="grid grid-cols-2 gap-4">
          <MemoTable />
          <StaffTable />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <PaymentVouchersTable />
        </div>
      </div>
    </div>
  );
}
