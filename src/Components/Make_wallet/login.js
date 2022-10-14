import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, Typography, Checkbox, Button , FormGroup, FormControlLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Common_header from '../Header/Common_header'
// import { Link } from 'react-router-dom';
import WalletSelect from './WalletSelect'
import { fontWeight } from '@mui/system';
import { LoginUser } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'
import SignUp  from './signup';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import Test from '../test';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  import Home from '../Make_wallet/Home'
// import config from '../../config/config';
const CryptoJS = require("crypto-js");
const userId=localStorage.getItem('UserId');
console.log(userId, "fetch user id")
const Login = () => {
    const [form, setForm] = useState({email:"", password: "" });
    const [validatioError, setvalidatioError] = useState({});
    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")

    const message="extension routing"

//   const [checked, setChecked] = useState("")


    if(loginData==""){

    }
    else if (localStorage.getItem("HOME_PAGE")) {
    //  <Link component={Home} props={{ message }}>
    //   </Link>

         window.location.href = {Home}

        // window.location.href = `${config.baseUrl}home/`;
    }
    else{
        // window.location.href = <WalletSelect/>

        //  window.location.href = `${config.baseUrl}select-wallet/`+userId;

    }
    let saveEmail=localStorage.getItem("email")
    let savePassword=localStorage.getItem("password")

const handleChange = event => {
    if (event.target.checked&&form.email!==""&&form.password!=="") {
      console.log('✅ Checkbox is checked');
      localStorage.setItem("email", form.email)
       localStorage.setItem("password", form.password)
    } else {
        localStorage.removeItem("email")
        localStorage.removeItem("password")
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsSubscribed(current => !current);
    let saveEmail=localStorage.getItem("email")
    let savePassword=localStorage.getItem("password")

    setForm((old) => {
        return { ...old, [email]: saveEmail, [password]: savePassword }
    })
    console.log(form.email, form.password,)


  };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

      }


      function validate() {
        let usernameError = "";
        let passwordError = "";
        let emailError=""

        if (form.password === '') {
            passwordError = "password is required."
        }
        if (form.email === '') {
            emailError = "Email is required."
          }
        if (form.password.length<=7) {
            passwordError = "Password should have atleast 8 characters"
          }

        if (usernameError || passwordError||emailError) {
            setvalidatioError({
              usernameError, passwordError,emailError
            })
            return false
        } else {
            return true
        }
    }
    const SubmitForm = async (e) => {

        e.preventDefault()

        const isValid = validate();
        if (!isValid) {

        }
        else {
            let res = await LoginUser(form);



            if (res.success) {

                console.log(res, "success" )
               Swal.fire({
                    icon: 'success',
                    title: "Login Successfully" ,
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'example-class' //insert class here
                    }
                      })
                // toast.success("Login Success");
                console.log(JSON.stringify(res), "llllllllllllllllll")
                Cookies.set('loginSuccess', JSON.stringify(res));
                if(res.msg==="user already into data base redirect to homepage"){
                    localStorage.setItem('UserId', res.data[0].UserId);

                   setTimeout(() => {
                        localStorage.setItem("address",res.data[0].wallet_Address )
                        localStorage.setItem("NAME",res.data[0].Name )
                        localStorage.setItem("Fingerprint",res.data[0].FingerPrint)
                        console.log(res.data[0].wallet_Address,res.data[0].FingerPrint, "address")
                        // window.location.href = `${config.baseUrl}home` ;
                    }, 2000);
                }

                else{
                    let User=res.data[0].id

                    console.log(User, "userid")
                    localStorage.setItem('UserId', res.data[0].id);
                    console.log("ghgh")
                    Cookies.set('trasnactionpage', JSON.stringify("transaction data"));

                    setTimeout(() => {
                        // window.location.href = `${config.baseUrl}select-wallet/` + User ;
                    }, 2000);
                }


            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.msg,
                    buttonsStyling: false,

                    customClass: {
                        confirmButton: 'example-class' //insert class here
                    }

                      })
                console.log(res.msg, "error" )
                // toast.error(res.msg);
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
      
        <Toaster />
        <Common_header/>
            <Container>
            {/* {loader?          <Box sx={{ display: 'flex', marginLeft:'530px', marginTop:"350px", alignItems:"center"}}>
      <CircularProgress /><p style={{color:"blue"}}>Processeing...</p>
    </Box>: */}
                <Grid   container item className="create-page" mt={5} spacing={1}>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item md={6}>
                        <Box
                        >
                            <Typography variant="h3" component="h3">
                                Login
                            </Typography>


                           {saveEmail && savePassword!==""? <Grid item md={10} mt={2} container rowSpacing={4}>

                             <Grid item xs={12}>
                                     <TextField  inputProps={{
 autocomplete: 'new-password',
 form: {
 autocomplete: 'off',
 },   }} type="email"fullWidth label="Email" id="fullWidth" onChange={inputHandler} name="email" value={form.email}/>
                                     <span style={{color:'red'}}className="validationErr">{validatioError.emailError}</span>
                             </Grid>

                             <Grid item xs={12}>
                                     <TextField  inputProps={{
 autocomplete: 'new-password',
 form: {
 autocomplete: 'off',
 },   }} type="password"fullWidth label="Password" id="fullWidth" onChange={inputHandler} name="password" value={form.password}/>
                                     <span style={{color:'red'}}className="validationErr">{validatioError.passwordError}</span>
                             </Grid>

                             <Grid item xs={12}>

                                     <span >New to LittleLmabo Wallet?
  </span>                        <Link component={SignUp} props={{ message }}>
                                    Login
    </Link> 
                                 </Grid>
                                 <Grid item xs={6}>
                                     <ThemeProvider theme={theme} >
                                     {/* <Link to={`${config.baseUrl}select-wallet`}>  */}

                                         <Button    onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn'>
                                             Login
                                         </Button>
                                       {/* </Link> */}

                                         {/* <Link to={`${config.baseUrl}select-wallet`}>
                                         <Button    variant="contained" color="secondary" size="large" className='create-btn'>
                                             Login
                                         </Button>
                                         </Link> */}

{/* <label htmlFor="subscribe" >
        <input
          type="checkbox"
          value={isSubscribed}
          onChange={handleChange}
          id="subscribe"
          name="subscribe"
          defaultChecked={true}
        />
   <span style={{marginLeft:"10px"}}> Remember Me?</span>
      </label> */}
                                     </ThemeProvider>
                                 </Grid>
                             </Grid>:

                             <Grid item md={10} mt={2} container rowSpacing={4}>

                             <Grid item xs={12}>
                                     <TextField  inputProps={{
 autocomplete: 'new-password',
 form: {
 autocomplete: 'off',
 },   }} type="email"fullWidth label="Email" id="fullWidth" onChange={inputHandler} name="email" value={form.email}/>
                                     <span style={{color:'red'}}className="validationErr">{validatioError.emailError}</span>
                             </Grid>

                             <Grid item xs={12}>
                                     <TextField  inputProps={{
 autocomplete: 'new-password',
 form: {
 autocomplete: 'off',
 },   }} type="password"fullWidth label="Password" id="fullWidth" onChange={inputHandler} name="password" value={form.password}/>
                                     <span style={{color:'red'}}className="validationErr">{validatioError.passwordError}</span>
                             </Grid>

                             <Grid item xs={12}>

                                     <span >New to LittleLmabo Wallet? 
                                     <Link onClick={() => goBack()}>
Register    </Link>
                                     </span>
                                 </Grid>
                                 <Grid item xs={6}>
                                     <ThemeProvider theme={theme} >
                                     {/* <Link to={`${config.baseUrl}select-wallet`}>  */}

                                         <Button    onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn'>
                                             Login
                                         </Button>

                                      

                                         <button onClick={() => goTo (WalletSelect, { message })}>
sample page    </button>                                       {/* </Link> */}

                                         {/* <Link to={`${config.baseUrl}select-wallet`}>
                                         <Button    variant="contained" color="secondary" size="large" className='create-btn'>
                                             Login
                                         </Button>
                                         </Link> */}

{/* <label htmlFor="subscribe" >
        <input
          type="checkbox"
          value={isSubscribed}
          onChange={handleChange}
          id="subscribe"
          name="subscribe"
        />
   <span style={{marginLeft:"10px"}}> Remember Me?</span>
      </label> */}
                                     </ThemeProvider>
                                 </Grid>
                             </Grid>
}
                        </Box>

                    </Grid>
                </Grid>

            </Container>
             </>
    )
}
export default Login;