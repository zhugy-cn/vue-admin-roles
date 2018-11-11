import ajax from '@/libs/axios'


// 登录
export function getToken_api(params) {
  return ajax.post('user/getToken', params)
}

// 获取用户信息，权限
export function getUserInfo_api(token) {
  return ajax.get('user/getInfo', {
    params: { token }
  })
}

// 获取验证码
export function getSmsCode_api(phone) {
  return ajax.get('user/sendSMS', {
    params: { phone }
  })
}

// 重置密码
export function updatePassword_api(params) {
  return ajax.post('user/resetPass', params)
}