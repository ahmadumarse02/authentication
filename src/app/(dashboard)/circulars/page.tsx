import { CircularHeader } from "@/components/dashboard/circulars/CircularsHeader";
import Header from "@/components/dashboard/Header";
import React from "react";

function CircularsPage() {
  return (
    <>
      <Header
        title="circulars"
        description="Search for  and view all circulars"
      />
      <CircularHeader />
    </>
  );
}

export default CircularsPage;
