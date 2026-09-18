import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import Home from './pages/Home';

export function Root() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default Root;
