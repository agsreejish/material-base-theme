import { Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthBox from "../../components/auth/AuthBox";
import AuthLayout from "../../layouts/AuthLayout";
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Login } from "../../routes/path";

const validationSchema = yup.object().shape({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required')
  });

export default function ForgotPassword(){

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          
        },
      });

    return(
        <AuthLayout>
            <AuthBox>
                <Box mt={3} width={'100%'} textAlign={'center'}>
                    <Typography variant="h3" >
                    Forgot Password?
                    </Typography>
                    <Typography variant="body2" >
                        No worries, we'll send you the reset instructions
                    </Typography>
                </Box>
                
                <Box className="auth-form" width={'100%'} >
                    <form onSubmit={formik.handleSubmit}>
                        <Box width={'100%'} mb={3}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                label="Email *"
                                autoComplete="email"
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <Box mt={3} pb={4}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Reset Password</Button>
                        </Box>
                    </form>
                    <Box mt={3} >
                        <Typography variant="body1" textAlign={"center"}>                        
                            Back to <Link href={Login} >Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </AuthBox>
        </AuthLayout>
    )
}