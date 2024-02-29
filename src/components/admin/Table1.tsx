import React from "react";

export default function Table1() {
  return (
    <div className="flex  items-center justify-center ">
      <div className="overflow-x-auto px-5">
        <table className="min-w-full bg-white shadow-md ">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700 border-b-[5px] border-[#4B4B4B]">
              <th className="py-5 px-5 text-left">VehicleID</th>
              <th className="py-5 px-5 text-left">Registration Number</th>
              <th className="py-5 px-5 text-left">Model Name</th>
              <th className="py-5 px-5 text-left">Manufacture Year</th>
              <th className="py-5 px-5 text-left">Transmission</th>
              <th className="py-5 px-5 text-left">Image</th>
              <th className="py-5 px-5 text-left">Status</th>
              <th className="py-5 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            <tr className="border-b border-blue-gray-200">
              <td className="py-5 px-5">001</td>
              <td className="py-5 px-5">QL 9904</td>
              <td className="py-5 px-5">Toyota-Axio</td>
              <td className="py-5 px-5">2017</td>
              <td className="py-5 px-5">Auto</td>
              <td className="py-5 px-5">
                <div className="w-[42px] h-[42px] bg-orange-300 rounded-full"></div>
              </td>
              <td className="py-5 px-5">
                <span className="px-3 py-1 bg-[#FFC107] rounded-full text-sm font-bold opacity-80">
                  Active
                </span>
              </td>
              <td className="py-5 px-5 flex items-end justify-end">
                <div className="h-full flex items-end justify-end pt-2">
                  <span className="w-[20px] block h-[20px] bg-emerald-500 rounded-lg mr-2"></span>
                  <span className="w-[20px] block h-[20px] bg-emerald-500 rounded-lg"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
