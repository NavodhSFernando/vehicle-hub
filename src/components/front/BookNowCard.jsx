<<<<<<< HEAD
import React from 'react'

export default function BookNowCard() {
    return (
        <div className="w-[300px]  rounded-md flex flex-col p-5 bg-white shadow-md rounded-lg">
            <article className="flex justify-between pb-12">
                <span>
                    <h1 className="text-xl font-bold">Toyota Aqua</h1>
                    <p className="text-base opacity-50 font-semibold">Car</p>
                </span>
                <button>
                    <img
                        className="w-[25px]"
                        src="https://cdn.discordapp.com/attachments/510829749065744405/1212697770935451678/bookmark-star.png?ex=65f2c7cf&is=65e052cf&hm=c340e44c42849cd071aa974ec242564eaf94da0ec4411a0bb4ac2ceb51c496b3&"
                        alt=""
                    />
                </button>
            </article>
            <img
                className="w-full booknowimage pb-12"
                src="https://cdn.discordapp.com/attachments/510829749065744405/1212698588078018591/CarImage.png?ex=65f2c892&is=65e05392&hm=e01df34698b6bc8aece39d1aec77ff6059ed269c4218b4f0773314c5628f9ccb&"
                alt=""
            />
            <div className="flex justify-between pb-8">
                <span className="flex gap-1 items-center">
                    <img
                        className="w-[16px]"
                        src="https://cdn.discordapp.com/attachments/510829749065744405/1212697684704501780/calendar-fill.png?ex=65f2c7ba&is=65e052ba&hm=a1e08da89aec50af337a13bce2f60d11135bc15e6003ce43b0f32da1dd8742e0&"
                        alt=""
                    />
                    <p className="text-sm opacity-50">2016</p>
                </span>
                <span className="flex gap-1 items-center">
                    <img
                        className="w-[24px]"
                        src="https://cdn.discordapp.com/attachments/510829749065744405/1212697684998094858/Car.png?ex=65f2c7ba&is=65e052ba&hm=b427286e1f70be20be8b0be340e859cff9ee881d4d787ad808db516dc67cd4a0&"
                        alt=""
                    />
                </span>
                <span className="flex gap-1 items-center">
                    <p className="text-sm opacity-50">Auto</p>
                </span>
                <span className="flex gap-1 items-center">
                    <img
                        className="w-[24px]"
                        src="https://cdn.discordapp.com/attachments/510829749065744405/1212697685241499678/profile-2user.png?ex=65f2c7ba&is=65e052ba&hm=c50ca08360d8646fac0117a9d4238859fae3f4caf1c6ec7e1033551b530448dd&"
                        alt=""
                    />
                    <p className="text-sm opacity-50">4 Persons</p>
                </span>
            </div>
            <article className="flex justify-between items-center">
                <span>
                    <h1 className="text-base font-bold">
                        Rs 10,000/<span className="text-sm opacity-50"> Day</span>
                    </h1>
                    <p className="text-sm opacity-50 font-semibold">100Km/ day</p>
                </span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Book Now
                </button>
            </article>
        </div>
    )
=======
import React from "react";

export default function BookNowCard() {
  return (
    <div className="w-[300px]  rounded-md flex flex-col p-5 bg-white">
      <article className="flex justify-between pb-12">
        <span>
          <h1 className="text-xl font-bold">Toyota Aqua</h1>
          <p className="text-base opacity-50 font-semibold">Car</p>
        </span>
        <button>
          <img
            className="w-[25px]"
            src="https://cdn.discordapp.com/attachments/510829749065744405/1212697770935451678/bookmark-star.png?ex=65f2c7cf&is=65e052cf&hm=c340e44c42849cd071aa974ec242564eaf94da0ec4411a0bb4ac2ceb51c496b3&"
            alt=""
          />
        </button>
      </article>
      <img
        className="w-full booknowimage pb-12"
        src="https://cdn.discordapp.com/attachments/510829749065744405/1212698588078018591/CarImage.png?ex=65f2c892&is=65e05392&hm=e01df34698b6bc8aece39d1aec77ff6059ed269c4218b4f0773314c5628f9ccb&"
        alt=""
      />
      <div className="flex justify-between pb-8">
        <span className="flex gap-1 items-center">
          <img
            className="w-[16px]"
            src="https://cdn.discordapp.com/attachments/510829749065744405/1212697684704501780/calendar-fill.png?ex=65f2c7ba&is=65e052ba&hm=a1e08da89aec50af337a13bce2f60d11135bc15e6003ce43b0f32da1dd8742e0&"
            alt=""
          />
          <p className="text-sm opacity-50">2016</p>
        </span>
        <span className="flex gap-1 items-center">
          <img
            className="w-[24px]"
            src="https://cdn.discordapp.com/attachments/510829749065744405/1212697684998094858/Car.png?ex=65f2c7ba&is=65e052ba&hm=b427286e1f70be20be8b0be340e859cff9ee881d4d787ad808db516dc67cd4a0&"
            alt=""
          />
        </span>
        <span className="flex gap-1 items-center">
          <p className="text-sm opacity-50">Auto</p>
        </span>
        <span className="flex gap-1 items-center">
          <img
            className="w-[24px]"
            src="https://cdn.discordapp.com/attachments/510829749065744405/1212697685241499678/profile-2user.png?ex=65f2c7ba&is=65e052ba&hm=c50ca08360d8646fac0117a9d4238859fae3f4caf1c6ec7e1033551b530448dd&"
            alt=""
          />
          <p className="text-sm opacity-50">4 Persons</p>
        </span>
      </div>
      <article className="flex justify-between items-center">
        <span>
          <h1 className="text-base font-bold">
            Rs 10,000/<span className="text-sm opacity-50"> Day</span>
          </h1>
          <p className="text-sm opacity-50 font-semibold">100Km/ day</p>
        </span>
        <button className="py-4 px-5 bg-[#283280] rounded-xl text-white">
          Book Now
        </button>
      </article>
    </div>
  );
>>>>>>> 97e009e77af32c3959a3e9575cd248305222ca98
}
