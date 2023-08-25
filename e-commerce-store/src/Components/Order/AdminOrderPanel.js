import { Fragment, useState } from "react";
import { useEffect } from "react";
import orderImage from "./empty_order.png";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  fetchAllOrders,
  updateOrderDetails,
  fetchSortedOrderstData,
  // fetchSortedOrdertDataByStatus,
} from "../../store/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const sortOptions = [
  // { name: "Top to Bottom", _sort: "id", _order: "asc", current: false },
  // { name: "Bottom to Top", _sort: "id", _order: "desc", current: false },
  {
    name: "SubTotal: Low to High",
    _sort: "totalAmount",
    _order: "asc",
    current: false,
  },
  {
    name: "SubTotal: High to Low",
    _sort: "totalAmount",
    _order: "desc",
    current: false,
  },
];
const statusSortOptions = [
  { name: "Pending", value: "Pending" },
  { name: "Placed", value: "Placed" },
  { name: "Dispatched", value: "Dispatched" },
  { name: "Delivered", value: "Delivered" },
  { name: "Cancelled", value: "Cancelled" },
];

export default function Products() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const dispatch = useDispatch();

  const [editOrderId, setEditOrderId] = useState(-1);
  const [filterData, setFilterData] = useState({});

  const user = useSelector((state) => state.users.loggedUsers);
  const orders = useSelector((state) => state.admin.orders);
  console.log(orders);
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const editHandler = (order) => {
    setEditOrderId(order.id);
  };
  const updateStatusHandler = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    console.log(updatedOrder);
    dispatch(updateOrderDetails(updatedOrder));
    setEditOrderId(-1);
  };

  function setColor(status) {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600 ";
      case "Cancelled":
        return "bg-red-200 text-red-600 ";
      case "Dispatched":
        return "bg-yellow-200 text-yellow-600 ";
      case "Placed":
        return "bg-blue-200 text-blue-600 ";
      case "Delivered":
        return "bg-green-200 text-green-600 ";
      default:
        return "bg-purple-200 text-purple-600 ";
    }
  }

  const sortHandler = (e, option) => {
    const newFilter = {
      ...filterData,
      _sort: option._sort,
      _order: option._order,
    };
    setFilterData(newFilter);
    dispatch(fetchSortedOrderstData(newFilter));
  };
  const statusSortHandler = (e, option) => {
    const newFilter = option.value;
    console.log(newFilter);

    dispatch(fetchSortedOrderstData({ status: newFilter }));
  };
  return (
    <>
      {" "}
      {user && !user.role === "admin" && <Navigate to="/" />}
      <>
        {/* component */}
        <div className="overflow-x-auto">
          <div className="min-w-screen min-h-screen bg-gray-100 flex  justify-center font-sans overflow-hidden">
            <div className="w-full ">
              <div className="flex items-center justify-end">
                <div className="flex mx-2">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Orders Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e) => sortHandler(e, option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="flex mx-2">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Status Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {statusSortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  onClick={(e) => statusSortHandler(e, option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order#</th>
                      <th className="py-3 px-6 text-left">Details</th>
                      <th className="py-3 px-6 text-center">Major Address</th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light h-8">
                    {orders &&
                      orders.map((order, index) => (
                        <tr className="border-b border-gray-300 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 48 48"
                                  style={{ fill: "#000000" }}
                                >
                                  <path
                                    fill="#80deea"
                                    d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                                  />
                                  <path
                                    fill="#80deea"
                                    d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                                  />
                                  <path
                                    fill="#80deea"
                                    d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                                  />
                                  <circle
                                    cx={24}
                                    cy={24}
                                    r={4}
                                    fill="#80deea"
                                  />
                                </svg>
                                {/* <XMarkIcon /> */}
                              </div>
                              <span className="font-medium">{++index}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-left">
                            <div className="flex border-b mb-5 mt-2  border-gray-200 hover:bg-gray-100  items-center justify-between ">
                              <div className="flex mb-1  text-lg">
                                <strong className="mr-2 font-semibold">
                                  Customer Name:
                                </strong>
                                <span>{order.selectedAddress.username}</span>
                              </div>
                              <div className="flex mb-1  text-md">
                                <strong className="mr-1 font-semibold">
                                  Items:
                                </strong>
                                <span>{order.totalQuantity}</span>
                              </div>
                            </div>
                            {order.items.map((item) => (
                              <div className="flex my-2 items-center">
                                <div className="mr-5">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    alt={item.product.title}
                                    src={item.product.thumbnail}
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <div
                                    className="mr-5"
                                    style={{ flex: "0 0 264px" }}
                                  >
                                    <span>{item.product.title}</span>
                                  </div>
                                  <div className="flex">
                                    <strong className="mr-1">Qty: </strong>{" "}
                                    {item.quantity}
                                  </div>
                                  <div className="flex mx-4">
                                    <strong className="mr-1">Price: </strong> $
                                    {item.product.price * item.quantity}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="flex items-center justify-between ">
                              <div className="flex   mt-6 text-lg">
                                <strong className="mr-1 font-semibold">
                                  Subtotal:
                                </strong>
                                <span>${order.totalAmount}</span>
                              </div>
                              <div className="flex   mt-6 text-md">
                                <strong className="mr-1 font-semibold">
                                  Payment Method:
                                </strong>
                                <span>{order.paymentMethod}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <p>
                                {" "}
                                {order.selectedAddress.city},{" "}
                                {order.selectedAddress.postal_code},{" "}
                                <b> {order.selectedAddress.country}</b>
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            {order.id === editOrderId ? (
                              <select
                                value={order.status}
                                onChange={(e) => updateStatusHandler(e, order)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Placed">Placed</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${setColor(
                                  order.status
                                )} py-1 px-3 rounded-full font-semibold text-md`}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  onClick={(e) => editHandler(order)}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div>
                  {orders.length === 0 && (
                    <div className="flex flex-col items-center mt-3 col-span-full">
                      <img
                        src={orderImage}
                        alt="Empty Order"
                        className="mt-4"
                        style={{ width: "260px" }}
                      />
                      <p className="mt-3 mb-12 text-lg text-center text-gray-600 font-bold">
                        No Such Orders
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
