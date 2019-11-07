import Link from 'next/link'
import React, { useState,useContext} from 'react';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import {  } from 'react';



const About = (props) => {

    const { data } = useContext(UserContext);

return(
<Layout>
    <div>
    <ul>
        <li>bitcoin rate from _appjs {data}</li>
    </ul>
    </div>
 </Layout>

);
 
};

export default About
