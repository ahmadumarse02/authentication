import StaffTable from "@/components/dashboard//staff/StaffTable";
import Header from "@/components/dashboard/Header";
import { QuickSearchStaffCard } from "@/components/dashboard/staff/StaffHeader";
import { prisma } from "@/lib/db";
import React from "react";

function page() {
  const allStaff = prisma.staff.findMany();
  console.log(allStaff);
  return (
    <>
      <div className="flex flex-col gap-8">
        <Header
          title="All Staff"
          description="View, search for and add new staff"
        />
        <QuickSearchStaffCard />
        <StaffTable />
      </div>
    </>
  );
}

export default page;
