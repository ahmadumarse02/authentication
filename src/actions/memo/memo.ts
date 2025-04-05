"use server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/db";

export async function createMemo(formData: FormData) {
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const sender = formData.get("sender") as string;
    const action = formData.get("action") as string;
    const dateString = formData.get("date") as string;
    const body = formData.get("body") as string;
    const sentTo = formData.get("sentTo") as string;
    const hasVoucher = formData.get("hasVoucher") === "true";
    const attachmentType = formData.get("attachmentType") as string | null;
    const attachmentFile = formData.get("attachment") as File | null;

    // Parse date
    const date = new Date(dateString);

    // Handle file upload if attachment exists
    let attachmentPath = null;
    if (attachmentFile && attachmentFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "memo-attachments");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const timestamp = Date.now();
      const fileExt = path.extname(attachmentFile.name);
      const fileName = `memo-attachment-${timestamp}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = await attachmentFile.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
      attachmentPath = `/memo-attachments/${fileName}`;
    }

    // Create memo in database
    await prisma.memo.create({
      data: {
        title,
        sender,
        action,
        date,
        body,
        sentTo,
        hasVoucher,
        attachment: attachmentPath,
        ...(attachmentType && { attachmentType }), // Only include if exists
      },
    });

    return { success: true, message: "Memo created successfully!" };
  } catch (error) {
    console.error("Error creating memo:", error);
    return { success: false, message: "Failed to create memo." };
  }
}