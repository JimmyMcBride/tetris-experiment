import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
// import { ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";
// import theme from "../src/theme";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
// import styled from "styled-components";
import rootReducer from "../store";
import { AppWrapper } from "bushido-strap";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Provider store={store}>
          {/* <ThemeProvider theme={theme}> */}
          {/* <CssBaseline /> */}
          <AppWrapper className="app">
            <Component {...pageProps} />
          </AppWrapper>
          {/* </ThemeProvider> */}
        </Provider>
      </>
    );
  }
}
