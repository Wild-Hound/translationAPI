"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const translate = require("translate");
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// @ts-ignore
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const translation = yield fetch("https://translate.astian.org/translate", {
        method: "POST",
        body: JSON.stringify({
            q: req.body.text,
            source: req.body.src,
            target: req.body.dest,
        }),
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    res.send(translation.translatedText);
    (0, db_1.addTranslation)(req.body.src, req.body.dest, translation.translatedText);
    console.log("translated");
}));
app.listen(5000);
