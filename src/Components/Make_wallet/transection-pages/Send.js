import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import config from '../../config/config';
import { SendTransaction } from '../../Action/action';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

import Common_header from '../../Header/Common_header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  import Home from '../Home';
  const message="msg"
const theme = createTheme({
    palette: {
        secondary: {
            main: '#fbbd18',
        },
    },
});

let Fingerprint=localStorage.getItem("Fingerprint")
const Send = (props) => {

    const [form, setForm] = useState({ amount: "", address: "" });
    const [validatioError, setvalidatioError] = useState({});
    const [loader, setLoader] = useState(false)

    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

    }

    function validate() {
        let amountError = "";
        let addressError = ""

        if (form.amount === '') {
            amountError = "amount is required."
        }
        if (form.amount <1) {
            amountError = "Minimum 1 LLC is required"
        }
        if (form.address === '') {
            addressError = "address is required."
        }


        if (amountError || addressError) {
            setvalidatioError({
                amountError, addressError
            })
            return false
        } else {
            return true
        }
    }

    const SubmitForm = async (e,id=null) => {
        
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {

        }
        else {
            setLoader(true)
          
       if(form.amount<=props.sendBalance){
       let res = await SendTransaction({amount:parseInt(form.amount), address:form.address, Fingerprint:Fingerprint});
       console.log({amount:parseInt(form.amount), address:form.address, ingerprint:Fingerprint},"form")
       if (res.success) {
           setLoader(false)

           console.log('transaction send')
           toast.success(res.msg);

           setTimeout(() => {
            goTo(Home, { message })

            //    window.location.href = `${config.baseUrl}home`;


           }, 1200);
       } else {
           setLoader(false)

           console.log('transaction not  send')
           console.log(res, "==================")
           if(res.data.error!==""){
               toast.error(res.data.error);

           }
           else{
               toast.error(res.msg);

           }
       }
    }
    else{
        setLoader(false)

        toast.error("Insufficient Balance")

    }
        }
    }
    return (
        <>
            <Grid item xs={12} className="receive-wallet" >
                <Typography variant="h3" component="h3" className='text-center'>
                    Send
                </Typography>
                {/* <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={top100Films.map((option) => option.title)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search input"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                /> */}
            </Grid>
            <Grid container item rowSpacing={2}>
                <Grid item lg={4} xs={12}>
                    <Typography  gutterBottom className='form-p'>
                        Amount:
                    </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="number"
                        id="fullWidth"
                        onChange={inputHandler}
                        name="amount" value={form.amount}
                        InputProps={{
                            readOnly: false,
                        }}
                        
                    />
                                                        <span style={{ color: 'red' }} className="validationErr">{validatioError.amountError}</span>

                </Grid>
                {/* <Grid item xs={4}>
                    <Typography  gutterBottom>
                        Fee:
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        id="fullWidth"
                        type="number"
                        size="small"
                        onChange={inputHandler}
                        name="fee" value={form.fee}
                        InputProps={{
                            readOnly: false,
                        }}
                    />
                </Grid> */}
                <Grid item lg={4} xs={12}>
                    <Typography  gutterBottom className='form-p'>
                        Address:
                    </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                    <TextField
                        fullWidth
                        id="fullWidth"
                        size="small"
                        onChange={inputHandler}
                        name="address" value={form.address}
                        InputProps={{
                            readOnly: false,
                        }}
                    />
                                                        <span style={{ color: 'red' }} className="validationErr">{validatioError.addressError}</span>

                </Grid>
            </Grid>
            <Grid container item mt={3} spacing={2}>
                <Grid item xs={6}>
                {/* <Link to={`${config.baseUrl}home`}> */}
                    <ThemeProvider theme={theme} >
                   
                        <Button onClick={props.closeCancle} variant="outlined" fullWidth color="primary" size="large" className='create-btn '>
                            Cancel
                        </Button>
                       
                    </ThemeProvider>
                    {/* </Link> */}
                </Grid>
                <Grid item xs={6}>
                    <ThemeProvider theme={theme} >
                        {loader ? <Button onClick={SubmitForm}
                            fullWidth variant="contained" color="secondary" size="large" className='create-btn loader'>
                            <CircularProgress className='process'/>Processeing...
                        </Button> :
                            <Button onClick={SubmitForm}
                                fullWidth variant="contained" color="secondary" size="large" className='create-btn'>
                                Proceed
                            </Button>}
                    </ThemeProvider>
                </Grid>
            </Grid>
        </>
    )
}
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
// ];
export default Send;