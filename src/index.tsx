import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import NotesBoard from './pages/NotesBoard';
import Login from './pages/Login';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Login />}>
      <Route path='/notes' element={<NotesBoard deauthenticate={() => undefined} />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
  </StyledEngineProvider>,
);

reportWebVitals();
