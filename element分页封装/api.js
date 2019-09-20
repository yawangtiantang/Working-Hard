import httpRequest from '@/utils/httpRequest'
import {Message} from 'element-ui'

// get请求//index列表接口
const getUserInfo = data => get('/ybt-backend/sys/user/info', data) // 获取用户菜单数据
// post请求
const login = data => post('/ybt-backend/sys/login', data)// 登录
const logout = data => post('/ybt-backend/sys/logout', data)// 登出
const password = data => post('/ybt-backend/sys/password', data)// 修改密码
const save = data => post('/ybt-backend/supplyProjectOrganizationRule/save', data)// 新增项目
const list = data => post('/ybt-backend/supplyProjectOrganizationRule/list', data)// 项目列表
const info = data => post('/ybt-backend/supplyProjectOrganizationRule/info', data, 'params')// 查看项目配置
const update = data => post('/ybt-backend/supplyProjectOrganizationRule/update', data)// 修改项目配置
const enable = data => post('/ybt-backend/supplyProjectOrganizationRule/enable', data, 'params')// 修改项目配置
const getCateLevelList = data => post('/ybt-backend/cate/supplycatelable/getCateLevelList', data)// 修改项目配置

const $api = {
  login,
  getUserInfo,
  logout,
  password,
  save,
  list,
  update,
  info,
  enable,
  getCateLevelList
}
// 封装post请求
function post (url, data, paramsForm = 'data') {
  let obj = {
    url: httpRequest.adornUrl(url),
    method: 'post'
  }
  // if (paramsForm) {
  //   obj.data = httpRequest.adornData(data)
  // } else {
  //   obj.params = httpRequest.adornData(data)
  // }
  obj[paramsForm] = httpRequest.adornData(data)
  return httpRequest(obj).then(res => {
    return new Promise((resolve, reject) => {
      if (res && res.data.code === 0) {
        resolve(res.data)
      } else {
        Message({type: 'error', message: res.data.msg})
      }
    })
  })
}
// 封装get请求
function get (url, data = {}, flag = true) {
  return httpRequest({
    url: httpRequest.adornUrl(url),
    method: 'get',
    params: httpRequest.adornParams(data)
  }).then(res => {
    return new Promise((resolve, reject) => {
      if (res && res.data.code === 0) {
        resolve(res.data)
      } else {
        Message({type: 'error', message: res.data.msg})
      }
    })
  })
}
export default $api
