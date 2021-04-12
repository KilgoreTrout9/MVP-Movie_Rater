import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  poster: String,
  review: String,
  stars: {
    type: Number,
    default: 0
  },
  genres: {},
  actors: [String],
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const PostReview = mongoose.model('PostReview', postSchema);

export default PostReview;
