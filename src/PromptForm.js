import React, { Component } from 'react'
import {Button, Container, Card, Form} from 'react-bootstrap'
import "./App.css"
const {Configuration, OpenAIApi} = require('openai')

class PromptForm extends Component {
    constructor() {
        super()
        this.state = {
            prompt: []
                    // heading: "Response from AI will be shown here",
                    // response: "...await for response",
                    // engine: "text-curie-001",
                    // date: Date().toLocaleString()                
            }
    }

    componentDidMount(){
        const promptItems = localStorage.getItem('prompt')
        if(promptItems){
            this.setState({
                ...this.state.prompt,
                response
            })
        }
    }

    componentDidUpdate(){
        localStorage.setItem('prompt', JSON.stringify(this.state.prompt))
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

        openai.createCompletion(this.state.prompt[0].engine,{
            prompt: `Write a detailed, smart and informative description for ${formDataObj.prompt}`,
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((response) => {
            this.setState({
                prompt:[{
                    heading: `${formDataObj.prompt}`,
                    response:`${response.data.choices[0].text}`,
                    engine: "text-curie-001",
                    date: Date().toLocaleString()    
                }]
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
              <div className="main-title">
              <h1 className="title">Fun with AI</h1>
              <div className="select-engine">
                <select id="engines" value={this.state.prompt[0].engine} 
                        onChange={(e) => this.setState({engine: e.target.value})}>
                    <option value="text-davinci-002">text-davinci-002</option>
                    <option value="text-curie-001">text-curie-001</option>
                    <option value="text-babbage-001">text-babbage-001</option>
                    <option value="text-ada-001">text-ada-001</option>
                </select>
               </div>
              {/* <Dropdown onChange={this.onhandleSelect.bind(this)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" size='sm'>
                    Engine
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={this.onhandleSelect}>
                    <Dropdown.Item eventKey="text-davinci-002">text-davinci-002</Dropdown.Item>
                    <Dropdown.Item eventKey="text-curie-001">text-curie-001</Dropdown.Item>
                    <Dropdown.Item eventKey="text-babbage-001">text-babbage-001</Dropdown.Item>
                    <Dropdown.Item eventKey="text-ada-001">text-ada-001</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>  */}
              </div>              
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
              {this.state.prompt[0].response==="...await for response"?
                <h3>{this.state.prompt[0].heading}</h3>
                :
                <h3>Responses</h3> }
              <Card className="response-card">
                       {this.state.prompt[0].response==="...await for response"?
                        <Card.Body className="response-body">
                            <br/>                      
                            <Card.Text className="response-text">
                                <p>{this.state.prompt[0].response}</p>
                            </Card.Text>
                        </Card.Body>
                        :
                        <Card.Body className="response-body">
                            <br/>      
                            <Card.Text className="response-text">
                            <div className="response-div">
                                <div className="response response-prompt">
                                    <p className="paragraph-style">Prompt:</p>
                                    <p>{this.state.prompt[0].heading}</p>
                                </div>
                                <div className="response response-response">
                                    <p className="paragraph-style">Response:</p>
                                    <p>{this.state.prompt[0].response}</p>
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