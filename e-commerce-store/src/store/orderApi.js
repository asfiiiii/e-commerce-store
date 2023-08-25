import { orderActions } from "./orderSlice";

export const createNewOrder = (orderData) => {
  //done
  return async (dispatch) => {
    try {
      const placeOrder = async (order) => {
        const response = await fetch("http://localhost:8080/orders", {
          method: "POST",
          headers: { "content-type": "application/json" },
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

export const getUserOrderDetails = (id) => {
  //done
  return async (dispatch) => {
    try {
      const orderDetials = async (id) => {
        const response = await fetch("http://localhost:8080/orders?user=" + id);

        if (!response.ok) {
          throw new Error("Failed to add items to cart");
        }

        const data = await response.json();
        return data;
      };

      const details = await orderDetials(id);

      dispatch(orderActions.getUserOrder({ order: details }));
    } catch (error) {
      return;
    }
  };
};
