import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Outlet } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material'


function Root(){
    return (
        <Box sx={{ bgcolor: 'primary.background', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" maxWidth="false" disableGutters>
                <Toolbar />
                <Outlet />
            </Container>
            <Footer />
        </Box>
    )

} export default Root