import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';








export default function NavBar() {

  const [mobileOpen, setmobileOpen] = useState(false)


const handleMobile=()=>{

  setmobileOpen((prevState)=>!prevState);
}

const navItems=["Students"]

const container = window !== undefined ? () => window.document.body : undefined;
const [apiResults, setapiResults] = useState([])


const fetchApi=async()=>{
  
 const data= await fetch("http://localhost:8080/api/students",{
    
    method:"GET",
    headers:{
      "Content-type":"application/json",
      'Access-Control-Allow-Origin':'*'
    }
  })
  const res= await data.json()
  console.log(res)
  setapiResults(res)
}

useEffect(() => {
 fetchApi()
}, [])


const drawer = (
  <Box onClick={handleMobile} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);





  return (
    <>
    <AppBar component="nav" position='static'>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleMobile}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        MUI
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {navItems.map((item) => (
          <Button key={item} sx={{ color: '#fff' }}>
            {item}
          </Button>
        ))}
      </Box>
    </Toolbar>
    <nav>
        <Drawer
          
          container={container} //this may be optional ?
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobile}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "50vw" },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
  </AppBar>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Fecha de Nacimiento</TableCell>
                  <TableCell>Edad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiResults.map((item)=>{
                  return (
                 <TableRow key={item.name}>
                   <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.dob}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  {console.log("you FORGOT THE RETURN STATEMENT")}
                 </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            </TableContainer>
        

</>
  )
}
