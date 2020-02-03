import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import propTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConformation: ''
  });

  const { name, email, password, passwordConformation } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConformation) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      register({name, email, password });
    }
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fa-fa-user'></i>
        Create Your Account
      </p>
      <form
        action='dashboard.html'
        onSubmit={e => onSubmit(e)}
        className='form'
      >
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
            name='passwordConformation'
            placeholder='Confirm Password'
            value={passwordConformation}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account?
        <Link to='/login'>Sign in</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
