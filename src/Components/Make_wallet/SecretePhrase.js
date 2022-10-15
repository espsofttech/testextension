import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast, { Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
// import { saveAs } from "file-saver";
import Swal from 'sweetalert2'
import ConfirmPhrase from './ConfirmPhrase'
import Cookies from 'js-cookie'
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  import Login from './login';
  import Home from './Home';
import Common_header from '../Header/Common_header';
const message="kch b"
const SecretPhrase = () => {

    let phrase = localStorage.getItem("secretKey")

    const copyToClipboard = (id) => {
        copy(id);
        Swal.fire({
            icon: 'success',
            title: "Copied" ,
            buttonsStyling: false,

            customClass: {
                confirmButton: 'example-class' //insert class here
            }

              })
        // toast.success("Copied");
    }
    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));

    if (loginData == "") {
        goTo(Login, { message })

        // window.location.href = `${config.baseUrl}login/`;

    }
    else if (localStorage.getItem("HOME_PAGE")) {
        goTo(Home, { message })

        // window.location.href = `${config.baseUrl}home/`;
    }
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([phrase], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
        Swal.fire({
            icon: 'success',
            title: "File Downloaded" ,
            buttonsStyling: false,

            customClass: {
                confirmButton: 'example-class' //insert class here
            }

              })
      
    };
    const theme = createTheme({
        palette: {
            secondary: {
                main: '#fbbd18',
            },
        },
    });

    return (
        <>
            <Common_header />

            <Container >
                <Toaster />
                <Grid container item xs={12} my={3} className="import-wallet" >
                    <Grid item md={1}></Grid>
                    <Grid item md={10}>
                        <Grid item container>
                            <Grid item md={6}>
                                <Typography variant="h3" component="h3">
                                    Secret Recovery Phrase
                                </Typography>
                                <Typography sx={{ fontSize: 16, margin: "20px 0" }} gutterBottom>
                                    Your Secret Recovery Phrase makes it easy to back up and restore your account.
                                </Typography>
                                <Typography sx={{ fontSize: 16, margin: "20px 0" }} gutterBottom>
                                    WARNING: Never disclose your Secret Recovery Phrase. Anyone with this phrase can take your Ether forever.
                                </Typography>
                                <Box
                                    sx={{
                                        width: "90%",
                                        border: '1px solid grey',
                                        borderRadius: "10px",
                                        padding: "10px",
                                        wordBreak: "break-all"
                                    }}
                                >
                                    <Typography sx={{ fontSize: 16, margin: "10px 0" }} gutterBottom>
                                        {localStorage.getItem("secretKey")}
                                    </Typography>
                                    <Button onClick={e => copyToClipboard(phrase)}  variant="outlined">
                                        <ContentCopyIcon sx={{ fontSize: 16 }}/>
                                        <Typography sx={{fontSize: 12}}>
                                            copy
                                        </Typography>
                                    </Button>
                                </Box>
                                <Grid container item spacing={4} my={1}>
                                    <Grid item xs={7}>
                                        <Button onClick={downloadTxtFile} variant="outlined" size="large" className='create-btn'>
                                            Download  Phrase
                                        </Button>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {/* <Link to={`${config.baseUrl}secretKey`}> */}
                                            <ThemeProvider theme={theme} >
                                                {/* <Button href={`${config.baseUrl}secretKey`} variant="contained" color="secondary" size="large" className='create-btn'>
                                                Next
                                            </Button> */}
                                                <Button  variant="contained" color="secondary" size="large" className='create-btn' onClick={() => goTo(ConfirmPhrase, { message })}>
 Next
                                                </Button>

                                            </ThemeProvider>
                                        {/* </Link> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={1} ></Grid>
                            <Grid item md={5} >
                                <Typography sx={{ fontSize: 17, margin: "20px 0" }} gutterBottom>
                                    Tips:
                                </Typography>
                                <Typography sx={{ fontSize: 15, margin: "20px 0" }} gutterBottom>
                                    Store this phrase in a password manager like 1Password.
                                </Typography>
                                <Typography sx={{ fontSize: 15, margin: "20px 0" }} gutterBottom>
                                    Write this phrase on a piece of paper and store in a secure location. If you want even more security, write it down on multiple pieces of paper and store each in 2 - 3 different locations.
                                </Typography>
                                <Typography sx={{ fontSize: 15, margin: "20px 0" }} gutterBottom>
                                    Memorize this phrase.
                                </Typography>
                                <Typography sx={{ fontSize: 15, margin: "20px 0" }} gutterBottom>
                                    <Link to="#">
                                        Download this Secret Recovery Phrase and keep it stored safely on an external encrypted hard drive or storage medium.
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={1}></Grid>
                </Grid>
            </Container>

        </>
    )
}
export default SecretPhrase;