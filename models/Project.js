import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: String,
  imageUrl: String,
  shortDesc: String,
  description: String,
  impact: String,
  fullDescription: String,
  stats: [{ label: String, value: String }],
  objectives: [String],
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
