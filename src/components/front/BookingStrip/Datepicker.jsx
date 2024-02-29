import React from "react";

export default function Datepicker() {
  return (
    //remove wrapper when using component
    //add this css code
    // .dateInput::-webkit-calendar-picker-indicator {
    //   opacity: 0;
    //   width: 100%;
    //   position: absolute;
    // }

    <div className="flex gap-2 items-center ">
      <img
        className="w-[25px] h-[25px]"
        src="https://cdn.discordapp.com/attachments/510829749065744405/1212675542067707904/Outline.png?ex=65f2b31b&is=65e03e1b&hm=f5dd72878a8d7aef140aa3011e1b974618a1f758caa2fc496b15c374cb990abe&"
        alt=""
      />
      <div className="flex flex-col w-fit ">
        <label htmlFor="Pick-Up-Date">
          <p className="text-[12px] opacity-80">Pick Up Date</p>
        </label>
        <input
          type="date"
          className="w-fit max-w-[130px] dateInput outline-none relative "
        />
      </div>
    </div>
  );
}
