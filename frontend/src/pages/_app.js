import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
