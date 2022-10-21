import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, Box, Typography, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Common_header from '../Header/Common_header';
import Cookies from 'js-cookie'
import { matchPhrase } from '../Action/action';
import toast, { Toaster } from 'react-hot-toast';
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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Home from './Home'
const userId = localStorage.getItem('UserId');
console.log(userId)
const message="cmvkcmvkcm"

// import { use } from 'chai';
const ConfirmPhrase = () => {
    let pzzule = localStorage.getItem('secretKey')
    let finalPuzzule = pzzule.split(',')
    console.log(finalPuzzule, "string puzzle")
    let listted  =   finalPuzzule.sort(() => Math.random() - 0.5)
    console.log(listted, "random puzzle")

    const [randomPuzzule, setRandomPuzzule] = useState(finalPuzzule);
    const [isRender, setisRender] = useState(false);
    const [selectedArr, setSelectedArr] = useState([]);
    const [confirmButtonEnable, setConfirmButtonEnable] = useState(true)
    const [Error,setError] = useState("");
    const[loader,setLoader]=useState(false)
   
    const inputRef = useRef(null);

    const [phrase, setPhrase] = useState("")
    const theme = createTheme({
        palette: {
            secondary: {
                main: '#fbbd18',
            },
        },
    })



    const removeSeedPhars = (data) => {
        setError('')
        var array = [...selectedArr]; // make a separate copy of the array
        var index = array.indexOf(data)
        if (index !== -1) {
            array.splice(index, 1);
            setSelectedArr(array);
            setTimeout(() => {

                if (selectedArr.length <= 24) {
                    setConfirmButtonEnable(true)
                }
            });
        }

    }

    const selectData = (item,index) => {
         item = item +'-'+ index;
        setError('')
        if (selectedArr.indexOf(item) == -1) {
            setSelectedArr((oldArray) => [...oldArray, item])



            setTimeout(() => {
                if (selectedArr.length == 23) {
                    setConfirmButtonEnable(false)
                }
            });
        }
    }

    const confirmClick =async  () =>{
        setLoader(true)
        
        const selected_Arr = [];
        await selectedArr.filter((item)=>{
            selected_Arr.push(item.split('-')[0])
        })
        
        
        console.log(pzzule,selected_Arr.join(','))
        if(pzzule == selected_Arr.join(',')){
            let data = { mnemonic: selected_Arr, userId: userId }
            let res = await matchPhrase(data);
            
            console.log(data, res, "imported wallet response")
            if (res.success) {
                setLoader(false)

         
                toast.success(res.msg);
                if (res.data.address) {
                    localStorage.setItem('address', res.data.address);
                    localStorage.setItem('NAME', "Account 1");
                    localStorage.setItem('Fingerprint', res.data.FingerPrint);

                    console.log("new", res.data.address)
        
                }
                setTimeout(() => {
                //  <Link to={`${config.baseUrl}home`}> 
                //  </Link>
                goTo(Home, { message })

                    //  window.location.href = `${config.baseUrl}home`;
                }, 2000);
            } else {
                setLoader(false)

                toast.error(res.msg);
            }
          
        }else{
            setLoader(false)
            // Swal.fire({
            //     icon: 'error',
            //     title: "Invalid Seed Phrase" ,
            //     buttonsStyling: false,

            //     customClass: {
            //         confirmButton: 'example-class' //insert class here
            //     }

            //       })
            toast.error("Invalid Seed Phrase")
        }
        
    }


    return (
        <>
            <Common_header />
       
            <Container>
            <Toaster />

                <Grid container item xs={12} my={3} className="import-wallet" >
                    <Grid item md={1}></Grid>
                    <Grid item md={10}>
                        <Grid item container>
                            <Grid item md={9}>
                                <Typography variant="h3" component="h3">
                                    Confirm your Secret Recovery Phrase
                                </Typography>
                                <Typography sx={{ fontSize: 16, margin: "20px 0" }} gutterBottom>
                                    Please select each phrase in order to make sure it is correct.
                                </Typography>
                                {/* <TextareaAutosize
                                    maxRows={20}
                                    aria-label="maximum height"
                                    placeholder="Select correct phrase from below words"
                                    value={phrase.value}
                                    style={{ width: 550, height: 250 }}
                                /> */}
                                <Grid container item>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            maxHeight: "auto",
                                            border: "1px solid #000",
                                            borderRadius: "10px",
                                            minHeight:"200px"
                                        }}>
                                        <Grid item container spacing={2} p={2} className="confirm-phrase">
                                            
                                            {selectedArr.map((dd) => (
                                                <Grid item md={2} xs={4}>
                                                    <Button variant="contained" onClick={() => removeSeedPhars(dd)}>
                                                        {dd.split('-')[0]}
                                                        <span>x</span>
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item container spacing={2} my={2} className="c-phrase">

                                    {randomPuzzule.map((item, index) => (
                                        <Grid item md={2} xs={4}>
                                            <TextField
                                                id="outlined-read-only-input"
                                                size="small"
                                                onClick={() => selectData(item,index)}
                                                className={ (selectedArr.indexOf(item + '-' + index) > -1) ? 'selectedTag' :""}
                                                // onClick={inputHandler}
                                                value={item}
                                                
                                                style={{ background: (selectedArr.indexOf(item+'-'+index) > -1) ? '#194c6e' : '' }}                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid item xs={4} my={3}>
                                    {/* <Link to={`${config.baseUrl}home`}> */}
                                    <ThemeProvider theme={theme} >
                                         

                                      
                                {!Error || <small style={{color:'red'}}>{Error}</small>}
                                     {loader? <Button onClick={()=>confirmClick()} disabled={confirmButtonEnable} variant="contained" color="secondary" size="large" className='create-btn'>
                                        <CircularProgress className='process'/>Processeing...
                                        </Button>
                                       :
                                        <Button onClick={()=>confirmClick()} disabled={confirmButtonEnable} variant="contained" color="secondary" size="large" className='create-btn'>
                                            Confirm
                                        </Button>
}

                                    </ThemeProvider>
                                    {/* </Link> */}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={1}></Grid>
                </Grid>
            </Container>

        </>
    )
}
export default ConfirmPhrase;