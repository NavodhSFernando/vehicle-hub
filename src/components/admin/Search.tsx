import React from "react";
import CreateButton from "./CreateButton";
import Datepicker from "./BookingStrip/Datepicker";
import TimePicker from "./BookingStrip/TimePicker";
import SearchButton from "./BookingStrip/SearchButton";
import BookingStrip from "./BookingStrip/BookingStrip";
import BookNowCard from "./BookNowCard";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Table1 from "./Table1";
import NotificationBlock from "./NotificationBlock";
import NotificationBlock2 from "./NotificationBlock2";
import NavBarSide from "./NavBarSide";

export default function Search() {
  return (
    <>
      <div className=" flex flex-col gap-5 bg-[#4B4B4B] py-20">
        <input
          type="text"
          placeholder="Search"
          className="px-5 py-2 w-fit rounded-lg placeholder:text-sm"
        />
      </div>
    </>
  );
}
