import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination";
import { useEffect } from "react";
import { deleteProduct } from "../../store/productsApi";
import {
  fetchFilteredProductstData,
  fetchProductstData,
  fetchBrand,
  fetchCategory,
} from "../../store/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, Navigate } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", _sort: "rating", _order: "desc", current: false },
  { name: "Price: Low to High", _sort: "price", _order: "asc", current: false },
  {
    name: "Price: High to Low",
    _sort: "price",
    _order: "desc",
    current: false,
  },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const deleteProductHandler = (productId) => {
    // Set the product to be deleted and show the confirmation overlay
    setProductToDelete(productId);
    setShowConfirmation(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductstData());
    dispatch(fetchCategory());
    dispatch(fetchBrand());
  }, [dispatch]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filterData, setFilterData] = useState({});

  const inputHandler = (e, section, option) => {
    const newFilter = { ...filterData, [section.id]: option.value };
    setFilterData(newFilter);
    dispatch(fetchFilteredProductstData(newFilter));
  };
  const sortHandler = (e, option) => {
    const newFilter = {
      ...filterData,
      _sort: option._sort,
      _order: option._order,
    };
    setFilterData(newFilter);
    dispatch(fetchFilteredProductstData(newFilter));
  };

  const productsData = useSelector((state) => state.products.products);
  const brands = useSelector((state) => state.products.brands);
  const category = useSelector((state) => state.products.category);
  const user = useSelector((state) => state.user.currentUser);
  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
    {
      id: "category",
      name: "Category",
      options: category,
    },
  ];

  const confirmDeleteHandler = () => {
    // Perform the actual delete action here
    // You can call an API to delete the product or update the isDeleted flag
    console.log(productToDelete);
    dispatch(deleteProduct(productToDelete));
    // After deletion, hide the confirmation overlay
    setShowConfirmation(false);
    setProductToDelete(null);
  };
  return (
    <>
      {" "}
      {user && user.role !== "admin" && <Navigate to="/" />}
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul className="px-2 py-3 font-medium text-gray-900">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
              <h1 className="text-4xl  font-size:2rem font-bold tracking-tight text-gray-900">
                Admin Panel
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
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

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={(e) =>
                                      inputHandler(e, section, option)
                                    }
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white">
                    <div className="bg-orange-100 rounded-lg p-6 shadow-md">
                      <h2 className="text-orange-700 text-xl font-bold mb-4">
                        Add New Product
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Welcome, Admin! want to add more products to your
                        catalog?
                      </p>
                      <Link
                        to="/admin/addProduct"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Create Product
                      </Link>
                    </div>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Products
                      </h2>

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productsData.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white p-4 shadow-md rounded-lg relative"
                          >
                            {/* Product Thumbnail */}
                            <div className="mb-2">
                              <img
                                src={product.thumbnail}
                                alt={product.imageAlt}
                                className="w-full h-32 object-cover object-center rounded-md"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.title}
                            </h3>
                            <p className="mt-2 text-gray-600">
                              ${product.price}
                            </p>
                            <div className="flex items-center mt-2">
                              <span className="text-yellow-500">
                                {/* You can adjust the number of stars based on the rating */}
                                ★★★★☆
                              </span>
                              <span className="ml-1 text-gray-500">
                                ({product.rating})
                              </span>
                            </div>
                            {product.isDeleted ? (
                              <p className="mt-5 text-sm text-red-700 font-semibold">
                                Product has been removed
                              </p>
                            ) : (
                              <div className="absolute bottom-0 left-0 w-full flex justify-between bg-white py-2 px-4">
                                <div className="w-1/2">
                                  <Link
                                    to={`/admin/editProduct/${product.id}`}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-2 rounded text-xs w-full text-center"
                                  >
                                    Update
                                  </Link>
                                </div>
                                <div className="w-1/2">
                                  <button
                                    onClick={(e) =>
                                      deleteProductHandler(product.id)
                                    }
                                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-xs w-full text-center"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {showConfirmation && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-6 rounded-md">
                            <p>Are you sure you want to delete this product?</p>
                            <div className="mt-4 flex justify-between">
                              <button
                                onClick={() => setShowConfirmation(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-2 rounded text-xs"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={confirmDeleteHandler}
                                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-xs"
                              >
                                Confirm Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Pagination />
          </main>
        </div>
      </div>
    </>
  );
}
