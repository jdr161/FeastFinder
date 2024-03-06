import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Outlet } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'
import { signOut } from 'aws-amplify/auth';
import { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../../contexts/authcontext';


function Root(){
  const [user, setUser] = useState(null);

  const logOut = useCallback(async () => {
    try {
      await signOut();
      setUser(null)
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }, [])

  // we use useMemo to prevent child components subscribed to the user context
  // from re-rendering on re-render of the Root component.
  // see https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const authContextValue = useMemo(() => ({
    user,
    setUser,
    logOut,
  }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <Box sx={{ bgcolor: 'primary.background', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container component="main" maxWidth="false" disableGutters>
          <Toolbar />
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </AuthContext.Provider>
    )

} export default Root