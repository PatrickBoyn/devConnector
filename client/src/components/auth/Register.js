import React, { useState } from 'react';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConformation: ''
  });

  const { name, email, password, passwordConformation } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fas-fa-user'></i>
        Create Your Account
      </p>
      <form action='dashboard.html' className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='email@email.com'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <small className='form-text'>
          This site uses Gravatar, so if you want a profile image, use a
          Gravatar email.
        </small>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='passwordConfirmation'
            value={passwordConformation}
            placeholder='Confirm password'
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account?
        <a href='login.html'>Sign in</a>
      </p>
    </section>
  );
};
