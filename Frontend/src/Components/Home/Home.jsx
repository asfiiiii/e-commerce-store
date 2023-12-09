import React from "react";
import { Link } from "react-router-dom";
import bgImg from "./clothing-rack-with-floral-hawaiian-shirts-hangers-hat.jpg";
import sales from "./sale-banner-template-mega-deal-discount-offer_23-2148240354-ai-brush-removebg-kqo0xisb.png";
import { GiShoppingBag } from "react-icons/gi";

export default function Example() {
  const bgStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <div className="bg overflow-hidden" style={bgStyle}>
      <div className="flex py-3 px-4">
        <h1 className="text-4xl font-extrabold font-serif border-b-2 border-orange-500 pb-1 tracking-tighter">
          Prime<span className="text-orange-600">P</span>lus
          <span className="text-3xl text-orange-500 mb-0">.</span>
        </h1>
      </div>
      <div className="container  mr-3 md:mr-0 md:ml-16 mt-12 md:mt-8">
        <div className="bg-white flex flex-col items-center justify-center p-4 rounded max-w-lg shadow-xl bg-opacity-70">
          <p className="text-orange-500 shadow font-bold text-2xl md:text-4xl bg-orange-100/60 p-3 px-4 rounded-full mt-2 font-serif">
            Summers Sales are live
          </p>
          <p className="text-gray-600 text-lg md:text-xl font-serif mt-2">
            Get upto 50% off on all products
          </p>
          <Link
            to="/prodDetails"
            className="bg-orange-500 text-white text-lg font-bold shadow-md px-4 py-2 rounded-full mt-2 hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center"
          >
            Shop Now <GiShoppingBag className="ml-2" />
          </Link>

          <div className="banner-img">
            <img className=" w-[300px] h-[280px] " src={sales} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
