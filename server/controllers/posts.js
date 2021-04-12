import mongoose from 'mongoose';
import PostReview from '../models/postReview.js';

export const getPosts = async (req, res) => {
  try {
    const postReviews = await PostReview.find();
    res.status(200).json(postReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostReview(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }
  const updatedPost = await PostReview.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }
  await PostReview.findByIdAndRemove(id);
  res.json({ message: 'Post deleted' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }
  const post = await PostReview.findById(id);
  const updatedPost = await PostReview.findByIdAndUpdate(
    id, { likeCount: post.likeCount + 1 }, { new: true }
  );
  res.json(updatedPost);
}
