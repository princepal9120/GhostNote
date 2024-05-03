import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { usernameValidation } from '@/schemas/signUpSchema';
import { z } from 'zod';

cosnt UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request:Request) {
    // TODO: usethis in all other routes
    //not require for updated nextjs
    // if(request.method!=GET){
    //     return Response.json({
    //         success: false,
    //         message:"Only GET method is allowed",
    //     },{ status:400})
    // }
    await dbConnect()
    try {
        const {searchParams}=new URL(request.url)
        const queryParam={
            username: searchParams.get("username");
        }
        //vailidation with zod
        const result= UsernameQuerySchema.safeParse(queryParam)
        console.log(result) //TODO REMOVE
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors 
            || []
            return Response.json({
                success: false,
                message: usernameErrors?.length>0? usernameErrors.join(', '):
                "Invalid query parameters"
            },{ status:400})
        }
        console.log("result data", result.data);
        const {username}=result.data
        const existingVerifiedUser =await UserModel.findOne({
            username, isVerified: true
        })
        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message:"Username is already token",
            },{ status:400})
        }
        return Response.json({
            success: true,
            message: "Username is Unique"
        },{ status:400})
       } catch (error) {
        console.error("Error checking username",error);
        return Response.json(
            {
                success: false,
                message: "error checking username"
            },{
                status:500
            }
        )    
    }
}