import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { ColorRing } from "react-loader-spinner";
import { FaChevronRight } from "react-icons/fa";
import Pagination from "../Pagination";
import noProduct from "./noProduct.png";
import { FaArrowDown } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

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

const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductstData());
    dispatch(fetchCategory());
    dispatch(fetchBrand());
  }, [dispatch]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    category: "",
    brand: "",
    show: false,
  });
  const [page, setPage] = useState(1);
  const [removeSort, setRemoveSort] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const inputHandler = (brand) => {
    setSelectedBrand(brand);
    const newFilter = { ...filterData, brand: brand.value, show: true };

    setFilterData(newFilter);
    console.log(newFilter);
    setRemoveSort(true);
    dispatch(fetchFilteredProductstData(newFilter));
  };

  const sortMajor = (category) => {
    const newFilter = {
      ...filterData,
      category: category.value,
      show: true,
    };
    console.log(newFilter);
    setFilterData(newFilter);
    setRemoveSort(true);

    dispatch(fetchFilteredProductstData(newFilter));
  };

  const sortHandler = (e, option) => {
    const newFilter = {
      ...filterData,
      _sort: option._sort,
      _order: option._order,
    };
    setFilterData(newFilter);
    setRemoveSort(true);
    dispatch(fetchFilteredProductstData(newFilter));
  };

  const handleRemoveFilter = () => {
    setRemoveSort(false);
    setSelectedBrand(null);
    setFilterData({ category: "", brand: "", show: false });
    dispatch(fetchProductstData());
  };

  const pageHandler = (newPage) => {
    setPage(newPage);
    // const pagination = { _page: page, _item: 6 };
    // dispatch(fetchFilteredProductstData(pagination));
  };

  const productsData = useSelector((state) => state.products.products);
  const brands = useSelector((state) => state.products.brands);
  const category = useSelector((state) => state.products.category);
  const isLoading = useSelector((state) => state.products.isLoading);

  return (
    <>
      <div className="relative overflow-hidden bg-white mb-12">
        <div className="pb-80 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-24">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Summer styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, "hero")}
                  className="inline-block font-serif rounded-md border border-transparent bg-orange-600 px-4 md:px-8 py-3 text-center font-bold text-white hover:bg-orange-700"
                >
                  Check Apparel{" "}
                  <FaArrowDown className="inline-block h-5 w-5 mb-1 ml-1 text-white align-middle" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="hero" className="bg-white ">
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
                      <h2 className="text-lg font-semibold text-gray-900">
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
                        {category.map((category) => (
                          <li key={category.id}>
                            <p
                              onClick={(e) => sortMajor(category)}
                              className="block px-2 py-3"
                            >
                              {category.label}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-5 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-bold text-slate-600">
                                  Brands
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
                            {/* screen filters */}
                            <Disclosure.Panel className="pt-6 ">
                              <div className="space-y-4">
                                {brands.map((brand) => (
                                  <div
                                    className="flex items-center"
                                    key={brand.value}
                                  >
                                    <input
                                      name="brand"
                                      type="radio"
                                      checked={selectedBrand === brand}
                                      onChange={() => inputHandler(brand)}
                                      className="h-4 w-4 rounded-full border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                      id={`brand-${brand.value}`} // Add id to the input
                                    />

                                    <label
                                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                                      htmlFor={`brand-${brand.value}`}
                                    >
                                      {brand.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Main Screen */}
          <main className="mx-auto shadow-lg max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
              <h1 className="text-3xl font-extrabold tracking-tight text-orange-500">
                <FaUmbrellaBeach className=" inline-block text-2xl md:text-3xl mb-2 mr-1 text-orange-500" />{" "}
                Summer Sales
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort By
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
                  <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {/* Categories */}
                    {category.map((category) => (
                      <li key={category.id}>
                        <p
                          className="cursor-pointer capitalize font-bold font-serif"
                          onClick={() => sortMajor(category)}
                        >
                          {category.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                  {/* screen filters */}

                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-bold text-slate-600">
                              Brands
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <FaChevronDown
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              ) : (
                                <FaChevronUp
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        {/* screen filters */}
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {brands.map((brand) => (
                              <div
                                className="flex items-center"
                                key={brand.value}
                              >
                                <input
                                  name="brand"
                                  type="radio"
                                  checked={selectedBrand === brand}
                                  onChange={() => inputHandler(brand)}
                                  className="h-4 w-4 rounded-full border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                  id={`brand-${brand.value}`} // Add id to the input
                                />

                                <label
                                  className="ml-3 text-sm text-gray-600 cursor-pointer"
                                  htmlFor={`brand-${brand.value}`}
                                >
                                  {brand.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="">
                    <div className="flex items-center justify-between ">
                      {/* {sortInfo.show && (
                        <div className="text-lg capitalize text-center font-normal tracking-tight text-slate-500">
                          {sortInfo.id}{" "}
                          <FaChevronRight className="inline-block h-3 w-3 mb-1 mr-1 text-gray-500 align-middle" />
                          {sortInfo.value}
                        </div>
                      )} */}
                      {filterData.show && (
                        <div className="text-lg capitalize text-center font-normal tracking-tight text-slate-500">
                          {filterData.category}{" "}
                          <FaChevronRight className="inline-block h-3 w-3 mb-1 mr-1 text-gray-500 align-middle" />
                          {filterData.brand}
                        </div>
                      )}
                      {removeSort && (
                        <div className=" max-w-2xl px-2 py-4 sm:px-4 sm:py-2 lg:max-w-7xl  flex items-center justify-between">
                          <button
                            className="px-4 py-2 text-sm flex items-center font-medium text-gray-500 hover:text-orange-500 focus:outline-none ml-auto"
                            onClick={handleRemoveFilter}
                          >
                            <FunnelIcon className="w-5 h-5 mr-2" />
                            Remove Filter
                          </button>
                        </div>
                      )}
                    </div>

                    {isLoading && (
                      <div className="flex w-full  flex-col items-center justify-center z-50">
                        <div className="w-24 h-24  flex items-end">
                          {" "}
                          {/* Adjust the size here */}
                          <ColorRing
                            visible={true}
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                              "#e15b64",
                              "#f47e60",
                              "#f8b26a",
                              "#abbd81",
                              "#849b87",
                            ]}
                          />
                        </div>
                        <p className=" text-gray-400">Loading...</p>
                      </div>
                    )}
                    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {productsData.length === 0 ? (
                          <div className="flex flex-col items-center justify-center col-span-full">
                            <img
                              className="w-46  mt-8 h-42 md:max-w-sm"
                              src={noProduct}
                              alt="no Product"
                            />
                            <p className="mt-2 text-center text-2xl ml-7 font-semibold text-gray-500">
                              No such item.
                            </p>
                          </div>
                        ) : (
                          productsData.map(
                            (product) =>
                              !product.isDeleted && (
                                <Link
                                  key={product.id}
                                  to={`/prodDetails/${product.id}`}
                                >
                                  <div
                                    key={product.id}
                                    className="group relative  shadow-sm p-4"
                                  >
                                    <h2 className=" text-center text-sm font-semibold text-orange-600 border-b font-serif mb-2">
                                      Summer Saphire
                                    </h2>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                      <img
                                        src={product.thumbnail}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                      />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                      <div>
                                        <h3 className="text-sm font-bold font-serif capitalize text-gray-700">
                                          <div href={product.href}>
                                            {product.title}
                                          </div>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 flex items-center">
                                          <FaStar className="inline-block h-4 w-4  mr-1 text-yellow-400 align-middle" />
                                          <span className="text-500 mr-1">
                                            {product.rating}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="text-sm font-medium font-mono text-gray-900">
                                        <p className="text-gray-500 mb-1 line-through">
                                          ${product.price}
                                        </p>
                                        $
                                        {(
                                          product.price -
                                          product.price *
                                            (product.discountPercentage / 100)
                                        ).toFixed(0)}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Pagination
              pageHandler={pageHandler}
              page={page}
              setPage={setPage}
              totalItems={20}
            />
          </main>
        </div>
      </div>
    </>
  );
}
