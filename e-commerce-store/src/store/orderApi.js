import { orderActions } from "./orderSlice";

export const createNewOrder = (orderData) => {
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
  return async (dispatch) => {
    try {
      const orderDetials = async (id) => {
        const response = await fetch(
          "http://localhost:8080/orders?user.id=" + id
        );

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
export const getUserDetails = (id) => {
  return async (dispatch) => {
    try {
      const userDetails = async (id) => {
        const response = await fetch("http://localhost:8080/users/" + id);

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        return data;
      };

      const details = await userDetails(id);

      dispatch(orderActions.getUserDetails({ info: details }));
    } catch (error) {
      return;
    }
  };
};

// TODO: have to use this to update the address in that checkout component
export const updateUserAddress = (adress) => {
  return async (dispatch) => {
    const update = async (userAddress) => {
      const id = userAddress.id;
      const response = await fetch("http://localhost:8080/users/" + id, {
        method: "PATCH",
        body: JSON.stringify(userAddress),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        console.log("yaki hogyee");
        return;
      }
      const data = await response.json();
      return data;
    };

    const updatedUser = await update(adress);

    dispatch(orderActions.updateUserAddress({ userAddress: updatedUser }));
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    const order = async () => {
      const response = await fetch("http://localhost:8080/orders");
      if (!response.ok) {
        console.log("yaki hogyee");
        return;
      }
      const data = await response.json();
      return data;
    };

    const orderData = await order();

    dispatch(orderActions.fetchAllOrders({ order: orderData }));
  };
};

export const updateOrderDetails = (data) => {
  return async (dispatch) => {
    const update = async (orderData) => {
      const id = orderData.id;
      const response = await fetch("http://localhost:8080/orders/" + id, {
        method: "PATCH",
        body: JSON.stringify(orderData),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        console.log("yaki hogyee");
        return;
      }
      const data = await response.json();
      return data;
    };

    const updatedData = await update(data);

    dispatch(orderActions.updateOrder({ order: updatedData }));
  };
};

export const fetchSortedOrderstData = (queryData) => {
  return async (dispatch) => {
    let query = "";
    for (let key in queryData) {
      query += `${key}=${queryData[key]}&`;
    }
    const fetchData = async () => {
      const responce = await fetch("http://localhost:8080/orders?" + query);
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();

      return data;
    };
    try {
      const orderData = await fetchData();
      dispatch(orderActions.showSortedOrders({ order: orderData }));
    } catch (e) {
      return;
    }
  };
};
export const fetchSortedOrdertDataByStatus = (queryData) => {
  return async (dispatch) => {
    const fetchData = async (status) => {
      const responce = await fetch(
        "http://localhost:8080/orders?status=" + status
      );
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();

      return data;
    };
    try {
      const orderData = await fetchData(queryData);
      dispatch(orderActions.showSortedOrders({ order: orderData }));
    } catch (e) {
      return;
    }
  };
};
