import { cartActions } from "./cartSlice";

export const addItemtoCart = (cartData) => {
  return async (dispatch) => {
    try {
      const fetchData = async (cart) => {
        const response = await fetch("http://localhost:8080/cart", {
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

      const cart = await fetchData(cartData);

      dispatch(cartActions.addItemtoCart({ items: cart }));
    } catch (error) {
      return;
    }
  };
};

export const fetchCartbyId = (id) => {
  return async (dispatch) => {
    const fetchCart = async (id) => {
      const response = await fetch("http://localhost:8080/cart?user=" + id);

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data;
    };

    try {
      const cart = await fetchCart(id);
      dispatch(cartActions.showCartItems({ items: cart }));
    } catch (err) {
      return;
    }
  };
};

export const updateCartItem = (cartData) => {
  return async (dispatch) => {
    try {
      const updateCart = async (cart) => {
        const id = cart.id;
        const response = await fetch("http://localhost:8080/cart/" + id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error("Failed to Update items in cart");
        }

        const data = await response.json();
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
        const response = await fetch("http://localhost:8080/cart/" + id, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to Delete items from cart");
        }

        return id;
      };

      const id = await deleteItem(cartId);

      dispatch(cartActions.removeItemFromCart({ id: id }));
    } catch (error) {
      return;
    }
  };
};
