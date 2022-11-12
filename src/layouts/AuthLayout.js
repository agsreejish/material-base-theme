import { Box } from '@mui/material';
import PropTypes from 'prop-types';

AuthLayout.propTypes = {
    children: PropTypes.node
};

export default function AuthLayout({ children }) {

    return (
        <Box component={"div"} className="auth-screen page-bg">
            {children}
        </Box>
    );
}
  