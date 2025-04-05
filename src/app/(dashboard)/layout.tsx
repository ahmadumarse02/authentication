import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-56 bg-[#E4E4E4] shadow-md z-50">
        <Sidebar />
      </aside>
      <div className="ml-[256px] px-4 min-h-full bg-[#F8F9FD]">
        <main>{children}</main>
        <p className="text-[#383838] text-center mt-20">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </p>
      </div>
    </>
  );
}
