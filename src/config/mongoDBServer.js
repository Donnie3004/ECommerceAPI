import {MongoClient} from 'mongodb';


///  mongodb://127.0.0.1:27017/  <---- IPv4


// Using promises ----
// const url = "mongodb://localhost:27017/NewCollection";
// let connectToDB = () => {
//   MongoClient.connect(url)
//   .then(client => {
//     console.log("Connected to db...!");
//   })
//   .catch(err=>{
//     console.log("Error : ", err);
//   })
// }


//Using async await
const url = "mongodb://localhost:27017/";
let client = null;
async function connectToDB(params = 'NewCollection') {
  try {
    if(!client){
      client = new MongoClient(url);
      await client.connect();
      console.log("Connected to DB...!"); 
    }
  } catch (error) {
    console.error(error);
    throw new Error("MongoDB server not connected");
  }
}

function getDB(dbName = 'NewCollection'){
  if(!client){
    connectToDB();
  }
  return client.db(dbName);
}

export {connectToDB, getDB};