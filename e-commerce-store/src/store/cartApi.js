import { cartActions } from "./cartSlice";

export const addItemtoCart = (cartData) => {
  return async (dispatch) => {
    try {
      const addCart = async (cart) => {
        const response = await fetch("/cart", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error("Failed to add items to cart");
        }

        const data = await response.json();
        return data;
      };

      const cart = await addCart(cartData);

      dispatch(cartActions.addItemtoCart({ items: cart }));
    } catch (error) {
      return;
    }
  };
};

export const fetchCartbyId = () => {
  return async (dispatch) => {
    const fetchCart = async () => {
      dispatch(cartActions.loadingStart()); // Dispatch loading start action
      const response = await fetch("/cart");

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      dispatch(cartActions.loadingEnd()); // Dispatch loading end action

      return data;
    };

    try {
      const cart = await fetchCart();
      dispatch(cartActions.showCartItems({ items: cart }));
      return cart;
    } catch (err) {
      dispatch(cartActions.showCartItems({ items: null }));
    }
  };
};

export const updateCartItem = (cartData) => {
  return async (dispatch) => {
    try {
      const updateCart = async (cart) => {
        const id = cart.id;
        dispatch(cartActions.loadingStart()); // Dispatch loading start action

        const response = await fetch("/cart/" + id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error("Failed to Update items in cart");
        }

        const data = await response.json();
        dispatch(cartActions.loadingEnd()); // Dispatch loading end action

        return data;
      };

      const cart = await updateCart(cartData);

      dispatch(cartActions.updateCartItem({ items: cart }));
    } catch (error) {
      return;
    }
  };
};

export const deleteItemfromCart = (cartId) => {
  return async (dispatch) => {
    try {
      const deleteItem = async (id) => {
        dispatch(cartActions.loadingStart()); // Dispatch loading start action

        const response = await fetch("/cart/" + id, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to Delete items from cart");
        }

        dispatch(cartActions.loadingEnd()); // Dispatch loading end action

        return id;
      };

      const id = await deleteItem(cartId);

      dispatch(cartActions.removeItemFromCart({ id: id }));
    } catch (error) {
      return;
    }
  };
};

export const resetCartAfterOrder = (id) => {
  return async (dispatch) => {
    const response = await dispatch(fetchCartbyId(id));

    for (let item of response) {
      await dispatch(deleteItemfromCart(item.id));
    }
  };
};
