import React from "react";
import {  Card } from "react-bootstrap";

export default function PromptList({prompt}) {
  return (

    //Format of Response returned
    <div>
      <Card className="response-card">
                  <p className="paragraph-style">Prompt:</p>
                  <p className="response paragraph-style-prompt">{prompt.title}</p>                
                  <p className="paragraph-style">Response:</p>
                  <p className="response paragraph-style-response">{prompt.response}</p>
                  <p className="paragraph-style engine">Engine</p>
                  <p className="response paragraph-style-engine">{prompt.engine}</p>
      </Card>
    </div>
  );
}