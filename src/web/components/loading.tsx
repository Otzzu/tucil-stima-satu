import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed flex flex-col gap-3 justify-center items-center inset-0 bg-black/50">
      <div className="animate-spin">
        <Loader2 className="text-white h-10 w-10" />
      </div>
      <h1 className="text-white font-bold text-xl">Loading...</h1>
    </div>
  );
};

export default Loading;
