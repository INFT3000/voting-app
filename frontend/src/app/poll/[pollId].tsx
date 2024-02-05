import { useRouter } from 'next/router';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { pollId } = context.params;

  const poll = async (uuid: string) => {
    const url = `http://localhost:8080/poll/${uuid}`;
  
    try {
      const response = await axios.get(url);
      console.log('Poll details:', response.data);
      // Handle success (e.g., display the poll details)
    } catch (error) {
      console.error('Error retrieving poll:', error);
      // Handle error (e.g., display an error message)
    }
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
