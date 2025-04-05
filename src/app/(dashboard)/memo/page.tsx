import React from "react";
import Header from "@/components/dashboard/Header";
import { MemoHeader } from "@/components/dashboard/memo/Header";
import MemoTable from "@/components/dashboard/memo/MemoTable";

function memoPage() {
  return (
    <>
      <div className="h-screen">
        <Header
          title="All Memo"
          description="View, search for and add new memo"
        />
        <MemoHeader />
        <MemoTable />
      </div>
    </>
  );
}

export default memoPage;
