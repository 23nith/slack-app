import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import env from "react-dotenv";
import { useAuthProvider } from "../States/AuthProvider";

export default function Login({
  toggleLogin,
  setToggleLogin,
  setToggleSignup,
  setToggleMainPage,
  setCurrentUser
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const [{ user }, dispatch] = useAuthProvider();

  // set the current user to local storage
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  const getUserInfo = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };


    try {
      let res = await axios
        // .post(`${env.API_URL}/auth/sign_in`, userInfo)
        .post(`http://206.189.91.54/api/v1/auth/sign_in`, userInfo)
        .then((data) => {
          setToggleMainPage(true);
          return data
        });

      const user = res.data.data;
      
      const responseHeader = res.headers
      

      // set current user to state user
      dispatch({
        type: "SET_USER",
        user: Object.assign(user, responseHeader),
      });
      resetField("email");
      resetField("password");

      setCurrentUser(Object.assign(user, responseHeader))

    } catch (error) {
      console.log(error);
    }


  };

  const handeleToggleLogin = (_) => {
    setToggleLogin(false);
    setToggleSignup(true);
  };


  return (
    <>
      <div className="w-3/4 h-1/6 flex justify-center items-center">
        <h1 className="text-4xl ">Login</h1>
      </div>
      <form
        className=" flex flex-col justify-start w-3/4 h-5/6"
        onSubmit={handleSubmit(getUserInfo)}
      >
        <div className="flex justify-between mt-10">
          <div className="w-full flex flex-col justify-between items-start ">
            <label htmlFor="email" className="text-xs text-gray-400">
              Email
            </label>
            <input
              className="mt-4 bg-gray-100 border outline-none rounded-md p-3 w-full"
              type="email"
              name="email"
              {...register("email", { required: "true" })}
            />
          </div>
        </div>
        <div className="flex justify-between items-end mt-10">
          <div className="w-4/5 flex flex-col justify-between items-start ">
            <label htmlFor="password" className="text-xs text-gray-400">
              Password
            </label>
            <input
              className="mt-4 bg-gray-100 border outline-none rounded-md p-3 w-full"
              type="password"
              name="password"
              autoComplete="true"
              {...register("password", { required: "true" })}
            />
          </div>

          <button
            type="submit"
            className="ml-5 rounded-md text-xs bg-gray-700 text-white w-1/5 h-3/5"
          >
            Login
          </button>
        </div>
        <p className="mt-14 text-xs  text-gray-300">
          {" "}
          Don't have an account?{" "}
          <span
            onClick={handeleToggleLogin}
            className="font-bold cursor-pointer text-xs text-gray-500"
          >
            Signup
          </span>
        </p>
      </form>
    </>
  );
}
