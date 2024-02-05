import axios from 'axios';

import { useRouter } from 'next/router';


type Poll = {
  uuid: string;
  title: string;
  options: string[];
  settings: {
    is_multiple_choice: boolean;
    disallow_anonymous: boolean;
    disallow_same_ip: boolean;
  }
  // probably will want to add more fields like the votes to each options, im not sure
};


async function getPollByUuid(pollId: string) {

  const res = await axios.get(`http://localhost:8080/api/poll/${pollId}`);
  const poll: Poll = res.data.poll;
  return poll;
}

export default async function Page({params}) {
  const pollId = params.pollId;
  const poll = await getPollByUuid(pollId as string); 
  console.log(poll.title);
  console.log(poll);

  return (
    <div>
      <h1>Poll: {poll.title}</h1>
      {/* Render your poll content here */}
    </div>
  );
}
