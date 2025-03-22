"use server";

import { prisma } from "@/lib/db";

export async function getAllStaff() {
  return await prisma.staff.findMany();
}