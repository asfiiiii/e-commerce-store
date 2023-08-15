import { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItem, deleteItemfromCart } from "../../store/cartApi";

export default function CartDetail() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalAmount = cart.reduce((amount, currentItem) => {
    return amount + currentItem.price * currentItem.quantity;
  }, 0);
  const totalQuantity = cart
    .map((item) => item.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  const quantityHandler = (e, product) => {
    dispatch(updateCartItem({ ...product, quantity: e.target.value }));
  };
  const removeItemHandler = (e, product) => {
    e.preventDefault();
    dispatch(deleteItemfromCart(product.id));
  };
  return (
    <>
      {" "}
      {!cart && <Navigate to="/" />}
      {cart && (
        <div className="mx-4 md:mx-8 lg:mx-60 mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10">
            Your Cart
          </h3>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flow-root">
              <ul className="-my-4 md:-my-6 divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-4 md:py-6">
                    <div className="h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-2 md:ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base md:text-lg font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-2 md:ml-4">${product.price}</p>
                        </div>
                        <p className="mt-1 text-xs md:text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center">
                          <p>Qty :</p>
                          <select
                            onChange={(e) => quantityHandler(e, product)}
                            class="text-xs ml-5 focus:ring-orange-500"
                          >
                            <option value="1">1</option>
                            <option value={product.quantity} selected>
                              {product.quantity}
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          className="font-medium text-orange-400  hover:text-orange-500 "
                          onClick={(e) => removeItemHandler(e, product)}
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
          <div className="mx-auto  mt-20 md:mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
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
                className="flex items-center justify-center rounded-md border border-transparent bg-orange-400  px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-white shadow-sm hover:bg-orange-500"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-4  md:mt-6 flex justify-center text-center text-xs md:text-sm text-gray-500">
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
      )}
    </>
  );
}
