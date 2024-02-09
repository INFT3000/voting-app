"use client";

import { useForm } from "react-hook-form";

import { AsyncWrapper } from "@/app/components/AsyncWrapper";
import Button from "@/app/components/Button";
import Navbar from "@/app/components/Navbar";
import PollContainer from "@/app/components/PollContainer";
import useQpAxios from "@/helpers/quickpollaxios";

type Poll = {
  uuid: string;
  title: string;
  options: string[];
  settings: {
    is_multiple_choice: boolean;
    disallow_anonymous: boolean;
    disallow_same_ip: boolean;
  }
};

interface Option {
  option: string;
}

function getPollByUuid(pollId: string): Poll {
  // const res = await QpAxios.get<{ poll: Poll }>(`poll/${pollId}`);
  // const { poll } = res.data;
  const poll: Poll = {
    uuid: "123",
    title: "Title",
    options: ["Option 1", "Option 2"],
    settings: {
      is_multiple_choice: true,
      disallow_anonymous: false,
      disallow_same_ip: false,
    },
  };
  return poll;
}

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  const { pollId } = params;

  const [pollReq, fetchTheThing] = useQpAxios<{ poll: Poll }>({
    url: `poll/${pollId}`,
    method: "GET",
  });
  const { data } = pollReq;

  const { register, handleSubmit } = useForm<Option>();

  const onSubmit = async (payload: Option): Promise<void> => {
    console.log(payload);
  };

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Navbar />
      <PollContainer>
        <AsyncWrapper requests={[pollReq]}>
          <form className="flex w-[100%] flex-col justify-start gap-[45px]" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1 className="text-3xl font-bold">{data?.poll.title}</h1>
              <p className="text-secondaryGrey">By Anonymous</p>
            </div>
            <div className="flex flex-col gap-[20px]">
              <p>Make a choice:</p>
              <div>
                {data?.poll.options.map((option) => (
                  <div className="mb-3 flex gap-[12px] text-secondaryGrey" key={option}>
                    <input type={data.poll.settings.is_multiple_choice ? "checkbox" : "radio"} id={option} name="option" value={option} />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-[18px]">
              <Button theme="primary" type="submit">Vote</Button>
              <Button theme="secondary">Results</Button>
            </div>
          </form>
        </AsyncWrapper>
      </PollContainer>
    </main>
  );
}
