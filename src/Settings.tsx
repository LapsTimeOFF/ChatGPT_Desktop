import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.scss";

const Settings = () => {
  const [apiKey, setApiKey] = useState<string | any>("");

  useEffect(() => {
    async function fetchData() {
      const result = await window.Config_API.getKey("openai.api_key");
      setApiKey(result);
    }
    fetchData();
  }, []);

  return (
    <div style={{color: "white"}}>
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", padding: "5px" }}
      >
        <div className="side-menu-button">Go back to home</div>
      </Link>
      <br />
      <h1>OpenAI</h1>
      <p>API Key</p>
      <p style={{ fontSize: "10pt", color: "lightgray" }}>
        Please provide in the input under the OpenAI API Key
      </p>
      <input
          type="text"
          placeholder="OpenAI API KEY"
          className="side-menu-button"
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
            window.Config_API.setKey("openai.api_key", e.target.value);
          }}
          style={{
            backgroundColor: "#202123",
            color: "white",
            outline: "none",
            width: "100%"
          }}
        />
    </div>
  );
};

export default Settings;
