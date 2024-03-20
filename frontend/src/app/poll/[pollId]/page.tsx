"use client";

import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { AsyncWrapper } from "@/app/components/AsyncWrapper";
import Button from "@/app/components/Button";
import FormContainer from "@/app/components/FormContainer";
import Navbar from "@/app/components/Navbar";
import useQpAxios, { QpAxios, setToken } from "@/helpers/quickpollaxios";

type Option = {
  text: string;
  uuid: string;
};

export type Poll = {
  uuid: string;
  title: string;
  options: Option[];
  settings: {
    is_multiple_choice: boolean;
    disallow_anonymous: boolean;
    disallow_same_ip: boolean;
  }
};

interface Selection {
  options: string[];
}

function ErrorText({ message }: { message: string }): JSX.Element {
  return (
    <p className="text-[#FF0000]">{message}</p>
  );
}

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  const { pollId } = params;

  const [pollReq] = useQpAxios<{ poll: Poll }>({
    url: `poll/${pollId}`,
    method: "GET",
  });
  const { data } = pollReq;

  const {
    register, handleSubmit, setError, clearErrors, formState: { errors },
  } = useForm<Selection>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    clearErrors("options");
    // TO-DO: RADIO BUTTON ISSUE
  };
  const router = useRouter();
  const onSubmit = async (payload: Selection): Promise<void> => {
    let options = Array.isArray(payload.options) ? payload.options : [payload.options];
    options = options.filter((option) => option !== null && option !== undefined);

    if (options.length === 0) {
      setError("options", {
        type: "manual",
        message: "Please select an option",
      });
      return;
    }
    if (options.length > 1 && !data!.poll.settings.is_multiple_choice) {
      setError("options", {
        type: "manual",
        message: "You can only select one option",
      });
      return;
    }
    if (options.length > data!.poll.options.length) {
      setError("options", {
        type: "manual",
        message: "You have selected more options than available",
      });
      return;
    }
    clearErrors("options");
    try {
      setToken(localStorage.getItem("token")!);
      await QpAxios.post(`poll/${pollId}/vote`, {
        option: options.at(0),
      });
      await router.push(`/poll/${pollId}/results`);
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <AsyncWrapper requests={[pollReq]}>
        <FormContainer className="">
          <form className="flex w-[100%] flex-col justify-start gap-[45px]" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-3xl font-bold">{data?.poll.title}</h1>
              <p className="text-secondaryGrey">By Anonymous</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <p>Make a choice:</p>
              <div>
                {data?.poll.options.map((option, index) => (
                  <div className="text-secondaryGrey mb-3 flex gap-[12px]" key={option.uuid}>
                    <input
                      type={data.poll.settings.is_multiple_choice ? "checkbox" : "radio"}
                      id={option.uuid}
                      value={option.uuid}
                      {...register(data.poll.settings.is_multiple_choice ? `options.${index}` : "options", { onChange: handleChange })}
                    />
                    <label htmlFor={option.uuid}>{option.text}</label>
                  </div>
                ))}
              </div>
            </div>
            <ErrorMessage errors={errors} name="options" render={({ message }) => <ErrorText message={message} />} />
            <div className="flex gap-[18px]">
              <Button theme="primary" type="submit">Vote</Button>
              <Button theme="secondary">
                <Link href={`/poll/${pollId}/results`}>
                  View Results
                </Link>
              </Button>
            </div>
          </form>
        </FormContainer>
      </AsyncWrapper>
    </main>
  );
}
