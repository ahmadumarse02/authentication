import React from "react";
import { prisma } from "@/lib/db";

async function EditPage({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;

  const staffEdit = await prisma.staff.findUnique({
    where: { id },
  });

  return (
    <div>
      {staffEdit ? (
        <div>
          <p>ID: {staffEdit.id}</p>
          <p>Email: {staffEdit.email}</p>
          <p>First Name: {staffEdit.firstName}</p>
          <p>Last Name: {staffEdit.lastName}</p>
          <p>Phone: {staffEdit.phone}</p>
          <p>Gender: {staffEdit.gender}</p>
          <p>Role: {staffEdit.role}</p>
          <p>Designation: {staffEdit.designation}</p>
          <p>Staff ID: {staffEdit.staffId}</p>
          <p>Official Email: {staffEdit.officialEmail}</p>
          <p>Image URL: {staffEdit.imageUrl}</p>
          <p>Created At: {staffEdit.createdAt.toString()}</p>
          <p>Updated At: {staffEdit.updatedAt.toString()}</p>
        </div>
      ) : (
        <p>No staff found</p>
      )}
    </div>
  );
}

export default EditPage;
