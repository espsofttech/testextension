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
import {Routes, Route} from 'react-router-dom'
import Test from './Components/test'
import Sample from './Components/test'

// import CircularProgress from '@mui/material/CircularProgress';

function Tabs() {
  return (
    <> 
<Routes>
    <Route path='/' element={Test}/> 
    <Route path='/sample' element={Sample}/> 

    </Routes>     
     </>

  )
}

export default Tabs;
