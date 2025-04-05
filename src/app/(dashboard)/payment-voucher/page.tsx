import React from "react";
import Header from "@/components/dashboard/header"
import { SearchHeader } from "@/components/dashboard/paymentVoucher/searchHeader";
// import { PayrollChart } from "@/components/dashboard/payrollVocture/chart";

function PaymentVoucherPage() {
  return (
    <>
      <Header
        title="Payment Vouchers"
        description="Create account for a new staff"
      />
      <SearchHeader />
      {/* <PayrollChart /> */}
    </>
  )
}

export default PaymentVoucherPage;
