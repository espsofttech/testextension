import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import logo from '../images/logo.png'

const Common_header = () => {




    
    return (
        <>
    
                {/* <Grid container item
                    className={"header"} sx={{
                        backgroundColor: '#040c12'
                    }} >
                    <Grid item md={6} >
                        <Box sx={{
                           display:'flex'
                        }}>
                            <Typography variant="h4" component="h3" >
                                Little Lambo
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                 */}
                <Grid container item
                    className={"header"} sx={{
                        backgroundColor: '#040c12'
                    }} >
                    <Grid item md={6} >
                    <Box sx={{
                           display:'flex'
                        }}>
                            <img src={logo} />
                            <Typography variant="h4" component="h3" >
                                Little Lambo
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item md={6}
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="end"
                    >
                        <Button  variant="contained" className='logout'>Logout</Button>

                    </Grid>
                </Grid>
            
        </>
  )
                    }                 

export default Common_header;