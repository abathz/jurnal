import React from 'react';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../src/redux';
import Head from 'next/head';
import NextSEO from 'next-seo';
import SEO from '../src/seo.config';
import '../src/assets/scss';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

interface Props {
    Component: any;
    pageProps: any;
    router: any;
}

class MyApp extends App<Props, {}> {
    render() {
        const { Component, pageProps, router } = this.props;
        return (
            <Container>
                <Head>
                    <title>NextJS</title>
                </Head>
                <NextSEO config={SEO} />
                <Provider store={store}>
                    <Component {...pageProps} router={router} />
                </Provider>
            </Container>
        );
    }
}

export default withRouter(MyApp);
