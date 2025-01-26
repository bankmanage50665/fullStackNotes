import React from "react";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

function SignupForm() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const action = useActionData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <Form method="post">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          disabled={isSubmiting}
          type="submit"
          className="w-full py-2 bg-black text-yellow-200 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default SignupForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
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
      throw new Error(resData.message || "Field to create user.");
    }
    if (res.status === 401 || res.status === 422) {
      return res;
    }
  } catch (err) {
    throw json(
      { message: "Field to create user please try again later." },
      { status: 500 }
    );
  }
  return redirect("/login");
}
