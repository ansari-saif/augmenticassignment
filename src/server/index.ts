import express from "express";
import router from "../routers";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = require("express")();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:8001",
    methods: "GET,POST,PUT,PATCH,DELETE",
  })
);
app.use(fileUpload());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

export default app;
