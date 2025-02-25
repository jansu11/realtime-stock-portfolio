// pages/api/trades.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Trade from '@/models/Trade';  // Import the Trade model
import { dbConnect } from '@/lib/dbConnect';  // Import the DB connection function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect(); // Ensure MongoDB is connected

    if (req.method === 'POST') {
        try {

            console.log("incoming data : ", req.body)
            const { symbol , quantity  , price  } = req.body;

            if (!symbol ||   !price || !quantity) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Create a new trade using the model
            const trade = await Trade.create({ symbol , price, quantity });

                        // Emit the trade update via WebSocket

            return res.status(201).json({ message: 'Trade saved successfully', trade });
        } catch (error) {
            console.error('Error saving trade:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const trades = await Trade.find().sort({ date: -1 }); // Get all trades sorted by date (newest first)
            return res.status(200).json(trades);
        } catch (error) {
            console.error('Error fetching trades:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
