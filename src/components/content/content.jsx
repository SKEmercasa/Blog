import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../redux/postSlice';
import PostItem from '../postItem/PostItem';

const Content = () => {
  const wrapper = {
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    minHeight: '90vh',
    flexDirection: 'column',
    padding: '20px',
  };

  const list = {
    padding: '20px 20px 0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const etc = useSelector((state) => state.posts.etc);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [dispatch, page]);
  return (
    posts && (
      <div style={wrapper}>
        <ul style={list} className="lol">
          {posts &&
            posts.map((post) => (
              <li key={post.slug}>
                <PostItem {...post} />
              </li>
            ))}
        </ul>
        <Pagination
          count={etc.articlesCount ? Math.ceil(etc.articlesCount / 5) : 0}
          style={{ paddingBottom: 20 }}
          page={page}
          color="primary"
          shape="rounded"
          onChange={(e, numberOfPage) => setPage(numberOfPage)}
        />
      </div>
    )
  );
};

export default Content;
