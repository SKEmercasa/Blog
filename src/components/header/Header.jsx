import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getUser, onLogOut } from '../../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const onClickHandler = () => {
    dispatch(onLogOut());
  };
  return (
    <header>
      <Link to="/">Realworld Blog</Link>
      <section>
        <Link to="/new-article"></Link>
        {!user ? (
          <section className="header_login">
            <Link to="/login" className="header_login_signIn" state={{ from: location }}>
              Sign In
            </Link>
            <Link to="/registration" className="header_login_signUp">
              Sign Up
            </Link>
          </section>
        ) : (
          <section className="header_login">
            <Link className="header_login_createPost" to="/new-article">
              Create article
            </Link>
            <article className="header_login_user" onClick={() => navigate('/edit-profile')}>
              <span className="header_login_user_name">{user.username}</span>
              <Avatar alt={user.username} src={user.image} />
            </article>
            <Link className="header_login_logOut" onClick={onClickHandler}>
              Log Out
            </Link>
          </section>
        )}
      </section>
    </header>
  );
};

export default Header;
