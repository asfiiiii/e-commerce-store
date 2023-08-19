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

export const fetchCategory = () => {
  return async (dispatch) => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8080/category");

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data;
    };

    try {
      const category = await fetchCategories();
      dispatch(productActions.showCategory({ category: category }));
    } catch (err) {
      return;
    }
  };
};
export const fetchBrand = () => {
  return async (dispatch) => {
    const fetchBrands = async () => {
      const response = await fetch("http://localhost:8080/brands");

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data;
    };

    try {
      const brands = await fetchBrands();
      dispatch(productActions.showBrands({ brands: brands }));
    } catch (err) {
      return;
    }
  };
};
export const fetchSelectedProduct = (id) => {
  return async (dispatch) => {
    const fetchSpecificProduct = async (id) => {
      const response = await fetch("http://localhost:8080/products/" + id);

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data;
    };

    try {
      const selectedProduct = await fetchSpecificProduct(id);
      dispatch(
        productActions.showSelected({ selectedProduct: selectedProduct })
      );
    } catch (err) {
      return;
    }
  };
};
export const createNewProduct = (product) => {
  return async (dispatch) => {
    const createProd = async (prodData) => {
      const response = await fetch("http://localhost:8080/products/", {
        method: "POST",
        body: JSON.stringify(prodData),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data;
    };

    try {
      const prod = await createProd(product);
      dispatch(productActions.addNewProduct({ product: prod }));
    } catch (err) {
      return;
    }
  };
};

export const updateProductData = (prodData) => {
  return async (dispatch) => {
    try {
      const updateProduct = async (product) => {
        const id = product.id;
        const response = await fetch("http://localhost:8080/products/" + id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error("Failed to Update Product");
        }

        const data = await response.json();
        return data;
      };

      const prod = await updateProduct(prodData);

      dispatch(productActions.updateProduct({ product: prod }));
    } catch (error) {
      return;
    }
  };
};
