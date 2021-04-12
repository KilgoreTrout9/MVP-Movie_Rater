import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Star from '@material-ui/icons/Star';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.poster} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.author}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{color: 'white'}}
          size="small"
          onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.overlay3}>
        {[...Array(post.stars)].map((star, idx) => (
          <Star key={`${post._id} + ${idx}`} style={{color: 'white'}} />
        ))}
      </div>
      <Typography
        className={classes.title}
        variant="h5">
          {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body1"
          color="textPrimary"
          component="p"
          gutterBottom>
            {post.review}
        </Typography>
      </CardContent>
      <div className={classes.details}>
        <Typography
          variant="body2"
          color="textPrimary">
            {post.actors.map((actor) => (
              <div>{actor}</div>
            ))}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography
          variant="body2"
          color="primary">
            {Object.keys(post.genres).map((genre) => (
              post.genres[genre] ? `${genre} ` : null
            ))}
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;