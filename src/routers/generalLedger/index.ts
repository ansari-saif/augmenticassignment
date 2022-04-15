import { Router } from "express";
import generalLedgerGet, { getTransectionByUserId, userTypeGet } from "./controllers/get";
import generalLedgerPost from "./controllers/post";

const generalLedgerRouter = Router();

generalLedgerRouter.get("/", generalLedgerGet); 
generalLedgerRouter.post("/", generalLedgerPost);
generalLedgerRouter.get("/usertypelist", userTypeGet);
generalLedgerRouter.get("/usertransaction", getTransectionByUserId);

export default generalLedgerRouter;