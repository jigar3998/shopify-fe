import React from "react";
import {  Card } from "react-bootstrap";

export default function PromptList({prompt}) {
    console.log("prompt list", prompt)
  return (
    <div>
      <Card className="response-card">
        {prompt.response === "...await for response" ? (
          <Card.Body className="response-body">
            <br />
            <Card.Text className="response-text">
              <p>{prompt.response}</p>
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body className="response-body">
            <br />
            <Card.Text className="response-text">
              <div className="response-div">
                <div className="response response-prompt">
                  <p className="paragraph-style">Prompt:</p>
                  <p className="paragraph-style-prompt">{prompt.title}</p>
                </div>
                <div className="response response-response">
                  <p className="paragraph-style">Response:</p>
                  <p>{prompt.response}</p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}