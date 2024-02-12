"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal";
import { isInRange } from "@/utils/utils";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

type BoxDataType = {
  content: string;
  isAnswer: boolean;
  isFirst: boolean;
  isLast: boolean;
};

type PathDataType = {
  x: string;
  y: string;
  isVer: boolean;
  len: string;
};

const ResModal = () => {
  const { onClose, isOpen, solver, type } = useModal();
  const data = solver ? solver.getResult() : null;
  // const [box, setBox] = useState<BoxDataType[]>([]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  let box: BoxDataType[] = [];
  let path: PathDataType[] = [];

  if (data) {
    const matrix = data.matrix;
    const kor = data.answBuffCor;
    for (let i = 0; i < data.baris; i++) {
      for (let j = 0; j < data.kolom; j++) {
        const [isVertical, isHorizontal] = isInRange([i, j], data.answBuffCor);
        if (kor.find(([b, k]) => b === i && k === j)) {
          box.push({
            content: matrix[i][j],
            isAnswer: true,
            isFirst: kor.length > 0 && i === kor[0][0] && j === kor[0][1],
            isLast:
              kor.length > 0 &&
              i === kor[kor.length - 1][0] &&
              j === kor[kor.length - 1][1],
          });
        } else {
          box.push({
            content: matrix[i][j],
            isAnswer: false,
            isFirst: kor.length > 0 && i === kor[0][0] && j === kor[0][1],
            isLast:
              kor.length > 0 &&
              i === kor[kor.length - 1][0] &&
              j === kor[kor.length - 1][1],
          });
        }
      }
    }

    for (let i = 0; i < data.answBuffCor.length - 1; i++) {
      const [bar1, kol1] = data.answBuffCor[i];
      const [bar2, kol2] = data.answBuffCor[i + 1];

      //2,0  2,6
      let x = 0;
      let y = 0;

      let len = 0;

      if (bar1 === bar2) {
        if (kol1 < kol2) {
          x = 40 * kol1 + kol1 * 12 + 15;
          y = 40 * bar1 + bar1 * 12 + 15;
        } else {
          x = 40 * kol2 + kol2 * 12 + 15;
          y = 40 * bar2 + bar2 * 12 + 15;
        }
        len = Math.abs(kol2 - kol1) * 40 + Math.abs(kol2 - kol1) * 12 + 10;
        path.push({
          x: `${x}px`,
          y: `${y}px`,
          len: `${len}px`,
          isVer: false,
        });
      } else if (kol1 === kol2) {
        if (bar1 < bar2) {
          x = 40 * kol1 + kol1 * 12 + 15;
          y = 40 * bar1 + bar1 * 12 + 15;
        } else {
          x = 40 * kol2 + kol2 * 12 + 15;
          y = 40 * bar2 + bar2 * 12 + 15;
        }
        len = Math.abs(bar2 - bar1) * 40 + Math.abs(bar2 - bar1) * 12 + 10;

        path.push({
          x: `${x}px`,
          y: `${y}px`,
          len: `${len}px`,
          isVer: true,
        });
      }
    }

    // setBox(boxData);
  }

  function download() {
    const str = solver
      ? solver.getStringResult(type === "rinput" ? true : false)
      : "";

    const file = new File([str], "answer.txt", {
      type: "text/plain",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent className="overflow-y-auto max-h-full">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
        </DialogHeader>
        {data && (
          <>
            <div className="flex flex-col w-full justify-center items-center">
              <div className="w-full flex flex-col">
                <h3>Sequences and Rewards: </h3>
                <div className="flex flex-col w-full justify-center my-3 border border-black p-2">
                  {data.seq.map((s, i) => (
                    <p>{`${i + 1}. ${s.join(" ")} : ${data.reward[i]}`}</p>
                  ))}
                </div>
                <h3>Max Buffer Length: {data.bufferSize}</h3>
                <h3>Optimal Buffer: {data.answBuff.join(" ")} </h3>
                <h3>
                  Optimal Buffer (Koordinat):{" "}
                  {data.answBuffCor
                    .map((c) => `(${c[1] + 1}, ${c[0] + 1})`)
                    .join(" ")}{" "}
                </h3>
                <h3>Optimal Reward: {data.maxReward ? data.maxReward : 0}</h3>
                <h3>Time: {data.time.toFixed(3)} ms</h3>
              </div>
            </div>
            <div className="overflow-auto w-full flex justify-center items-center flex-col">
              <div
                className={`w-fit grid gap-3`}
                style={{
                  gridTemplateColumns: `repeat(${data.kolom}, minmax(0, 1fr))`,
                }}
              >
                {data.matrix[0].map((d, i) => {
                  if (
                    data.answBuffCor.length > 0 &&
                    i === data.answBuffCor[0][1]
                  ) {
                    return (
                      <div className="flex justify-center items-center w-[40px]">
                        <ArrowDown className="text-primary font-bold w-5 h-5" />
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex justify-center items-center w-[40px]"></div>
                    );
                  }
                })}
              </div>
              <div
                className={`w-fit grid relative gap-3`}
                style={{
                  gridTemplateColumns: `repeat(${data.kolom}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${data.baris}, minmax(0, 1fr))`,
                }}
              >
                {path.map((p, i) => (
                  <div
                    className="bg-primary/20 text-white absolute"
                    style={{
                      top: p.y,
                      left: p.x,
                      width: p.isVer ? "10px" : p.len,
                      height: p.isVer ? p.len : "10px",
                    }}
                  ></div>
                ))}
                {box.map((b) => (
                  <div className="relative">
                    {/* {b.isHorizontal && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-full h-[10px] bg-primary/20"></div>
                      </div>
                    )}
                    {b.isVertical && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="h-full w-[10px] bg-primary/20"></div>
                      </div>
                    )} */}
                    <div
                      className={clsx(
                        "flex justify-center items-center w-[40px] h-[40px]",
                        b.isAnswer && "rounded-full bg-[#91b0f4]",
                        (b.isFirst || b.isLast) && "border-[3px] border-primary"
                      )}
                    >
                      {b.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="w-full gap-3 flex flex-row justify-end items-center">
          <Button onClick={download}>Download Answer</Button>
          <Button variant="destructive" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResModal;
