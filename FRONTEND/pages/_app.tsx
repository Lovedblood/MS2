import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// types
import type { AppProps } from "next/app";

// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <ToastContainer />
    <Component {...pageProps} />
  </Fragment>
);

export default MyApp;
