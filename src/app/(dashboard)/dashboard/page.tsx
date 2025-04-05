"use client";

import MemoTable from "@/components/dashboard/dashboard/memo";
import PaymentVouchersTable from "@/components/dashboard/dashboard/PaymentVouchersTable";
import StaffTable from "@/components/dashboard/dashboard/StaffList";
import StatsCards from "@/components/dashboard/dashboard/StartCard";
import Header from "@/components/dashboard/Header";

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
