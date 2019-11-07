import Link from 'next/link'
import React, { useState } from 'react';



const Prices = (props) => {

 const [prices,setPrices]= useState({curreny:'usd'});

return(

<div>
  <ul>
    <li>bitcoin rate for {props.bpi.bpi.USD.rate}</li>
  </ul>
</div>
);
 
};

export default Prices
