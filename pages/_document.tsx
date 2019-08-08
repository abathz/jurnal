import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
