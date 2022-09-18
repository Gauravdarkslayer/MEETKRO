;
const apiconfig = require('../config/config')
const serviceroutes = require('../config/serviceroutes')

const axios = require('axios')


export const userMeeting = async (data, url = apiconfig.baseurl + serviceroutes.schedulemeeting) => {
  var response = await axios.post(url, data)
  if (response.data.statusCode === 200) {
    return response.data;
  } else {
    return response.data;
  }
}

export const timeSlots = async ( url = apiconfig.baseurl + serviceroutes.timeslot) => {
    var response = await axios.get(url)
    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      return response.data;
    }
  }



  export const startMeeting = async ( uuid,url = apiconfig.baseurl + serviceroutes.startingmeeting) => {
    var response = await axios.get(url+uuid)
    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      return response.data;
    }
  }



 