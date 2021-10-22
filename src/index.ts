import { connectDB, addTranslation, getTranslation } from "./db/db";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const translate = require("translate");

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

// @ts-ignore
app.post("/", async (req, res) => {
  const result = getTranslation(req.body.dest, req.body.text).then((res) => {
    // @ts-ignore
    // console.log(res.json());
  });
  // console.log(result);

  // const translation = await fetch("https://translate.astian.org/translate", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     q: req.body.text,
  //     source: req.body.src,
  //     target: req.body.dest,
  //   }),
  //   headers: { "Content-Type": "application/json" },
  // }).then((res) => res.json());

  // addTranslation(
  //   req.body.src,
  //   req.body.dest,
  //   req.body.text,
  //   translation.translatedText
  // );

  // res.send(translation.translatedText);
});

app.listen(5000);
