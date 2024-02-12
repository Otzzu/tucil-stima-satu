"use client"

import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed flex flex-col gap-3 justify-center items-center inset-0 bg-black/50 Z-[100]">
      <div className="animate-spin">
        <Loader2 className="text-white h-10 w-10" />
      </div>
      <h1 className="text-white font-bold text-xl">Loading...</h1>
    </div>
  );
};

export default Loading;
