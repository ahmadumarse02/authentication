import BudgetDetailCards from "@/components/dashboard/budget/budgetDetail";
import { BudgetHeader } from "@/components/dashboard/budget/budgetHeader";
import Header from "@/components/dashboard/header";
import React from "react";

function OfficeBudgetPage() {
  return <>
     <Header
          title="Office Budget"
          description="View, create and send budget request."
        />
        <BudgetDetailCards />
        <BudgetHeader />

  </>
}

export default OfficeBudgetPage;
