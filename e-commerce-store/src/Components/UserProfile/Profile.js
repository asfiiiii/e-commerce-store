import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { updateUserAddress } from "../../store/userApi";
const ProfilePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user.currentUser);
  const checkedUser = useSelector((state) => state.users.checkedUsers);

  const removeAddressHandler = (e, index) => {
    const newAddress = { ...user, addresses: [...user.addresses] };
    newAddress.addresses.splice(index, 1);
    dispatch(updateUserAddress(newAddress));
  };

  const showFormHandler = () => {
    setShowForm((prevState) => !prevState); // Toggle the showForm state
  };
  const showFormEditHandler = () => {
    setShowEditForm((prevState) => !prevState); // Toggle the showForm state
  };

  const editAddressHandler = (e, index) => {
    setShowEditForm((prevState) => !prevState);

    setValue("username", user.addresses[index].username);
    setValue("phone", user.addresses[index].phone);
    setValue("email", user.addresses[index].email);
    setValue("city", user.addresses[index].city);
    setValue("country", user.addresses[index].country);
    setValue("street_address", user.addresses[index].street_address);
    setValue("province", user.addresses[index].province);
    setValue("postal_code", user.addresses[index].postal_code);
    setEditIndex(index);
  };
  const onFormSubmit = (data) => {
    const newAddress = { ...user, addresses: [...user.addresses, data] };
    console.log(newAddress);
    dispatch(updateUserAddress(newAddress));
    setShowForm((prevState) => !prevState);
    reset();
  };
  const handleEditSubmit = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] };

    newUser.addresses.splice(editIndex, 1, data);
    // console.log(newUser);
    dispatch(updateUserAddress(newUser));
    setShowEditForm((prevState) => !prevState);
    reset();
  };

  const [overlayIndex, setOverlayIndex] = useState(null);

  const openOverlay = (index) => {
    setOverlayIndex(index);
  };

  const closeOverlay = () => {
    setOverlayIndex(null);
  };

  return (
    <>
      {user && (
        <div className="m-10  ">
          <div className="px-4 sm:px-0">
            <h3 className="text-3xl mb-4 font-bold leading-7 text-gray-900">
              My Account
            </h3>
            <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-gray-500">
              Personal details and Information.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Full name:
                </dt>
                <dd className="mt-1 capitalize text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.username}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Email Address:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              {/* Additional fields go here */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Saved Addresses:
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul className="">
                    {user.addresses.map((u, index) => (
                      <li
                        key={index}
                        className="flex items-center cursor-pointer justify-between divide-y divide-gray-100 rounded-md border border-gray-200 py-4 pl-4 pr-5 text-sm leading-6"
                        onClick={() => openOverlay(index)} // Attach click event listener
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <HomeIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {u.street_address},
                            </span>
                            <span className="truncate font-medium">
                              {u.city},
                            </span>
                            <span className="truncate font-medium">
                              {u.province},
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              {u.country}{" "}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col">
                          <button
                            onClick={(e) => editAddressHandler(e, index)}
                            className="font-medium my-2 text-orange-600 hover:text-orange-500"
                          >
                            Update
                          </button>
                          <button
                            href="#"
                            onClick={(e) => removeAddressHandler(e, index)}
                            className="font-medium my-2 text-orange-600 hover:text-orange-500"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                    {!showForm && (
                      <div className="flex space-x-4">
                        {/* <button
                      type="button"
                      className="flex items-center justify-center w-40 mt-10 rounded-md border bg-orange-500 px-6 py-2 text-base font-medium text-white"
                    >
                      Cancel
                    </button> */}
                        <button
                          onClick={showFormHandler}
                          className="flex items-center justify-center w-40 mt-10 rounded-md border bg-orange-500 px-6 py-2 text-base font-medium text-white"
                        >
                          Add Address
                        </button>
                      </div>
                    )}
                    {overlayIndex !== null && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md max-w-md w-full mx-5">
                          <h2 className="text-lg font-semibold mb-4">
                            Address Details
                          </h2>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex  gap-1">
                              <span className="font-semibold">
                                Street Address:
                              </span>
                              <span>
                                {user.addresses[overlayIndex].street_address}
                              </span>
                            </div>
                            <div className="flex  gap-1">
                              <span className="font-semibold">City:</span>
                              <span>{user.addresses[overlayIndex].city}</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="font-semibold">Province:</span>
                              <span>
                                {user.addresses[overlayIndex].province}
                              </span>
                            </div>
                            <div className="flex  gap-1">
                              <span className="font-semibold">Country:</span>
                              <span>
                                {user.addresses[overlayIndex].country}
                              </span>
                            </div>
                          </div>
                          {/* Close button */}
                          <button
                            onClick={closeOverlay}
                            className="mt-4 bg-gray-200 px-2 py-1 rounded-md text-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          {showForm && (
            <div className=" bg-white px-5 py-5  lg:px-10 mb-5 lg:py-6 my-4 lg:my-6">
              <form onSubmit={handleSubmit(onFormSubmit)}>
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
                  {showForm && (
                    <button
                      onClick={showFormHandler}
                      type="submit"
                      className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                      Cancle
                    </button>
                  )}
                  <button
                    type="submit"
                    className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          )}
          {showEditForm && (
            <div className=" bg-white px-5 py-5  lg:px-10 mb-5 lg:py-6 my-4 lg:my-6">
              <form onSubmit={handleSubmit(handleEditSubmit)}>
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
                  {showEditForm && (
                    <button
                      onClick={showFormEditHandler}
                      type="submit"
                      className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                      Cancle
                    </button>
                  )}
                  <button
                    type="submit"
                    // onClick={(e) => handleEditSubmit(e, index)}
                    className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
