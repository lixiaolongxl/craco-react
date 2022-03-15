let baseUrl: string = '';
let fileUrl: string = ''
if (process.env.NODE_ENV === 'development') {
    fileUrl = "http://52.80.185.166:80/imgs"
    baseUrl = "http://192.168.1.105:8091/"
} else {
    
    baseUrl = "http://52.80.185.166:8091/"
    fileUrl = "http://52.80.185.166:80/imgs"
}

export const jsonList = [
    {
        name: 'Super Admin',
        id: -1 
    },
    {
        name: 'Project Manager',
        id: 0
    },
    {
        name: 'Team Manager',
        id: 1
    },
    {
        name: 'External',
        id: 2
    },
];

export { fileUrl };

export default baseUrl;