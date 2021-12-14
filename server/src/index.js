const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const swipl = require("swipl");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const goal = "maestros(X).";
    const ret = swipl.call(`consult(src/main)`);
    res.send(swipl.call(goal));
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, host, () => {
  console.log(`App Listening at http://${host}:${port}`);
});
