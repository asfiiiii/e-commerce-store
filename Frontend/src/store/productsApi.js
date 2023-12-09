import { productActions } from "./productSlice";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const fetchProductstData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loadingStart()); // Dispatch loading start action
      const responce = await fetch(`/products`, {
        credentials: "include", // Include credentials
      });
      if (!responce.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await responce.json();
      dispatch(productActions.loadingEnd()); // Dispatch loading end action
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
export const fetchFilteredProductstData = (newFilter, pagination) => {
  return async (dispatch) => {
    let query = "";
    for (let key in newFilter) {
      query += `${key}=${newFilter[key]}&`;
    }
    for (let key in pagination) {
      query += `${key}=${pagination[key]}&`;
    }
    const fetchData = async () => {
      console.log(query);
      dispatch(productActions.loadingStart()); // Dispatch loading start action

      const response = await fetch(`/products?` + query, {
        credentials: "include", // Include credentials
      });
      if (!response.ok) {
        // throw new Error("Error in fetching");
      }
      const data = await response.json();
      dispatch(productActions.loadingEnd()); // Dispatch loading end action

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
      dispatch(productActions.loadingStart()); // Dispatch loading start action

      const response = await fetch(`/category`, {
        credentials: "include", // Include credentials
      });

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      dispatch(productActions.loadingEnd()); // Dispatch loading end action

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
      dispatch(productActions.loadingStart()); // Dispatch loading start action

      const response = await fetch(`/brands`, {
        credentials: "include", // Include credentials
      });

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      dispatch(productActions.loadingEnd()); // Dispatch loading end action

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
      dispatch(productActions.loadingStart()); // Dispatch loading start action

      const response = await fetch(`/products/` + id, {
        credentials: "include", // Include credentials
      });

      if (!response.ok) {
        return;
      }
      const data = await response.json();
      dispatch(productActions.loadingEnd()); // Dispatch loading end action

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
      const response = await fetch(`/products`, {
        method: "POST",
        body: JSON.stringify(prodData),
        headers: { "content-type": "application/json" },
        credentials: "include", // Include credentials
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
        const response = await fetch(`/products/` + id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          credentials: "include", // Include credentials
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error("Failed to Update Product");
        }

        const data = await response.json();
        return data;
      };

      const prod = await updateProduct(prodData);

      dispatch(productActions.deleteProduct({ product: prod }));
    } catch (error) {
      return;
    }
  };
};

export const deleteProduct = (prodData) => {
  return async (dispatch) => {
    try {
      const deleteProduct = async (id) => {
        const response = await fetch(`/products/delete/` + id, {
          credentials: "include", // Include credentials
        });

        if (!response.ok) {
          throw new Error("Failed to delete Product");
        }

        const data = await response.json();
        return data;
      };

      const prod = await deleteProduct(prodData);

      dispatch(productActions.deleteProduct({ product: prod }));
    } catch (error) {
      return;
    }
  };
};
