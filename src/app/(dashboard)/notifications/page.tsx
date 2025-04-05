"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { assets } from "@/assets/data/assets";
import Image from "next/image";
import Header from "@/components/dashboard/Header";

export function NotificationPage() {
  return (
    <>
     <Header
          title="Notifications"
          description="Read and delete notifications."
        />
    <div className="mx-auto p-6 bg-white rounded-lg shadow-sm">

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Today</h2>
        <div className="space-y-4">
          {/* Activity Item 1 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">3min ago</p>
            </div>
          </div>
          
          {/* Activity Item 2 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">10min ago</p>
            </div>
          </div>
          
          {/* Activity Item 3 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">1hr ago</p>
            </div>
          </div>
          
          {/* Activity Item 4 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">5hr ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Yesterday's Activities */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Yesterday 18th November, 2022</h2>
        <div className="space-y-4">
          {/* Activity Item 5 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">1day ago</p>
            </div>
          </div>
          
          {/* Activity Item 6 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">1day ago</p>
            </div>
          </div>
          
          {/* Activity Item 7 */}
          <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded">
            <Checkbox className="mt-1" />
            <Image src={assets.avatar} alt=""/>
            <div className="flex-1">
              <p className="text-gray-800">Your payment invoice request has been approved by Admin</p>
              <p className="text-sm text-gray-500">1day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Select All */}
      <div className="flex items-center gap-2 mt-4">
        <Checkbox id="select-all" />
        <label htmlFor="select-all" className="text-sm text-gray-600 cursor-pointer">
          Select all
        </label>
      </div>
    </div>
    </>
  );
}

export default NotificationPage;