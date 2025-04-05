"use server";

import { prisma } from "@/lib/db";

export async function getAllMemo() {
  return await prisma.memo.findMany();
}
