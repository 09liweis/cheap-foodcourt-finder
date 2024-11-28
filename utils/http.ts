const BASE_API = 'https://samliweisen.onrender.com/api/'

export async function sendRequest({url}:any) {
  const response = await fetch(BASE_API+url);
  const data = await response.json();
  return data;
}