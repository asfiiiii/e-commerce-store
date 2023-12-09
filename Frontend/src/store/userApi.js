import { userActions } from "./userSlice";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export const getUserDetails = () => {
  //done
  return async (dispatch) => {
    try {
      const userDetails = async () => {
        const response = await fetch(`/user/:id`, {
          credentials: "include", // Include credentials
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        return data;
      };

      const details = await userDetails();

      dispatch(userActions.getUserDetails({ info: details }));
    } catch (error) {
      return;
    }
  };
};

export const updateUserAddress = (adress) => {
  return async (dispatch) => {
    const update = async (userAddress) => {
      const id = userAddress.id;
      const response = await fetch(`/user/` + id, {
        method: "PATCH",
        body: JSON.stringify(userAddress),
        credentials: "include",
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
