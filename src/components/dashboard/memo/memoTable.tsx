"use client";

import { useEffect, useState } from "react";
import { getAllMemo } from "@/actions/memo/allMemo"; // You'll need to create this
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react";

export default function MemoTable() {
  interface Memo {
    id: string;
    title: string;
    sender: string;
    sentTo: string;
    date: string;
    attachment: boolean;
    action: string;
  }

  const [memoData, setMemoData] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMemo();
        console.log("Fetched Memo Data:", data);
        setMemoData(data);
      } catch (err) {
        console.error("Error fetching memo data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 mt-8 bg-white rounded-md shadow-md max-h-[650px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">All Memos</h1>
      <Table>
        <TableCaption>A list of all memos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Memo Title</TableHead>
            <TableHead>Sent From</TableHead>
            <TableHead>Sent To</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Attachment?</TableHead>
            <TableHead>Memo Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memoData.map((memo, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{memo.title || "-"}</TableCell>
              <TableCell>{memo.sender || "-"}</TableCell>
              <TableCell>{memo.sentTo || "-"}</TableCell>
              <TableCell>
                {memo.date ? new Date(memo.date).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell>
                {memo.attachment ? (
                  <p>Yes</p>
                ) : (
                  <p>No</p>
                )}
              </TableCell>
              <TableCell>{memo.action || "-"}</TableCell>
              <TableCell>
                <Button variant="link">
                  <Link href={`/memos/${memo.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}