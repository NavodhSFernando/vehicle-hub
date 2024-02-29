import React from "react";
import Datepicker from "./Datepicker";
import TimePicker from "./TimePicker";
import SearchButton from "./SearchButton";

export default function BookingStrip() {
  return (
    <div className="flex  items-center justify-center ">
      <div className="min-[1300px]:overflow-x-auto px-20 shadow-lg bg-white rounded-lg min-[1300px]:rounded-full">
        <ul className="flex min-[1300px]:flex-row flex-col gap-5  py-5">
          <li className="min-[1350px]:pr-10">
            <Datepicker />
          </li>
          <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
            <TimePicker />
          </li>
          <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
            <Datepicker />
          </li>
          <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
            <TimePicker />
          </li>
          <li className="min-[1300px]:pl-10">
            <SearchButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
