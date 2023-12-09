import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAfterOrder } from "../store/cartApi";
import Confetti from "react-confetti"; // Import Confetti component

function OrderSuccess() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(resetCartAfterOrder(user.id));
  }, [dispatch, user]);

  return (
    <main className="grid min-h-screen place-items-center bg-white px-4 md:px-8 py-16 sm:py-32">
      <div className="text-center">
        <p className="text-base font-semibold text-orange-600 mb-2">
          Order Placed Successfully
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Order # 0{params.id}
        </h1>
        <p className="mt-4 text-base leading-6 text-gray-600">
          To check your placed orders, please visit Account &rarr; My Account
          &rarr; Orders
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Link
            to="/prodDetails"
            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-200"
          >
            Go back home
          </Link>
        </div>
      </div>
      <Confetti gravity={0.1} initialVelocityY={3} /> {/* Add Confetti */}
    </main>
  );
}

export default OrderSuccess;
