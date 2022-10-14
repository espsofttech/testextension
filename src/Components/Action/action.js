import { getRequest, postRequest, putRequest, deleteRequest, postRequestFormData } from "../helper";

export const Assets = (data) => {
   return getRequest('getassets/', data).then(res => { return res.data })
}

export const getTransaction = (Fingerprint) => {
   return getRequest('getwalletTransactions/'+Fingerprint).then(res => { return res.data })
}

export const checkStatus = (data) => {
   return getRequest('loginStatus/', data).then(res => { return res.data })
}

export const getBalance = (Fingerprint) => {
   return getRequest('getwalletbalance/'+Fingerprint).then(res => { return res.data })
}

export const LoginUser = (data) => {
   return postRequest('login/', data).then(res => { return res.data })
}


export const importWAllet = (data) => {
   return postRequest('importwallet/', data).then(res => { return res.data })
}

export const matchPhrase = (data) => {
   return postRequest('matchPhrase/', data).then(res => { return res.data })
}



export const SignUpUser = (data) => {
   return postRequest('signup/', data).then(res => { return res.data })
}

export const CreateNew = (data) => {
   return postRequest('creatnewwallet/', data).then(res => { return res.data })
}

export const SendTransaction = (data) => {
   return postRequest('sendtransactions/', data).then(res => { return res.data })
}

export const addanotherAccount = (data) => {
   return postRequest('addanotherAccount/', data).then(res => { return res.data })
}

export const mnemonic = (data) => {
   return getRequest('generatemnemonic/', data).then(res => { return res.data })
}

export const getallAccountsss = (data) => {
   return postRequest('getAllAccounts/', data).then(res => { return res.data })
}

export const switchacc = (data) => {
   return postRequest('switchaccount/', data).then(res => { return res.data })
}




export const importanotherAccounts = (data) => {
   return postRequest('importAnotherAcc/', data).then(res => { return res.data })
}








