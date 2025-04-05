import React from "react";
import { TrainingForm } from "@/components/dashboard/training/TrainingForm";
import Header from "@/components/dashboard/Header";

function CapacityBuildingPage() {
  return (
    <>
      <Header
        title="Capacity Building"
        description="Create and submit request for staff training"
      />
      <TrainingForm />
    </>
  );
}

export default CapacityBuildingPage;
