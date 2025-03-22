// src/app/two-factor/page.tsx
"use client";

import React, { useTransition, useState } from "react";
import * as z from "zod"
import CardWrapper from "@/components/auth/cardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyTwoFactorToken } from "@/actions/twoFactor";

const TwoFactorPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
  
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
  
    const form = useForm({
      resolver: zodResolver(z.object({ code: z.string().min(6) })),
      defaultValues: {
        code: "",
      },
    });
  
    const onSubmit = (values: { code: string }) => {
      setError("");
      setSuccess("");
  
      startTransition(() => {
        verifyTwoFactorToken(values.code, email!).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
            router.push("/dashboard");
          }
        });
      });
    };
  
    return (
      <CardWrapper
        headerLabel="Two-Factor Authentication"
        backButtonLabel="Back to login"
        backButtonHref="/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 2FA code"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Verify
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
  };
  
  export default TwoFactorPage;