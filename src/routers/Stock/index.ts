import { Router } from "express";
import controllerDelete from "./controllers/delete";
import controllerGet from "./controllers/get";
import controllerPost from "./controllers/post";
import controllerPut from "./controllers/put";

const stockRouter = Router();

stockRouter.get("/", controllerGet);
stockRouter.post("/", controllerPost);
stockRouter.delete("/:id", controllerDelete);
stockRouter.put("/:id", controllerPut);

export default stockRouter;