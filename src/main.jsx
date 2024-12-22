import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto' >
          <RouterProvider router={router} />
          {/* <ToastContainer /> */}
          <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
      </HelmetProvider>
    </QueryClientProvider>

  </React.StrictMode>,

)
