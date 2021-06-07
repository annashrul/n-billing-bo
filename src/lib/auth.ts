// import jwtDecode from "jwt-decode";
import http from "./httpService";
import Cookies from "js-cookie";
import {iUser} from './interface'
import { removeCookie, setCookie } from "helpers/general";
// http.setJwt (getJwt());


function setUser(datum: iUser) {
  setCookie('_uid',JSON.stringify(datum))
}

function setToken(datum: string) {
    setCookie('_nbilling',datum)
}
export function doLogout() {
  removeCookie('__uid');
  removeCookie('_nbilling');
  removeCookie('_regist');
  http.axios.defaults.headers.common["Authorization"] = '';

}

function getUser() {
  // const coo: string=Cookies.get('__uid')!;
  //  try {
  //    const datum:iUser= JSON.parse(atob(coo));
  //    return datum;
  // } catch (err) {
  //     // const datum:iUser= JSON.parse();
  //     return datum;
  // }
}

function getToken() {
  const coo: string=Cookies.get('_nbilling')!;
  return coo;
}

export default {
  http,
  doLogout,
  setUser,
  getUser,
  getToken,
  setToken
};
