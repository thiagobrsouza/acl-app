import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
