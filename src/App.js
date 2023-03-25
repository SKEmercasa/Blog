import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Content from './components/content/content';
import Profile from './components/profile/Profile';
import RequireAuth from './assets/hoc/auth';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import PostPage from './components/postPage/PostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="/:slug" element={<PostPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
