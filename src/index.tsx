import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Notes from './components/Notes';
import { StyledEngineProvider } from '@mui/material/styles';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Notes />} />
  )
);

ReactDOM.createRoot( document.getElementById( "root" )! ).render(
  <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
  </StyledEngineProvider>
);

reportWebVitals();
