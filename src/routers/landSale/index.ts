import { Router } from "express";
import { controllerGet } from "./controllers/get";
import controllerPost from "./controllers/post";

const landSaleRouter = Router();

landSaleRouter.get("/", controllerGet);
landSaleRouter.post("/", controllerPost);

export default landSaleRouter;