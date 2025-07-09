import fs from 'fs/promises';
import bcrypt from 'bcrypt';

export function encodeBase64(data){
  return Buffer.from(data).toString('base64');
}

export function decodeBase64(data){
  return Buffer.from(data, 'base64').toString('utf-8');
}

export async function writeLog(logData) {
  try {
    await fs.appendFile('./src/resources/storage/logs/logger.log', logData);
  } catch (error) {
    console.error(error);
  }
}

export async function hashingPassword(password, saltRound = 10) {
  let salt = await bcrypt.genSalt(saltRound);
  console.log("Salt : ", salt);
  let hash = await bcrypt.hash(password,salt);
  return hash;
}

export async function verifyPassword(plainPassword, hashPassword) {
  return await bcrypt.compare(plainPassword, hashPassword); // returns true or false
}