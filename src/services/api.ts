/**
 * @description: 用于封装http请求库
 * @author: hefengen
 * @email: hefengen@hotmail.com
 * @date: 2020年1月14日
 * @licence: MIT hirCodd
 */

import Taro from '@tarojs/taro'
import { HTTP_STATUS, BASE_URL } from './config'
// eslint-disable-next-line import/first
import qs from 'qs'

/**
 * 拦截器
 * @param response
 * @param resolve
 * @param reject
 */
function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  } else {
    const message = HTTP_STATUS[response.statusCode] || `ERROR CODE: ${response.statusCode}`;
    response.data.errorCode = response.statusCode;
    response.data.error = message;
    return response
  }
}

function setCookie(response) {
  if (response.cookies && response.cookies.length > 0) {
    let cookies = '';
    response.cookies.forEach((cookie, index) => {
      // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
      if (cookie.name && cookie.value) {
        cookies += index === response.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
      } else {
        cookies += `${cookie};`
      }
    });
    Taro.setStorageSync('cookies', cookies)
  }
  if (response.header && response.header['Set-Cookie']) {
    Taro.setStorageSync('cookies', response.header['Set-Cookie'])
  }
  return response
}
export default {

  /**
   * request
   */
  async request(options: any, method?: string) {
    const {url} = options;
    return Taro.request({
      ...options,
      method: method || 'get',
      url: BASE_URL + url,
      data: options.data,
      header: {
        'content-type': options.contentType || 'application/x-www-form-urlencoded',
        cookie: Taro.getStorageSync('cookies'),
        ...options.header
      },
    }).then(setCookie)
      .then(checkStatus)
      .then(res => {
        return res;
      })
  },

  /**
   * get
   */
  get(options: any) {
    return this.request({
      ...options,
    }, 'get');
  },

  /**
   * post
   */
  post(options: any) {
    return this.request({
      ...options,
      data: qs.stringify(options.data)
    }, 'post');
  },

}
