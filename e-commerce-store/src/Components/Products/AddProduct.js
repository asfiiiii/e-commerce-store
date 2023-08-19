import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { createNewProduct } from "../../store/productsApi";
function AddProduct() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedUsers);

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const product = { ...data };
    product.images = [product.image1, product.image2, product.image3];
    product.rating = 0;
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    product.price = +product.price;
    product.discountPercentage = +product.discountPercentage;
    product.stock = +product.stock;
    console.log(product);
    dispatch(createNewProduct(product));
    reset();
  };
  const brands = useSelector((state) => state.products.brands);
  const category = useSelector((state) => state.products.category);
  return (
    <>
      {" "}
      {user && user.role !== "admin" && <Navigate to="/proDetails" />}
      <div className=" bg-white px-5 lg:px-10 py-4 lg:py-6 my-4 lg:my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h4 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-6">
                Add Product
              </h4>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please Provide all relevent information
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="title"
                      {...register("title", {
                        required: "Title Required",
                      })}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price  Required",
                        min: 0,
                      })}
                      id="price"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="discount"
                      {...register("discountPercentage", {
                        required: "Discount Percentage Required",
                        min: 0,
                        max: 100,
                      })}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.discountPercentage && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock quantity Required",
                        min: 0,
                      })}
                      id="stock"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.stock && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      {...register("description", {
                        required: "Description Required",
                      })}
                      type="text"
                      autoComplete="description"
                      className="block w-full rounded-md border py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <select
                      id="brand"
                      {...register("brand", { required: "brand Required" })}
                      autoComplete="brand-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {brands.map((brand) => (
                        <option value={brand.label}>{brand.value}</option>
                      ))}
                    </select>
                  </div>
                  {errors.brand && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    quantity
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      {...register("category", {
                        required: "Quantity Required",
                      })}
                      autoComplete="category-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {category.map((qty) => (
                        <option value={qty.label}>{qty.value}</option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail Image
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "Image Required",
                      })}
                      id="thumbnail"
                      autoComplete="thumbnail"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image(1)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("image1", { required: "Image required" })}
                      id="image1"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image1 && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.image1.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image(2)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("image2", { required: "Image required" })}
                      id="image2"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image2 && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.image2.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image(3)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("image3", { required: "Image required" })}
                      id="image3"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image3 && (
                    <p className="text-red-500 mt-1 text-xs">
                      {errors.image3.message}
                    </p>
                  )}
                </div>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
