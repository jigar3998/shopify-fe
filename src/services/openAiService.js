const { Configuration, OpenAIApi } = require("openai");
const openAiService =async(prompt)=>{
    
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