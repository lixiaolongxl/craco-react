import request from '@utils/request'
export interface IResponse<S> {
    status_code: number | string;
    result: any | S;
    msg: string;
}
// export function findProjectByParams<T> (params: T) {
//     return request({
//         url: 'project/findProjectByParams',
//         method: 'GET',
//         params
//     })
// }
// 用户登录
export const Login = (data: any): Promise<IResponse<any>> => {
    return request.post('login/register', data);
};
// 用户祖册接口
export const addUser = (data: any): Promise<IResponse<any>> => {
    return request.post('user/addUser', data);
};
// 创建项目
export const addProject = (data: any): Promise<IResponse<any>> => {
    return request.post('project/addProject', data);
};
// 通过条件查找项目
export function findProjectByParams<T>(params: T): Promise<IResponse<any>> {
    return request.get('project/findProjectByParams', { params: params });
};
