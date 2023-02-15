import { createServer } from "node:http";

createServer(function (req, res) {
  res.write("Hello, World!");
  res.end();
}).listen(3001, () => {
  console.log("Starting server at the port 3001");
});
