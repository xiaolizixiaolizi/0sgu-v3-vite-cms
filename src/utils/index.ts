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
// TrendCharts
export const noop = () => {}
