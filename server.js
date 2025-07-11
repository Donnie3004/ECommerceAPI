import server from './index.js';
import { connectToDB } from './src/config/mongoDBServer.js';


async function startServer() {
  try {
    await connectToDB();
    server.listen(3000, (err)=>{
      if(err){
        console.error(err);
        throw new Error(err);
      }else{
        console.log(`Server started at PORT : 3000`);
      }
    })
  } catch (error) {
    console.log("Error : ", error);
  }
}

// server.listen(3000, (err)=>{
//   if(err){
//     console.error(err);
//   }else{
//     console.log(`Server started at PORT : 3000`);
//   }
// })

startServer();