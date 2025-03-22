import StaffTable from "@/components/dashboard/dashboard/staffList";
import Header from "@/components/dashboard/header";
import { QuickSearchStaffCard } from "@/components/dashboard/staff/staffHeader";
import React from "react";

function page() {
  return (
    <>
      <Header
        title="All Staff"
        description="View, search for and add new staff"
      />
      <div className="flex flex-col gap-5">
        <QuickSearchStaffCard />
        <StaffTable />
      </div>
    </>
  );
}

export default page;
