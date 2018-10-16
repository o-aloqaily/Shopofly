const URL = '127.0.0.1:8000/api'

const login = (email, password) => {
  return fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'TOKEN': token },
    body: JSON.stringify({ email, password })
  })
  .then((res) => response.json())
  .then((data) => data)
  .catch((error) => error)
}

const register = (data) => {
  // data parameter is a json object containing all registration data
  const { name, email, password, phoneNumber, address } = data

  return fetch(`${URL}/users/register`, {
    method: 'POST',
    body: JSON.stringify({
      name, email, password, mobile_number: phoneNumber, address
    })
  })

}

const getUserInfo = (token) => {
  return fetch(`${URL}/auth/me`, {
  method: 'POST', // or 'PUT'
  headers:{
    'TOKEN': token
  })
  .then((res) => response.json())
  .then((data) => data)
}

const logout = () => {
  // TODO implement this.
}
