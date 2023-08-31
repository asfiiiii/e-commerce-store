import { authActions } from "./authSlice";
export const createNewUser = (userData) => {
  return async (dispatch) => {
    const createUser = async (user) => {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      });
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
        const response = await fetch(
          "http://localhost:8080/auth/login" + query
        );

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const data = await response.json();
        return data; // Instead of checking data.length, simply return the data
      };

      const loggedUser = await loginUser(userData);

      if (loggedUser) {
        // Check if loggedUser is truthy
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
        const response = await fetch("http://localhost:8080/auth/check");

        if (!response.ok) {
          throw new Error("Failed to get User through this data");
        }

        const data = await response.json();
        return data; // Instead of checking data.length, simply return the data
      };

      const loggedUser = await check();
      if (loggedUser) {
        // Check if loggedUser is truthy
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
      const response = await fetch("http://localhost:8080/auth/logout");

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // If the response is OK, the user has successfully logged out
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
      // Handle any error that occurred during the logout process
      console.error(error);
      // You can dispatch an action to handle the error state in your Redux store if needed
    }
  };
};
