import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap  justify-between">
          <div className="w-full flex flex-col max-w-[340px]">
            <img
              className="w-[200px]"
              src="https://cdn.discordapp.com/attachments/510829749065744405/1212706118409920552/VH-Type_1.png?ex=65f2cf95&is=65e05a95&hm=1201b2fd5be058ebf7c8c79c84ad477743ebcb55a2e6ed310365c0e8ac9ca049&"
              alt=""
            />
            <p className="mt-2 opacity-50">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
            <p className="text-[12px] mt-4">
              © 2023 SprintSphere. All Rights Reserved
            </p>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row sm:justify-end w-full md:w-auto mt-3">
            <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
              Vehicle Fleet
            </a>
            <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
              FAQ
            </a>
            <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
              Contact
            </a>
          </div>
          <div className="mt-4 flex justify-center md:justify-end space-x-4 w-full">
            <p>Reach us on:</p>
            <a href="#" className="text-white hover:text-gray-300">
              <span className="">Facebook</span>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <span className="">Instagram</span>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <span className="">Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
