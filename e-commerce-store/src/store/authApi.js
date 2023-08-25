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
        console.log(query);
        const response = await fetch(
          "http://localhost:8080/auth/login" + query
        );

        if (!response.ok) {
          throw new Error("Failed to Login through this data");
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

export const logoutCurrentUser = () => {
  return async (dispatch) => {
    dispatch(authActions.logoutUser());
  };
};
