import React, { useEffect, useState } from 'react';
import { Container, Grid,Box } from '@mui/material';
import MainHeader from '../Header/MainHeader';
import HomeBody from './HomeBody';
const Home = () => {
    const [homeBodyFun,sethomeBodyFun] = useState("")
    useEffect(() => {

    }, [])

    const mainHeaderFun = (id) =>{
        sethomeBodyFun(id)
    }
    
    return (
        <>
            <MainHeader callMainHeader={mainHeaderFun}/>
            <Box sx={{backgroundColor:"#1728ff0d",paddingBottom:"50px"}}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item md={1} ></Grid>
                        <Grid item md={10} xs={12}>
                            <HomeBody callHomeBody={homeBodyFun}/>
                        </Grid>
                        <Grid item md={1}  mt={3}></Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
export default Home;