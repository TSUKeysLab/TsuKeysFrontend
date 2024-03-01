import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Router from './router/router';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </QueryClientProvider>
);