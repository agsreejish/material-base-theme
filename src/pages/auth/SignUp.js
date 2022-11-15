import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import AuthBox from "../../components/auth/AuthBox";
import AuthLayout from "../../layouts/AuthLayout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { projectName } from "../../constants/defaultValues";

import { useFormik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password'
import ModalDialog from "../../components/ModalDialog";
import TermsAndConditions from "../../components/terms/TermsAndConditions";
import { Login } from "../../routes/path";
YupPassword(yup) // extend yup


const validationSchema = yup.object().shape({
    firstName: yup
      .string('Enter your first name')
      .required('First name is required'),
    lastName: yup
      .string('Enter your last name')
      .required('Last name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup
        .string('Enter your phone')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
        .required('Phone is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required')
      .password(),
    terms: yup
      .boolean('Accept terms and conditions')
      .oneOf([true],'Please accept the terms and conditions'),
  });

export default function SignUp(){

    const [values, setValues] = useState({
        showPassword: false,
      });

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const [termsOpen, setTermsOpen] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            terms:false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values)
        },
      });

    return(
        <AuthLayout>
            <AuthBox>
                <Box mt={3} width={'100%'} textAlign={'center'}>
                    <Typography variant="h3" >
                    Get started with {projectName}
                    </Typography>
                    <Typography variant="body2" >
                        Please enter the following details to create an account
                    </Typography>
                </Box>
                <Box className="auth-form" width={'100%'} >
                    <form onSubmit={formik.handleSubmit}>
                        <Box width={'100%'} mb={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth                                        
                                        id="firstName"
                                        name="firstName"
                                        label="First Name *"
                                        autoComplete="off"
                                        {...formik.getFieldProps('firstName')}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth                                       
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name *"
                                        autoComplete="off"
                                        {...formik.getFieldProps('lastName')}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box width={'100%'} mb={3}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                label="Email *"
                                autoComplete="off"
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <Box width={'100%'} mb={3}>
                            <TextField
                                fullWidth
                                id="phone"
                                name="phone"
                                type="tel"
                                label="Phone *"
                                autoComplete="off"
                                {...formik.getFieldProps('phone')}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Box>
                        <Box width={'100%'} mb={2}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type={values.showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                {...formik.getFieldProps('password')}
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
                        <Box>
                            <FormGroup>
                                <FormControlLabel                                    
                                    label={<Typography sx={{ color: 'text.primary' }} textAlign="left" variant="subtitle2" >
                                    I agree to the {<Link onClick={(e) =>{ e.preventDefault(); setTermsOpen(true); }}>terms and conditions</Link>} 
                                    </Typography>} 
                                    control={<Checkbox />} 
                                    {...formik.getFieldProps('terms')}
                                    error={formik.touched.terms && Boolean(formik.errors.terms)}
                                />
                                {formik.touched.terms && Boolean(formik.errors.terms) && <FormHelperText error={true}>{formik.touched.terms && formik.errors.terms}</FormHelperText>}
                            </FormGroup>
                        </Box>
                        <Box mt={3} pb={4}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>Create Account</Button>
                        </Box>
                    </form>
                    <Box mt={3} >
                        <Typography variant="body1" textAlign={"center"}>                        
                            Already have an account? <Link href={Login} >Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </AuthBox>
            <ModalDialog onClose={()=>{ setTermsOpen(false); }} open={termsOpen} maxWidth={'md'}>
                <TermsAndConditions />
            </ModalDialog>
        </AuthLayout>
    )
}