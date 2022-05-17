import React, { useEffect, useState } from "react";
import { Button, Container, Card, Form, Spinner } from "react-bootstrap";
import "./App.css";
import PromptList from "./PromptList";
import openAiService from "./services/openAiService";
import formatDate from "./utility/formateDate";

export default function prompts() {
  const [prompts, setPrompt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const promptItems = JSON.parse(localStorage.getItem("prompts"));
    console.log("promptItems", promptItems);
    if (promptItems) {
      setPrompt((prevPrompts) => [...prevPrompts, ...promptItems]);
    }
  }, []);

  useEffect(() => {
    console.log("prompts", prompts);
    localStorage.clear();
    if (prompts && prompts.length > 0) {
      localStorage.setItem("prompts", JSON.stringify(prompts));
    }
  }, [prompts]);

    // const handleOnChange=(e)=>{
    //     setPrompt((prevPrompts)=> [{
    //         ...prevPrompts,
    //         engine: e.target.value
    // }])
    // }
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.prompts);
    setIsLoading(true);
    try {
      const response = await openAiService(formDataObj);
      const newPrompt = {
        title: formDataObj.prompts,
        response: response.data.choices[0].text,
        engine: formDataObj.engine,
        timestamp: new Date().getTime()
      };
      setPrompt((prevPrompts) => [...prevPrompts, newPrompt]);
      console.log("response", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };
  return (
    <div className="main-content">
      <Container className="form-container">
        <div className="main-title">
            <h1 className="title">Fun with AI</h1>
            <div className="select-engine">
                
            </div>
        </div>
        <br />
        <Form onSubmit={onFormSubmit} className="main-form">
          <Form.Group className="form-prompts" controlId="formBasicEmail">
            <Form.Label className="form-label">Enter prompt</Form.Label>
            <Form.Control
              type="textarea"
              name="prompts"
              placeholder="Enter Text..."
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="form-prompts" controlId="formBasicEmail">
            <Form.Label className="form-label">Engine</Form.Label>
            <Form.Select name="engine">
                        <option value="text-curie-001">text-curie-001</option>
                        <option value="text-davinci-002">text-davinci-002</option>                        
                        <option value="text-babbage-001">text-babbage-001</option>
                        <option value="text-ada-001">text-ada-001</option>
            </Form.Select>
          </Form.Group>
          <br />
          <Button
            variant="primary"
            size="large"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </Button>
        </Form>
        <br />
        <br />
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {prompts && prompts.length > 0 && (
          <>
            {" "}
            <h3>Responses</h3>
            {prompts.sort((prompt1, prompt2)=>{
              return prompt2.timestamp - prompt1.timestamp
            }).map((prompt) => (
              <PromptList prompt={prompt} />
            ))}
          </>
        )}
      </Container>
    </div>
  );
}