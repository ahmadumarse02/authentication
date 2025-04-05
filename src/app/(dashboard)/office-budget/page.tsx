import BudgetDetailCards from "@/components/dashboard/budget/BudgetDetail";
import { BudgetHeader } from "@/components/dashboard/budget/BudgetHeader";
import Header from "@/components/dashboard/Header";
import React from "react";

function OfficeBudgetPage() {
  return (
    <>
      <Header
        title="Office Budget"
        description="View, create and send budget request."
      />
      <BudgetDetailCards />
      <BudgetHeader />
    </>
  );
}

export default OfficeBudgetPage;
