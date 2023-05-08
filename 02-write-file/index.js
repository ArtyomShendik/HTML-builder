const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', err => {
  if (err) {
    throw err;
  }
});

const rl = readline.createInterface({ input, output });

function askUser(question) {
  return new Promise((res, rej) => {
    try {
      rl.question(question, (answer) => {
        res(answer);
      });
    } catch(err) {
      console.log(`Error: `, err);
      rej('Error!!!');
    }
  })
}

function addNewLineToFile(text) {
  fs.appendFile(filePath, '\n ' + text, err => {
    if (err) {
      throw err;
    }
  })
}

async function make() {
  const answer = await askUser('Input text: ');
  if (answer.trim() === 'exit') {
    console.log('bye');
    rl.close();
    process.exit(1);
  }

  addNewLineToFile(answer.trim());
  make();
}

make()