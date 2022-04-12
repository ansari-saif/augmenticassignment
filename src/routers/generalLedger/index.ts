import { Router } from "express";
import generalLedgerGet from "./controllers/get";
import generalLedgerPost from "./controllers/post";

const generalLedgerRouter = Router();

generalLedgerRouter.get("/", generalLedgerGet); 
generalLedgerRouter.post("/", generalLedgerPost);

export default generalLedgerRouter;