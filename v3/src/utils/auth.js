import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UseridKey = 'User-Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserid() {
    return Cookies.get(UseridKey)
}
  
export function setUserid(userid) {
    return Cookies.set(UseridKey, userid)
}