"use client";

import bb, {
  Chart, ChartOptions, bar, pie,
} from "billboard.js";
import BillboardChart from "react-billboardjs";

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

function createChart(results?: ResultsResponse["results"]): ChartOptions {
  if (!results) {
    return {
      data: {
        columns: [],
      },
    };
  }
  return {
    data: {
      type: "pie",
      columns: results.map((result) => [result.option, result.votes]),
    },
  };
}

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  const [resultsReq] = useQpAxios<{ results: ResultsResponse }>({
    url: `poll/${params.pollId}/results`,
    method: "GET",
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <AsyncWrapper requests={[resultsReq]}>
        <div className="min-w-[800px]">
          <PollContainer>
            <h1>Results</h1>
            <BillboardChart {...createChart(resultsReq.data?.results.results)} />
          </PollContainer>
        </div>
      </AsyncWrapper>
    </main>
  );
}
