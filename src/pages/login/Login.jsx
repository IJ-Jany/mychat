import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import "./login.css"
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg'
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import LoginImg from '../../assets/images/login.jpg'
import Image from '../../utils/Image';
import { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword,signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userslice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const auth = getAuth();
  let emailregex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  let [passShow,setPassShow] =useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose = () =>{
    setOpen(false)
  }

  let [formData,setFormData] = useState({
    email:"",
    password:""
  })

  let [error,setError] =  useState({
    email:"",
    password:""
  })
  let handleLoginForm = (e) =>{
      let {name,value} = e.target
      setFormData({
        ...formData,[name]:value
      })
  }

  let handleLoginSubmit = () => {
    if(!formData.email){
      setError({email:"email ny"})
    }else if(!formData.email.match(emailregex)){
      setError({email:"email format thik ny"})
    }else if(!formData.password){
      setError({email:""});
      setError({password:"password ny"});
    }else{
      signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential) => {
      // console.log(userCredential);
       if(userCredential.user.emailVerified){

        localStorage.setItem("user",JSON.stringify(userCredential.user));
        dispatch(loginuser(userCredential.user))
         navigate("/home")
         console.log(userCredential.user);
       }else{
        signOut(auth).then(() => {
          setTimeout(()=>{
            toast.error('Please verify your account', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            },500)
          })
        //console.log("please verify your email");
       }
      }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/invalid-credential"){
          setError({email:"email or password error"})
        }else{
          setError({email:""})
        }
        console.log(errorCode);
        console.log(errorMessage);
      });
      setError({
        email:"",
        password:""
  
      })
      console.log(formData);
    }
  }

  let [forgetFormData,setforgetFormData] = useState({
    forgetemail:""
  })

  let [forgeterror,setforgetError] = useState({
    forgetemail:""
  })

  let handleForgetData = (e) => {
    let {name,value} = e.target
    setforgetFormData({
      ...forgetformData,[name]:value
    })
  }

  let handleForgotSubmit = () => {
    console.log(forgetformData);
    if(!forgetformData.forgetemail){
      setforgetError({forgetemail:"email ny"})
    }else if (!forgetformData.forgetemail.match(emailregex)){
      setforgetError({forgetemail:"email format thik ny"})
    }else{
      setforgetError({forgetemail:""})
      console.log(forgetformData);
    }
  }
  let handleForgot = (e) => {
  setFormData(e.target.value)
 
  }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
       <div className='loginbox'>
        <div className='loginbox_inner'>
        <SectionHeading style="auth_heading"  text="Login to your account!"/>
        <div className='provider_login'>
      <img src={GoogleSvg}/>
      <span>Login with Google</span>
        </div>
        <div className='form_main'>
          <div>
          <Input name="email" type="email" style="login_input_field" labeltext="Email Adress" variant="standard" onChange={handleLoginForm}/>
          </div>
          <div>
          <Input name="password" type={passShow ? "text" : "password"} style="login_input_field" onChange={handleLoginForm} labeltext="Password" variant="standard"/>
          <button onClick={()=>setPassShow(!passShow)}>show</button>
          </div>
        <CustomButton onClick={handleLoginSubmit} styling="loginbtn" variant="contained" text="Login to Continue"/>
        </div>
        <AuthNavigate style="loginauth" link="/registration" linktext="sign up" text="Don’t have an account ? "/>  
        <p className="loginauth">
        <span onClick={handleOpen}>Forget Password?</span>
        </p>
        </div>
       </div>
        </Grid>
        <Grid item xs={6}>
         <div className='loginimg'>
          <Image source={LoginImg} alt="img" />
         </div>
        </Grid>
      </Grid>
    </Box>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={style}>
      <div className='forget_box'>
        <button onClick={handleModalClose}>Close</button>
      <h2>Forget password</h2>
      <Input onChange={handleForgot} type="emaiL" labeltext="Email Address" variant="standard"/>
      <CustomButton onClick={handleForgotSubmit}  text="Send Link" variant="contained"/>
      </div>
        </Box>

</Modal>

    </>
   
  )
}

export default Login