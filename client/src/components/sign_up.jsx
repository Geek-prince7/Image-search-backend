import { useState } from 'react';
import axios from 'axios'
import './signup.css';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange=(e)=>{
    setName(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/user/create', `email=${email}&password=${password}&name=${name}`,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
      
      if(response.data.code==1000){
        window.location.href = '/login';

      }
      else{
        window.location.href = '/signup';
      }
    //   window.location.href = '/login';
       // handle response data
    } catch (error) {
      console.error(error);
      window.location.href = '/signup';
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
      </form>
    </div>
  );
}

export default SignupPage;
