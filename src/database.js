import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const clientMongo = new MongoClient(process.env.MONGO_URI);
let db;

clientMongo.connect(()=>{
    db = clientMongo.db("drivencracy");
    console.log("MONGO CONNECTED");
});

export {db, ObjectId}