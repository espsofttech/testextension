import React, { useEffect, useState } from 'react';
import {
    InputLabel, FormControl, Menu,
    MenuItem, Box, Avatar, ListItemIcon, Divider, IconButton, Typography, Tooltip
    , Grid, Button, TextField, TextareaAutosize
}
    from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'
// import config from '../config/config';
import { addanotherAccount } from '../Action/action';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { importanotherAccounts, getallAccountsss, switchacc } from '../Action/action';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Modal from '@mui/material/Modal';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import GetAppIcon from '@mui/icons-material/GetApp';
import Home from '../Make_wallet/Home'
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
const message="msg"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const themes = createTheme({
    palette: {
        secondary: {
            main: '#fbbd18',
        },
    },
});

const userId = localStorage.getItem('UserId');
// console.log(userId)

const id = parseInt(userId)
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const SideHeader = (props) => {

    const [age, setAge] = React.useState('');
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [open1, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    // const handleClose1 = () => setOpen(false);
    const [open2, setOpen1] = React.useState(false);
    const handleOpen2 = () => setOpen1(true);
    // const handleClose2 = () => setOpen1(false);
    const [form, setForm] = useState({ name: "", mnemonic: "" });
    const [allaccounts, setAllAccounts] = useState([])
    const [switchaccount, setSwitchaccount] = useState([])
    const [loader, setLoader] = useState(false)
    const [able, setAble] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState([]);

    useEffect(() => {
        getallaccounts();
        switchaccounts()
    }, [])


    const getallaccounts = async () => {
        let selectFilgerPrint = localStorage.getItem('Fingerprint');
        let getAllAsset = await getallAccountsss({ userId: id });
        let selected = getAllAsset.data.filter((item) => { return selectFilgerPrint == item.FingerPrint })
        setSelectedWallet(selected[0])
        setAllAccounts(getAllAsset.data)

    }



    const switchaccounts = async (e) => {

        let select = e.target.value;
        setSelectedWallet(e.target.value)
        let getAllAsset = await switchacc({ fingerprint: select.FingerPrint });
        setSwitchaccount(getAllAsset.data)

        localStorage.setItem('address', select.wallet_Address);
        localStorage.setItem('NAME', select.Name);
        localStorage.setItem('Fingerprint', select.FingerPrint);
        props.sideBarFunCall(select.FingerPrint)


    }





    // const mnemonic = (Object.values(form))
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

    }
    let data = { mnemonic: form.mnemonic, userId: userId, name: form.name }
    console.log(data.mnemonic, "data")
    let x = data.mnemonic.toString()
    let y = x.split(",")

    console.log(y.length, "xx")

    const SubmitForm = async (e) => {
        setLoader(true)

        let data = { mnemonic: form.mnemonic, userId: userId, name: form.name }
        console.log(data, "data")
        let x = data.mnemonic.toString()
        let y = x.split(",")
        if (y.length == 24 && form.name !== "") {

            let res = await importanotherAccounts(data);
            setLoader(false)
            console.log(res, "imported wallet response")
            if (res.success == true && res.data.address) {
                localStorage.setItem('address', res.data.address);
                localStorage.setItem('NAME', form.name);

                console.log("new", res.data.address)

            }
            else if (res.success == true && res.data.wallet_Address !== "") {
                localStorage.setItem('address', res.data.wallet_Address);
                localStorage.setItem('NAME', form.name);

                console.log("old", res.data.wallet_Address)


            }
            if (res?.data?.FingerPrint) {
                localStorage.setItem('Fingerprint', res.data.FingerPrint);
                setSelectedWallet(res.data)
                getallaccounts();
                props.sideBarFunCall(res.data.FingerPrint)
                setOpen(false)
            }
            if (res.success) {
                setLoader(false)

                toast.success(res.msg);

                setTimeout(() => {
                    goTo(Home, { message })

                    //<Link to={`${config.baseUrl}home`}></Link>
                    // window.location.href = `${config.baseUrl}home`;
                }, 2000);
            } else {

                setLoader(false)

                toast.error(res.msg);
            }
        }

        else {
            if (form.name == "") {
                toast.error("Name Required")
                setLoader(false)
            }
            else {
                toast.error("24 words Phrase Required")
                setLoader(false)
            }

        }



    }
    const [anchorEl, setAnchorEl] = useState(null);
    const [account, setAccount] = useState([]);


    const open = Boolean(anchorEl);

    const addAccount = async () => {
        setLoader(true)
        let data = { userId: id, name: form.name }
        if (form.name !== "") {
            let accounts = await addanotherAccount(data)
            console.log(accounts, "}}}}}}}")
            setLoader(false)
            if (accounts.success == true) {
                console.log(data, "----")
                setAccount(accounts)
                localStorage.setItem('address', accounts.data.wallet_address);
                localStorage.setItem('NAME', form.name);
                localStorage.setItem('Fingerprint', accounts.data.fingerprint);
                setSelectedWallet(accounts.data)
                getallaccounts();
                props.sideBarFunCall(accounts.data.fingerprint)
                setOpen1(false)
                toast.success(accounts.msg);


            }

            else {
                setLoader(false)

                toast.error("internal error wallet not generated")
            }

        }
        else {
            setLoader(false)

            toast.error("Name Required")

        }

    }


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
            goTo(Home, { message })

            // window.location.href = `${config.baseUrl}login`
        });
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose1 = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen1(false);
    };
    return (
        <>
            <Toaster />
            <div className='side-menu'>
                <Grid container xs={12}
                    item
                    justifyContent="end"
                    alignItems="end"
                >
                    {/* <FormControl style={{ width: "200px" }}>
                        <InputLabel id="demo-simple-select-label">Networks</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="NetWorks"
                            className='select-network'


                        >

                            <MenuItem value={10} className="network-menu">
                                <CircleRoundedIcon color='primary' className='menu-dot' />LLC Mainnet</MenuItem>
                            <MenuItem value={20} className="network-menu">
                                <CircleRoundedIcon color='warning' className='menu-dot' />Bnb Mainnet</MenuItem>
                            <MenuItem value={30} className="network-menu">
                                <CircleRoundedIcon color='secondary' className='menu-dot' />Etherium Testnet</MenuItem>
                        </Select>
                    </FormControl> */}

                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 40, height: 40, background: "#fbbd18" }}>
                                        <ManageAccountsIcon />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>


                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                {/* <Avatar /> My account */}
                                <div>
                                    {/* <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-name-label">{selectedWallet.Name}</InputLabel>

                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={selectedWallet}
                                            onChange={switchaccounts}
                                            MenuProps={MenuProps}
                                        >
                                            {allaccounts.map((name) => (

                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name.Name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl> */}
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={selectedWallet}
                                            onChange={switchaccounts}
                                            MenuProps={MenuProps}
                                        >
                                            {allaccounts.map((name) => (

                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name.Name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleOpen2}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                <Button >Add another account</Button>
                            </MenuItem>
                            <MenuItem onClick={handleOpen}>
                                <ListItemIcon>
                                    <GetAppIcon fontSize="small" />
                                </ListItemIcon>
                                {/* Import account */}
                                <Button>Import Account</Button>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <Button>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </Grid>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modals"
                >
                    <Box sx={style} className="modal-box">
                        <CloseIcon onClick={handleClose1} className="modal-close" />
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Enter name:
                            <Grid item md={10} container>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={inputHandler}
                                        name="name"
                                        inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="email" fullWidth id="fullWidth" />
                                </Grid>
                            </Grid>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" mt={2}>
                            Enter Secret Key:
                            <Grid item md={10} container>
                                <Grid item xs={12}>
                                    {/* <TextField
                                        onChange={inputHandler}
                                        name="mnemonic" inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="email" fullWidth label="Secret Key" id="fullWidth" /> */}
                                    <TextareaAutosize
                                        className='basic-text-area'
                                        aria-label="minimum height"
                                        minRows={3}
                                        style={{ width: "100%" }}
                                        onChange={inputHandler}
                                        name="mnemonic" inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="email" label="Secret Key" id="fullWidth"

                                    />
                                </Grid>
                            </Grid>
                        </Typography>
                        <Grid container item mt={5} className="private-password">
                            <Grid container item md={7} rowSpacing={2}>
                                <Grid item xs={6}>
                                    <Button onClick={handleClose1} variant="outlined" size="large" className='create-btn'>
                                        Cancle
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <ThemeProvider theme={themes} >
                                        {/* <Button href={`${config.baseUrl}select-wallet/`+userId} style={{marginLeft:"10px"}} onClick={SubmitForm} variant="contained" color="secondary" size="large" className='create-btn'>
                                            Back
                                        </Button> */}
                                        {loader ? <Button onClick={SubmitForm} style={{ marginLeft: "10px" }} variant="contained" color="secondary" size="large" className='create-btn loader'>
                                            <CircularProgress className='process' />Processeing...

                                        </Button>
                                            :
                                            <Button onClick={SubmitForm} style={{ marginLeft: "10px" }} variant="contained" color="secondary" size="large" className='create-btn '>
                                                Import
                                            </Button>
                                        }
                                    </ThemeProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modals"
                >
                    <Box sx={style} className="modal-box">
                        <CloseIcon onClick={handleClose2} className="modal-close" />
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Enter name:
                            <Grid item md={10} mt={2} container>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={inputHandler}
                                        name="name"
                                        inputProps={{
                                            autocomplete: 'new-password',
                                            form: {
                                                autocomplete: 'off',
                                            },
                                        }} type="email" fullWidth label="Name" id="fullWidth" />
                                </Grid>
                            </Grid>
                        </Typography>
                        <Grid container item mt={5} className="private-password">
                            <Grid container item md={7} rowSpacing={2}>
                                <Grid item xs={6}>
                                    <ThemeProvider theme={themes} >
                                        <Button onClick={handleClose2} variant="outlined" size="large" className='create-btn'>
                                            Cancle
                                        </Button>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <ThemeProvider theme={themes} >
                                        {loader ? <Button onClick={addAccount} style={{ marginLeft: "10px" }} variant="contained" color="secondary" size="large" className='create-btn loader'>
                                            <CircularProgress className='process' />Processeing...

                                        </Button>
                                            :

                                            <Button onClick={addAccount} style={{ marginLeft: "10px" }} variant="contained" color="secondary" size="large" className='create-btn'>
                                                Proceed
                                            </Button>
                                        }

                                    </ThemeProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>

    );
}

export default SideHeader;