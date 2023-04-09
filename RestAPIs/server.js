import express from 'express';
import env from "dotenv";
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs'
import path from 'path'
import FormaData from 'form-data'
import axios from 'axios'

env.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: `Bearer ${process.env.OPENAIA_API_KEY}`,
});
const openai = new OpenAIApi(configuration);
app.get("/transcribe", async(req, res)=> {

  const __filename = new URL(import.meta.url).pathname;
  const __dirname =path.dirname(__filename)
  const filePath = path.join(__dirname, './audio/EnglishinaMinute_PartyAnimal.mp3')
  const model = "whisper-1";

  const formRecords = new FormaData()
  formRecords.append("model", model)
  formRecords.append("file", fs.createReadStream(filePath))

  return  await axios.post("https://api.openai.com/v1/audio/transcriptions", formRecords, {
    headers: {
      Authorization:`Bearer ${process.env.OPEN_SECOND_KEY}`,
      'Content-Type':"multipart/form-data;boundary=${formRecords._boundary}"
    }
  })
  .then(resp=> res.send({status: 200, transcribe: resp.data}))
  .catch(error=> res.status(500).send({status: 500, message: error.message}))
})

app.get('/test',(req, res)=>{
  return res.status(200).json({message: "it works"})
})

app.post("/find-complexity",  async (req, res) => {
  try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 
        `
        const example = (arr)=> {
          arr.map((item)=> {
            console.log(item);
          });
        };
        the time complexity of this function  is 
        ###
        `,
        max_tokens: 64,
        temperature: 0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty:0.0,
        stop:["\n"]

      });


    return  res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
      message: "api post is working",
    });
  } catch (error) {
    return res.status(500).json({message: error});
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
