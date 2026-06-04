import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  imageUrl: String,
  date: String,
  category: String,
}, { timestamps: true });

export default mongoose.model('BlogPost', BlogPostSchema);
