import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-extrabold text-orange-500">Ahmad Umar</h1>
          <Link href="/register">
            <Button size="lg">Register</Button>
          </Link>
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
