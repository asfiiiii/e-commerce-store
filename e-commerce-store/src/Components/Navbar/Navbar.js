import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../logo.png"; // Adjust the path accordingly
import { Link } from "react-router-dom";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Home", href: "/prodDetails", current: true },
  { name: "Seasonal", href: "#", current: false },
  { name: "Vouchers", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
const adminNavigation = [
  { name: "Products", href: "/prodDetails", current: true },
  { name: "Dashboard", href: "/admin/products", current: false },
  { name: "Orders", href: "/admin/orderPanel", current: false },
];
const authNavigation = [
  { name: "Login", to: "/auth/login", current: false },
  { name: "Signup", to: "/auth/signup", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "/userProfile" },
  { name: "My Orders", href: "/userOrder" },
  { name: "Sign out", href: "/auth/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(props) {
  const loggedUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cart);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {" "}
                      <img
                        className="h-11 w-13 mb-2"
                        // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                    <Link to={"/prodDetails"}>
                      <h1 className="text-2xl font-bold tracking-tight text-orange-400">
                        PrimePlus
                      </h1>
                    </Link>

                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {loggedUser && loggedUser.role === "admin"
                          ? adminNavigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? false : true}
                              >
                                {item.name}
                              </Link>
                            ))
                          : navigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    {loggedUser ? (
                      <div className="ml-4 flex items-center md:ml-6">
                        {loggedUser && loggedUser.role === "admin" && (
                          <span className="inline-flex items-center rounded-md bg-red-50 mr-2 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            Admin
                          </span>
                        )}
                        <Link
                          type="button"
                          to={"/cart"}
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>

                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>
                        {cart && cart.length > 0 && (
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 mb-6 -ml-2 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {cart && cart.length}
                          </span>
                        )}
                        {/* Profile dropdown */}(
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        )
                      </div>
                    ) : (
                      <div class=" text-white">
                        <div class="space-x-4">
                          {authNavigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {loggedUser && loggedUser.role === "admin"
                    ? adminNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))
                    : navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                </div>
                {loggedUser ? (
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex justify-between items-center px-5">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {loggedUser.username}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {loggedUser.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {loggedUser && loggedUser.role === "admin" && (
                          <span className="inline-flex items-center  rounded-md bg-red-50 ml-4 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            Admin
                          </span>
                        )}
                        <Link
                          type="button"
                          to={"/cart"}
                          className="relative  flex-shrink-0 rounded-full bg-gray-800 ml-1 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>

                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Link>

                        {cart && cart.length > 0 && (
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 mb-6 -ml-2 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {cart && cart.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {authNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow"></header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
}
