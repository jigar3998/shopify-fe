import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import "./App.css";
import PromptList from "./PromptList";
import openAiService from "./services/openAiService";

export default function prompts() {
  const [prompts, setPrompt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 //Getting the response data from the local storage if present
  useEffect(() => {
    const promptItems = JSON.parse(localStorage.getItem("prompts"));
    if (promptItems) {
      setPrompt((prevPrompts) => [...prevPrompts, ...promptItems]);
    }
  }, []);

//Storing the response data to local storage
  useEffect(() => {
    localStorage.clear();
    if (prompts && prompts.length > 0) {
      localStorage.setItem("prompts", JSON.stringify(prompts));
    }
  }, [prompts]);

//Function to clear the local storage
    const handleReset = async(e)=>{
        setPrompt((prevPrompts) => [])
    }

//function to submit the responses from client side
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    setIsLoading(true);
    try {
      const response = await openAiService(formDataObj);
      const newPrompt = {
        title: formDataObj.prompts,
        response: response.data.choices[0].text,
        engine: formDataObj.engine,
        timestamp: new Date().getTime()
      };
      setPrompt((prevPrompts) => [...prevPrompts, newPrompt]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    e.target.reset()
  };
  return (
    <div className="main-content">
      <Container className="form-container">
        <h1 className="title">Fun with AI</h1>
        <Form onSubmit={onFormSubmit} className="main-form">
          <Form.Group className="form-prompts" controlId="formBasicEmail">
            <Form.Label className="form-label">Enter prompt</Form.Label>
            <Form.Control
              type="textarea"
              name="prompts"
              placeholder="Enter Text..."
              className="form-control"
            />
            <Form.Label className="form-label">Engine</Form.Label>
            <Form.Select name="engine">
                        <option value="text-curie-001">text-curie-001</option>
                        <option value="text-davinci-002">text-davinci-002</option>                        
                        <option value="text-babbage-001">text-babbage-001</option>
                        <option value="text-ada-001">text-ada-001</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="primary"
            size="large"
            type="submit"
            className="submit btn btn-primary"
          >
            Generate AI Suggestion
          </Button>
        </Form>
        <br />
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {prompts && prompts.length > 0 && (
          <>
            <h3>Responses</h3>

            {/* Sorting the responses in descending order of timestamp */}
            {prompts.sort((prompt1, prompt2)=>{
              return prompt2.timestamp - prompt1.timestamp
            }).map((prompt) => (
              <PromptList prompt={prompt} />
            ))}
            <Button
            variant="primary"
            size="large"
            type="clear"
            className="reset btn btn-primary"
            onClick={handleReset}
            >
            Clear Responses
            </Button>
          </>
            
        )}        
      </Container>        
    </div>
  );
}