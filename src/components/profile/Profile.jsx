import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { updateProfile } from '../../redux/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(6, 'Your password needs to be at least 6 characters.').max(40).required(),
      username: yup
        .string()
        .matches(/^[a-z][a-z0-9]*$/, 'Is not in correct format')
        .min(3)
        .max(20)
        .required(),
      image: yup.string().url(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: { username: user.username, email: user.email, password: user.password, image: user.image },
  });

  const onSubmit = (e) => {
    dispatch(updateProfile(e));
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>
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
        id="image"
        label="Avatar image (url)"
        variant="outlined"
        {...register('image')}
        error={errors?.image}
        helperText={errors?.image?.message}
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
};

export default Profile;
