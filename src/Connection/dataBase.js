import mongoose from "mongoose";

export async function dbConnect(){
    try{
          mongoose.connect(process.env.MONGO_URI);
          const connection= mongoose.connection;
           

          connection.on('connected', ()=>{
            console.log('MongoDB connected Successfully');
          })
          connection.on('error', (err)=>{
            console.log("Connection error, Make sure MongoDb is running", err);
            process.exit();
          })

    } catch(error)
    {
        console.log('Something went wrong!', error);
        
    }
}