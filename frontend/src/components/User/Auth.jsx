import React from "react";
import homepage from "../../assests/images/homepage.webp";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Auth = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-screen md:w-2/3 py-8 mx-auto">
        <div className="hidden md:block bg-[url('https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png')] my-10 h-full bg-no-repeat">
          <img
            draggable="false"
            className="mr-[80px] mt-[1.8rem] ml-[155px]"
            src={homepage}
            alt="homepage"
          />
        </div>

        <div className="flex flex-col gap-3 w-full md:w-2/5">
          {children}

          <p className="text-center text-sm my-2">Get the app.</p>
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-black text-white">
              <FaApple size={22} />
              <div className="text-left">
                <p className="text-[10px]">Download on the</p>
                <p className="text-xs font-semibold">App Store</p>
              </div>
            </button>

            <button className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-black text-white">
              <FaGooglePlay size={18} />
              <div className="text-left">
                <p className="text-[10px]">Download on the</p>
                <p className="text-xs font-semibold">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
