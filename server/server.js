import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

let apiKey = null;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
});

app.post('/', mustHaveApiKey, async (req, res) => {

    const configuration = new Configuration({
        apiKey,
    });
    
    const openai = new OpenAIApi(configuration);

    try{
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""],
        })

        res.status(200).send({
            bot: response.data.choices[0].text,
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            success: false,
        });
    }
})

app.get('/consultApiKey', (req, res) => {

    if(!apiKey){
        res.json({
            apiKey: false,
        })
    } else {
        res.json({
            apiKey: true,
        })
    }

})

app.post('/updateApiKey', (req, res) => {
    
    apiKey = req.body.value
    res.status(200).json({success: true})
    
})

function mustHaveApiKey (req, res, next) {

    if(apiKey){
        next();
    }else{
        res.json({
            success: false,
        })
    }

}

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))
