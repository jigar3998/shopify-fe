import React, { Component } from 'react'
import {Button, Container, Card, Form} from 'react-bootstrap'
import "./App.css"
const {Configuration, OpenAIApi} = require('openai')

class PromptForm extends Component {
    constructor() {
        super()
        this.state = {
            heading: "Response from AI will be shown here",
            response: "...await for response"
        }
    }

    onFormSubmit = e =>{
        e.preventDefault()

        const formData = new FormData(e.target)
        let formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.prompt)

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY 
        })

        const openai = new OpenAIApi(configuration)

        openai.createCompletion("text-curie-001",{
            prompt: `Write a detailed, smart and informative description for ${formDataObj.prompt}`,
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((response) => {
            this.setState({
                heading: `${formDataObj.prompt}`,
                response:`${response.data.choices[0].text}`
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

  render() {
    return (
      <div className="main-content">
          <Container className="form-container">
              <h1 className="title">Fun with AI</h1>
              <br/>
              <Form onSubmit={this.onFormSubmit} className="main-form">
                <Form.Group className="form-prompt" controlId="formBasicEmail">
                    <Form.Label className="form-label">Enter Prompt</Form.Label>
                    <Form.Control
                        type="textarea"
                        name="prompt"
                        placeholder="Enter Text..."
                        className="form-control"
                    />
                </Form.Group>
                <br/>
                <Button variant="primary" size="large" type="submit" className="btn btn-primary">
                    Submit
                </Button>
              </Form>
              <br/>
              <br/>
              {this.state.response==="...await for response"?
                <h3>{this.state.heading}</h3>
                :
                <h3>Responses</h3> }
              <Card className="response-card">
                       {this.state.response==="...await for response"?
                        <Card.Body className="response-body">
                            <br/>                      
                            <Card.Text className="response-text">
                                <p>{this.state.response}</p>
                            </Card.Text>
                        </Card.Body>
                        :
                        <Card.Body className="response-body">
                            <br/>      
                            <Card.Text className="response-text">
                            <div className="response-div">
                                <div className="response response-prompt">
                                    <p className="paragraph-style">Prompt:</p>
                                    <p>{this.state.heading}</p>
                                </div>
                                <div className="response response-response">
                                    <p className="paragraph-style">Response:</p>
                                    <p>{this.state.response}</p>
                                </div>
                            </div>
                            </Card.Text>
                        </Card.Body>}
              </Card>

          </Container>
      </div>
    )
  }
}

export default PromptForm