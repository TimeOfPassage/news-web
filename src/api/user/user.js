import { get, post, put, del } from '@/utils/request'

export const login = data => post('/user/login', data)
