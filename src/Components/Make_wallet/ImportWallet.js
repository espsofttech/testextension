import React, { useEffect, useState, useParams } from 'react';
import { Container, Grid, Typography, Button, InputLabel, MenuItem, Box, FormControl, TextField, Checkbox } from '@mui/material';
import Common_header from '../Header/Common_header';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  import Home from './Home';
import { importWAllet } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'
import Login from './login';
const message="msg"

const ImportWallet = () => {
    const [loader, setLoader] = useState(false)

    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));

    if (loginData == "") {
        goTo(Login, { message })

        // window.location.href = `${config.baseUrl}login/`;

    }
    else {
        //  window.location.href = `${config.baseUrl}select-wallet/`+userId;

    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [age, setAge] = React.useState('');
    const [form, setForm] = useState("");
    const mnemonic = (Object.values(form))
    const matchKey=[mnemonic]

    const userId = localStorage.getItem('UserId');
    console.log(userId)
 
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

    }

    // const inputHandler = async (e) => {
    //     const { name, value } = e.target
    //     console.log(form)
    //     if (value.split(',').length > 1) {
    //         let ArrData = form;
    //         value.split(',').map((item) => {
    //             ArrData.push(item);
    //         })
    //         setForm(ArrData)
    //     } else {
    //         setForm((old) => {
    //             return { ...old, [name]: value }
    //         })
    //     }

    // }



    const SubmitForm = async (e) => {
        let data = { mnemonic: mnemonic, userId: userId }
        console.log(mnemonic,">>>")

       let x=mnemonic.toString()
       let y=x.split(",")

console.log(y.length,"xx")
        setLoader(true)

        if(y.length==24){
            let res = await importWAllet(data);
            setLoader(false)

            console.log(res, "imported wallet response")
            if (res.success==true && res.data.address) {
    
                localStorage.setItem('address', res.data.address);
                localStorage.setItem('NAME', 'Account 1');
                localStorage.setItem('Fingerprint', res.data.FingerPrint);

                console.log("new", res.data.address)
    
            }
            else if (res.success==true && res.data.wallet_Address) {
                setLoader(false)

                localStorage.setItem('address', res.data.wallet_Address);
                localStorage.setItem('NAME', 'Account 1');
                localStorage.setItem('Fingerprint', res.data.FingerPrint);

                console.log("old", res.data.wallet_Address)
    
    
            }
            if (res.success) {

                console.log(res, "+++++++")
                setLoader(false)

                // toast.success(res.msg);
                Swal.fire({
                    icon: 'success',
                    title: res.msg ,
                    buttonsStyling: false,

                    customClass: {
                        confirmButton: 'example-class' //insert class here
                    }
                                    

    
                      })
                setTimeout(() => {
                    goTo(Home, { message })

                //    window.location.href = `${config.baseUrl}home`;
                }, 2000);
            } else {
                setLoader(false)
                console.log(res.msg)
                // toast.error(res.msg);
                Swal.fire({
                    icon: 'error',
                    title: res.msg ,
                    buttonsStyling: false,

                    customClass: {
                        confirmButton: 'example-class' //insert class here
                    }
                      })
            }
    
        }
        else{
            Swal.fire({
                icon: 'error',
                title: "24 words Phrase Required" ,
                buttonsStyling: false,

                customClass: {
                    confirmButton: 'example-class' //insert class here
                }

                  })
            setLoader(false)
        }
   

    }

    const handleChange = (event) => {
        setAge(event.target.value);
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
            {/* {loader ?
                <Box sx={{ display: 'flex', marginLeft: '700px', marginTop: "330px" }}>
                    <CircularProgress /><p style={{ color: "blue" }}>Processeing...</p>
                </Box> : */}
                <Container>
                    <Grid container item my={3} className="import-wallet">
                        <Grid item xs={12}>
                            <Typography variant='h3' component="h3" >
                                Import a wallet with Secret Recovery Phrase
                            </Typography>
                            <Typography sx={{ fontSize: 16, margin: "20px 0" }} gutterBottom>
                                Only the first account on this wallet will auto load. After completing this process, to add additional accounts, click the drop down menu, then select Create Account.
                            </Typography>
                            <Grid item container>
                                <Grid item xs={6}>
                                    <Typography variant='h6' component="h6" sx={{ marginTop: "10px" }}>
                                        Secret Recovery Phrase
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">I have a 24-word phrase</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="I have a 24-word phrase"
                                                onChange={handleChange}
                                                className='select-phrase'
                                            >
                                                <MenuItem value={10}>I have a 24-word phrase</MenuItem>
                                                {/* <MenuItem value={20}>I have a 16-word phrase</MenuItem>
                                            <MenuItem value={30}>I have a 178-word phrase</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container my={3} spacing={3} className="private-key">
                                <Grid item sm={12}>

                                    <TextareaAutosize
                                        minRows={10}
                                        aria-label="maximum height"
                                        placeholder="Paste Your Already existing Secret Phrase here... "
                                        onChange={inputHandler}
                                        name='form'
                                        className='import-area'
                                    />

                                    {/* 1. <TextField id="outlined-basic"  style={{height:"100px"}} autocomplete="off" variant="outlined" onChange={inputHandler} name="one" value={form.one} /> */}
                                </Grid>
                            </Grid>
                        
                            <Grid container item mt={5} className="private-password">
                                <Grid container item md={7} rowSpacing={2}>
                                <Grid item xs={6}>
                                        <ThemeProvider theme={theme} >
                                            {/* <Link to={`${config.baseUrl}select-wallet/` + userId}> */}
                                                {/* <Button href={`${config.baseUrl}select-wallet/`+userId} style={{marginLeft:"10px"}} onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn'>
                                            Back
                                        </Button> */}
                                          <Link onClick={() => goBack()}>
                                                <Button  variant="contained" color="secondary" size="large" className='create-btn'>
                                              Back
                                                </Button>
                                                </Link>   

                                            {/* </Link> */}
                                        </ThemeProvider>

                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* <Link to={`${config.baseUrl}home`} > */}
                                        <ThemeProvider theme={theme} >
                                     {loader?   <Button style={{ marginLeft: "10px" }} onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn loader'>
                                        <CircularProgress className='process'/>Processeing...

                                            </Button>:

                                            <Button style={{ marginLeft: "10px" }} onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn'>
                                                Import
                                            </Button>
}
                                            {/* <Button variant="contained"   color="secondary" size="large" className='create-btn'>
                                          Import 
                                        </Button>
                                        */}

                                        </ThemeProvider>
                                        {/* </Link> */}

                                    </Grid>

                                 

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Container>
            
        </>
    )
}
export default ImportWallet
