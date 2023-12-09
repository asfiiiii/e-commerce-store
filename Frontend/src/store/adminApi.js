import { adminActions } from "./adminSlice";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const handleErrors = (response) => {
  if (!response.ok) {
    console.log("Error:", response.statusText);
    throw new Error("Something went wrong");
  }
  return response.json();
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/admin/orders`, {
        credentials: "include",
      });

      const orderData = await handleErrors(response);

      dispatch(adminActions.fetchAllOrders({ order: orderData }));
    } catch (error) {
      console.error("Error fetching all orders:", error.message);
    }
  };
};

export const updateOrderDetails = (data) => {
  return async (dispatch) => {
    try {
      const id = data.id;
      const response = await fetch(`/admin/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      const updatedData = await handleErrors(response);

      dispatch(adminActions.updateOrder({ order: updatedData }));
    } catch (error) {
      console.error("Error updating order details:", error.message);
    }
  };
};

export const fetchSortedOrderstData = (queryData) => {
  return async (dispatch) => {
    try {
      let query = "";
      for (let key in queryData) {
        query += `${key}=${queryData[key]}&`;
      }
      console.log(query);

      const response = await fetch(`/admin/orders/sort?${query}`, {
        credentials: "include",
      });

      const orderData = await handleErrors(response);

      dispatch(adminActions.showSortedOrders({ order: orderData }));
    } catch (error) {
      console.error("Error fetching sorted orders:", error.message);
    }
  };
};
