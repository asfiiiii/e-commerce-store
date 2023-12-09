import { Fragment, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, deleteItemfromCart } from "../../store/cartApi";
import { ColorRing } from "react-loader-spinner";
import { fetchCartbyId } from "../../store/cartApi";
import { useAlert } from "react-alert";
import { MdShoppingCart } from "react-icons/md";
import { MdShoppingCartCheckout } from "react-icons/md";

import emptycart from "./emptycart.png";

export default function CartDetail() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartLoaded = useSelector((state) => state.cart.cartLoaded);
  const isLoading = useSelector((state) => state.cart.isLoading);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const removeItemHandler = (e, item) => {
    e.preventDefault();
    setItemToRemove(item.id);
    setShowConfirmation(true);
  };

  useEffect(() => {
    dispatch(fetchCartbyId());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const estimatetotalAmount = cart.reduce((amount, currentItem) => {
    const discountedPrice =
      currentItem.product.price -
      currentItem.product.price *
        (currentItem.product.discountPercentage / 100);
    return amount + discountedPrice * currentItem.quantity;
  }, 0);

  const totalAmount = Math.floor(estimatetotalAmount);

  const totalQuantity = cart
    .map((item) => +item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  const quantityHandler = (e, item) => {
    e.preventDefault();
    dispatch(updateCartItem({ id: item.id, quantity: e.target.value }));
  };
  const alert = useAlert();

  const confirmRemoveHandler = () => {
    // Perform the actual removal action here
    // You can update the cart state to remove the item
    dispatch(deleteItemfromCart(itemToRemove));
    alert.info(" Item removed!");
    setShowConfirmation(false);
    setItemToRemove(null);
  };
  return (
    <>
      {" "}
      {isLoading && (
        <h3 className="text-2xl md:text-3xl flex justify-center items-center lg:text-4xl font-bold mb-8 md:mb-10">
          <div className="flex flex-col items-center justify-center z-50">
            <div className="w-24 h-24  flex items-end">
              {" "}
              {/* Adjust the size here */}
              <ColorRing
                visible={true}
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
            <p className=" text-3xl text-gray-400">Loading...</p>
          </div>
        </h3>
      )}
      {!cart && cartLoaded && <Navigate to="/prodDetails" />}
      {cartLoaded && cart && (
        <div className="mx-4 md:mx-8 lg:mx-60 mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
          {cart.length !== 0 && (
            <h3 className="text-2xl border-b pb-4 border-slate-300 text-center w-full md:text-3xl lg:text-4xl font-bold mb-8 md:mb-10">
              <MdShoppingCart className="inline-block text-orange-600 text-4xl mb-2" />{" "}
              Cart
            </h3>
          )}
          <div className="mx-auto bg-white shadow-md rounded py-4 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flow-root">
              <ul className="-my-4 md:-my-6 divide-y  divide-gray-200">
                {cart.length === 0 ? (
                  <div className="flex flex-col bg-transparent rounded-lg p-4 items-center mt-10 justify-center">
                    <img
                      src={emptycart}
                      alt="Empty Cart"
                      className="w-52 h-52"
                    />
                    <p className="text-gray-500 mt-2 font-bold">
                      Your cart is empty.
                    </p>
                  </div>
                ) : (
                  <ul className="-my-4 md:-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-4 md:py-6">
                        <div className="h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-2 md:ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                              <h3 className="font-semibold tracking-wide">
                                {item.product.title}
                              </h3>
                              <p className="ml-2 md:ml-4">
                                $
                                {(
                                  item.product.price -
                                  item.product.price *
                                    (item.product.discountPercentage / 100)
                                ).toFixed(0)}
                              </p>
                            </div>
                            <p className="mt-1 text-xs md:text-sm text-gray-500">
                              {item.product.color}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                            <div className="flex items-center">
                              <p className="text-md">Qty :</p>
                              <select
                                onChange={(e) => quantityHandler(e, item)}
                                class="text-xs ml-5 ring-orange-400 rounded-sm focus:ring-orange-500"
                                value={item.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div key={item.id}>
                              {/* Cart item display */}
                              <button
                                type="button"
                                className="font-medium text-orange-400 hover:text-orange-500"
                                onClick={(e) => removeItemHandler(e, item)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md">
                <p>Are you sure you want to remove this item from the cart?</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-1 px-2 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRemoveHandler}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-1 px-2 rounded text-xs"
                  >
                    Confirm Remove
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mx-auto mt-12 md:mt-6 max-w-7xl bg-white rounded-lg shadow-lg p-4 sm:px-4  lg:px-4">
            {cart.length !== 0 ? (
              <div>
                {" "}
                <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                  <p>Total Items:</p>
                  <p>{totalQuantity} Items</p>
                </div>
                <div className="flex justify-between mt-3 text-base md:text-lg font-medium text-gray-900">
                  <p>Subtotal: </p>
                  <p>${totalAmount}</p>
                </div>
                <p className="mt-1 text-xs md:text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-4 md:mt-6">
                  <Link
                    to={"/checkout"}
                    className="flex items-center justify-center rounded-md border border-transparent bg-orange-500  px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-white shadow-sm hover:bg-orange-600"
                  >
                    Checkout{" "}
                    <MdShoppingCartCheckout className="ml-2 text-xl " />
                  </Link>
                </div>
                <div className="mt-4  md:mt-6 flex justify-center text-center text-xs md:text-sm text-gray-500">
                  <p>
                    or
                    <Link
                      className="font-medium text-orange-400 ml-5  hover:text-orange-500 "
                      to={"/prodDetails"}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>{" "}
              </div>
            ) : (
              <div className="mt-4  md:mt-6 flex justify-center text-center text-xs md:text-sm text-gray-500">
                <p>
                  <Link
                    className="font-medium text-orange-400 ml-5  hover:text-orange-500 "
                    to={"/"}
                  >
                    Lets Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
