import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import DefaultGenres from './genres'
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    author: '',
    title: '',
    review: '',
    genres: DefaultGenres,
    poster: '',
    actors: '',
  });
  const post = useSelector((state) => (
    currentId ? state.posts.find((p) => p._id === currentId) : null
  ));

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      clear();
    } else {
      dispatch(createPost(postData));
      clear();
    }
  }

  const handleStarClick = (number) => {
    console.log(number)
    setPostData({ ...postData, stars: number});
  }

  const handleGenreClick = (genre) => {
    let tempObj = postData.genres;
    tempObj[genre] = !tempObj[genre];
    setPostData({ ...postData, genre: tempObj});
  }

  const clear = () => {
    console.log(DefaultGenres);
    setCurrentId(null);
    setPostData({
      author: '',
      title: '',
      review: '',
      genres: DefaultGenres,
      poster: '',
      actors: '',
      stars: 0,
    });
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Review Update' : 'New Review'}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <Grid container justify="space-around">
          {[...Array(5)].map((star, idx) => (
            (idx < postData.stars)
            ?
              <Star
                key={idx}
                color="primary"
                fontSize="large"
                onClick={() => handleStarClick(idx + 1)}
              />
            :
              <StarBorder
                key={idx}
                fontSize="large"
                onClick={() => handleStarClick(idx + 1)}
              />
          ))}
        </Grid>
        <TextField
          name="review"
          variant="outlined"
          label="Review"
          fullWidth
          value={postData.review}
          onChange={(e) => setPostData({ ...postData, review: e.target.value })}
        />
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={postData.author}
          onChange={(e) => setPostData({ ...postData, author: e.target.value })}
        />
        <TextField
          name="actors"
          variant="outlined"
          label="Actors"
          fullWidth
          value={postData.actors}
          onChange={(e) => setPostData({ ...postData, actors: e.target.value.split(',') })}
        />
        <Grid container justify="space-around">
          {Object.keys(postData.genres).map((genre, idx) => (
            <Button
            key={idx}
            className={classes.buttonGenre}
            variant={postData.genres[genre] ? "contained" :"outlined"}
            color={postData.genres[genre] ? "primary" : "secondary"}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </Button>
          ))}
        </Grid>
        <div className={classes.fileInput}>
          <h3>Movie Poster</h3>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({ ...postData, poster: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;