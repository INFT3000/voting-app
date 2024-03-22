"use client";

import { CheckCircleOutline, ContentCopy } from "@mui/icons-material";
import { ChartOptions, ChartTypes } from "billboard.js";
import Image from "next/image";
import { useRef, useState } from "react";
import BillboardChart from "react-billboardjs";

import { Poll } from "../page";
import { AsyncWrapper } from "@/app/components/AsyncWrapper";
import IconButton from "@/app/components/IconButton";
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

  const [copySuccess, setCopySuccess] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  buttonRef.current?.focus();

  const copyToClipboard = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    await navigator.clipboard.writeText(textRef.current!.innerHTML);
    setCopySuccess(true);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <AsyncWrapper requests={[resultsReq, pollReq]}>
        <PollContainer>
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
              <div className="flex gap-[8px] rounded-lg bg-tetraDark p-[10px]">
                <div className="">
                  <p ref={textRef}>
                    https://quickpoll.ca/poll/{pollId}
                  </p>
                </div>
                <IconButton
                  theme="ghost"
                  type="button"
                  tooltip={copySuccess ? "Copied!" : "Copy to Clipboard"}
                  // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
                  icon={copySuccess ? <CheckCircleOutline /> : <ContentCopy />}
                  onClick={copyToClipboard}
                />
              </div>
            </div>
          </div>
        </PollContainer>
      </AsyncWrapper>
    </main>
  );
}
