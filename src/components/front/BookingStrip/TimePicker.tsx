import React from "react";

export default function TimePicker() {
  return (
    //add this css code
    // .dateInput::-webkit-calendar-picker-indicator {
    //   opacity: 0;
    //   width: 100%;
    //   position: absolute;
    // }
    <div className="flex gap-2 items-center">
      <img
        className="w-[25px] h-[25px]"
        src="https://cdn.discordapp.com/attachments/510829749065744405/1212675541820375060/clock.png?ex=65f2b31b&is=65e03e1b&hm=af68be2c65e26c43a2d6fad94d66b4cce344b05b627697a64fb783a5c2068ee0&"
        alt=""
      />
      <div className="flex flex-col w-fit">
        <label htmlFor="Pick-Up-Date">
          <p className="text-[12px] opacity-80">Pick Up Time</p>
        </label>
        <input
          type="time"
          className="w-fit max-w-[120px] dateInput outline-none relative"
          value="10:00:00"
        />
      </div>
    </div>
  );
}
