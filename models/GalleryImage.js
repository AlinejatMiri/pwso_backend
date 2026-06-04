import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: String,
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('GalleryImage', GalleryImageSchema);
