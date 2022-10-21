
import {
    Grid, Box, Container, Button, Typography, IconButton, TableCell, TableHead, TableRow, Paper
    , TableBody, Table, TableContainer, Modal
} from '@mui/material';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import React, { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import Home_history from './Home_history';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import toast, { Toaster } from 'react-hot-toast';
// import config from '../config/config';
import Cookies from 'js-cookie'
import Receive from './transection-pages/receive';
import { Assets, getBalance, getTransaction, checkStatus } from '../Action/action';
import CloseIcon from '@mui/icons-material/Close';
import Send from './transection-pages/Send';
import logo from '../images/logo.png'
import Home from '../Make_wallet/Home'
import Login from './login';
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
const message="msg"
// --------------modal function ------------------------
const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


// ----------------------modal end-----------------------------------------  
const userId = localStorage.getItem('UserId');
console.log(userId)

// =====table======

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];
// ==========table end====

const theme = createTheme({
    palette: {
        secondary: {
            main: '#fbbd18',
        },
    },
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const HomeBody = (props) => {

    // ----moda------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [status, setStatus] = useState(false)
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    // -----------modal-

    const loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));

    if (loginData == "") {
        goTo(Login, { message })


    }

    else {
        //  window.location.href = `${config.baseUrl}select-wallet/`+userId;

    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    const [assetValue, setAssetValue] = React.useState([])
    const [transactions, setTransactions] = React.useState([])
    const [ConnectWalletAddress, SetConnectWalletAddress] = useState(localStorage.getItem("address"));
    const [OldProps, setOldProps] = useState('');
    const [balance, setGetBalance] = React.useState("")




    let UserName = localStorage.getItem('NAME');
    let Fingerprint = localStorage.getItem('Fingerprint')
    useEffect(() => {
        if (!ConnectWalletAddress) {
            localStorage.setItem("HOME_PAGE", "");
            goTo(WalletSelect, { message })

            // window.location.href = `${config.baseUrl}select-wallet/` + userId;
        } else {
            localStorage.setItem("HOME_PAGE", "Enable");
        }

        getWalletBalance();
        transaction();
        getStatus()
        // getassets();


        setOldProps(props.callHomeBody);
        autoSelected(props.callHomeBody);

    }, [props.callHomeBody])


    const autoSelected = async (id) => {
        getWalletBalance(id);
        transaction(id);
        SetConnectWalletAddress(localStorage.getItem("address"))

    }

    const copyToClipboard = (id) => {
        copy(id);
        toast.success("Copied");

    }
    // const getassets = async () => {
    //     let getAllAsset = await Assets();
    //     setAssetValue(getAllAsset.data.cat_list)

    // }

    var newArr = assetValue.map((item) => {
        return { item };
    })








    // if(CheckStatus==UserAddress){
    //     setStatus(true)
    // }
    // console.log(status, "+++")

    const getWalletBalance = async (id = null) => {
        let Balance = await getBalance(id || Fingerprint);
        if (Balance.success == false) {
            setGetBalance("0")
            console.log("null", "balamace")


        }
        else {
            setGetBalance(Balance.data / 1000)
            console.log(Balance, "balamace")
        }


    }


    const getStatus = async () => {
        let Balance = await checkStatus();
        console.log(Balance, "haiiiiii")


    }



    const transaction = async (id = null) => {
        let getAllAsset = await getTransaction(id || Fingerprint);
        setTransactions(getAllAsset.data.transactions)

    }



 
    return (
        <>
            <Toaster />
      
            <div className='main-card' my={5}>
                <Grid item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box className='account-body'>
                        <Typography variant="h6" component="h5" ml={1}>
                            {/* Account 1 */}
                            {UserName}
                        </Typography>
                        {!ConnectWalletAddress ||
                            < Button variant="text">
                                {ConnectWalletAddress.toString().substring(0, 5) + '...' + ConnectWalletAddress.toString().substr(ConnectWalletAddress.length - 5)}
                                <ContentCopyIcon onClick={e => copyToClipboard(ConnectWalletAddress)}> </ContentCopyIcon>
                            </Button>}
                        {/* < Button variant="text">
                            llc1...fsknp
                            <ContentCopyIcon onClick={e => copyToClipboard(ConnectWalletAddress)}> </ContentCopyIcon>
                        </Button> */}

                    </Box>

                </Grid>
                <div className='border'></div>
                <Grid item container>
                    <Grid item md={12}
                        container
                        justifyContent="center"
                        alignItems="center">
                        <Box className='currency-side'>
                            <img src={logo} height="40px" />
                            <Typography variant="h5" component="h5" >
                                {balance} LLC
                            </Typography>
                            {/* <Typography sx={{ fontSize: 16, margin: "20px 0" }} gutterBottom>
                                $0.00 USD
                            </Typography> */}
                        </Box>
                    </Grid>
                </Grid>
                <Grid container
                    item
                    className="menu-icons">
                    <Grid item lg={4} ></Grid>
                    <Grid item lg={2} xs={6}>
                        {/* <Link to={`${config.baseUrl}Receive`} > */}
                        <ThemeProvider theme={theme} >
                            <IconButton variant="contained" onClick={handleOpen}>
                                <GetAppIcon />
                            </IconButton>
                        </ThemeProvider>
                        {/* </Link> */}

                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Receive
                        </Typography>
                    </Grid>
                    <Grid item lg={2} xs={6}>
                        {/* <Link to={`${config.baseUrl}sendTransaction`}> */}
                        <ThemeProvider theme={theme} >
                            <IconButton variant="contained" onClick={handleOpen2}>
                                <SendIcon />
                            </IconButton>

                        </ThemeProvider>
                        {/* </Link> */}
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            Send
                        </Typography>
                    </Grid>
                    <Grid item lg={4}></Grid>
                </Grid>
                <Grid item container
                    justifyContent="center"
                    alignItems="center"
                    mt={5}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        {/* <TabContext value={value}> */}
                            <Box sx={{ borderColor: 'divider', borderBottom: '1px solid #ccc' }} className="full-tabs">
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                                    <Tab label="Assets" {...a11yProps(0)} />
                                    <Tab label="Activity" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value}  index={0}>
                              <div style={{padding:'20px',display:'flex'}}>
                              <img src={logo} height="25px" className='llc-img'/>
                                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                                    {balance} LLC
                                </Typography>
                              </div>
                                <Home_history />
                            </TabPanel>

                            <TabPanel value={value}  index={0} style={{padding:'0'}}>

                                {/* <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className='text-center'>Amount</TableCell>
                                                <TableCell className='text-center'>Address</TableCell>
                                                <TableCell className='text-center'>Transaction Hash</TableCell>
                                                <TableCell className='text-center'>Date</TableCell>
                                                <TableCell className='text-center'>Status</TableCell>

                                                <TableCell className='text-center'>Type</TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { transactions?.sort((a, b)=>{ return b.created_at_time - a.created_at_time })?.map(item => (
                                                <TableRow
                                                    // key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell >{item.amount}</TableCell>
                                                    <TableCell >{item.to_address}</TableCell>
                                                    <TableCell >{item.to_puzzle_hash}</TableCell>
                                                    <TableCell ><SimpleDateTime dateSeparator="-" timeSeparator=":" format="YMD">{item.created_at_time}</SimpleDateTime></TableCell>
                                                    <TableCell >{item.confirmed===true?"Successful":"Pending"}</TableCell>

                                                    {item.to_address == ConnectWalletAddress ? 
                                                    <Button  color="primary" size="small" className='active-data-tab'>
                                                        Receive
                                                    </Button> :
                                                        <Button  color="primary" size="small" className='active-data-tab'>
                                                            send
                                                        </Button>}

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> */}
                                   { transactions?.sort((a, b)=>{ return b.created_at_time - a.created_at_time })?.map(item => (
                                <Box className='transection-box'>
                                    <Grid container item>
                                        <Grid item md={10}>
                                            <div className='trans-left'>
                                                <div className='status-icon'>
                                                {item.to_address == ConnectWalletAddress ? 
                                                      <GetAppIcon />
                                                    :
                                                    <SendIcon />
                                                }
                                                </div>
                                                <div className='status-text'>
                                                {item.to_address == ConnectWalletAddress ? 
                                                    <Typography variant='h4'>Receive</Typography>
                                                    :
                                                    <Typography variant='h4'>send</Typography>
                                                }
                                                    <Typography><span>Address:</span>{item.to_address}</Typography>
                                                    <Typography><span>Transaction Hash :</span>{item.to_puzzle_hash}</Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item md={2}>
                                            <div className='trans-right'>
                                                <Typography>{item.amount/1000}</Typography>
                                                <span>{item.confirmed===true?"Successful":"Pending"}</span>
                                                <span className='date-time'><SimpleDateTime dateSeparator="-" timeSeparator=":" format="YMD">{item.created_at_time}</SimpleDateTime></span>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                   ))}
                            </TabPanel>
                        {/* </TabContext> */}
                    </Box>
                </Grid>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} className="modal-box">
                    <CloseIcon onClick={handleClose} className="modal-close" />
                    <Receive />
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} className="modal-box">
                    <CloseIcon onClick={handleClose2} className="modal-close" />
                    <Send closeCancle={handleClose2} sendBalance={balance} />
                </Box>
            </Modal>

        </>
    )
}
export default HomeBody