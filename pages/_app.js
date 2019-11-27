import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default class MyApp extends App {
  state = {
    user: null
  };

  componentDidMount = () => {
    const user = localStorage.getItem('coolapp-user');
    if (user) {
      this.setState({
        user
      });
    } else {
      Router.push('/signin');
    }
  };

  signIn = (username, password) => {
    localStorage.setItem('coolapp-user', username);

    this.setState(
      {
        user: username
      },
      () => {
        Router.push('/');
      }
    );
  };

  signOut = () => {
    localStorage.removeItem('coolapp-user');
    this.setState({
      user: null
    });
    Router.push('/signin');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}