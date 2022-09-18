import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../components/home/Home'
import Schedule from '../components/schedule/schedule'
import StartMeeting from '../components/meeting/startmeeting'
const MeetingComponent = React.lazy(() => import('../components/meeting/meeting'));

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<HomePage />}></Route>
                <Route exact path='/Schedule' element={<Schedule />}></Route>
                <Route exact path='/meeting' element={<MeetingComponent />}></Route>
                <Route  path="/startmeeting/:id" element={<StartMeeting/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default  Router