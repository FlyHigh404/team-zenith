export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token)
  } else {
    console.warn('Token undefined, tidak disimpan.')
  }
}

export const removeToken = () => localStorage.removeItem('token')
