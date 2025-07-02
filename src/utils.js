export function encodeBase64(data){
  return Buffer.from(data).toString('base64');
}

export function decodeBase64(data){
  return Buffer.from(data, 'base64').toString('utf-8');
}