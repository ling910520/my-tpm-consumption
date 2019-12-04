import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';
import fetch from 'isomorphic-unfetch'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default class MyApp extends App {
  state = {
    user: null,
    userFullName: null,
  };

  componentDidMount = async () => {
    const apiUrl = 'http://sgpfaapps01:3004/'
    const options = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // express NTLM to authenticate user
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const returnedData = await response.json()
      const { UserName } = returnedData
      // const user = localStorage.getItem('coolapp-user');
      localStorage.setItem('user', UserName);

      // function to get user AD details 
      const getUserADDetails = `http://sgpatsprod01:4003/getUserADDetails/${UserName}`
      const userDetailsResponse = await fetch(getUserADDetails)
      if (userDetailsResponse.ok) {
        const ADDetails = await userDetailsResponse.json()
        const displayName = ADDetails.entries[0].attributes.displayName
        this.setState({
          userFullName: displayName
        });
      }
      if (UserName) {
        this.setState({
          user: UserName
        });
      } else {
        alert('Not Domain user') // need push user to sign in pages if not domain user
      }
    }

  };
  // sign in through user AD details
  signIn = async (username, password) => {
    const signInUrl = `http://sgpatsprod01:4003/getUserADDetails/signin`
    const res = await fetch(signInUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid: username, pwd: password })
    });
    // const resstatus = await res.status;
    // function to get user AD details 
    if (res.ok) {
      const ADDetails = await res.json()
      const displayName = ADDetails.entries[0].attributes.displayName
      this.setState({
        user:username,
        userFullName: displayName
      });
      localStorage.setItem('user', username);
      Router.push('/');

    } else {
      alert('Sign In Failed')
      Router.push('/signin');

    }


  };

  signOut = () => {
    localStorage.removeItem('user');
    this.setState({
      user: null,
      userFullName: null,

    });
    Router.push('/signin');
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut, userFullName: this.state.userFullName }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}