export const isDev = import.meta.env.VITE_APP_ENV === 'development'
export const isTest = import.meta.env.VITE_APP_ENV === 'test'
export const isProd = import.meta.env.VITE_APP_ENV === 'production'
/**
 * 大写驼峰转为-中横线链接
 * @param str
 * @returns
 * @example TrendCharts->-trend-charts
 */
export const toLine = (str: string) =>
  str.replace(/([A-Z])/g, (s) => `-${s}`.toLowerCase())
export const noop = () => { }

export const greet = () => {
  const hour = new Date().getHours()//24小时制
  const map = [
    [() => hour < 5, '凌晨好'],
    [() => hour < 10, '早上好'],
    [() => hour < 13, '上午好'],
    [() => hour < 19, '下午好'],
    [() => hour < 24, '晚上好'],
  ] as const
  const o = map.find(item => item[0]())
  return o?.[1]
}