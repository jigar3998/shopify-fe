const { Configuration, OpenAIApi } = require("openai");

// Configuring OpenAI api and passing the Prompt and Engine parameter
const openAiService =async(prompt)=>{
    console.log("openAI service",prompt)
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion(prompt.engine,{
        prompt: `Write a detailed, smart and informative description for ${prompt.prompts}`,
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log("service", response)
    return response
}
export default openAiService;