import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Notes from './pages/Notes';
import Login from './pages/Login';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Login />}>
      <Route path='/notes' element={<Notes />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
  </StyledEngineProvider>,
);

reportWebVitals();
