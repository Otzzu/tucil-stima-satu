import { formSchema } from "@/components/solve-rinput";
import { z } from "zod";

export const checkDuplicate = (input: string[]) => {
  const duplicates = input.filter(
    (item, index) => input.indexOf(item) !== index
  );
  return Array.from(new Set(duplicates));
};
export function isInRange([bar, kol]: number[], arrayCor: number[][]) {
  const len = arrayCor.length;
  let isVertical = false;
  let isHorizontal = false;

  for (let i = 0; i < len - 1; i++) {
    const [bar1, kol1] = arrayCor[i];
    const [bar2, kol2] = arrayCor[i + 1];

    if (bar1 === bar2) {
      if (kol1 > kol2) {
        if (bar === bar1 && kol < kol1 && kol > kol2) {
          isHorizontal = true;
        }
      } else {
        if (bar === bar1 && kol > kol1 && kol < kol2) {
          isHorizontal = true;
        }
      }
    } else if (kol1 === kol2) {
      if (bar1 > bar2) {
        if (kol === kol1 && bar < bar1 && bar > bar2) {
          isVertical = true;
        }
      } else {
        if (kol === kol1 && bar > bar1 && bar < bar2) {
          isVertical = true;
        }
      }
    }
  }

  return [isVertical, isHorizontal];
}

function arrayEquals(a: any[], b: any[]) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function calcReward(buffer: string[], regex: RegExp[], reward: number[]) {
  const str = buffer.join(" ");
  let rew = 0;
  for (let i = 0; i < regex.length; i++) {
    const res = str.match(regex[i]);
    if (res) {
      rew += reward[i];
    }
  }

  return rew;
}

export class Solver {
  private bufferSize: number = 0;
  private matrix: string[][] = [];
  private numSeq: number = 0;
  private seq: string[][] = [];
  private reward: number[] = [];
  private regex: RegExp[] = [];
  private baris: number = 0;
  private kolom: number = 0;
  private maxReward: number = 0;
  private answBuff: string[] = [];
  private answBuffCor: number[][] = [];
  private time: number = 0;
  constructor() {}

  public calc(): Solver {
    const start = performance.now();
    for (let j = 2; j <= this.bufferSize; j++) {
      for (let i = 0; i < this.kolom; i++) {
        this.solve(j, [], [], true, 0, i);
      }
    }
    const end = performance.now();

    this.time = end - start;

    return this;
  }

  public readDataFile(data: string): Solver {
    this.cleanUp();
    const lines = data
      .toString()
      .split("\n")
      .map((s) => s.trimEnd());

    this.bufferSize = Number.parseInt(lines[0]);
    const [kolomt, barist] = lines[1].split(" ").map((n) => Number.parseInt(n));

    this.baris = barist;
    this.kolom = kolomt;
    this.matrix = Array(barist)
      .fill([])
      .map(() => Array(kolomt).fill(""));

    for (let i = 0; i < barist; i++) {
      const line = lines[2 + i].trimEnd().split(" ");
      for (let j = 0; j < kolomt; j++) {
        this.matrix[i][j] = line[j];
      }
    }

    let numLine = barist + 2;
    this.numSeq = Number.parseInt(lines[numLine++]);
    // console.log(numSeq);
    for (let i = 0; i < this.numSeq; i++) {
      this.seq.push(lines[numLine++].split(" "));
      this.reward.push(Number.parseInt(lines[numLine++]));
    }

    this.regex = this.seq.map((str) => new RegExp(str.join("\\s"), "g"));

    return this;
  }

  private solve(
    buffLen: number,
    currBuffCor: any[],
    currBuff: string[],
    isVertical: boolean,
    bar: number,
    kol: number
  ) {
    if (buffLen === 0) {
      const currRew = calcReward(currBuff, this.regex, this.reward);
      // console.log(currBuff)

      if (currRew > this.maxReward) {
        this.maxReward = currRew;
        this.answBuff = [...currBuff];
        this.answBuffCor = currBuffCor.slice();
      }
    } else {
      if (currBuff.length === 0) {
        const buffCorTemp = currBuffCor.slice();
        const buffTemp = [...currBuff];

        buffCorTemp.push([0, kol]);
        buffTemp.push(this.matrix[0][kol]);

        this.solve(buffLen - 1, buffCorTemp, buffTemp, isVertical, 0, kol);
      } else {
        if (isVertical) {
          for (let i = 0; i < this.baris; i++) {
            if (!currBuffCor.find(([b, k]) => b === i && k === kol)) {
              const buffCorTemp = currBuffCor.slice();
              const buffTemp = [...currBuff];

              buffCorTemp.push([i, kol]);
              buffTemp.push(this.matrix[i][kol]);

              this.solve(
                buffLen - 1,
                buffCorTemp,
                buffTemp,
                !isVertical,
                i,
                kol
              );
            } else {
              const buffCorTemp = currBuffCor.slice();
              const buffTemp = [...currBuff];

              this.solve(0, buffCorTemp, buffTemp, !isVertical, bar, kol);
            }
          }
        } else {
          for (let i = 0; i < this.kolom; i++) {
            if (!currBuffCor.find(([b, k]) => b === bar && k === i)) {
              const buffCorTemp = currBuffCor.slice();
              const buffTemp = [...currBuff];

              buffCorTemp.push([bar, i]);
              buffTemp.push(this.matrix[bar][i]);

              this.solve(
                buffLen - 1,
                buffCorTemp,
                buffTemp,
                !isVertical,
                bar,
                i
              );
            } else {
              const buffCorTemp = currBuffCor.slice();
              const buffTemp = [...currBuff];

              this.solve(0, buffCorTemp, buffTemp, !isVertical, bar, kol);
            }
          }
        }
      }
    }
  }

  public readInput(
    buffLen: number,
    matrix: string,
    seq: string,
    reward: string
  ) {
    this.cleanUp();
    this.bufferSize = buffLen;

    this.matrix = matrix
      .split("\n")
      .map((s) => s.trimEnd())
      .map((s) => s.split(" "));

    this.seq = seq
      .split("\n")
      .map((s) => s.trimEnd())
      .map((s) => s.split(" "));

    this.reward = reward
      .split("\n")
      .map((s) => s.trimEnd())
      .map((s) => Number.parseInt(s));

    this.regex = this.seq.map((str) => new RegExp(str.join("\\s"), "g"));

    this.baris = this.matrix.length;
    this.kolom = this.matrix[0].length;
    this.numSeq = this.seq.length;
    return this;
  }

  public readCli(data: z.infer<typeof formSchema>): Solver {
    this.cleanUp();
    this.bufferSize = data.bufferLen;
    this.baris = data.baris;
    this.kolom = data.kolom;
    this.numSeq = data.numSeq;
    const token = data.token.split(" ");

    this.matrix = Array(this.baris)
      .fill([])
      .map(() => Array(this.kolom).fill(""));

    for (let i = 0; i < this.baris; i++) {
      for (let j = 0; j < this.kolom; j++) {
        this.matrix[i][j] = token[Math.floor(Math.random() * data.numToken)];
      }
    }

    for (let i = 0; i < this.numSeq; i++) {
      const len = Math.floor(Math.random() * (data.maxLenSeq - 2)) + 2;
      const seqTemp: string[] = [];

      for (let j = 0; j < len; j++) {
        seqTemp.push(token[Math.floor(Math.random() * data.numToken)]);
      }

      if (this.seq.find((val) => arrayEquals(val, seqTemp))) {
        i--;
      } else {
        this.seq.push(seqTemp);
        let r = Math.floor(Math.random() * (100 - 0)) + 0;
        while (this.reward.includes(r)) {
          r = Math.floor(Math.random() * (100 - 0)) + 0;
        }
        this.reward.push(r);
      }
    }

    this.regex = this.seq.map((str) => new RegExp(str.join("\\s"), "g"));

    return this;
  }

  private cleanUp() {
    this.bufferSize = 0;
    this.matrix = [];
    this.numSeq = 0;
    this.seq = [];
    this.reward = [];
    this.regex = [];
    this.baris = 0;
    this.kolom = 0;
    this.maxReward = 0;
    this.answBuff = [];
    this.answBuffCor = [];
    this.time = 0;
  }

  public getResult() {
    return {
      bufferSize: this.bufferSize,
      matrix: this.matrix,
      numSeq: this.numSeq,
      seq: this.seq,
      reward: this.reward,
      regex: this.regex,
      baris: this.baris,
      kolom: this.kolom,
      maxReward: this.maxReward,
      answBuff: this.answBuff,
      answBuffCor: this.answBuffCor,
      time: this.time,
    };
  }

  public getStringResult(isFull: boolean) {
    const strFull = [
      "Sequence yang didapat dan rewardnya:",
      this.seq
        .map((s, i) => `${i + 1}. ${s.join(" ")} : ${this.reward[i]}`)
        .join("\n"),
      "\nMatriks yang didapatkan:",
      this.matrix.map((m) => `${m.join(" ")}`).join("\n"),
      "\nJawaban:\n",
    ];
    const strBuff = this.answBuff.join(" ");
    const strCor = this.answBuffCor
      .map((cor) => `${cor[1] + 1}, ${cor[0] + 1}`)
      .join("\n");

    return `${isFull ? strFull.join("\n") : ""}${
      this.maxReward
    }\n${strBuff}\n${strCor}\n\n${this.time.toFixed(3)}ms`;
  }
}
