import TextField from "@mui/material/TextField";
import React, { useState,useEffect } from "react";
import  Button  from "@mui/material/Button";
import  Paper  from "@mui/material/Paper";
import Grid  from "@mui/material/Grid";
import moment from "moment";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import { timeSlots } from "../../services/meetingservice";

import { userMeeting } from "../../services/meetingservice";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


 
const  Form= () => {


   useEffect(() => {
 
    async function getTimeSlotapi(){
       var agendalist=[]
       var lookup=[]
        var result =  await timeSlots()
        console.log(result)
      setResponse(result)
      for(var i=0 ; i< result.length ; ++i ){
        console.log(result[i])

        var name = result[i].agenda;

        if (!(name in lookup)) {
          lookup[name] = 1;
          agendalist.push({"_id":result[i]._id,"agenda":result[i].agenda});
        }
     


      }
      console.log(agendalist)
      setAgendaList(agendalist)
     // console.log(agenda_list)
        //console.log(result)
        console.log(apiresponse.filter(function(item){
         return item.agenda == "asda"; 
         
         
     }));
      }
      getTimeSlotapi()      
   }, [])
   
   
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const status =["success","error"]
    const [agenda_list,setAgendaList]=useState([])
    const [timeslot_list,setTimeList]=useState([])
   const [apiresponse,setResponse]=useState([])   
    const [selected_agenda,setAgenda]=useState(null)
    const [selected_time,setTime]=useState(null)
   
    const handleChangeAgenda = (event) => {
        console.log(event.target)
        setAgenda(event.target.value);
console.log(apiresponse)
setTimeList(apiresponse.filter(function(item){
    return item.agenda == event.target.value; 
    
    
}))
        console.log(apiresponse.filter(function(item){
            return item.agenda == event.target.value; 
            
            
        })
        )
      };
    
      const handleChangeTime = (event) => {
       console.log(event.target.value)
        setTime(event.target.value);

      };
    
      
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
 

 
    
 
  

  const onEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value );
  };

  

  const onNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value );
  };
  const onDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value );
  };
   const handleSubmit = async ()=> { 
   const userdetails={"user":{"name":name,"email":email,"description":description},"booking_slot_id":selected_time} 
    console.log(userdetails)
  var response= await userMeeting(userdetails)
  console.log(response)

}
  

  return (



    <Grid
  container
  spacing={2}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
 

  <Stack spacing={2}>
  <TextField
        onChange={onEmailChange}
        value={email}
        label={"email"} //optional
      />
  <TextField
        onChange={onNameChange}
        value={name}
        
        label={"name"} //optional
      />

<TextField
        onChange={onDescriptionChange}
        value={description}
        
        label={"Description"} //optional
      />

<InputLabel id="demo-simple-select-label">Select Agenda</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selected_agenda}
   
    label="Category"
    onChange={handleChangeAgenda}
  >

    {  agenda_list.map((val)=>{
       // console.log(val);
  return  <MenuItem key = {val._id}  value={val.agenda} name={val.agenda} > {val.agenda}</MenuItem>

    })  }
  
  </Select>





  <InputLabel id="demo-simple-select-label">Select Timeslot</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selected_time}
   
    label="Category"
    onChange={handleChangeTime}
  >

    {  timeslot_list.map((val)=>{
       // console.log(val);
  return  <MenuItem key = {val._id}  value={val._id}> {    moment.utc(val.start_time).format('YYYY-MM-DD HH:mm:ss')  +"-"+ moment.utc(val.end_time).format('YYYY-MM-DD HH:mm:ss')  }</MenuItem>

    })  }
  
  </Select>


  <Button variant="contained" onClick={handleSubmit}>Submit</Button>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status[selectedIndex]} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
</Stack>

  
    

  </Grid>   
   
</Grid> 
 
  );
};
export default Form