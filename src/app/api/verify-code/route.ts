import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export  async function POST(request: Request) {
    await dbConnect();
    try {
        const {username, code}=await request.json();
        const decodedUsername=decodeURIComponent(username)
        const user= await UserModel.findOne({username: decodedUsername})
        if (!user) {
           
            return Response.json({
                success: false,
                message: "NO user found"
    
            },{ status:  200})
        }
        const isCodeValid=user.verifyCode===code
        const isNotCodeExpired=new Date(user.verifyCodeExpiry) >new Date()
        if (isCodeValid &&  isNotCodeExpired) {
            user.isVerified=true,
            await user.save()
            return Response.json({
                success: true,
                message: "Account verified"
    
            },{ status:  500})
            
        }else if(!isNotCodeExpired){
            return Response.json({
                success: false,
                message: "Verification code has expired , please signup again to get new code"
            },{ status:  400})
        }else{
            return Response.json({
                success: false,
                message: "Incorrect verifycode"
    
            },{ status:  400})
        }

    } catch (error) {
        console.log("Error verifying user", error);
        return Response.json({
            success: false,
            message: "Error verifying user"

        },{ status:  500})
        
    }

}