# Tucil1 - IF2211 Strategi Algoritma

## General Information
Program ini dibuat dengan menggunakan bahasa JavaScript/TypeScript dalam bentuk web dengan menggunakan framework Next.js untuk memenuhi tugas kecil stima 1. Program ini dibuat 
untuk membantu menyelesaikan permasalahan cyberpunk 2077 breach protocol dengan menggunakan algoritma bruteforce. Cyberpunk 2077 breach protocol merupakan sebuah hacking mini 
game dari sebuah game bernama Cyberpunk 2077. Cyberpunk 2077 breach protocol ini mengharuskan pemain untuk mencari sebuah buffer of token dari sebuah matriks of token dengan
panjang maksimal buffer yang sudah ditentukan dan isi dari buffer harus sesuai dengan sekuens yang diberikan. Pada tugas ini masing-masing sekuens akan diberi sebuah reward dan
program akan mencari buffer yang paling optimal berdasarkan data reward tersebut (panjang terpendek dan reward terbesar). Web yang dibuat ini dapat menerima 3 macam masukan yaitu
input biasa, input random, dan input file txt. Solusi yang diberikan pada program web ini juga dapat di download ke dalam bentuk file txt. Selain dalam bentuk web program ini juga 
dibuat dalam bentuk terminal/cli. Untuk mwnggunakan masukan file txt pada program berbasis cli pastikan file input tersebut berada pada folder test. Keluaran dalam bentuk file pada
program berbasis cli juga akan terdapat pada folder test dengan nama Output.txt.

## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [Node.js](https://nodejs.org/docs/latest/api/)
* [Next.js](https://nextjs.org/)

## Getting Started
### A. Web
1. Pastikan terdapat node.js pada device anda baik windows, linux, ataupun macOS. Node.js bisa di download di [sini](https://nodejs.org/en/download)
1. Clone Repository
   ```sh
   git clone https://github.com/Otzzu/tucil-stima-satu.git
   ```
2. Buka folder dari repository ini di terminal, lalu masuk ke dalam folder "src/web" dengan cara berikut
   ```sh
   cd ./src/web
   ```
3. Install semua dependecies yang diperlukan dengan menjalankan perintah
   ```sh
   npm install
   ```
4. Jalankan program dengan perintah
   ```sh
   npm run dev
   ```
   atau
   ```sh
   npm run build
   npm run start
   ```
5. Pada browser anda buka [http://localhost:3000/](http://localhost:3000/). Note: pastikan localhost port 3000 tidak dipakai oleh program lain

### B. Cli
1. Pastikan terdapat node.js pada device anda baik windows, linux, ataupun macOS. Node.js bisa di download di [sini](https://nodejs.org/en/download)
1. Clone Repository
   ```sh
   git clone https://github.com/Otzzu/tucil-stima-satu.git
   ```
2. Buka folder dari repository ini di terminal, lalu masuk ke dalam folder "src/cli" dengan cara berikut
   ```sh
   cd ./src/cli
   ```
3. Jalankan program dengan perintah
   ```sh
   node index.js
   ```

## Author
| Name  | NIM | Contact
| ------------- | ------------- | ------------- |
| Mesach Harmasendro  |  13522117  |   13522117@std.stei.itb.ac.id
