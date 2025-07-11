// import connectToDB from "./config/mongoDBServer.js";
import { hashingPassword, verifyPassword } from "./utils.js";

async function init() {
  // try {
  //   console.log("line 1");
  //   connectToDB();
  //   console.log("line 3");
  // } catch (error) {
  //   console.log("Error : ", error);
  // }
  let resp;
  const password = "12345";
  try {
    console.log("Password :", password);
    resp = await hashingPassword(password);
    console.log("Response : ", resp); 
  } catch (error) {
    console.error(error);
  }
  console.log("Verifying : ", await verifyPassword(password, resp));// git commit -m "4th Commit" ; git push -u origin main        

}


init();