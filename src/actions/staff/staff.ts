"use server";
import path from "path";
import fs from "fs";

import { prisma } from "@/lib/db";

export async function addStaff(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const gender = formData.get("gender") as string;
    const role = formData.get("role") as string;
    const designation = formData.get("designation") as string;
    const staffId = formData.get("staffId") as string;
    const officialEmail = formData.get("officialEmail") as string;
    const image = formData.get("image") as File;

    let imageUrl = "";
    if (image) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, image.name);
      const buffer = await image.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
      imageUrl = `/uploads/${image.name}`;
    }

    await prisma.staff.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        gender,
        role,
        designation,
        staffId,
        officialEmail,
        imageUrl,
      },
    });

    return { success: true, message: "Staff added successfully!" };
  } catch (error) {
    console.error("Error adding staff:", error);
    return { success: false, message: "Failed to add staff." };
  }
}
