
// pages/_app.js
// import "@/src/app/globals.css"; // adjust path if needed
import '../styles/globals.css';
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
