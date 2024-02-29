"use client"; //remove this when using
import React, { useState } from "react";

export default function NotificationBlock2() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    isOpen && (
      <div className="p-2.5 bg-white flex max-w-[350px] justify-between items-start w-full">
        <article>
          <h1 className="text-base font-bold">Reservation confirmed.</h1>
          <p className="text-sm  font-semibold pb-2.5">
            CBI-2345{" "}
            <span className="opacity-80">
              vehicle has been allocated for your reservation.
            </span>
          </p>
          <p className="text-sm opacity-50 font-bold">14 hours ago</p>
        </article>
        <button onClick={() => setIsOpen(false)}>
          <img
            className="w-[15px]"
            src="https://cdn.discordapp.com/attachments/510829749065744405/1212781248335061052/action.png?ex=65f3158d&is=65e0a08d&hm=240bf3a4d0bd9cc86ae8de73ad68a3bc38d1153e052c30e30019917182a4f4f9&"
            alt=""
          />
        </button>
      </div>
    )
  );
}
