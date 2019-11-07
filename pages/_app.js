import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{ id: '123' }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );  }
}

export default MyApp;