"use client";

import { AsyncWrapper } from "@/app/components/AsyncWrapper";
import Navbar from "@/app/components/Navbar";
import PollContainer from "@/app/components/PollContainer";
import useQpAxios from "@/helpers/quickpollaxios";

type ResultsResponse = {
  pollUuid: string;
  results: {
    option: string;
    votes: number;
  }[];
};

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  const [resultsReq] = useQpAxios<{ results: ResultsResponse }>({
    url: `poll/${params.pollId}/results`,
    method: "GET",
  });

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Navbar />

      <AsyncWrapper requests={[resultsReq]}>
        <PollContainer>
          <h1>Results</h1>
          <ul>
            {resultsReq.data?.results.results.map((result) => (
              <li key={result.option}>
                {result.option}: {result.votes}
              </li>
            ))}
          </ul>
        </PollContainer>
      </AsyncWrapper>
    </main>
  );
}
