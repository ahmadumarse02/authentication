import React from "react";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/payroll/StartCards";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import PayrollTable from "@/components/dashboard/payroll/PayrollTable";
import { PayrollChart } from "@/components/dashboard/payrollVocture/Chart";

function PayrollPage() {
  return (
    <>
      <Header
        title="Payment Vouchers"
        description="Create account for a new staff"
      />
      <div className="flex flex-1 gap-5">
        <StatsCards />
        <PayrollChart />
      </div>
      <Card className="mt-10">
        <div className="flex pl-12 gap-5">
          <Link href="/payroll/salary-breakdown">
            <p>Salary Breakdown</p>
          </Link>
          <Link href="/payroll/salary-breakdown">
            <p>Tax Defination</p>
          </Link>
          <Link href="/payroll/salary-breakdown">
            <p>PaySlip</p>
          </Link>
          <Link href="/payroll">
            <p>payroll</p>
          </Link>
        </div>
      </Card>
      <PayrollTable />
    </>
  );
}

export default PayrollPage;
