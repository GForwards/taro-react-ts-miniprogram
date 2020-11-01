/**
 * @description: 小程序所有请求的路由
 * @email: hefengen@hotmail.com
 * @date: 2020年1月14日
 * @licence: MIT hirCodd
 */


import Api from './api'

export function getMarkDown() {
  return Api.get({
    url: '/test'
  });
}

export function getAbout() {
  return Api.get({
    url: '/mine/about'
  });
}

export function getCopyright() {
  return Api.get({
    url: '/mine/copyright'
  });
}

/**
 * 获取文章
 * @param pageNum
 * @param pageSize
 */
export function getIndexArticle(pageNum, pageSize) {
  return Api.get({
    url: '/article/getArticle?' + 'pageNum=' + pageNum + '&pageSize=' + pageSize
  });

}

/**
 * 通过文章id获取文章内容
 * @param articleId 文章id
 */
export function getContentById(articleId) {
  return Api.get({
    url: '/article/getContent?' + 'articleId=' + articleId
  })
}

/**
 * 获取所有分类
 */
export function getCategory() {
  return Api.get({
    url: '/category/getCategory'
  })

}

/**
 * 通过文章分类获取文章
 * @param category 分类
 */
export function getArticlesByCategory(category) {
  return Api.get({
    url: '/article/getArticlesByCategory?' + 'category=' + category
  })
}

/**
 * 通过关键字查询文章
 * @param keyword keyword
 */
export function searchArticlesByKeyword(keyword) {
  return Api.get({
    url: '/article/search?' + 'keyword=' + keyword
  })
}
