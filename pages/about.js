import Link from 'next/link'
import React, { useState,useContext} from 'react';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import {  } from 'react';



const About = (props) => {

    const { id } = useContext(UserContext);

return(
<Layout>
    <div>
    <ul>
        <li>about  {id}</li>
    </ul>
    </div>
 </Layout>

);
 
};

export default About
