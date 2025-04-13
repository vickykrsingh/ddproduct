import mongoose from 'mongoose';
mongoose.set('strictQuery',false)
 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('connected successfully')
    } catch (error) {
        console.log(error.message,"this is the error")
    }
}

export default connectDB;
