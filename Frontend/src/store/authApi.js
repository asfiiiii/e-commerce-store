import { authActions } from "./authSlice";

const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const createNewUser = (userData) => {
  return async (dispatch) => {
    const createUser = async (user) => {
      dispatch(authActions.isLoading(true));

      const response = await fetch(`/auth/signup`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
        credentials: "include", // Include credentials in the request
      });
      dispatch(authActions.isLoading(false));

      if (!response.ok) {
        console.log("yaki hogyee");
        return;
      }
      const data = await response.json();
      console.log(data);
      return data;
    };

    const loggeduser = await createUser(userData);

    dispatch(authActions.createNewUser({ loggedUser: loggeduser }));
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const loginUser = async (user) => {
        const email = user.email;
        const password = user.password;
        let query = `?email=${email}&password=${password}`;
        dispatch(authActions.isLoading(true));
        const response = await fetch(`/auth/login` + query, {
          credentials: "include", // Include credentials in the request
        });
        dispatch(authActions.isLoading(false));

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const data = await response.json();
        return data;
      };

      const loggedUser = await loginUser(userData);

      if (loggedUser) {
        dispatch(authActions.loginUserSuccess({ loggedUser }));
      } else {
        throw new Error("Invalid Email or Password");
      }
    } catch (error) {
      dispatch(authActions.loginUserError({ error: error.message }));
    }
  };
};

export const checkUser = () => {
  return async (dispatch) => {
    try {
      const check = async () => {
        const response = await fetch(`/auth/check`, {
          credentials: "include", // Include credentials in the request
        });

        if (!response.ok) {
          throw new Error("Failed to get User through this data");
        }

        const data = await response.json();
        return data;
      };

      const loggedUser = await check();
      if (loggedUser) {
        dispatch(authActions.checkUser({ loggedUser }));
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      dispatch(authActions.checkUser({ loggedUser: null }));
    }
  };
};

export const logoutCurrentUser = () => {
  return async (dispatch) => {
    const logout = async () => {
      const response = await fetch(`/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      return true;
    };

    try {
      const loggedOut = await logout();
      if (loggedOut) {
        dispatch(authActions.logoutUser());
      } else {
        throw new Error("User not logged out");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
