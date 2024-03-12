import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";

import Button from "./Button";
import FormContainer from "./FormContainer";
import Link from "next/link";

function ErrorText({ message }: { message: string }): JSX.Element {
  return (
    <p className="text-[#FF0000]">{message}</p>
  );
}

interface ILogin {
  username: string;
  password: string;
}

export default function Login({ className }): JSX.Element {
  const formMethods = useForm<ILogin>();
  const {
    register, formState, handleSubmit,
  } = formMethods;

  const { errors } = formState;

  const onSubmit = async (data: ILogin): Promise<void> => {
    try {
      console.log(data);
    } catch (error) {
      console.log("error!", error);
    }
  };

  return (
    <div>
      <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="inputGroup flex flex-col">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              type="username"
              {...register("username", {
                required: "Username is required",
                maxLength: {
                  value: 20,
                  message: "Username is too long",
                },
              })}
              id="username"
              className="mb-[5px] w-[25vw] rounded-lg border-[1px] border-transparent bg-tetraDark p-[10px] text-white outline-none focus:border-primaryBlue"
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => <ErrorText message={message} />}
            />
          </div>
          <div className="inputGroup flex flex-col">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              className="mb-[5px] rounded-lg border-[1px] border-transparent bg-tetraDark p-[10px] text-white outline-none focus:border-primaryBlue"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <ErrorText message={message} />}
            />
          </div>
          <div className="inputGroup flex flex-row items-center justify-between">
            <label className=" text-grey">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-[5px]"
              />
              Remember Me
            </label>
            <Link href="/" className="text-grey hover:underline">Forgot Password?</Link>
          </div>
          <Button theme="primary" type="submit" className="mt-[10px] w-[100%]">Login</Button>
        </div>
      </form>
    </div>
  );
}
