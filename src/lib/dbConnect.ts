import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('⚠️ Please define the MONGODB_URI environment variable.');
}

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'tradingDB',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}
