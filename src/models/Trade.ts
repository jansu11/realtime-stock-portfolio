import mongoose , {Schema,Document} from "mongoose";

export interface ITrade extends Document {
  symbol : string; 
  price: number; 
  quantity: number; 
  date: Date;

}

const TradeSchema = new Schema<ITrade>({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Trade || mongoose.model<ITrade>("Trade", TradeSchema);
