import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './pages/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StyledEngineProvider>,
);

reportWebVitals();
