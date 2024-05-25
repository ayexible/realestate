import { dbConnect } from "@/Connection/dataBase";
import UserSchema from "@/model/UserSchema";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


 dbConnect();
 export async function POST(request){
  try {
      const reqBody = await request.json()
      const {username, email, password} = reqBody

      console.log(reqBody);

      //check if user already exists
      const user = await UserSchema.findOne({email})

      if(user){
          return NextResponse.json({error: "email already exists"}, {status: 400})
      }

      //hash password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)

      const newUser = new UserSchema({
          username,
          email,
          password: hashedPassword
      })

      const savedUser = await newUser.save()
      console.log(savedUser);

      //send verification email

      
      return NextResponse.json({
          message: "User created successfully",
          success: true,
          savedUser
      },{status:200})
      
      


  } catch (error) {
      return NextResponse.json({error: error.message}, {status: 500})

  }
}