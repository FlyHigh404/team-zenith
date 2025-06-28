export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    console.warn('Token undefined, tidak disimpan.')
  }
}

export const setUserData = (userData) => {
  const jakartaDate = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' })
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('lastLogin', jakartaDate)
  }
}
export const getUserData = () => {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
}

export const getLastLogin = () => localStorage.getItem('lastLogin')

export const removeUserData = () => localStorage.removeItem('user')
export const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('lastLogin')
}
