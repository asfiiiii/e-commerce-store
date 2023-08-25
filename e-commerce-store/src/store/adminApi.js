import { adminActions } from "./adminSlice";

export const fetchAllOrders = () => {
  //admin
  return async (dispatch) => {
    const order = async () => {
      const response = await fetch("http://localhost:8080/admin/orders");
      if (!response.ok) {
        console.log("yaki hogyee");
        return;
      }
      const data = await response.json();
      return data;
    };

    const orderData = await order();

    dispatch(adminActions.fetchAllOrders({ order: orderData }));
  };
};

export const updateOrderDetails = (data) => {
  //admin
  return async (dispatch) => {
    const update = async (orderData) => {
      const id = orderData.id;
      const response = await fetch("http://localhost:8080/admin/orders/" + id, {
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

    dispatch(adminActions.updateOrder({ order: updatedData }));
  };
};

export const fetchSortedOrderstData = (queryData) => {
  //admin
  return async (dispatch) => {
    let query = "";
    for (let key in queryData) {
      query += `${key}=${queryData[key]}&`;
    }
    console.log(query);
    const fetchData = async () => {
      const responce = await fetch(
        "http://localhost:8080/admin/orders/sort?" + query
      );
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();

      return data;
    };
    try {
      const orderData = await fetchData();
      dispatch(adminActions.showSortedOrders({ order: orderData }));
    } catch (e) {
      return;
    }
  };
};
// export const fetchSortedOrdertDataByStatus = (queryData) => {
//   //admin
//   return async (dispatch) => {
//     const fetchData = async (status) => {
//       const responce = await fetch(
//         "http://localhost:8080/orders?status=" + status
//       );
//       if (!responce.ok) {
//         // throw new Error("Error in fetching");
//       }
//       const data = await responce.json();

//       return data;
//     };
//     try {
//       const orderData = await fetchData(queryData);
//       dispatch(adminActions.showSortedOrders({ order: orderData }));
//     } catch (e) {
//       return;
//     }
//   };
// };
