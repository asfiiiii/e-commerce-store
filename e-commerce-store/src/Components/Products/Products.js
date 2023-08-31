import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination";
import noProduct from "./noProduct.png";
import { useEffect } from "react";
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
  ArrowRightIcon,
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
const subCategories = [
  { value: "Smartphones", category: "smartphones" },
  { value: "Laptops", category: "laptops" },
  { value: "Fragrances", category: "fragrances" },
  { value: "Merchs", category: "home-decoration" },
  { value: "Laptop Sleeves", category: "laptops" },
];

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
  const [sortInfo, setSortInfo] = useState({ id: "", value: "", show: false });
  const [filterData, setFilterData] = useState({});
  const [page, setPage] = useState(1);
  const [removeSort, setRemoveSort] = useState(false);
  const inputHandler = (e, section, option) => {
    const newFilter = { ...filterData };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
      setSortInfo((prev) => ({
        ...prev,
        id: section.id,
        value: option.value,
        show: true,
      }));
    } else {
      delete newFilter[section.id];
      setSortInfo({
        id: "",
        value: "",
        show: false,
      });
    }

    setFilterData(newFilter);
    console.log(newFilter);
    setRemoveSort(true);
    dispatch(fetchFilteredProductstData(newFilter));
  };

  const sortMajor = (category) => {
    const newFilter = {
      ...filterData,
      category: category,
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

  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
      checked: false,
    },
    {
      id: "category",
      name: "Category",
      options: category,
      checked: false,
    },
  ];

  return (
    <>
      {!productsData && <p>loading...</p>}
      {productsData && (
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
                            <li key={category.id}>
                              <p
                                onClick={(e) => sortMajor(category.category)}
                                className="block px-2 py-3"
                              >
                                {category.value}
                              </p>
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
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
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
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
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
                <h1 className="text-3xl font-extrabold tracking-tight text-orange-400">
                  Summer Sales
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
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.id}>
                          <p
                            className="cursor-pointer"
                            onClick={(e) => sortMajor(category.category)}
                          >
                            {category.value}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {/* screen filters */}
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
                            {/* screen filters */}
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
                      {removeSort && (
                        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 flex items-center justify-between">
                          <button
                            className="px-4 py-2 text-sm flex items-center font-medium text-gray-500 hover:text-orange-500 focus:outline-none ml-auto"
                            onClick={handleRemoveFilter}
                          >
                            <FunnelIcon className="w-5 h-5 mr-2" />
                            Remove Filter
                          </button>
                        </div>
                      )}

                      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                        {sortInfo.show && (
                          <div className="text-2xl font-bold tracking-tight text-gray-900">
                            Showing results of {sortInfo.id}{" "}
                            <ArrowRightIcon className="inline-block h-4 w-4 text-gray-500 align-middle" />
                            {sortInfo.value}
                          </div>
                        )}

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {productsData.map(
                            (product) =>
                              !product.isDeleted && (
                                <Link
                                  key={product.id}
                                  to={`/prodDetails/${product.id}`}
                                >
                                  <div
                                    key={product.id}
                                    className="group relative"
                                  >
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                      <img
                                        src={product.thumbnail}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                      />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                      <div>
                                        <h3 className="text-sm font-semibold text-gray-700">
                                          <div href={product.href}>
                                            {product.title}
                                          </div>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 flex items-center">
                                          <StarIcon className="text-yellow-500 w-4 h-4 mr-1" />
                                          <span className="text-500 mr-1">
                                            {product.rating}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="text-sm font-medium text-gray-900">
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
                          )}
                          {productsData.length === 0 && (
                            <div className="flex flex-col items-center justify-center col-span-full">
                              <img
                                className="w-46  mt-8 h-42 md:max-w-sm lg:max-w-md"
                                src={noProduct}
                                alt="no Product"
                              />
                              <p className="mt-2 text-center text-2xl ml-7 font-semibold text-gray-500">
                                No such item.
                              </p>
                            </div>
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
      )}
    </>
  );
}
