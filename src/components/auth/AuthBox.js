import { Box, Card } from "@mui/material";
import PropTypes from 'prop-types';

import logo from '../../assets/images/logo.svg';

AuthBox.propTypes = {
    children: PropTypes.node
};

export default function AuthBox({ children }) {

    return(
        <Card className="auth-container">
            <Box component={"img"} src={logo} className="auth-logo" alt="logo" />
            {children}
        </Card>
    )
}