import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// const Public = () => {
//     const content = (
//         <section className="public">
//             <header>
//                 <h1>Welcome to <span className="nowrap">DevNotes</span></h1>
//             </header>
//             <main className="public__main">
//                 <p>Located in Beautiful Downtown Alaminos City, JLZKDEV Repairs  provides a trained staff ready to meet your tech repair needs.</p>
//                 <address className="public__addr">
//                     JLZKDEV<br />
//                     160 Ritua Street<br />
//                     Alaminos City, Pangasinan 2404<br />
//                     <a href="tel:+639165553014">(+63) 91655553014</a>
//                 </address>
//                 <br />
//                 <p>Owner: Julius Biascan</p>
//             </main>
//             <footer>
//                 <Link to="/login">Employee Login</Link>
//             </footer>
//         </section>

//     )
//     return content
// }
// export default Public

export default function Public() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DevNotes
            </Typography>
            <Button href='/login' color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }