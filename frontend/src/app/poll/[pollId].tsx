import { useRouter } from 'next/router';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { pollId } = context.params;

  const poll = async () => {
    // fetch poll from backend

  };


  
  return {
    props: {
      poll,
    },
  };
}

export default function PollPage({ poll }) {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.pollId}</h1>
      {/* Render your poll content here */}
    </div>
  );
}
