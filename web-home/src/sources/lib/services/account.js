
import { Api } from '../api'
import api from '../../config/api'
import cache from '../cache';
import base64url from 'base64url';
export default {
  signIn: Api.post('/account/signIn'),
  info: Api.get("/account/info"),
  getId: function () {
    try {
      let token = cache.local.getItem("access-token");
      if (!token) {
        return null;
      }
      //解析token
      let tokenArr = token.split('.');
      let playload = tokenArr[1];
      playload = JSON.parse(base64url.decode(playload));
      return playload['id'];
    } catch (e) {
      return null
    }
  },
  studentSignUp: Api.post('/student/signUp'),
  teacherSignUp: Api.post('/teacher/signUp')
}