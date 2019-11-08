import React from 'react';
import App from 'next/app';
// import UserContext from '../components/UserContext';
import fetch from 'isomorphic-unfetch';
import Navbar from '../components/navbar';
import '../styles/styles.scss';
import '../styles/styles.css';
import Link from 'next/link';

class Layout extends React.Component {

    render () {
      const {tool,children} = this.props
      const data=Object.values(tool)
      return(
          <div>
              <Navbar></Navbar>
              <section className="columns" >
                  <div className="column is-2 has-padding-30 notification">
                      <aside className="menu columns is-fullheight" >
                          <ul className='menu-list' id="side-menu">
                              {data.map(x => (
                                                <li key={x.tool_id}>
                                                    <Link href="/tool/[id]" as={`/tool/${x.tool_id}`}>
                                                        <a>{x.tool_id}</a>
                                                    </Link>
                                                </li>
                                            )
                                        )}
                          </ul>
                      </aside>
                  </div>
                  <div className="column">
                      {children}
                  </div>
              </section>
            </div>
      )
    }
  }



class MyApp extends App {

static async getInitialProps({ Component, router, ctx }) {
let pageProps = {};

if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
}
const toolData = await fetch('http://sgpatsprod01:5000/distinctool');
// const toolData = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
const data = await toolData.json()
return { pageProps,data};
}

  render() {
    const { Component, pageProps,data} = this.props;
    return (
    //   <UserContext.Provider value={ {data:data} }>
      <Layout tool = {data}>
         <Component {...pageProps} />
      </Layout>
    //   </UserContext.Provider>
    );  }
}

export default MyApp;