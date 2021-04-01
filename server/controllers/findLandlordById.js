const axios = require('axios')
require('dotenv').config()

/*-------------------------------------COMMON HEADERS-------------------------------------*/
axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['apikey'] = process.env.ATOM_KEY
/*-------------------------------------COMMON HEADERS-------------------------------------*/

const findLandordById  = () => {

}

module.exports = {
  findLandordById
}