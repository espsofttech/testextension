

import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import config from '../../config/config';
import { Link } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import Common_header from '../../Header/Common_header';
import QRCode from 'react-qr-code';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#fbbd18',
        },
    },
});
const copyToClipboard = (id) => {
    copy(id);
    toast.success("Copied");

}
const Receive = () => {

    const [value, setValue] = useState(localStorage.getItem("address"));
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(120);
    const [ConnectWalletAddress, SetConnectWalletAddress] = useState(localStorage.getItem("address"));



    const copyToClipboard = (id) => {
        copy(id);
        toast.success("Copied");

    }
    return (
        <>
            {/* <Toaster /> */}
            <Grid item xs={12} className="receive-wallet" >
                <Box>
                    <Typography variant="h3" component="h3" className='text-center'>
                        Receive
                    </Typography>
                    <Box className='recive-copy'>
                        <Typography variant="h5" component="h5" style={{ color: "black" }} className='text-center'>Copy Address to Send</Typography>
                        <Button variant="contained" size='small' onClick={e => copyToClipboard(ConnectWalletAddress)}>
                            {ConnectWalletAddress.toString().substring(0, 5) + '...' + ConnectWalletAddress.toString().substr(ConnectWalletAddress.length - 5)}
                            <ContentCopyIcon  sx={{fontSize:"13px"}}> </ContentCopyIcon>
                        </Button>
                    </Box>
                    <Typography variant="h4" component="h4" className='text-center'>
                        OR
                    </Typography>
                    <Typography variant="h5" component="h5" className='text-center'>Scan the QR Code to send Money</Typography>

                    <Box className='center-img' sx={{ marginTop: "20px" }}>
                        {value && (
                            <QRCode
                                title="GeeksForGeeks"
                                value={value}
                                bgColor={back}
                                fgColor={fore}
                                size={size === '' ? 0 : size}
                            />
                        )}

                    </Box>
                </Box>
            </Grid>

        </>
    )
}

export default Receive;