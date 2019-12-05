import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
import fetch from 'isomorphic-unfetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const faawesome = () => {
  return (  


  
    <div>
    <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>

    </div>


  )
}


export default faawesome;