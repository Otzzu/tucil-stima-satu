"use client";

import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useModal from "@/hooks/use-modal";
import { Solver } from "@/utils/utils";
import Loading from "./loading";

const SolveFile = () => {
  const { onOpen, setSolver, setType } = useModal();
  const [file, setFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    // onOpen();
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;

      const solver = new Solver();

      if (result) {
        // const data = readDataFile(result as string);
        // console.log(data)
        const res = solver.readDataFile(result as string).calc();
        setSolver(res);

        setType("file");
        setLoading(false);
        onOpen();
        // console.log(res)
      }
      // console.log(result);
    };

    if (file) {
      reader.readAsText(file);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="w-full flex flex-col gap-3 ">
        <div className="flex flex-col w-full justify-center gap-1.5">
          <Label className="text-md text-slate-400 pl-2" htmlFor="file">
            File (.txt):{" "}
          </Label>
          <Input
            id="file"
            type="file"
            accept=".txt"
            placeholder="File"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-end items-center ">
          <Button onClick={handleClick} size="lg" disabled={!file || loading}>
            {loading ? "Loading..." : "Solve"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SolveFile;
