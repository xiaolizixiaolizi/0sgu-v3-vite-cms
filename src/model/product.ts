import request from '@/utils/request'
export class TradeMark {
  static async create(params) {
    const r = await request({
      method: 'post',
      url: '/admin/product/baseTrademark/save',
      data: params,
    })
    return r.data
  }
  static async update(params) {
    const r = await request({
      method: 'put',
      url: '/admin/product/baseTrademark/update',
      data: params,
    })
    return r.data
  }

  static async delete(params) {
    const r = await request({
      method: 'delete',
      url: `/admin/product/baseTrademark/remove/${params.id}`,
    })
    return r.data
  }
}
