/*
  dependencies

*/
const express = require('express')    //requering the express framework!
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

/*
 config-express
*/
  const app = express()  //Criando uma app para que possamos fazer algumas coisas com o express




     const serviceAccount = require('./serviceAccountKey.json');

      initializeApp({
            credential: cert(serviceAccount)
          });

      const db = getFirestore();



/***Endpoints - posts**/

app.get('/posts', (request, response) => {  //Configuração de endpoints para obter solicitações
  response.set('Access-Control-Allow-Origin', '*')

  let posts = []

     db.collection('posts').orderBy('date','desc').get().then(snapshot=>{
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        posts.push(doc.data())
       });
       response.send(posts)
     })



})



/***Endpoints - createPosts**/

app.get('/createPost', (request, response) => {  //Configuração de endpoints para obter solicitações
  response.set('Access-Control-Allow-Origin', '*')

   response.send('createPost');


})


/** Listen line**/

  app.listen(3000)
