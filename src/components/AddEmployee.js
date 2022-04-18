import React,{useState,useEffect} from 'react'
import { Button, Paper } from '@mui/material'
import axios from 'axios'
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment'
import { FormGroup } from '@mui/material';
import {useNavigate} from 'react-router-dom'


function AddEmployee(props) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const navigate = useNavigate()
  const [cState,setCState]= useState({})
  const [city,setCity]= useState({})
  const hobby=['Dancing','Singing','Writing','Crafting']
  const storedData = localStorage.getItem("employee")
  const [newHobby,setNewHobby] = useState("")

  useEffect(() => {
    axios
        .get("https://www.universal-tutorial.com/api/states/India", {
            headers: {
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUwMTg1NjYyfQ.JRhfVK3_M2L6Bwv5whitTh-RcNhCHokP_rM_LZe5ZGo",
            },
        })
        .then((res) => {
            setCState(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err))
}, []);
const defaultEmpObject={
  name:"",
        email:"",
        mobile:"",
        address:"",
        state:"",
        city:"",
        date:"",
        gender:"",
        password:"",
        hobbies:[],
        com_skill:""
}
  const [employee,setEmployee] = useState(defaultEmpObject)


const setStateDistrict =(v)=>{
  setEmployee({...employee,state:v})
  axios
  .get(`https://www.universal-tutorial.com/api/cities/${v}`, {
      headers: {
          "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjUwMTg1NjYyfQ.JRhfVK3_M2L6Bwv5whitTh-RcNhCHokP_rM_LZe5ZGo",
      },
  })
  .then((res) => {
      setCity(res.data);
      console.log(res.data)
  })
  .catch(err => console.log(err))
}
const h= []
const handleCheckbox =(e,isChecked)=>{
console.log(isChecked,e.target.value)
return isChecked ? setEmployee({...employee, hobbies:[...employee.hobbies,e.target.value]}) : ""
}

const addEmployee = (e)=>{
e.preventDefault();
props.addEmployeeHandler(employee);
setEmployee(defaultEmpObject)
alert("Record Added Successfully")
navigate("/employee")
}

const checkboxHandler = () => {
  setEmployee({ ...employee, hobbies: [...employee.hobbies, newHobby] });
  setNewHobby('');
}

const checkboxClickHandler = e => {
  let idx = '';
  let temp = [...employee.hobbies];
  if (employee.hobbies.length > 0) {
      for (let i = 0; i < employee.hobbies.length; i++) {
          if (employee.hobbies[i] === e.target.value) {
              idx = i;
              break;
          }
      }
  }
  if (idx !== '') temp.splice(idx, 1);
  else temp.push(e.target.value)
  setEmployee({ ...employee, hobbies: temp });
}

console.log(employee)
  return (
    <div>
        <br/><br/>
    <Box
    style={{display:"flex", justifyContent:"center"}}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width:528,
          height: 880,
        },
      }}
    >
           <Paper elevation={3} >
           <h2><center><font color="black">Add Employee Details</font></center></h2>

           <Grid container direction={"row"} spacing={4} style={{padding:"30px"}}>

           <Grid item >
           <TextField id="outlined-basic" label="Name" variant="outlined" value={employee.name} name="name" onChange={(e)=>setEmployee({...employee,name:e.target.value})} requires/>
           <TextField id="outlined-basic" label="Email" variant="outlined" value={employee.email} name="email" onChange={(e)=>setEmployee({...employee,email:e.target.value})} style={{marginLeft:"10px"}} required/>
           </Grid>


           <Grid item>
           <TextField id="outlined-basic" label="Mobile" value={employee.mobile} name="mobile" onChange={(e)=>setEmployee({...employee,mobile:e.target.value})} variant="outlined" />
           <TextareaAutosize
             aria-label="empty textarea"
             minRows={3}
             placeholder={'Address'}
             value={employee.address}
              name="address"
              onChange={(e)=>setEmployee({...employee,address:e.target.value})}
            style={{ width: 220 ,marginLeft:"12px"}}
                    />
           </Grid>


            <Grid item xs={12}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cState}
            getOptionLabel={cState => cState.state_name}
            renderInput={params => (
              <TextField {...params} label="States" variant="outlined" />
            )}
          
                onChange={(event,value)=>setStateDistrict(value.state_name)}
             />
            </Grid>

           <Grid item xs={12}>
           <Autocomplete
            disablePortal
            id="combo-box"
             options={city}
            getOptionLabel={city => city.city_name}
            renderInput={params => (
              <TextField {...params} label="City" variant="outlined" />
            )}
          
                 onChange={(event,value)=>setEmployee({...employee,city:value.city_name})}
             />
            </Grid>
            
         <Grid item sx={12} style={{width:"5000px"}}>
           <LocalizationProvider  dateAdapter={AdapterDateFns}>
            <DatePicker
            label="Date"
            value={employee.date}
            onChange={(newValue) => {
             setEmployee({...employee,date:moment(newValue).format('DD-MM-YYYY')});
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
            />
          </LocalizationProvider>
          </Grid>
            <br/>
          <Grid item>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e)=>setEmployee({...employee,gender:e.target.value})}
          >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
         
          </RadioGroup>
           </Grid>

           <TextField id="outlined-basic" label="Password" type={'password'} onChange={(e)=>setEmployee({...employee,password:e.target.value})} variant="outlined" style={{marginLeft:"30px",marginBottom:"5px"}}/>
           
          <br/>
          <Grid item>
         
          <TextField id="outlined-basic" label="Hobbies" variant="outlined" value={newHobby} onChange={e => setNewHobby(e.target.value)} />
            <Button variant="contained" style={{marginLeft:"20px"}} onClick={checkboxHandler} >Add Hobby</Button>

                    <FormGroup>
                        {employee.hobbies.map((hobby, j) => {
                            return (
                                <FormControlLabel key={j} control={<Checkbox />} value={hobby} label={hobby} checked={true} onClick={checkboxClickHandler} />
                            )
                        })}

                    </FormGroup>
          </Grid>

           <Grid item>
           <Box width={230}>
           <FormLabel id="demo-row-radio-buttons-group-label">Communication Skills</FormLabel>

           <Slider  aria-label="Default" onChange={(e)=>setEmployee({...employee,com_skill:e.target.value})} valueLabelDisplay="auto" max={5}/>
           </Box>
           </Grid>


           <Grid  item  xs={13} align="center">
           <Button variant='contained' onClick={addEmployee} style={{width:"400px"}}>
               Add 
           </Button>
          
           </Grid>
         </Grid>
        </Paper>
    </Box>
    </div>
  )
}

export default AddEmployee