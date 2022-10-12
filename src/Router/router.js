import React, { Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Test from '../Components/test'
import Sample from '../Components/sample'
import App from '../App'

const RouterComponent = () => {

    
    return (<BrowserRouter >
            <div> 
                
                <Routes>
                    <Route path='/' element={<App/>} />
                    <Route path='/sample' element={<Sample/>} />
                  

                </Routes>
            </div>
    </BrowserRouter>
    )
}
export default RouterComponent
