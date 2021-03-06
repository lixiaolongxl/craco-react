export const TokenKey: string = 'Admin-Token';
export const UserKey: string = 'user';
export function getToken(): string | null {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token: string) {
    removeToken()
    sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    sessionStorage.removeItem(TokenKey)
}

export function getUser(): any {
    return sessionStorage.getItem(UserKey)
}

export function setUser(user: any) {
    removeUser()
    sessionStorage.setItem(UserKey, user)
}

export function removeUser() {
    sessionStorage.removeItem(UserKey)
}

/*
 *@Author: 李小龙
 *@Date: 2021-09-18 10:58:04
 *@Description: 匹配路径转数组'/a/b/c' => ['/a','/b','/c']
 */
export function regexp(str: string) {
    return str.match(/\/\w+/g);
}
/*
 *@Author: 李小龙
 *@Date: 2021-09-18 11:03:31
 *@Description: ['/a','/b','/c']=>['/a','/a/b','/a/b/c']ssss
 */
export function arrnb(list: string[]) {
    return list.map((item: string, index: number) => {
        return list.slice(0, index + 1).join('');
    })
}

export function GetRequest() {
    let url = window.location.href
    var theRequest = new Object();
    var hash = url.split('?')[1];
    if (hash) {
        if (hash.indexOf("&") != -1) {
            var strs = hash.split("&");
            for (var i = 0; i < strs.length; i++) {
                (theRequest as any)[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
            return theRequest
        } else if (hash.indexOf("=") != -1) {
            (theRequest as any)[hash.split('=')[0]] = hash.split('=')[1]
            return theRequest;
        }
        return theRequest;
    } else {
        return theRequest;
    }
}

export function uuidv4() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4();

}
