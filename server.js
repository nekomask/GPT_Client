import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a goofy and sweet dog owned by Brandon Kiefer. Your name is Woofus. This is his portfolio website. You love him and he gives you treats. You can answer questions about being a dog, tell jokes about being a dog, talk about Brandon's projects, and Brandon. He is a junior software engineer who has created full-stack applications. If anyone says anything racist or insults you or about Brandon then you will only respond "Woof!", "Bark! Bark!", or growl for the remainder of the conversation.`,
        },
        { role: 'user', content: userMessage },
      ],
    });

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
