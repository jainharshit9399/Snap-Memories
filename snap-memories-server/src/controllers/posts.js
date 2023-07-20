import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import cloudinary from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  // console.log(post);
  let uploadResponse;
  try {
    const fileStr = post.selectedFile;

    if (!fileStr) return res.status(204).send('No File Selected');

    uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: process.env.CLOUDINARY_FOLDER,
    });
    // console.log(uploadResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Image not saved to Cloudinary' });
  }

  const newPost = { ...post, selectedFile: uploadResponse.public_id };
  // console.log(newPost);
  const newPostMessage = new PostMessage({
    ...newPost,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    if (!updatedPost) return res.status(404).send('Post not found');
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await PostMessage.findByIdAndRemove(id);
    if (!post) return res.status(404).send('Post not found');

    res.status(200).json({ message: 'Post Deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
