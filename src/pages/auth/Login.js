import { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import AuthBox from "../../components/auth/AuthBox";
import AuthLayout from "../../layouts/AuthLayout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector} from 'react-redux';
import { loginUser } from "../../redux/slices/user";


const validationSchema = yup.object().shape({
    username: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

export default function Login() {

    const [values, setValues] = useState({
        showPassword: false,
    });
    const [errors, setErrors] = useState(false);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));
        },
    });

    const loginErrors = useSelector((state) => state.user.error);
    useEffect(()=>{
        setErrors(loginErrors);
    },[loginErrors]);

    return (
        <AuthLayout>
            <AuthBox>
                <Box mt={3} width={'100%'} textAlign={'center'}>
                    <Typography variant="h3" >
                        Welcome Back...
                    </Typography>
                    <Typography variant="body2" >
                        Please enter your email and password
                    </Typography>
                    
                    {errors && <Typography variant="body1" mt={2} mb={0} color="red">
                        {errors.data}
                    </Typography>}
                </Box>

                <Box className="auth-form" width={'100%'} >
                    <form onSubmit={formik.handleSubmit}>
                        <Box width={'100%'} mb={3}>
                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                type="email"
                                label="Email *"
                                autoComplete="username"
                                {...formik.getFieldProps('username')}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Box>
                        <Box width={'100%'} >
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password *"
                                type={values.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                autoComplete="off"
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox id="remember" name="remember" {...formik.getFieldProps('remember')} checked={formik.values.remember} />} label="Remember me" />
                            </FormGroup>
                            <Link href="/forgot-password" >Recover Password</Link>
                        </Box>
                        <Box mt={3} pb={4}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                        </Box>
                    </form>
                    <Box mt={3} >
                        <Typography variant="body1" textAlign={"center"}>
                            Don't have an account yet? <Link href="/sign-up" >Sign Up</Link>
                        </Typography>
                    </Box>
                </Box>
            </AuthBox>
        </AuthLayout>
    )
}