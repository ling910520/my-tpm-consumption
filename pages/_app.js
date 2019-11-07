import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';


class MyApp extends App {
  state = {
    user: null
  };
  constructor(props) {
    super(props);

    /*
    by creating a constructor here it will do the following:
    const I18nStore = new I18n(props.i18nState);
    window["I18nStore"] = I18nStore;
    */
  }

componentDidMount = async function ali(){
  const res =  await fetch 
  ('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await res.json();

this.setState({
user: data
})

    // return{
      //     bpi:"ali"
      // }
  };
  


  render() {
    const { Component, pageProps } = this.props;
    console.log(this.state.disclaimer)
    return (
      <UserContext.Provider value={ {data:"ali"} }>
        <Component {...pageProps} />
      </UserContext.Provider>
    );  }
}

export default MyApp;