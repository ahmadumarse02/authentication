import Header from "@/components/dashboard/Header";
import { MaintenceCard } from "@/components/dashboard/maintence/Header";
import MaintenceCards from "@/components/dashboard/maintence/MaintenceHeader";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import React from "react";
import MaintenanceCard from "@/components/dashboard/maintence/MaintenanceCard";

const tasks = [
  {
    date: "1st November, 2022",
    id: 1,
    description: "Scheduled maintenance for 3 units of AC",
  },
  {
    date: "18th November, 2022",
    id: 2,
    description: "Scheduled maintenance for 3 units of AC",
  },
];

function MaintenancePage() {
  return (
    <>
      <Header
        title="Maintenance"
        description="View and create schedule for maintenance"
      />
      <MaintenceCards />
      <MaintenceCard />
      <Card className="w-full h-full mt-8 px-8 py-4">
        <h1 className="font-bold text-lg mb-8">Scheduled Maintenance</h1>
        <div className="flex justify-center gap-8">
          <Calendar className="bg-blue-100" />
          <div className="">
            <main className="max-w-md mx-auto p-4">
              <h1 className="text-2xl font-bold mb-6">Maintenance Tasks</h1>
              <div className="bg-white rounded-lg shadow p-4">
                {tasks.map((task) => (
                  <MaintenanceCard key={task.id} {...task} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </Card>
    </>
  );
}

export default MaintenancePage;
