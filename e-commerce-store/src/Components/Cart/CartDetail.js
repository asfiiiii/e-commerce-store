import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function CartDetail() {
  return (
    <>
      {" "}
      <div className="mx-4 md:mx-8 lg:mx-60 mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10">
          Your Cart
        </h3>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            <ul role="list" className="-my-4 md:-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-4 md:py-6">
                  <div className="h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-2 md:ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-2 md:ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                      <p>Qty {product.quantity}</p>
                      <button
                        type="button"
                        className="font-medium text-orange-400  hover:text-orange-500 "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-6 md:mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$262.00</p>
          </div>
          <p className="mt-1 text-xs md:text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-4 md:mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-orange-400  px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-white shadow-sm hover:bg-orange-500"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-4 md:mt-6 flex justify-center text-center text-xs md:text-sm text-gray-500">
            <p>
              or
              <Link
                className="font-medium text-orange-400 ml-5  hover:text-orange-500 "
                to={"/"}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
