import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default Layout;
