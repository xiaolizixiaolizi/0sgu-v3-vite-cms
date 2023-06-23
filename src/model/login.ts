import request from '@/utils/request'
class Login {
  static async login(data) {
    const r = await request({
      method: 'post',
      url: '/admin/acl/index/login',
      data,
    })
    return r.data
  }
  static async getUserInfo() {
    const r = await request({
      method: 'get',
      url: '/admin/acl/index/info',
    })
    return r.data
  }
  static async logout() {
    const r = await request({
      method: 'post',
      url: '/admin/acl/index/logout',
    })
    return r.data
  }

  static async getMenu() {
    const r = await request({
      method: 'get',
      url: '/admin/acl/index/menu',
    })
    return r.data
  }
}

export default Login
