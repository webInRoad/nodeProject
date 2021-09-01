const fs = require("fs");
const path = require("path");

// 生成 write Stream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a",
  });
  return writeStream;
}

// 将内容写入日志
function writeLog(writeStream, log) {
  writeStream.write(log + "\n");
}
const accessStream = createWriteStream("access.log");
function access(content) {
  writeLog(accessStream, content);
}
module.exports = {
  access,
};
