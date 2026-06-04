import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: String,
  description: String,
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Partner', PartnerSchema);
