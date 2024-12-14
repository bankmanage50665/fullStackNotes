import { Form, Link, json, redirect, useNavigation } from "react-router-dom";
import React from "react";

function LoginForm() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
      <Form method="post">
        <div className="mb-4">
          <label htmlFor="email" className="block text-black font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-black font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>
        <button
          disabled={isSubmiting}
          type="submit"
          className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-gray-800"
        >
          Login
        </button>
        <p className="text-center mt-4 text-black">
          Don't have an account?
          <Link to="/signup" className="text-black">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();

    console.log(resData);
    

    if (!res.ok) {
      throw new Error(resData.message || "Field to loging user.");
    }
  } catch (err) {
    throw json(
      { message: "Field to login  please try again later." },
      { status: 500 }
    );
  }
  return redirect("/products");
}
