import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ImageSlider from '../shared/slider/ImageSlider';
import { useNavigate } from "react-router-dom";
import styled, { css } from 'styled-components';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import moment from 'moment';
import { timeSlots, userMeeting } from '../../services/meetingservice';
import { isEmpty, map } from 'lodash';
import Snackbar from '@mui/material/Snackbar';

const Body = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [selected_agenda,setAgenda]=useState(null)
  const [selected_time,setTime]=useState(null)
  const [agenda_list,setAgendaList]=useState([])
  const [timeslot_list,setTimeList]=useState([])
  const [apiresponse,setResponse]=useState([])  
  const [isSnackBarOpen, setIsSnackBarOpen]=useState(false)   


  useEffect(() => {
    async function getTimeSlotapi(){
      var agendalist=[]
      var lookup=[]
      var result =  await timeSlots()
      console.log(result)
      setResponse(result)
      for(var i=0 ; i< result.length ; ++i ){
        var name = result[i].agenda;
        if (!(name in lookup)) {
          lookup[name] = 1;
          agendalist.push({"_id":result[i]._id,"agenda":result[i].agenda});
        }
      }
      setAgendaList(agendalist)
    }
    getTimeSlotapi()      
   }, [])

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

  const scheduleMeeting = async (event) => {
    event.preventDefault();
    if(validateFields()) {
      const userdetails={"user":{"name":name,"email":email,"description":description},"booking_slot_id":selected_time} 
      const response = await userMeeting(userdetails);
      setOpenDialog(false)
      setIsSnackBarOpen(true);
    } else {
      alert("Please enter required details schedule meeting");
    }
  }

  const validateFields = () => {
    let isValidated = true;
    map(['name', 'email', 'description', 'agenda', 'selected_time'], (item) => {
      if(!item || isEmpty(item)) {
        isValidated = false;
      }
    });
    return isValidated;
  }

  const handleChangeAgenda = (event) => {
    console.log(event.target)
    setAgenda(event.target.value);
    setTimeList(apiresponse.filter(function(item){
    return item.agenda == event.target.value;
    }))
  };

  const handleChangeTime = (event) => {
    console.log(event.target.value)
    setTime(event.target.value);
  };

  return (
    <BodyContainer>
      <BodyLeft>
        <h1>
          Premium video meetings. <br /> Now free for everyone.
        </h1>
        <h3>
          We re-engineered the services we built for secure business <br />
          meetings, Google Meet, to make it free and available for all.
        </h3>
        <BodyButtons style={{width: '100%', justifyContent: 'center'}}>
          <LeftButtons>
            <Button
              onClick={() => {
                // navigate('/schedule')
                setOpenDialog(true)
              }}
              style={{width: '200px', borderRadius: '50px'}}
            >
              Schedule
            </Button>
          </LeftButtons>
        </BodyButtons>
      </BodyLeft>
      <BodyRight>
        <ImageSlider></ImageSlider>
      </BodyRight>
      {
        openDialog &&
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Schedule Meetings in available Time Slots</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this link, please enter below details here. We
            schedule your meeting according to selected Time Slot.
          </DialogContentText>
        <form onSubmit={scheduleMeeting}>
          <TextField
            autoFocus
            margin="dense"
            id="Email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={onEmailChange}
            value={email}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onNameChange}
            value={name}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="Description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={onDescriptionChange}
            value={description}
            required
          />
          <InputLabel id="demo-simple-select-label">Select Agenda</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected_agenda}
            label="Category"
            fullWidth
            onChange={handleChangeAgenda}
            required
          >
            { agenda_list.map((val)=>{
              return <MenuItem
                        key = {val._id}
                        value={val.agenda}
                        name={val.agenda}
                      >
                        {val.agenda}
                      </MenuItem>
            })}
          </Select>

          <InputLabel id="demo-simple-select-label">Select Timeslot</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            value={selected_time}
            label="Category"
            onChange={handleChangeTime}
            required
          >

          {timeslot_list.map((val) => {
            return <MenuItem
                      key = {val._id}
                      value={val._id}>
                        { moment(val.start_time).utcOffset(0, true).format('YYYY-MM-DD HH:mm:ss')  +"-"+ moment(val.end_time).utcOffset(0, true).format('YYYY-MM-DD HH:mm:ss')}
                    </MenuItem> 
          })}
  
          </Select>
        </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' style={{backgroundColor: 'red'}} onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant='contained' style={{backgroundColor: 'red'}} onClick={(event) => scheduleMeeting(event)}>Schedule</Button>
        </DialogActions>
      </Dialog>
      }
      <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={() => setIsSnackBarOpen(false)}>
        <Alert onClose={() => setIsSnackBarOpen(false)} severity={'success'} sx={{ width: '100%' }}>
          Successfully Scheduled your Meeting with the Admin!!
        </Alert>
      </Snackbar>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  align-items: center;
`;

// BODY LEFT

const BodyLeft = styled.div`
  display: inline-flex;
  flex-basis: 35rem;
  flex-direction: column;
  flex-shrink: 1;
  max-width: 45rem;
  padding: 1em 3em;
  justify-self: center;
  /* border: 1px solid black; */

  > h1 {
    font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
    font-size: 2.75rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 3.25rem;
    padding-bottom: 0.5em;
  }

  > h3 {
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;
    color: #5f6368;

    max-width: 30rem;
    padding-bottom: 3em;
  }

  .line {
    max-width: 40rem;
    border-top: 1px solid grey;
    margin: 30px 0;
  }
`;

const BodyButtons = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
`;
const LeftButtons = styled.div`
  border-right: 1px solid rgba(128, 128, 128, 0.3);
  display: flex;
  align-items: center;
  > button {
    background-color: red;
    color: white;
    height: 48px;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 2rem;
    text-transform: none;
    padding: 10px;
    width: fit-content;
    :hover {
      background-color: #00675b;
    }
  }
`;


const RightButtons = styled.div`
  margin-left: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > div {
    border: 1px grey solid;
    color: grey;
    height: 48px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 10px;
    margin-right: 20px;
    :hover {
      border-color: black;
    }

    :focus {
      outline: #00675b;
    }

    > span {
      color: grey;
    }

    > input {
      border: none;
      font-size: 1rem;
      text-align: center;
      width: 80%;
      :focus {
        outline: none;
        background-color: rgba(126, 126, 126, 0.1);
      }
    }
  }
`;


const LearnMore = styled.div`
  > a {
    color: grey;
    text-decoration: none;
    > span {
      color: #00796b;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

// BODY RIGHT

const BodyRight = styled.div`
  min-width: 500px;
  max-width: 500px;
  justify-self: center;
`;

export default Body;
