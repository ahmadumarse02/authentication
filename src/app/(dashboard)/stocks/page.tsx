import Header from "@/components/dashboard/Header";
import ProductForm from "@/components/dashboard/product/ProductForm";
import React from "react";

function StocksPage() {
  return (
    <>
      <Header
        title="All Stock"
        description="View, search for and add new staff"
      />

      <ProductForm />
    </>
  );
}

export default StocksPage;
