"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormValues } from "@/schema/productSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addProduct } from "@/actions/stoke/addProduct";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      unitPrice: 0,
      supplier: "",
      productId: "",
      quantity: 0,
    },
  });

  const { pending } = useFormStatus();

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "number") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      });

      const result = await addProduct(formData);

      if (result.success) {
        toast.success("Product added successfully!");
        form.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      toast.info(`${file.name} selected`);
    }
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Image Upload Card */}
      <Card className="w-[300px] p-6 flex flex-col items-center space-y-4">
        <div className="w-[170px] h-[170px] flex items-center justify-center border border-dashed border-gray-400 rounded-full bg-gray-100">
          <label
            className="text-sm text-gray-500 cursor-pointer"
            htmlFor="product-image"
          >
            Upload photo
          </label>
          <Input
            type="file"
            id="product-image"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          Allowed format
          <span className="block text-lg font-normal text-black">
            JPG, JPEG, and PNG
          </span>
        </p>
        <p className="text-sm text-gray-500 text-center">
          Max file size
          <span className="block text-lg font-normal text-black">2MB</span>
        </p>
      </Card>

      {/* Product Form */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Add New Item</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Select category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter amount"
                      value={isNaN(field.value) ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseFloat(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter supplier name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QTY purchased</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      value={isNaN(field.value) ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || pending}
            >
              {isSubmitting || pending ? "Adding..." : "Add item"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
