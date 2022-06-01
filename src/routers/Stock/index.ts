import { Router } from "express";
import controllerDelete, { splitStockDelete } from "./controllers/delete";
import controllerGet, { splitStockGet } from "./controllers/get";
import controllerPost, { billStockPost, splitStockPost } from "./controllers/post";
import controllerPut from "./controllers/put";

const stockRouter = Router();

// stock 
stockRouter.get("/", controllerGet);
stockRouter.post("/", controllerPost);
stockRouter.delete("/:id", controllerDelete);
stockRouter.put("/:id", controllerPut);

// bill stock 
stockRouter.post("/billStock", billStockPost);

// split stock 
stockRouter.get("/splitStock", splitStockGet);
stockRouter.post("/splitStock", splitStockPost);
stockRouter.delete("/splitStock/:id", splitStockDelete);

export default stockRouter;