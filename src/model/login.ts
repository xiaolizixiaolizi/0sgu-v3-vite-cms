import request from "@/utils/request"
class Login {
  static async login(data) {
    const r = await request({
      method: 'post',
      url: '/api/user/login',
      data

    })
    return r
  }
  static async getUserInfo() {
    const r = await request({
      method: 'get',
      url: '/api/user/info',
    })
    return r
  }

}

export default Login