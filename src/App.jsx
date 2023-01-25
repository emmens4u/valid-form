import { useEffect, useState } from 'react'
import './index.css'

function App() {

  const initialValues = {username:"", email:"", password:""}
  const [input, setInput] = useState(initialValues)
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange =(e) =>{
      const {name, value} = e.target
      setInput({...input, [name]:value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(validate(input))
    setIsSubmit(true)
  }

  

  const validate = (values) =>{
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@amalitech|@amalitech\.com|org $/;
    if(!values.username){
      errors.username = "Username is required";
    }
    if(!values.email){
      errors.email ="Email is required";
    } else if (!regex.test(values.email)){
      errors.email = "this is not a valid email"
    }
    if(!values.password){
      errors.password = "Password is required"
    }else if (values.password.length < 4){
      errors.password = "Password must be more than 4 characters"
    }
    return errors
  }

  useEffect(()=>{
    console.log(error);
    if(Object.keys(error).length === 0 && isSubmit){
      console.log(input);
    }
  },[error])

  return (
    <div className="">
      {Object.keys(error).length === 0 && isSubmit ? (<div className='ui message'>Signed in successfully</div>)
      : (<> </>)}
      <form onSubmit={handleSubmit} className='text-black'>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text"
         name="username" 
         placeholder="Enter your username"
         value={input.username}
         onChange={handleChange}
         />
      </label>
      <p>{error.username}</p>

      <br />
      <label>
        Email:
        <input 
        type="email"
        name="email" 
        placeholder="Enter your email"
        value={input.email}
        onChange={handleChange}
        />
      </label>
      <p>{error.email}</p>

      <br />
      <label>
        Password:
        <input 
        type="password"
         name="password" 
         placeholder="Enter your password"
         value={input.password}
         onChange={handleChange}
         />
      </label>
      <p>{error.password}</p>

      <br />
      <button type="submit">Submit</button>
    
    </form>
      
    </div>
  )
}

export default App
