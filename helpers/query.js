const axios = require('axios')
const pluralize = require('pluralize')
const QS = require('qs')
module.exports = async ({ apiURL, resourceName, jwtToken,isSingleType,qso }) => {
  let resource
  if (isSingleType) {
    resource = resourceName
  } else {
    resource = pluralize(resourceName)
  }
  const qsOptions = {populate:true,_limit:100,...(qso || {})}
  const queryString = QS.stringify(qsOptions,
    {
        encodeValuesOnly: true,
    })

  // Define API endpoint.
  const apiEndpoint = `${apiURL}/${resource}?${queryString}`;

  // Set authorization token
  const fetchRequestConfig = {}
  if (jwtToken !== null) {
    fetchRequestConfig.headers = {
      Authorization: `Bearer ${jwtToken}`
    }
  }

  // Make API request.
  return axios(apiEndpoint, fetchRequestConfig)
    .then(res => res.data)
    .catch(err => {
      console.error(`Unable to get content type (${resource}). Did you enable permissions in the Strapi admin for this?`)
      throw err
    })
}
