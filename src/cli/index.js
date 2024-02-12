import fs from "fs/promises";
import path from "path";
import readline from "readline/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let bufferSize = 0;
let matrix = [];
let numSeq = 0;
let seq = [];
let reward = [];
let regex = [];
let baris = 0;
let kolom = 0;
let maxReward = undefined;
let answBuff = [];
let answBuffCor = [];
let end = false;
let maxSumReward = undefined;

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calcMaxRewardSum(arr) {
  let maxSoFar = 0;

  const natNum = arr.filter((n) => n >= 0);

  if (natNum.length > 0) {
    maxSoFar = natNum.reduce((a, b) => a + b, 0);
  } else {
    maxSoFar = Math.max(...natNum);
  }

  return maxSoFar;
}

async function readFile(fileName) {
  const data = await fs.readFile(
    path.resolve(__dirname, `../../test/${fileName}`)
  );
  const lines = data
    .toString()
    .split("\n")
    .map((s) => s.trimEnd());

  bufferSize = Number.parseInt(lines[0]);
  const [kolomt, barist] = lines[1].split(" ").map((n) => Number.parseInt(n));

  baris = barist;
  kolom = kolomt;
  matrix = Array(barist)
    .fill()
    .map(() => Array(kolomt).fill(""));

  for (let i = 0; i < barist; i++) {
    const line = lines[2 + i].trimEnd().split(" ");
    for (let j = 0; j < kolomt; j++) {
      matrix[i][j] = line[j];
    }
  }

  let numLine = barist + 2;
  numSeq = Number.parseInt(lines[numLine++]);
  // console.log(numSeq);
  for (let i = 0; i < numSeq; i++) {
    seq.push(lines[numLine++].split(" "));
    reward.push(Number.parseInt(lines[numLine++]));
  }

  regex = seq.map((str) => new RegExp(str.join("\\s"), "g"));

  // console.log("Sequence yang didapat dan rewardnya: \n");
  // for (let i = 0; i < seq.length; i++) {
  //   console.log(seq);
  //   console.log(`${i + 1}. ${seq[i].join(" ")} : ${reward[i]}`);
  // }

  // console.log("");

  // console.log("Matriks yang didapatkan: \n");

  // for (let i = 0; i < baris; i++) {
  //   console.log(matrix[i].join(" "));
  // }

  // console.log("");
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

async function readCli() {
  const numToken = Number.parseInt(await read.question("\nJumlah token: "));
  const token = (await read.question("Token:  ")).split(" ");
  const buffer = Number.parseInt(await read.question("Ukuran buffer: "));
  const [kolomt, barist] = (await read.question("Ukuran matrix: "))
    .split(" ")
    .map((n) => Number.parseInt(n));
  const numSequ = Number.parseInt(await read.question("Jumlah sekuens: "));
  const maxLenSeq = Number.parseInt(
    await read.question("Ukuran maksimal sekuens: ")
  );

  bufferSize = buffer;
  baris = barist;
  kolom = kolomt;
  numSeq = numSequ;

  matrix = Array(baris)
    .fill()
    .map(() => Array(kolom).fill(""));

  for (let i = 0; i < baris; i++) {
    for (let j = 0; j < kolom; j++) {
      matrix[i][j] = token[Math.floor(Math.random() * numToken)];
    }
  }

  for (let i = 0; i < numSeq; i++) {
    const len = Math.floor(Math.random() * (maxLenSeq - 2)) + 2;
    const seqTemp = [];

    for (let j = 0; j < len; j++) {
      seqTemp.push(token[Math.floor(Math.random() * numToken)]);
    }

    if (seq.find((val) => arrayEquals(val, seqTemp))) {
      i--;
    } else {
      seq.push(seqTemp);
      let r = Math.floor(Math.random() * (100 - 0)) + 0;
      while (reward.includes(r)) {
        r = Math.floor(Math.random() * (100 - 0)) + 0;
      }
      reward.push(r);
    }
  }

  regex = seq.map((str) => new RegExp(str.join("\\s"), "g"));

  console.log("Sequence yang didapat dan rewardnya: \n");
  const seqStr = seq
    .map((s, i) => `${i + 1}. ${s.join(" ")} : ${reward[i]}`)
    .join("\n");
  console.log(seqStr);

  console.log("");

  console.log("Matriks yang didapatkan: \n");

  const matrixStr = matrix.map((m) => `${m.join(" ")}`).join("\n");
  console.log(matrixStr);

  console.log("");

  return [seqStr, matrixStr];
}

async function writeFile(...content) {
  const str = content.join("\n");
  await fs.writeFile(path.resolve(__dirname, "../../test/Output.txt"), str);
}

function calcReward(buffer) {
  const str = buffer.join(" ");
  let rew = undefined;
  for (let i = 0; i < regex.length; i++) {
    const res = str.match(regex[i]);
    if (res) {
      if (!rew) {
        rew = reward[i];
      } else {
        rew += reward[i];
      }
    }
  }

  return rew;
}

function solve(buffLen, currBuffCor, currBuff, isVertical, bar, kol) {
  if (buffLen === 0) {
    const currRew = calcReward(currBuff);
    // console.log(currBuff)

    if (calcReward !== undefined) {
      if (currRew === maxSumReward) {
        maxReward = currRew;
        answBuff = [...currBuff];
        answBuffCor = currBuffCor.slice();
        end = true;
      } else {
        if (maxReward !== undefined) {
          if (currRew && currRew > maxReward) {
            maxReward = currRew;
            answBuff = [...currBuff];
            answBuffCor = currBuffCor.slice();
          }
        } else {
          maxReward = currRew;
          answBuff = [...currBuff];
          answBuffCor = currBuffCor.slice();
        }
      }
    }
  } else {
    if (currBuff.length === 0) {
      const buffCorTemp = currBuffCor.slice();
      const buffTemp = [...currBuff];

      buffCorTemp.push([0, kol]);
      buffTemp.push(matrix[0][kol]);

      if (!end) solve(buffLen - 1, buffCorTemp, buffTemp, isVertical, 0, kol);
    } else {
      if (isVertical) {
        for (let i = 0; i < baris; i++) {
          if (!currBuffCor.find(([b, k]) => b === i && k === kol)) {
            const buffCorTemp = currBuffCor.slice();
            const buffTemp = [...currBuff];

            buffCorTemp.push([i, kol]);
            buffTemp.push(matrix[i][kol]);

            if (!end)
              solve(buffLen - 1, buffCorTemp, buffTemp, !isVertical, i, kol);
          } else {
            const buffCorTemp = currBuffCor.slice();
            const buffTemp = [...currBuff];

            if (!end) solve(0, buffCorTemp, buffTemp, !isVertical, bar, kol);
          }
        }
      } else {
        for (let i = 0; i < kolom; i++) {
          if (!currBuffCor.find(([b, k]) => b === bar && k === i)) {
            const buffCorTemp = currBuffCor.slice();
            const buffTemp = [...currBuff];

            buffCorTemp.push([bar, i]);
            buffTemp.push(matrix[bar][i]);

            if (!end)
              solve(buffLen - 1, buffCorTemp, buffTemp, !isVertical, bar, i);
          } else {
            const buffCorTemp = currBuffCor.slice();
            const buffTemp = [...currBuff];

            if (!end) solve(0, buffCorTemp, buffTemp, !isVertical, bar, kol);
          }
        }
      }
    }
  }
}

async function main() {
  let run = true;
  let strCli = [];

  while (run) {
    let answ = 0;
    while (true) {
      console.log(`
Pilih jenis masukan:
1. File
2. Cli
3. Exit
      `);
      answ = Number.parseInt(await read.question("Masukan: "));

      if (answ === 1) {
        const fileName = await read.question("\nMasukkan nama file: ");
        await readFile(fileName);
        break;
      } else if (answ === 2) {
        strCli = await readCli();
        break;
      } else if (answ === 3) {
        console.log("\nTerima kasih, sampai jumpa kembali\n");
        process.exit();
      } else {
        console.log("\nMasukan salah silahkan diulangi kembali");
      }
    }

    console.log(
      "\nMohon tunggu sebentar proses perhitungan sedang berlangsung...\n"
    );
    const start = performance.now();
    const lengths = seq.map((s) => s.length);

    const minLen = Math.min(...lengths);

    maxSumReward = calcMaxRewardSum(reward);
    for (let j = minLen; j <= bufferSize; j++) {
      for (let i = 0; i < kolom; i++) {
        if (!end) solve(j, [], [], true, 0, i);
      }
    }
    const timeEnd = performance.now();

    const buffStr = answBuff.join(" ");
    const buffCorStr = answBuffCor
      .map((cor) => `${cor[1] + 1}, ${cor[0] + 1}`)
      .join("\n");
    const time = (timeEnd - start).toFixed(3).toString().concat(" ms");

    console.log(maxReward);
    console.log(buffStr);
    console.log(buffCorStr);
    console.log("");
    console.log(time);

    let answ2 = "";

    while (true) {
      answ2 = await read.question("\nApakah ingin menyimpan solusi? (y/n) ");

      if (answ2 === "y") {
        if (strCli) {
          await writeFile(
            // "Sequence yang didapat dan rewardnya:",
            // strCli[0],
            // "\nMatriks yang didapatkan:",
            // strCli[1],
            // "\nJawaban:",
            maxReward,
            buffStr,
            buffCorStr,
            "",
            time
          );
        } else {
          await writeFile(maxReward, buffStr, buffCorStr, "", time);
        }
        console.log("\nJawaban tersimpan pada file Output.txt");
        break;
      } else if (answ2 === "n") {
        break;
      } else {
        console.log("Masukan salah silahkan diulangi kembali");
      }
    }

    bufferSize = 0;
    matrix = [];
    numSeq = 0;
    seq = [];
    reward = [];
    regex = [];
    baris = 0;
    kolom = 0;
    maxReward = undefined;
    answBuff = [];
    answBuffCor = [];
    end = false;
    maxSumReward = undefined;
  }
}

main();
