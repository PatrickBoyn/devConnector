import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Success!');
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fas-fa-user'></i>
        Sign into your account
      </p>

      <form
        action='dashboard.html'
        className='form'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='email@email.com'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='password'
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' value='Login' className='btn btn-success' />
      </form>

      <p className='my-1'>
        Don't have an account yet?
        <Link to='/register'>Sign up</Link>
      </p>
    </section>
  );
};
