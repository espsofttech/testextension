// import React, { Component, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Home from '../../Components/Make_wallet/Home';
// import HomeBody from '../Components/HomeBody'
// import config from '../config/config';
// import CreateWallet from '../Components/Make_Wallet/CreateWallet';
// import WalletSelect from '../Components/Make_Wallet/WalletSelect';
// import ImportWallet from '../Components/Make_Wallet/ImportWallet';

// import SecretPhrase from '../Components/Make_Wallet/SecretePhrase';
// import ConfirmPhrase from '../Components/Make_Wallet/ConfirmPhrase';
// import ConfirmKey from '../Components/Make_Wallet/CreateMnemonic';
// import Send from '../Components/transection-pages/Send';
// import Login from '../Components/Make_Wallet/login';
// import Receive from '../Components/transection-pages/receive'
// import SideHeader from '../Header/SideHeader'
// const RouterComponent = () => {

//     // const loginData = (!Cookies.get('logintowallet')) ? [] : JSON.parse(Cookies.get('logintowallet'));

//     // if(loginData==""){
//       // }
//       // else{
//       //      window.location.href = `${config.baseUrl}home`;
  
//       // }
//     return (<BrowserRouter >
//             <div> 
                
//                 <Routes>
//                     <Route path={`${config.baseUrl}`} element={<CreateWallet/>} />
//                     <Route path={`${config.baseUrl}import-wallet/:id`} element={<ImportWallet/>} />
//                     {/* <Route path={`${config.baseUrl}import-wallet`} element={<ImportWallet/>} /> */}

//                     {/* <Route path={`/home`} element={<Home/>} /> */}

//                     <Route path={`${config.baseUrl}login`} element={<Login/>} />
//                     <Route path={`${config.baseUrl}select-wallet/:id`} element={<WalletSelect/>} />
//                      {/* <Route path={`${config.baseUrl}select-wallet`} element={<WalletSelect/>} /> */}

//                     <Route path={`${config.baseUrl}sendTransaction`} element={<Send/>} />
//                     <Route path={`${config.baseUrl}Receive`} element={<Receive/>} />

//                     <Route path={`${config.baseUrl}secretKey`} element={<ConfirmPhrase/>} />
//                     <Route path={`${config.baseUrl}puzzle`} element={<ConfirmPhrase/>} />

//                     <Route path={`${config.baseUrl}secret-phrase/:id`} element={<SecretPhrase/>} />
//                     <Route path={`${config.baseUrl}sideheader`} element={<SideHeader/>} />

//                      {/* <Route path={`${config.baseUrl}secret-phrase`} element={<SecretPhrase/>} /> */}

//                     {/* <Route path={`${config.baseUrl}confirm-phrase`} element={<ConfirmPhrase/>} /> */}
//                 </Routes>
//             </div>
//     </BrowserRouter>
//     )
// }
// export default RouterComponent
