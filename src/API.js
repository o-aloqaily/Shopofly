const url = 'http://10.131.193.164:8000/api'

export const login = (email, password) => {
  const body = { "email": email, "password": password }
  return fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
  .then((data) => data.access_token)
  .catch((error) => console.log(error))
}

export const register = (data) => {
  // data parameter is a json object containing all registration data
  const { name, email, password, phoneNumber, address } = data
  const body = { "name": name, "email": email, "password": password, "mobile_number": phoneNumber, "address": address }
  return fetch(`${url}/users/register`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
  .then((data) => data.token)
  .catch((error) => error)

}

export const getUserInfo = (token) => {
  return fetch(`${url}/auth/me`, {
    method: 'POST', // or 'PUT'
    headers: { 'TOKEN': token }
  })
  .then((res) => response.json())
  .then((data) => console.log(data))
}

const logout = () => {
  // TODO implement this.
}
