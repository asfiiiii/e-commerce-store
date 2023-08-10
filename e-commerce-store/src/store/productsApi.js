import { productActions } from "./productSlice";
export const fetchProductstData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const responce = await fetch("http://localhost:8080/products");
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();

      return data;
    };
    try {
      const productData = await fetchData();
      dispatch(productActions.showProducts({ products: productData }));
    } catch (e) {
      return;
    }
  };
};
export const fetchFilteredProductstData = (queryData) => {
  return async (dispatch) => {
    let query = "";
    for (let key in queryData) {
      query += `${key}=${queryData[key]}&`;
    }
    const fetchData = async () => {
      console.log(query);
      const responce = await fetch("http://localhost:8080/products?" + query);
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();

      return data;
    };
    try {
      const productData = await fetchData();
      dispatch(productActions.showProducts({ products: productData }));
    } catch (e) {
      return;
    }
  };
};
