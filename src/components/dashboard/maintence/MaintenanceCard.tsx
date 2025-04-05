// components/MaintenanceCard.tsx
import React from 'react';

interface MaintenanceTask {
  date: string;
  id: number;
  description: string;
}

const MaintenanceCard = ({ date, id, description }: MaintenanceTask) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="font-bold text-gray-800">{date}</p>
      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-600">
          {id}. {description}
        </p>
        <button className="text-blue-500 hover:text-blue-700">View</button>
      </div>
    </div>
  );
};

export default MaintenanceCard;