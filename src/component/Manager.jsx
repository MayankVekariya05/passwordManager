import React, { useEffect } from 'react'
import { useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function Manager() {

  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({site:"",username:"",password:""})
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if(password){
      setpasswordArray(JSON.parse(password))
    }
  }, [])
  

    const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) =>{
    setform({...form, [e.target.name]: e.target.value})
  }

  const savePassword = () => {
    if(form.site.length  && form.username.length  && form.password.length > 3){
    setpasswordArray([...passwordArray,{...form,id: uuidv4()}])
    localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id: uuidv4()}]))
    console.log([...passwordArray,form])
    setform({site:"",username:"",password:""})
    }
  }
 
  const editPassword = (id) => {
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))

  }
  const deletePassword = (id) => {
    let cnf = confirm("you want to delete your password")
    if(cnf){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }

  }

  const copyText = (text) => {
    toast('copied to clipboard!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
    navigator.clipboard.writeText(text)
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
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />

<div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
<div className="min-h-96 w-3/4 m-auto mt-16 ">
    <div className='text-center'>
       <div className=' text-2xl font-bold'>
       <span className=' text-green-700'>&lt;</span>
        <span>Pass</span>
        <span className=' text-green-700'>op/&gt;</span>
        </div> 
        <div className=' text-green-700'>your own password Manager</div>
    </div>
    <div className="flex-col">
    <input type="text" value={form.site} placeholder='Enter website URL'onChange={handleChange} name='site' className='w-full mt-5 rounded-2xl border border-green-500 px-4 '/>
    <div className=' md:gap-5 flex flex-col md:flex-row justify-between'>
    <input type="text" value={form.username} placeholder='User Name'onChange={handleChange} name='username' className='w-full mt-5 rounded-2xl border border-green-500 px-4'/>
    <div className='flex relative'>
    <input type={showPassword ? 'text' : 'password'} value={form.password} placeholder='Enter Password'onChange={handleChange} name='password' className='w-full mt-5 rounded-2xl border border-green-500 px-4'/>
    <i
        className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute top-[26px] right-2 cursor-pointer`}
        onClick={togglePasswordVisibility}
      ></i>
    </div>
    </div>
    </div>
    <div className="flex justify-center mt-5">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex justify-center items-center"onClick={savePassword} >
            <span><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon></span>
            <span className='sc mt-2'>Save</span>
        </button>
    </div>
    <div className="passwords">
      <h2 className='font-bold text-xl py-4'>Your Password</h2>

       {passwordArray.length === 0 && <div>nothing to show</div>}
       {passwordArray.length !== 0 &&
  <table className="table-auto w-full mb-10">
  <thead className='bg-green-800 text-white'>
    <tr>
      <th>Site</th>
      <th>Username</th>
      <th>Password</th>
      <th>Action</th>

    </tr>
  </thead>
  <tbody className='bg-green-200'>
  {passwordArray.map((item,index)=>{
    return <tr key={index}>
      <td className=' text-center w32 py-2 border border-green-300'><a href={item.site} target='_blank'>{item.site}</a>
      <span className='cursor-pointer' onClick={()=>{copyText(item.site)}}><lord-icon style={{"width":"25px","height":"25px","padding":"12px"}}src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></span></td>
      <td className=' text-center w32 py-2 border border-green-300'>{item.username}
      <span className='cursor-pointer' onClick={()=>{copyText(item.username)}}><lord-icon style={{"width":"25px","height":"25px","padding":"12px"}}src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></span></td>
      <td className=' text-center w32 py-2 border border-green-300'>{item.password}
      <span className='cursor-pointer' onClick={()=>{copyText(item.password)}}><lord-icon style={{"width":"25px","height":"25px","padding":"12px"}}src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></span></td>
      <td className=' text-center w32 py-2 border border-green-300'>
        <div className='flex justify-center cursor-pointer'>
      <span onClick={()=>{editPassword(item.id)}}><lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{"width":"25px","height":"25px"}}></lord-icon></span>
      <span onClick={()=>{deletePassword(item.id)}}><lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover"style={{"width":"25px","height":"25px"}}></lord-icon></span>
      </div>
      </td>
    </tr>
    })}

  </tbody>
</table>
}
    </div>
</div>



    </>
  )
}

export default Manager








    

    
