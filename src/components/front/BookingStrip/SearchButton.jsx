import React from "react";

export default function SearchButton() {
  return (
    <button className="text-white bg-[#283280] py-2.5 px-5 w-fit rounded-full text-sm flex gap-2 items-center font-semibold">
      <img
        className="w-[24px] h-[24px]"
        src="https://cdn.discordapp.com/attachments/510829749065744405/1212675542310985728/search.png?ex=65f2b31b&is=65e03e1b&hm=9b6b795c190dabf032d0aef5d367e6a8363935f50b7fb92b290376db52d41d60&"
        alt=""
      />
      Search
    </button>
  );
}
