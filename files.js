const fs = require("fs");
console.log("first");

//blocking
// const fileContent = fs.readFileSync(
//   `../../Node BootCamp/node js bootcamp.txt`,
//   `utf-8`
// );
// console.log("sync way, file Content:", fileContent);
// const writeToFile = `Nodejs Bootcamp \n 1- Asynchronous vs synchrnous \n 2- files`;
// fs.writeFileSync(`../../Node BootCamp/node js bootcamp.txt`, writeToFile);

//non-blocking , asynchronous
fs.readFile(`./start.txt`, `utf-8`, (err, data) => {
  if (err) return console.log("Error reading file !");
  fs.readFile(`./${data}.txt`, `utf-8`, (err, data2) => {
    if (err) return console.log("Error reading file !");
    fs.readFile(`./major.txt`, `utf-8`, (err, data3) => {
      if (err) return console.log("Error reading file !");
      console.log("All files read ");
      fs.writeFile(
        `./final.txt`,
        `My name is :${data2} \n My major is :${data3}`,
        `utf-8`,
        (err) => {
          if (err) console.log(`Couldnt write final file`);
        }
      );
    });
  });
});
