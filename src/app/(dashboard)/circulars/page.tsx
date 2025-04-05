import { CircularHeader } from "@/components/dashboard/circulars/circularsHeader";
import Header from "@/components/dashboard/header";
import React from "react";

function CircularsPage() {
  return (
    <>
    <Header title="circulars" description="Search for  and view all circulars"/>
    <CircularHeader />
    </>
  )
}

export default CircularsPage;
