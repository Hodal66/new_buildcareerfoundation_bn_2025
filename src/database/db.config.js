import 'dotenv/config'
import mongoose from 'mongoose'

// add your own uri below
const uri = process.env.DATABASE_CONNECTION_STRING;

export const connect = async ()=> {
    try {
        //MONGODB CONNECTION
        if (uri) {
            await mongoose.connect(uri);
        }
        console.log(uri);
    } catch (error) {
        console.log(`Database connection error: ${error}`)
        process.exit(1)
    }
}
