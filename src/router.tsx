import { createBrowserRouter } from 'react-router-dom';
import FilterPage from './pages/FilterPage';
import { filterLoader } from './pages/FilterLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FilterPage />,
    loader: filterLoader,
  },
]);
