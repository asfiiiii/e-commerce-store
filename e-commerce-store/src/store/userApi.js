import { userActions } from "./userSlice";
export const createNewUser = (userData) => {
  return async (dispatch) => {
    const createUser = async (user) => {
      const response = await fetch("http://localhost:8080/users", {
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

    dispatch(userActions.createNewUser({ loggedUser: loggeduser }));
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const loginUser = async (user) => {
        const email = user.email;
        const password = user.password;
        let query = `?email=${email}&password=${password}`;

        const response = await fetch("http://localhost:8080/users" + query);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.length) {
          return data;
        } else {
          throw new Error("Invalid Email or Password");
        }
      };

      const loggedUser = await loginUser(userData);

      dispatch(userActions.loginUserSuccess({ loggedUser }));
    } catch (error) {
      dispatch(userActions.loginUserError({ error: error.message }));
    }
  };
};

export const updateUserAddress = (adress) => {
  return async (dispatch) => {
    const update = async (userAddress) => {
      const id = userAddress.id;
      console.log(id);
      const response = await fetch("http://localhost:8080/orders/" + id, {
        method: "PATCH",
        body: JSON.stringify(userAddress),
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

    const updatedUser = await update(adress);

    dispatch(userActions.updateUserAddress({ userAddress: updatedUser }));
  };
};
export const logoutCurrentUser = () => {
  return async (dispatch) => {
    dispatch(userActions.logoutUser());
  };
};
