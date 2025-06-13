export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    console.warn('Token undefined, tidak disimpan.')
  }
}

export const setUserData = (userData) => {
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData))
  }
}
export const getUserData = () => {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
}

export const removeUserData = () => localStorage.removeItem('user')
export const removeToken = () => localStorage.removeItem('token')
