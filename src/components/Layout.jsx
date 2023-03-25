import { Outlet } from 'react-router-dom';

import Header from './header/Header';

import './Layout.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
