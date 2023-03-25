import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/userSlice';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6, 'Your password needs to be at least 6 characters.').max(40).required(),
  })
  .required();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const valid = (e) => {
    dispatch(loginUser(e));
    navigate(location.state ? location.state.from.pathname : '/');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit(valid)}>
        <h2>sign In</h2>
        <TextField
          id="email"
          label="email adress"
          variant="outlined"
          {...register('email')}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          {...register('password')}
          error={errors?.password}
          helperText={errors?.password?.message}
        />
        <Button type="submit" variant="conteined">
          Login
        </Button>
      </Box>
      <p>
        Don&#8217;t have an account?
        <Link to="/registration">sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
