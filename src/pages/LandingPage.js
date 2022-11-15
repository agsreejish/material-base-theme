import logo from '../assets/images/logo-icon.svg';

import { Box, Button } from '@mui/material';

import { projectName } from '../constants/defaultValues';
import { Login } from "../../routes/path";

function LandingPage() {
  return (
    <Box component={"div"} className="App" >
      <header className="App-header" >
        <Box component={"img"} src={logo} className="App-logo" alt="logo" />
        <Box component={"p"} className="welcome-msg">
          Welcome to {projectName}.
        </Box>
        <Box mt={2} pb={4}>
            <Button href={Login} variant="contained" color="primary" sx={{width:'240px', py:1.5}} >Login</Button>
        </Box>      
      </header>
    </Box>
  );
}

export default LandingPage;
