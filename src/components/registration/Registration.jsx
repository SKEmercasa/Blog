import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { createUser } from '../../redux/userSlice';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6, 'Your password needs to be at least 6 characters.').max(47).required(),
    username: yup
      .string()
      .matches(/^[a-z][a-z0-9]*$/, 'Is not in correct format')
      .min(3)
      .max(20)
      .required(),
    checkPass: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
  })
  .required();

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const valid = (e) => {
    dispatch(createUser(e));
    navigate('/login');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  return (
    <div>
      <Box id="createNew" component="form" onSubmit={handleSubmit(valid)}>
        <h2>Create New Account</h2>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          {...register('username')}
          error={errors?.username}
          helperText={errors?.username?.message}
        />
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
        <TextField
          id="checkPass"
          label="repeat password"
          variant="outlined"
          {...register('checkPass')}
          error={errors?.checkPass}
          helperText={errors?.checkPass?.message}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="I agree to the processing of my personal 
  information"
            className="create-new-acc_form_checkbox"
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Create
        </Button>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Box>
    </div>
  );
};

export default Registration;
