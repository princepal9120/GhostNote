import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User"; 
import {getServerSession, User} from 'next-auth'
import { authOptions } from "../../auth/[...nextauth]/options";
export async function DELETE(request:Request, {params}:{params: {messageid:string}}) {
    const messageId=params.messageid
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user: User =session?.user as User
    if(!session || !session.user){
        return Response.json(
            {
                success:false,
                message: "Not authenticated"
            },
            {status:401}
        )
    }
    try {
       const updatedResult= await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages:{_id: messageId}}}

        )
        if(updatedResult.matchedCount==0){
            return Response.json({
                success: false,
                messageId: 'Message not found or already deleted'
            }, {status:404})
        }
        return Response.json({
            success: true,
            messageId: 'Message Deleted'
        }, {status:200})
    } catch (error) {
        console.error("Error in delete message route",error);
        return Response.json({
            success: false,
            messageId: 'Message Deleted Error'
        }, {status:500})
        
    }
}