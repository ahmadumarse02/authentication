import React from 'react'
import Header from "@/components/dashboard/header";
import { MemoHeader } from '@/components/dashboard/memo/header';
import MemoTable from '@/components/dashboard/memo/memoTable';

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
  )
}

export default memoPage