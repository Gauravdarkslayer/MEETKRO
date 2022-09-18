import React ,{useEffect}from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Typography } from '@mui/material'
import { startMeeting } from '../../services/meetingservice'
import Grid from '@mui/material/Grid'
export default function StartMeeting() {
    const id = useParams("id")
    useEffect(() => {
      console.log(id)
      async function startMeetingAPI(id){
        var response = await startMeeting(id)
        console.log(response.data)
        window.location.replace(response.data)
    }
    startMeetingAPI(id.id)
    }, [])
    
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
   <CircularProgress />
   <Typography variant="h5" component="h5" align="center">
 Preparing your meeting ...
</Typography>;
  </Grid>   
   
</Grid> 
  )
}
