export const api = 'http://localhost:2000/api';
export const generatePictureurl=(fileName)=>{
    return `http://localhost:2000/public/${fileName}`;
}