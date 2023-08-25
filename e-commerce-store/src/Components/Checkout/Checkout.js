import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserAddress } from "../../store/userApi";
import { createNewOrder } from "../../store/orderApi";
import { fetchCartbyId } from "../../store/cartApi";

export default function CheckoutDetails() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userAddress, setUserAddress] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const showCartHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cart);
  const orderSuccess = useSelector((state) => state.order.currentOrder);

  useEffect(() => {
    dispatch(fetchCartbyId(user.id));
  }, [dispatch, user]);

  const totalAmount = cart.reduce((amount, currentItem) => {
    return amount + currentItem.product.price * currentItem.quantity;
  }, 0);
  const totalQuantity = cart
    .map((item) => +item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  const onSubmit = (data) => {
    // Check if user.addresses is an array, and if not, initialize it as an empty array

    const updatedUser = { ...user, addresses: [...user.addresses, data] };
    console.log(updatedUser);
    dispatch(updateUserAddress(updatedUser));
    // reset();
  };

  const paymentHandler = (e) => {
    setPaymentMethod(e.target.value);
  };
  const addressHandler = (e) => {
    setUserAddress(user.addresses[e.target.value]);
    console.log(userAddress);
  };

  const orderHandler = (e) => {
    e.preventDefault();
    const order = {
      items: [...cart],
      user: user.id,
      selectedAddress: userAddress,
      paymentMethod,
      status: "Pending",
      totalAmount,
      totalQuantity,
    };
    dispatch(createNewOrder(order));
    console.log(order);
  };
  console.log(orderSuccess);
  return (
    <>
      {!user && <Navigate to="/auth/login" />}
      {orderSuccess && <Navigate to={`/orderSuccess/${orderSuccess.id}`} />}
      <div className="mx-auto w-4/5 lg:w-4/5">
        <div className="fixed top-4 right-5 transition-opacity opacity-100 lg:hidden">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={showCartHandler}
          >
            Show Cart
          </button>
        </div>

        {/* <div className=" gap-x-8 gap-y-10 "> */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
          <div className="lg:col-span-3  my-2 lg:my-5">
            <div className=" bg-white px-5 lg:px-10 py-4 lg:py-6 my-4 lg:my-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h4 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-6">
                      Add new address
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="name"
                            {...register("username", {
                              required: "Username Required",
                            })}
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.username && (
                          <p className="text-red-500 mt-1 text-xs">
                            {errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "Phone number Required",
                            })}
                            id="phone"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 mt-1 text-xs">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email Required",

                              pattern: {
                                value:
                                  /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g,
                                message: "Valid Email is required",
                              },
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 mt-1 text-xs">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country")}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="Pakistan">Pakistan</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street_address")}
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city")}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="province"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("province")}
                            id="province"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("postal_code")}
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  {/* <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button> */}
                  <button
                    type="submit"
                    className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
            <div className=" bg-white p-6 lg:p-10 my-4 lg:my-3">
              <form onSubmit={orderHandler}>
                <div className="space-y-12">
                  <h5 className="text-2xl md:text-2xl lg:text-1xl font-bold mb-6 md:mb-10">
                    Checkout Form
                  </h5>

                  <ul className="divide-y divide-gray-100 border px-5 border-solid border-gray-100">
                    {user.addresses &&
                      user.addresses.map((addrs, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              id={addrs.postal_code}
                              name="adress"
                              type="radio"
                              onChange={addressHandler}
                              value={index}
                              className="h-4 w-4 my-auto mr-2 border-gray-300 text-orange-600 focus:ring-orange-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {addrs.username}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Adress: {addrs.street_address}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Postal Code: {addrs.postal_code}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Phone: {addrs.phone}
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {addrs.city}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Payment Method
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Select the method you want to pay with.
                    </p>

                    <div className="mt-2 space-y-10">
                      <fieldset>
                        <div className="mt-6 space-y-6">
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="cash"
                                name="payment"
                                type="radio"
                                value="cash"
                                checked={paymentMethod === "cash"}
                                onChange={paymentHandler}
                                className="h-4 w-4 my-auto mr-2 border-gray-300 text-orange-600 focus:ring-orange-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="cash"
                                className="font-medium text-gray-900"
                              >
                                Cash on delivery
                              </label>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="Card payment"
                                name="payment"
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={paymentHandler}
                                className="h-4 w-4 my-auto mr-2 border-gray-300 text-orange-600 focus:ring-orange-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="Card payment"
                                className="font-medium text-gray-900"
                              >
                                Card payment
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/* <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Push Notifications
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset> */}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* media queires */}
          <div className="lg:col-span-2">
            <div className="mx-4  md:mx-8 lg:mx-4 mt-6 lg:mt-8 max-w-7xl px-1 sm:px-2 lg:px-0 hidden lg:block">
              <h4 className="text-2xl md:text-2xl lg:text-3xl mt-14 font-bold mb-6 md:mb-6">
                Your Cart
              </h4>
              <div className="mx-4 md:mx-8 lg:mx-2 mt-6 lg:mt-8 max-w-7xl px-4 sm:px-3 lg:px-0">
                <div className="mx-auto max-w-7xl px-4 sm:px-3 mt-11 lg:px-0">
                  <div className="flow-root">
                    <ul className="-my-4 md:-my-6 divide-y divide-gray-200">
                      {cart.map((item) => (
                        <li key={item.id} className="flex py-4 md:py-6">
                          <div className="h-8 w-8 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-2 md:ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.href}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-2 md:ml-4">
                                  ${item.product.price}
                                </p>
                              </div>
                              <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                                <p className="mt-1 text-xs md:text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                                <div className="flex items-center justify-between mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                                  <p>Qty {item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mx-auto mt-8 md:mt-12 max-w-7xl px-4 sm:px-3 lg:px-1">
                  <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalQuantity} Items</p>
                  </div>
                  <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <p className="mt-1 text-xs md:text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-4 md:mt-6">
                    <Link
                      to={"/cart"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-orange-400  px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-white shadow-sm hover:bg-orange-500"
                    >
                      Go back to cart
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
            </div>
          </div>

          <div className="mx-4 md:mx-8 lg:mx-4 mt-6 lg:mt-8 max-w-7xl px-4 sm:px-6 lg:px-2 lg:hidden">
            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                              <div className="flex items-start justify-between">
                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                  Shopping cart
                                </Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-8">
                                <div className="flow-root">
                                  <ul className="-my-6 divide-y divide-gray-200">
                                    {cart.map((item) => (
                                      <li key={item.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>{item.product.title}</h3>
                                              <p className="ml-4">
                                                ${item.product.price}
                                              </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                              {item.product.brand}
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                              Qty {item.quantity}
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div className="flex justify-between mt-2 text-base font-medium text-gray-900">
                                <p>Total Items</p>
                                <p>{totalQuantity} Itmes</p>
                              </div>
                              <div className="flex justify-between mt-2 text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${totalAmount}</p>
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                              </p>
                              <div className="mt-6">
                                <Link
                                  to="/cart"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                                >
                                  Back to Cart
                                </Link>
                              </div>
                              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                  or
                                  <button
                                    type="button"
                                    className="font-medium ml-4 text-orange-500 hover:text-orange-400"
                                    onClick={() => setOpen(false)}
                                  >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
    </>
  );
}
