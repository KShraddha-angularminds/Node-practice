import React from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import {Link} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from '@material-ui/icons//Delete';
import EditIcon from '@material-ui/icons//Edit';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';


function Employee({employeeData,deleteRecord}) {


  const deleteEmp = (index)=>{
    deleteRecord(index)
  }
  console.log(employeeData)
  return (
    <div style={{marginTop:"50px"}}>
     <Box textAlign='center'>
         <Link to="/employee/add" >
       <Button variant='contained'>
        Add Employee
       </Button>
       </Link>
       
     </Box>  
     <TableContainer component={Paper} style={{marginLeft:"40px",marginRight:"10px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData?.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{row.name.charAt(0)}</Avatar>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.mobile}</TableCell>
              {/* <TableCell onClick={()=>deleteEmp(index)}>{"delete"}</TableCell> */}
              <IconButton aria-label="delete" onClick={() => deleteEmp(index)}>
                                        <DeleteIcon />
                                    </IconButton>
              <Link to={`/employees/update/${index}`}>
              <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default Employee