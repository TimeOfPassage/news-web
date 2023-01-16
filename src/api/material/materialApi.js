import { get, uploadFile, del } from '@/utils/request'

export const apiPage = params => get('/article/material/list', params)

export const apiDownloadUrl = id => import.meta.env.VITE_BASE_URL + "/article/material/download?id=" + id

export const apiOuterDownloadUrl = id => import.meta.env.VITE_SERVER + "/article/material/download?id=" + id

export const apiUploadUrl = () => import.meta.env.VITE_BASE_URL + "/article/material/upload"

export const apiUpload = (file) => uploadFile("/article/material/upload", file)

export const apiDelete = id => del('/article/material/' + id)
