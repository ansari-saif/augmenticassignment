import { connect } from "mongoose";

async function connectDB() {
  await connect(
    // "mongodb+srv://snipextt:sCTWkatnXjg4G3Io@sc.kvpb4.mongodb.net/kn-multiprojects?retryWrites=true&w=majority"
    "mongodb+srv://snipextt:sCTWkatnXjg4G3Io@sc.kvpb4.mongodb.net/kn-multiprojects?retryWrites=true&w=majority"
  );
  return;
}

export { connectDB };
