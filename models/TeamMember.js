import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  imageUrl: String,
  bio: String,
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('TeamMember', TeamMemberSchema);
