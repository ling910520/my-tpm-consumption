import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';


class MyApp extends App {

static async getInitialProps({ Component, router, ctx }) {
let pageProps = {};

if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
}
const availabilityData = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
const data = await availabilityData.json()
return { pageProps,data};
}

  render() {
    const { Component, pageProps,data} = this.props;
    console.log(data.disclaimer)
    return (
      <UserContext.Provider value={ {data:data.disclaimer} }>
        <Component {...pageProps} />
      </UserContext.Provider>
    );  }
}

export default MyApp;