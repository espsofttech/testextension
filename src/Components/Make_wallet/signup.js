import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, TextField, Typography, Checkbox, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Common_header from '../Header/Common_header'

const Signup = () => {
   

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#fbbd18',
            },
        },
    });
    return (
        <>


            <Container>
            <Common_header />

                <Grid container item className="create-page" mt={5} spacing={1}>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item md={6}>
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
                                    }} type="email" fullWidth label="Email" id="fullWidth"  />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        autocomplete: 'new-password',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }} type="password" fullWidth label="New Password"  />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField inputProps={{
                                        autocomplete: 'new-password',
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }} type="password" fullWidth label="Confirm Password"  />

                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Checkbox {...label} />
                                    <span className='create-check'> I have read and agree to the Terms of Use</span>
                                </Grid> */}
                                <Grid item xs={12}>

                                    <span >Already Have account?  Login</span>
                                </Grid>

                                <Grid item xs={6}>
                                        <ThemeProvider theme={theme} >

      

                                                <Button  variant="contained" color="secondary" size="large" className='create-btn loader'>
                                                    SignUp

                                                </Button>
                                          
                                        
             </ThemeProvider>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

            </Container>

        </>
    )
}
export default Signup;