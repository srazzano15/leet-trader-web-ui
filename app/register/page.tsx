"use client";
import Card from "../components/Card";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { getTokens, validateAccessToken } from "../api/session";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/auth";
import { toTitleCase } from "../helpers/helpers";
import { User } from "../schemas/User";
import { z } from "zod";


type RegisterProps = z.infer<typeof User>

const Register: React.FC<RegisterProps> = () => {
  const [errorMsg, setErrorMsg] = useState<string | any>("");

  const [formData, setFormData] = useState<RegisterProps>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    retypePassword: ''
  });

  const router = useRouter();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('')

    // validate data
    const isValid = await User.safeParseAsync(formData)
    if (isValid && !isValid.success) {
        return setErrorMsg(isValid.error)
    }


    const res = await loginUser(formData);
    if (res && !res.error) {
      router.push("/dashboard");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event as unknown as React.FormEvent); // Trigger form submission
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card styles="w-full lg:w-1/3 mx-auto">
      <form
        className="grid grid-flow-row p-3"
        onSubmit={handleSubmit}
        method="POST"
      >
        <h3 className="text-3xl col-span-1 mb-4 text-center">Register</h3>
        <label htmlFor="firstName" className="col-span-1">
          First Name
        </label>
        <input
          type="text"
          value={formData.firstName}
          name="firstName"
          className="border mb-2 p-2 rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="lastName" className="col-span-1">
          Last Name
        </label>
        <input
          type="text"
          value={formData.lastName}
          name="lastName"
          className="border mb-2 p-2 rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="email" className="col-span-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          name="email"
          className="border mb-2 p-2 rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="password" className="col-span-1">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          name="password"
          className="border mb-2 p-2 rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="password" className="col-span-1">
          Retype Password
        </label>
        <input
          type="password"
          value={formData.password}
          name="retypePassword"
          className="border mb-2 p-2 rounded-md"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
        <button
          type="submit"
          className="transition duration-150 ease-in-out bg-green-400 mt-3 py-2 rounded-md hover:bg-teal-400"
        >
          Login
        </button>

        {errorMsg.length == 0 && (
          <div className="bg-red-100 p-2 mt-4">
            <span className="text-2xl mr-4">&#9940;</span>
            <span>You have an error</span>
          </div>
        )}
      </form>
    </Card>
  );
};

export default Register;
