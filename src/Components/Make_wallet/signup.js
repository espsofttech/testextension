

import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, Typography, Checkbox, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontWeight } from '@mui/system';
import { SignUpUser } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
// import config from '../../config/config';
import Cookies from 'js-cookie'
import axios from 'axios'
import Common_header from '../Header/Common_header'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
} from 'react-chrome-extension-router';
import WalletSelect from './WalletSelect';
import Login from './login';
import Test from '../../Components/test'
const message = "extension routing"



const userId = localStorage.getItem('UserId');
console.log(userId)
const SignUp = () => {
    const [form, setForm] = useState({ email: "", password: "", confirm_password: "" });
    const [validatioError, setvalidatioError] = useState({});
    const [ConnectWalletAddress, SetConnectWalletAddress] = useState(localStorage.getItem("address"));
    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));
    const [pricing, setPricing] = useState([])
    const [loader, setLoader] = useState(false)
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (loginData == "") {
    }
    else {

        goTo(WalletSelect, { message })

        // window.location.href = `${config.baseUrl}select-wallet/` + userId;

    }

    useEffect(() => {
        isGobyInstalled();
    }, [])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

    }

    function validate() {
        let confirmPasswordError = "";
        let passwordError = "";
        let emailError = ""

        if (form.confirm_password === '') {
            confirmPasswordError = " confirm password is required."
        }
        if (form.email === '') {
            emailError = "Email is required."
        }
        if (regex.test(form.email) == false) {
            emailError = "Email is invalid."

        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (form.password.length <= 7) {
            passwordError = "password should have atleast 8 characters"
        }
        if (form.confirm_password === '') {
            confirmPasswordError = "confirm password is required."
        }
        if (form.confirm_password.length <= 7) {
            confirmPasswordError = "confirm password should have atleast 8 characters"
        }
        if (confirmPasswordError || passwordError || emailError) {
            setvalidatioError({
                confirmPasswordError, passwordError, emailError
            })
            return false
        } else {
            return true
        }
    }

    const isGobyInstalled = () => {
        const { chia } = window;
        Boolean(chia && chia.isGoby)
    }
    console.log(window, "jhjh")

    const SubmitForm = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {

        }
        else {
            setLoader(true)

            let res = await SignUpUser(form);
            console.log(res.msg.length, "mssg")
            console.log(loader, "aftder submit")
            if (res.success) {

                setLoader(false)
                console.log(loader, "sucess")
                // Swal.fire({
                //     icon: 'success',
                //     title: res.msg,
                //     buttonsStyling: false,
                //     customClass: {
                //         confirmButton: 'example-class' //insert class here
                //     }

                // })
                // toast.success(res.msg);

                setTimeout(() => {
                    goTo(Login, { message })

                    // <Link to={`${config.baseUrl}login`}>
                    {/* <Link component={Login} props={{ message}}>
                                    
    </Link> */}
                }, 1200);
            } else {
                console.log(loader, "false")

                setLoader(false)
                // Swal.fire({
                //     icon: 'error',
                //     title: res.msg,
                //     buttonsStyling: false,
                //     customClass: {
                //         confirmButton: 'example-class' //insert class here
                //     }

                // })
                toast.error(res.msg);
            }

        }
    }

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#fbbd18',
            },
        },
    });
    return (
        <>
            <Router>
                <Toaster />
                <Common_header />

                <Container>

                    <Grid container item className="create-page" mt={5} spacing={1}>
                        <Grid item md={12}>
                            <Box
                            >
                           <Typography variant="h3" component="h3">
                                    Create New Account
                                </Typography>

                                <Grid item md={10} mt={2} container rowSpacing={4}>
                                    <Grid item xs={12}>
                                        <TextField inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="email" fullWidth label="Email" id="fullWidth" onChange={inputHandler} name="email" value={form.email} />
                                        <span style={{ color: 'red' }} className="validationErr">{validatioError.emailError}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="password" fullWidth label="New Password" id="fullWidth" onChange={inputHandler} name="password" value={form.password} />
                                        <span style={{ color: 'red' }} className="validationErr">{validatioError.passwordError}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="password" fullWidth label="Confirm Password" id="fullWidth" onChange={inputHandler} name="confirm_password" value={form.confirm_password} />
                                        <span style={{ color: 'red' }} className="validationErr">{validatioError.confirmPasswordError}</span>

                                    </Grid>
                                    {/* <Grid item xs={12}>
                                    <Checkbox {...label} />
                                    <span className='create-check'> I have read and agree to the Terms of Use</span>
                                </Grid> */}
                                    <Grid item xs={12}>

                                        <span >Already Have account?
                                            {/* 
                                   <button onClick={() => goTo(Login, { message })}>
sample page    </button> */}

                                            <Link component={Login} props={{ message }}>
                                                Login
                                            </Link>

                                        </span>
                                    </Grid>

                                    <Grid item xs={6}>
                                        {/* <Link to={`${config.baseUrl}login`}> */}
                                        <ThemeProvider theme={theme} >

                                            {loader ? <Button disable onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn loader'>

                                                {/* <Box sx={{ display: 'flex'}}> */}
                                                <CircularProgress className='process' />Processeing...
                                                {/* </Box>  */}


                                            </Button> :
                                                <Button disable onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn loader'>
                                                    SignUp

                                                </Button>
                                            }
                                            {/* <Button variant="contained" color="secondary" size="large" className='create-btn'>
                                            Create
                                        </Button>
                                         */}
                                        </ThemeProvider>
                                        {/* </Link> */}
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>
                    </Grid>

                </Container>

            </Router>   </>
    )
}
export default SignUp;