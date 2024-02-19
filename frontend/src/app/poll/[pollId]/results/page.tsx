import Navbar from "@/app/components/Navbar";
import PollContainer from "@/app/components/PollContainer";

export default function Page({ params }: { params: { pollId: string } }): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Navbar />
      <PollContainer>
        <p>Results</p>
      </PollContainer>
    </main>
  );
}
