import React, { useState } from 'react';
import Link from 'next/link';
import { object } from 'prop-types';
import fetch from 'isomorphic-unfetch';


const SideMenu = (props) => {
return(
<aside className="menu colums is-fullheight" >
<ul>
      {props.data.map(show => (
        <li key={show.id}>
            <a>{show.id}</a>
        </li>
      ))}
    </ul>
</aside>
);
};

SideMenu.getInitialProps = async function() {
  const res = await fetch('http://sgpatsprod01:8080/tpmtestdata');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    data
  };
}
export default SideMenu;