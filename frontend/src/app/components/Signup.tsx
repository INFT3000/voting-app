import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import React from "react";
import { UseFormSetError, useForm } from "react-hook-form";

import Button from "./Button";
import FormContainer from "./FormContainer";
import { QpAxios, setToken } from "@/helpers/quickpollaxios";

function ErrorText({ message }: { message: string }): JSX.Element {
  return (
    <p className="text-[#FF0000]">{message}</p>
  );
}

interface ISignup {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Signup({ className }): JSX.Element {
  const formMethods = useForm<ISignup>();
  const {
    register, formState, handleSubmit, setError,
  } = formMethods;

  const { errors } = formState;

  const onSubmit = async (data: ISignup): Promise<void> => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      username: data.username,
      password: data.password,
    };
    const response = await QpAxios.post<{ token: string }>("auth/signp", payload);
    if (response.status === 201) {
      const { token } = response.data;
      setToken(token);
      return;
      // await router.push(`/profile, or something.`);
    }
    setError("confirmPassword", {
      type: "manual",
      message: "Username already exists",
    });
  };

  return (
    <div>
      <form className={`${className}`} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
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
            className="mb-[5px] rounded-lg border-[1px] border-transparent bg-tetraDark p-[10px] text-white outline-none focus:border-primaryBlue"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <ErrorText message={message} />}
          />

          <label htmlFor="password" className="font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password is too short" },
            })}
            id="password"
            className="mb-[5px] rounded-lg border-[1px] border-transparent bg-tetraDark p-[10px] text-white outline-none focus:border-primaryBlue"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <ErrorText message={message} />}
          />

          <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password is required",
            })}
            id="confirmPassword"
            className="mb-[5px] rounded-lg border-[1px] border-transparent bg-tetraDark p-[10px] text-white outline-none focus:border-primaryBlue"
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <ErrorText message={message} />}
          />

          <Button theme="primary" type="submit" className="mt-[10px] w-[100%]">Signup</Button>

        </div>
      </form>
    </div>
  );
}
