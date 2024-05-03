import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {Message} from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()
    const {username, content}=await request.json()
    try {
        const user=await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message: "user not found"
            },{status:404})
        }
        // is user accepting the messages
        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message: "user not accepting the messages"
            },{status:403})
        }
        const newMessage={content,createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            success: true,
            message: "message sent successfully"
        },{status:202}) 
    } catch (error) {
       console.log("Error adding send-meesage",error)
        return Response.json(
            {
                success: false,
                message: "error checking send-messages"
            },{
                status:500
            }
        )    
    }

}
