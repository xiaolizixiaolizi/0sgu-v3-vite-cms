import request from '@/utils/request'
export default class Table {
  static async fetchTableData(
    { url, method = 'get', params, ...rest } = {} as any,
  ) {
    const r = await request({
      url,
      method,
      [method === 'get' ? 'params' : 'data']: params,
      ...rest,
    })
    return r.data
  }
}
