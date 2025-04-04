import React from "react";
import Header from "@/components/dashboard/header";
import StatsCards from "@/components/dashboard/dashboard/startCard";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import PayrollTable from "@/components/dashboard/payroll/payrollTable";

function PayrollPage() {
  return (
    <>
      <Header
        title="Payment Vouchers"
        description="Create account for a new staff"
      />
      <StatsCards />
      <Card className="mt-10">
        <div className="flex pl-12 gap-5">
          <Link href="/payroll/salary-breakdown"><p>Salary Breakdown</p></Link>
          <Link href="/payroll/salary-breakdown"><p>Tax Defination</p></Link>
          <Link href="/payroll/salary-breakdown"><p>PaySlip</p></Link>
          <Link href="/payroll"><p>payroll</p></Link>
        </div>
      </Card>
      <PayrollTable />
    </>
  )
}

export default PayrollPage;
