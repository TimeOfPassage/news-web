import { get, post, put, del } from '@/utils/request'

export const apiPage = params => get('/article/material/categories', params)

export const apiAdd = data => post('/article/material/category', data)

export const apiModify = data => put('/article/material/category', data)

export const apiDelete = id => del('/article/material/category?id=' + id)

export const apiCategories = () => get('/article/material/findAllCategories')
