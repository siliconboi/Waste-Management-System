import twilio from "twilio";
import bodyParser from "body-parser";
import express from "express";
import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import axios from "axios";
import { Garbage, User } from "../model/user.mjs";
import { validToken } from "../validateToken.mjs";
import path from "path";
import url from "url";

const PostRouter = express.Router();

PostRouter.use(bodyParser.json());

PostRouter.post('/check', async (req,res)=>{
const imageUrl= req.body.image;
let garbagetype="";
async function preprocessImage(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageData = new Uint8Array(response.data);
  const imageTensor = tf.node.decodeImage(imageData);

  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);

  const normalizedImage = resizedImage.div(tf.scalar(255));

  const batchedImage = normalizedImage.expandDims(0);
  return batchedImage;
}

async function predictImage(imageUrl) {
  
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  const model = await tf.loadLayersModel("file://"+__dirname+'/model.json');

  const preprocessedImage = await preprocessImage(imageUrl);

  const predictions = model.predict(preprocessedImage);
  
  const classIndex = predictions.argMax(-1).dataSync()[0];
  console.log(predictions.argMax(-1))

  let classLabels =["Paper and Cardboard", "Aluminium", "Plastic", "Organic Waste", "Other Plastics", "Textiles" ]
  const predictedClass = classLabels[classIndex];

  return predictedClass;
}
garbagetype = await predictImage(imageUrl);
let list=[];
if(garbagetype==="Paper and Cardboard"){
     list = [
          {
            name: "Newspaper",
            price: 14,
            type: "paper"
          },
          {
            name: "Carton",
            price: 13,
            type: "paper"
          },
          {
            name: "Grey Board",
            price: 5,
            type: "paper"
          },
          {
            name: "Books",
            price: 10,
            type: "paper"
          }
        ];
}
else if(garbagetype==="Plastic" || garbagetype=== "Other Plastics"){
      list = [
          {
            name: "Hard Plastic",
            price: 2,
            type: "plastic"
          },
        {
            name: "Polythene",
            price: 4,
            type: "plastic"
          },
        {
            name: "Fibre",
            price: 5,
            type: "plastic"
          },
        {
            name: "Soft Plastic",
            price: 6,
            type:"plastic"
        }
        ];
}
else if(garbagetype==="Aluminium"){
 list =   [
{
  name: "Copper",
  price: 350,
  type: "metals"
},
{
  name: "Brass",
  price: 250,
  type: "metals"
},
{
  name: "Aluminium",
  price: 60,
  type: "metals"
},
{
  name: "Steel",
  price: 30,
  type: "metals"
},
];
}
else if(garbagetype==="Textiles" ){
   list = [
    {
      name: "Clothes",
      price: 50,
      type:"textiles"
    },
  {
      name: "Nylon",
      price: 50,
      type:"textiles"
    },
  {
      name: "Mattress",
      price: 15,
      type:"textiles"
    },
    {
      name: "Pillow",
      price: 800,
      type:"textiles"
    }
  ];
}
  else if(garbagetype==="Organic Waste"){
   list = [{
      name: "Kitchen-waste",
      credit: 1,
      type:"organic"
    },
  {
      name: "Wood",
      credit: 1,
      type:"organic"
    },
  {
      name: "Green Waste",
      credit: 1,
      type:"organic"
    },
    {
      name: "Other",
      credit: 1,
      type:"organic"
    }]
  }
  
else{
  list = [
   {
     name: "Air Conditioner",
     price: 800,
     type:"ewaste"
   },
   {
     name: "Fridge",
     price: 300,
     type:"ewaste"
   },
   {
     name: "CPU",
     price: 100,
     type:"ewaste"
   },
   {
     name: "TV",
     price: 50,
     type:"ewaste"
   }
 ];

}
res.json(list);
})

PostRouter.post('/post',validToken, async (req,res)=>{
      try{
        const item = req.body.item;
        const location = req.body.location;
      try{
          await Garbage.findOneAndDelete({user:req.user._id});
     }
     catch(e){
       console.log(e)
     }
     const garbage = await Garbage.create({user:req.user._id,[item.type]: true, location: location});
     if(garbage.paper||garbage.plastic||garbage.organic)
{     User.findByIdAndUpdate(req.user._id,{$inc:{recycled: 1}},function(err,document){
  console.log(err)
  console.log(document)
});
}     
       const accountSid = process.env.TWILIO_ACCOUNT_SID;
       const authToken = process.env.TWILIO_AUTH_TOKEN;
       const client = twilio(accountSid, authToken);
        client.messages.create({
           body: `Need pickup of ${item.name} from ${location}`,
           from: '+15207203051',
            to: '+918319647336'}).then(message => console.log(message.sid));
       }   
  catch(e){
      res.status(400);
 }
}
);

PostRouter.get('/credits',validToken, async (req,res)=>{
  try{
 const user = await User.findOne({id:req.user._id})
    return res.json(user.recycled)
  }
  catch(e){
    res.status(400)
  }
})

export default PostRouter;