import Header from "@/components/dashboard/header";
import { QuickSearchStaffCard } from "@/components/dashboard/staff/staffHeader";
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

    
        </div>
    </>
  );
}

export default page;
