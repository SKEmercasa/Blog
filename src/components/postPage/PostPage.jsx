import Markdown from 'react-markdown';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSlug } from '../../redux/postSlice';
import PostItem from '../postItem/PostItem';

import './postPage.scss';

const PostPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(({ posts }) => posts.post);

  useEffect(() => {
    dispatch(getSlug(slug));
  }, [dispatch]);

  return (
    post && (
      <section>
        <PostItem {...post} />
        <Markdown className="post_content">{post?.body}</Markdown>
      </section>
    )
  );
};

export default PostPage;
