import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, CardActions, CardContent, Card, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontWeight } from '@mui/system';
import Common_header from '../Header/Common_header'
import GetAppIcon from '@mui/icons-material/GetApp';
import AddIcon from '@mui/icons-material/Add';
import { CreateNew, mnemonic } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'
import ImportWallet from './ImportWallet'
import SecretPhrase from './SecretePhrase';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
const userId = localStorage.getItem('UserId');
console.log(userId)
const message="hello"
const theme = createTheme({
    palette: {
        secondary: {
            main: '#fbbd18',
        },
    },
});
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>

);


const WalletSelect = () => {
    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));

    if (loginData == "") {
        // window.location.href = `${config.baseUrl}login/`;

    }
    else if (localStorage.getItem("HOME_PAGE")) {
        // window.location.href = `${config.baseUrl}home/`;
    }

    const [wallet, setWallet] = React.useState([])


    // const CreateNewWallet = async () => {
    //     let data = { userId: userId }

    //     let res = await CreateNew(data);
    //     console.log(res, "update in database")
    //     localStorage.setItem('address', res.data.wallet_address);

    //     localStorage.setItem('secretKey', res.data.key);

    //     setWallet(res)

    //     if (res.success) {
    //         toast.success(res.msg);

    //         setTimeout(() => {
    //             window.location.href = `${config.baseUrl}secret-phrase/` + userId;
    //         }, 1200);
    //     } else {
    //         toast.error(res.msg);
    //     }

    // }
    

    const CreateNewWallet = async () => {
     
        console.log("generate")

        let res = await mnemonic();
      
console.log(res, "kyyyyyyyy")
        localStorage.setItem('secretKey', res.data.mnemonic);

        setWallet(res)

        if (res.success) {
            //toast.success(res.msg);

            setTimeout(() => {
            // window.location.href = `${config.baseUrl}secret-phrase/` + userId;
            }, 1200);
        } else {
            toast.error(res.msg);
        }

    }
    return (
        <>
            <Toaster />

            <Common_header />
            <Container className='select-wallet'>
                <Grid item container xs={12} className="new-wallet"
                    justifyContent="center"
                    alignItems="center">
                    <Typography variant='h3' component="h3" >
                        New to LLC?
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={5}>
                        <Card sx={{ minWidth: 275, background: "black" }} className="wallet-cards">
                            <CardContent>
                                <GetAppIcon />
                                <Typography sx={{ fontSize: 18 }} gutterBottom>
                                    No, I already have a Secret Recovery Phrase
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Import your existing wallet using a Secret Recovery Phrase
                                </Typography>
                            </CardContent>
                            <CardActions
                            >
                                <ThemeProvider theme={theme} >
                                    <Button size="large" variant="contained" color='secondary' className='create-btn'>
                                        
                                        <Link component={ImportWallet} props={{ message }}>
                                        Import Wallet
    </Link> 
                                        {/* <Link to={`${config.baseUrl}import-wallet/` + userId}> Import wallet</Link> */}
                                    </Button>
                                    {/* <Button size="large" variant="contained" color='secondary' className='create-btn'>
                                        <Link to={`${config.baseUrl}import-wallet`}> Import wallet</Link>
                                    </Button> */}
                                </ThemeProvider>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={5}
                    >
                        <Card sx={{ minWidth: 275, background: "black" }} className="wallet-cards">
                            <CardContent>
                                <AddIcon />
                                <Typography sx={{ fontSize: 18 }} gutterBottom>
                                    Yes, let’s get set up!
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    This will create a new wallet and Secret Recovery Phrase
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ThemeProvider theme={theme} >
                                    <Button onClick={CreateNewWallet} size="large" variant="contained" color='secondary' className='create-btn'

                                    >
                                        <Link to="">Create Wallet</Link>
                                    </Button>


    <button onClick={() => goTo(SecretPhrase, { message })}>
secretKey    </button>
                                    {/* <Button size="large" variant="contained" color='secondary' className='create-btn'>
                                        <Link to={`${config.baseUrl}secret-phrase`}>Create Wallet</Link>
                                    </Button> */}
                                </ThemeProvider>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item sm={1}></Grid>
                </Grid>
            </Container>
        </>
    )
}
export default WalletSelect;