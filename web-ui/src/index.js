import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  useParams
} from "react-router-dom";
import Root from './routes/root';
import Homepage from './routes/homepage';
import Errorpage from './routes/errorpage';
import LoginPage from './routes/login';
import MenuView from './components/menuView';
import ReviewForm from './components/reviewForm'
import ReviewView from './components/reviewView'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<Errorpage />}
    >
      <Route errorElement={<Errorpage />}>
        <Route index element={<Homepage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='/menu/:date' element={<MenuViewWithDate />} />
        <Route path='/reviews/:id' element={<ReviewViewWithID />} /> 
        <Route path='/reviews/:id/create' element={<ReviewFormWithID />} /> 
      </Route>
    </Route>
  )
);

function MenuViewWithDate(){
  let params = useParams();

  return (
    <MenuView date={params.date} />
  )
}

function ReviewViewWithID(){
  let params = useParams();
  return (
    <ReviewView id={params.id} />
  )
}

function ReviewFormWithID(){
  let params = useParams();
  return (
    <ReviewForm id={params.id} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();