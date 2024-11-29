const BASE_API = 'https://samliweisen.onrender.com/api/'

interface OptProp {
  method:string,
  headers:any,
  body?:any
}

export async function sendRequest({url,method='GET',body={}}:any) {
  const opt:OptProp = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Auth-Token': localStorage.getItem('token')
    },
  };
  if (Object.keys(body).length) {
    opt.body = JSON.stringify(body);
  }
  const response = await fetch(BASE_API+url, opt);
  const data = await response.json();
  return data;
}