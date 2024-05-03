import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User} from 'next-auth'
import mongoose from "mongoose";

// the work of this route ,collect the all the message and serve to you
//to serve the all the message , we use aggregation  pipelne mongodb which is advanced topic
export async function GET(request: Request){
    // connect to database, beacuae nextjs is a edge type server,
    // so we frequently call every route database
    await dbConnect()
  
    const session =await getServerSession(authOptions)
    const user: User=session?.user as User
    if(!session || !session .user){
        return Response.json({
            success:false,
            message:"NOT authenticated"

        },{ status:401  })
    }
    const userId= new mongoose.Types.ObjectId(user._id)
    // when we use the aggretion pipline the we use this syntax instead of
    // const userId= user._id, bcz we send the string type here the other type
    try {
        const user=await UserModel.aggregate([
            { $match: {id: userId}     },
            {  $unwind: '$messages'},
            {$sort:{ 'messages.createdAt':-1}},
            {$group:{ _id:'$_id', messages:{
               $push: '$messages' }}}
        ])
        if(!user || user.length===0){
            return Response.json({
                success:false,
                message:"User not found"
            },{ status: 401})
        }
        return Response.json({
            success:false,
            message:user[0].messages
        },{ status: 200})
    } catch (error:any) {
        console.log("error adding get-messages",error);
                return Response.json(
            {
                success: false,
                message: "error checking get-messages"
            },{
                status:500
            }
        )    
    }
 
}