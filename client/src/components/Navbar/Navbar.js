import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar({ user, setUser }) {
  const [form, setForm] = useState({});
  const [loginToggle, setLoginToggle] = useState(false);
	const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleForm = () => {
    setLoginToggle(!loginToggle);
  };

  const handleLogout = () => {
    fetch('/logout')
      .then(() => {
        setUser(null);
				navigate('/')
      })
      .catch(console.log);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      loginToggle ? '/login' : '/register',
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      },
    )
      .then((res) => res.json())
      .then((res) => {
				setUser(res);
				navigate('/cats')
			})
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };

  const renderLogout = () => <button className="logout" type="button" onClick={handleLogout}>Logout</button>;

  const renderReg = () => (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={form.name || ''} name="name" disabled={loginToggle} onChange={handleChange} placeholder="Name" />
        <input type="text" value={form.email || ''} name="email" onChange={handleChange} placeholder="Email" />
        <input type="password" value={form.password || ''} name="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
      <label>
        <input type="checkbox" onChange={handleForm} />
        <span>{loginToggle ? 'Back to registration' : 'To login'}</span>
      </label>

    </div>
  );

  return (
    <div className="sticky__t-0">
      <div className="navbar">
        Своя игра
      </div>
      <div className="navbar-menu">
        {user ? renderLogout() : renderReg()}
      </div>

    </div>
  );
}

export default Navbar;
