import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Faq', FaqSchema);
