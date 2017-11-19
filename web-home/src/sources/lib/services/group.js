
import { Api } from '../api'
import api from '../../config/api'
import cache from '../cache';
import base64url from 'base64url';
export default {
    list: Api.get('/group')
}