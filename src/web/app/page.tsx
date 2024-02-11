import SolveTab from "@/components/solve-tab";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full bg-[#020817] flex-col items-center justify-start p-24">
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-[100px] font-extrabold leading-tight text-primary">
          CyberPunk 2077 Solver
        </h1>
        <p className="text-lg font-bold text-secondary">
          Oleh Mesach Harmasendro 13522117
        </p>
        <Button className="flex flex-row gap-3">
          <Link className="flex flex-row gap-3" href="https://github.com/Otzzu/tucil-stima-satu">
            <Github className="h-4 w-4 text-white" />
            <p className="text-base text-white">GitHub</p>
          </Link>
        </Button>
      </div>

      <SolveTab />
    </main>
  );
}
