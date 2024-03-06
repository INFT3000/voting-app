"use client";

import { ChartOptions, ChartTypes } from "billboard.js";
import BillboardChart from "react-billboardjs";

import { Poll } from "../page";
import { AsyncWrapper } from "@/app/components/AsyncWrapper";
import FormContainer from "@/app/components/FormContainer";
import Navbar from "@/app/components/Navbar";
import useQpAxios from "@/helpers/quickpollaxios";

type ResultsResponse = {
  pollUuid: string;
  results: {
    option: string;
    votes: number;
  }[];
};

function createChart(type: ChartTypes, results?: ResultsResponse["results"]): ChartOptions {
  if (!results) {
    return {
      data: {
        type,
        columns: [],
      },
    };
  }
  return {
    axis: {
      rotated: true,
      x: {
        show: false,
      },
      y: {
        show: false,
      },
    },
    tooltip: {
      grouped: false,
      contents: (d) => {
        const data = d[0];
        return `<div class="tooltip">${data.name}: ${data.value}</div>`;
      },
    },
    legend: {
      show: false,
    },
    color: {
      pattern: ["#FFB876", "#6DFF96", "#8459FF", "#FF7870", "#CF43EB"],
    },
    data: {
      type,
      labels: {
        colors: "white",
      },
      columns: results.map((result) => [result.option, result.votes]),
    },
    bar: {
      width: {
        max: 25,
      },
      padding: 50,
    },
  };
}

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  const { pollId } = params;
  const [resultsReq] = useQpAxios<{ results: ResultsResponse }>({
    url: `poll/${pollId}/results`,
    method: "GET",
  });
  const [pollReq] = useQpAxios<{ poll: Poll }>({
    url: `poll/${pollId}`,
    method: "GET",
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <AsyncWrapper requests={[resultsReq, pollReq]}>
        <FormContainer>
          <div className="flex min-w-[400px] flex-col">
            {/* Meta */}
            <div>
              <h1>{pollReq.data?.poll.title}</h1>
              <p>By Anonymous</p>
            </div>
            {/* Charts */}
            <div>
              <div className="flex flex-col lg:flex-row">
                <BillboardChart className="rounded-bars" {...createChart("bar", resultsReq.data?.results.results)} />
                <BillboardChart {...createChart("pie", resultsReq.data?.results.results)} />
              </div>
              <p>Total votes: {resultsReq.data?.results.results.reduce((acc, result) => acc + result.votes, 0)}</p>
            </div>
            {/* Share */}
            <div>
              <h2>Share</h2>
              {/* Temp link until we do the thingies */}
              <p>https://quickpoll.ca/poll/{pollId}</p>
            </div>
          </div>
        </FormContainer>
      </AsyncWrapper>
    </main>
  );
}
