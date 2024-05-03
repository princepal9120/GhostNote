import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User} from 'next-auth'

export async function POST(request: Request) { 
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user:User=session?.user    
    if(!session || !session.user){
        return Response.json({
            success: false,
            message:" NOT Authenticated"
        },{
            status:401
        })
    }
    const userId=user._id;
    const {acceptMessages= await request.json();
     try {
        const updatedUser= await UserModel.findByIdAndUpdate(userId,
            {acceptMessages:acceptMessages},{new:true})
            if(!updatedUser){
                return Response.json({
                    success: false,
                    message:"failed to update user status to accept message"
                    
                },{
                    status:401
                })
            }
        return Response.json({
            success: true,
            message:"user status updated to accept messages",
           updatedUser
        },{
            status:200
        })      
        
     } catch (error) {
        console.log("failed to update user status to accept messages");
        
        
        return Response.json({
            success: false,
            message:"failed to update user status to accept message"
        },{
            status:401
        })
        
        
     }   

}

export async function GET(request: Request){
    // connect to database
    await dbConnect()
  
    const session =await getServerSession(authOptions)
    const user: User=session.user as User
    if(!session || !session .user){
        return Response.json({
            success:false,
            message:"NOT authenticated"

        },{ status:401  })
    }
    const userId= user._id
try {
    const foundUser= await UserModel.findById(userId)
    if(!foundUser){
                    return Response.json({
                        success: false,
                        message:"User not found "
                        
                    },{
                        status:401
                    })
                }
            return Response.json({
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessages,
            },{
                status:200
            })   
} catch (error) {
    console.error('Error retrieving message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
}
}

