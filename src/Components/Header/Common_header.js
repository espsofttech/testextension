import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import SideHeader from './SideHeader';
import logo from '../images/logo.png'
import Cookies from 'js-cookie'
import Login  from '../Make_wallet/login';
// import config from '../config/config';
import { display } from '@mui/system';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

  const message="cdgdg"
const Common_header = () => {

    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));



    function logout() {
        Cookies.remove('loginSuccess');
        Cookies.remove('logintowallet')
        window.localStorage.removeItem("address");
        window.localStorage.removeItem("UserId");
        window.localStorage.removeItem("secretKey");
        window.localStorage.removeItem("HOME_PAGE");
        window.localStorage.removeItem("NAME");

        window.localStorage.removeItem("Fingerprint")



        setTimeout(() => {
            goTo(Login, { message })

            // window.location.href = `${config.baseUrl}login`
        });
    }
    return (
        <>
            {loginData == "" ?
                <Grid container item
                    className={"header"} sx={{
                        backgroundColor: '#040c12'
                    }} >
                    <Grid item md={6} >
                        <Box sx={{
                           display:'flex'
                        }}>
                            <img src={logo} />
                            <Typography variant="h4" component="h3" >
                                Little Lambo
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Grid container item
                    className={"header"} sx={{
                        backgroundColor: '#040c12'
                    }} >
                    <Grid item md={6} >
                    <Box sx={{
                           display:'flex'
                        }}>
                            <img src={logo} />
                            <Typography variant="h4" component="h3" >
                                Little Lambo
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item md={6}
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="end"
                    >
                        <Button onClick={logout} variant="contained" className='logout'>Logout</Button>

                    </Grid>
                </Grid>
            }
        </>
    )
}
export default Common_header;