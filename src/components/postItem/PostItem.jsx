import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Box, Button, Checkbox, Modal, Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { deleteLike, deletePost, postLike } from '../../redux/postSlice';

const PostItem = ({ title, description, tagList, author, updatedAt, favorited, favoritesCount, slug, showBtn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);
  const [like, setLike] = useState(favorited);
  const [open, setOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(favoritesCount);

  const onLikes = (e, slug) => {
    setLike(e.target.checked);
    if (e.target.checked) {
      dispatch(postLike(slug));
      setLikesCount(likesCount + 1);
    } else {
      dispatch(deleteLike(slug));
      setLikesCount(likesCount - 1);
    }
    setLike(e.target.checked);
  };

  const onDelete = () => {
    dispatch(deletePost(slug)).then(() => navigate('/'));
  };

  return (
    <header className="post_header">
      <section className="post_header_info">
        <p>
          <Link className="post_header_title" to={`/${slug}`}>
            {title}
          </Link>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={like}
            onChange={(e) => onLikes(e, slug)}
            color="warning"
            disabled={!user}
          />
          <span>{likesCount}</span>
        </p>

        <ul className="post_header_tags">
          {tagList &&
            tagList.map((tag, i) => {
              if (tag.trim()) {
                return (
                  <li key={i}>
                    <span className="post_header_tag">{tag}</span>
                  </li>
                );
              }
            })}
        </ul>

        <p className="post_header_desc">{description}</p>
      </section>
      <div className="post_block">
        <section className="post_data">
          <article className="post_data_autor">
            <span className="post_data_autor_name">{author.username}</span>
            <span className="post_data_autor_date">{format(parseISO(updatedAt), 'MMMM d, yyyy')}</span>
          </article>
          {author.image && <Avatar alt={author.username} src={author.image} />}
        </section>
        {showBtn && author.username === user?.username && (
          <section className="post_data_btns">
            <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
              Delete
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} aria-describedby="modal-description">
              <Box className="modal">
                <Typography id="modal-description">Are you sure to delete this article?</Typography>
                <div className="modal_btns">
                  <Button variant="outlined" onClick={() => setOpen(false)}>
                    No
                  </Button>
                  <Button variant="contained" style={{ marginLeft: '10px' }} onClick={onDelete}>
                    Yes
                  </Button>
                </div>
              </Box>
            </Modal>
            <Button variant="outlined" color="success">
              <Link to={`/${slug}/edit`}>Edit</Link>
            </Button>
          </section>
        )}
      </div>
    </header>
  );
};

export default PostItem;
