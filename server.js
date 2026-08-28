import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  let date;
  const param = req.params.date;

  if (!param) {
    date = new Date.now();
  } else if (/^\d+$/.test(param)) {
    const timestamp = parseInt(param);
    date = new Date(timestamp);
  } else {
    date = new Date(param);
  }

  if (date.toString === "Invalid Date" || isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
