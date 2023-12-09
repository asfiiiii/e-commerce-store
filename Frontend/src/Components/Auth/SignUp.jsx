import logo from "../../logo.png";
import { useForm } from "react-hook-form";
import { createNewUser } from "../../store/authApi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
      addresses: [],
      role: "user",
    };
    dispatch(createNewUser(userData));
  };

  const user = useSelector((state) => state.users.loggedUsers);
  const loading = useSelector((state) => state.users.loading);
  return (
    <>
      {user && <Navigate to="/prodDetails" />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username", {
                    required: "Username Required",

                    pattern: {
                      value: /[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi,
                      message: "Valid Username is required",
                    },
                  })}
                  type="text"
                  autoComplete="username"
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* {errors.username.message && (
              <p className="text-red-500 text-sm">hehe</p>
            )} */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email Required",

                    pattern: {
                      value: /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g,
                      message: "Valid Email is required",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold  text-orange-400  hover:text-orange-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password Required",

                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="Password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center flex-col">
              {loading ? (
                <div className="w-16 h-16 ">
                  {" "}
                  {/* Adjust the size here */}
                  <ColorRing
                    visible={true}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Sign up
                </button>
              )}
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an Account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold leading-6  text-orange-400  hover:text-orange-500"
            >
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
