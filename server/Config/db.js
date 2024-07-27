import mongoose from 'mongoose';
import colors from 'colors';
mongoose.set('strictQuery',false)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('connected successfully')
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;
