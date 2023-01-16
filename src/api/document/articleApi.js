import { get, post, put, del } from '@/utils/request'

export const apiPage = params => get('/article/document/list', params)

export const apiAdd = data => post('/article/document/add', data)

export const apiModify = data => put('/article/document/modify', data)

export const apiDelete = id => del('/article/document/' + id)

export const apiDetail = id => get('/article/document/' + id)
