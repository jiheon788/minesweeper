import { Navigate } from 'react-router-dom';
import RouterMeta from '@/meta/RouterMeta';

const HomePage = () => {
  return <Navigate to={RouterMeta.GamePage.path} replace={true} />;
};

export default HomePage;
