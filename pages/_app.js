import 'tailwindcss/tailwind.css'
import Router from 'next/router'
import { parseCookies } from 'nookies';
import { UserProvider } from '../contexts/userContext';
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <Navbar></Navbar>
      <ToastContainer/>
      <Component {...pageProps} />
    </UserProvider>
  )
}




function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}


MyApp.getInitialProps = async ({ ctx }) => {
  const jwt = parseCookies(ctx).jwt
  if (!jwt) {
    if (ctx.pathname !== "/" && ctx.pathname !== '/register') {
      redirectUser(ctx, "/");
      ctx.res.end();
    }
  }
  if (jwt) {
    if (ctx.pathname === "/") {
      redirectUser(ctx, "/notes");
      ctx.res.end();
    }
  }
  return {

  }
}

export default MyApp
