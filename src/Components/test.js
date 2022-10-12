/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, Typography, Checkbox, Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
// import { fontWeight } from '@mui/system';
// import { SignUp } from '../Action/action';
// import toast, { Toaster } from 'react-hot-toast';
// import config from '../../config/config';
// import Cookies from 'js-cookie'
// import { Link } from 'react-router-dom';
// import axios from 'axios'
// import Common_header from '../../Header/Common_header'
// import Swal from 'sweetalert2'
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  import Sample from './sample'
// import CircularProgress from '@mui/material/CircularProgress';
const message="welcome"
function Test() {
  return (
    <> 
<h1>test page</h1>
<button onClick={() => goTo(Sample, { message })}>
 test page
    </button>      </>

  )
}

export default Test;
