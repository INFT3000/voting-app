import { QpAxios } from "@/helpers/quickpollaxios";

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

async function getPollByUuid(pollId: string): Promise<Poll> {
  const res = await QpAxios.get<{ poll: Poll }>(`poll/${pollId}`);
  const { poll } = res.data;
  return poll;
}

export default async function Page({ params }: { params: { pollId: string } }): Promise<JSX.Element> {
  const { pollId } = params;
  const poll = await getPollByUuid(pollId as string);
  console.log(poll);

  return (
    <div>
      <h1>Poll: {poll.title}</h1>
      {/* Render your poll content here */}
    </div>
  );
}
