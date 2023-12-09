import { orderActions } from "./orderSlice";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const createNewOrder = (orderData) => {
  //done
  return async (dispatch) => {
    try {
      const placeOrder = async (order) => {
        const response = await fetch(`/orders`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include", // Include credentials
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error("Failed to add items to cart");
        }

        const data = await response.json();
        return data;
      };

      const newOrder = await placeOrder(orderData);

      dispatch(orderActions.createNewOrder({ order: newOrder }));
    } catch (error) {
      return;
    }
  };
};

export const getUserOrderDetails = () => {
  //done
  return async (dispatch) => {
    try {
      const orderDetials = async () => {
        const response = await fetch(`/orders`, {
          credentials: "include", // Include credentials
        });

        if (!response.ok) {
          throw new Error("Failed to add items to cart");
        }

        const data = await response.json();
        return data;
      };

      const details = await orderDetials();

      dispatch(orderActions.getUserOrder({ order: details }));
    } catch (error) {
      return;
    }
  };
};
