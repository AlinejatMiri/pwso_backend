import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import Post from './models/Post.js';
import projectsRouter from './routes/projects.js';
import blogRouter from './routes/blog.js';
import galleryRouter from './routes/gallery.js';
import faqsRouter from './routes/faqs.js';
import partnersRouter from './routes/partners.js';
import teamRouter from './routes/team.js';
import contactRouter from './routes/contact.js';
import uploadRouter from './routes/upload.js';
import adminProjectsRouter from './routes/admin/projects.js';
import adminBlogRouter from './routes/admin/blog.js';
import adminGalleryRouter from './routes/admin/gallery.js';
import adminFaqsRouter from './routes/admin/faqs.js';
import adminPartnersRouter from './routes/admin/partners.js';
import adminTeamRouter from './routes/admin/team.js';
import adminContactRouter from './routes/admin/contact.js';
import adminAuthRouter from './routes/admin/auth.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/posts", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.use('/api/projects', projectsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/team', teamRouter);
app.use('/api/contact', contactRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/admin/projects', adminProjectsRouter);
app.use('/api/admin/blog', adminBlogRouter);
app.use('/api/admin/gallery', adminGalleryRouter);
app.use('/api/admin/faqs', adminFaqsRouter);
app.use('/api/admin/partners', adminPartnersRouter);
app.use('/api/admin/team', adminTeamRouter);
app.use('/api/admin/contact', adminContactRouter);
app.use('/api/admin/auth', adminAuthRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
