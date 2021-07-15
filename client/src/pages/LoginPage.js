import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const { notification } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/produtos');
    }
  }, [history, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
  };
  return (
    <main className='container'>
      <h1 className='heading-primary'>Entrar</h1>
      <h2 className='heading-secondary'>
        <i className='fas fa-user'></i> Faça seu login
      </h2>

      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        {notification && notification.status === 'success' && (
          <Alert variant='success'>{notification.message}</Alert>
        )}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            type='password'
            minLength='8'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='button button-center'>
          Entrar
        </button>
      </form>
      <p className='my-2 text-center'>
        Quer criar uma conta?{' '}
        <Link to='/cadastro'>
          <strong>Faça seu cadastro</strong>
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
