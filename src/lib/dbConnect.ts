
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    console.log(connection);
    
  if (connection.isConnected) {
    console.log("Already connect to database");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected to database successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;