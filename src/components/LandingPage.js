import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const LandingPage = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch the content of the text file
      const response = await fetch("./handbook.txt");
      //   const handbookContent = await response.text();

      const result = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: `${prompt}\n\n${handbookContent}`,
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });

      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      console.log(e);
      setApiResponse("Something is going wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Ask a question about 1337</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          rows={6}
          cols={60}
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your message"
          className="px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {apiResponse && (
        <div className="mx-20 mt-20">
          <strong>API response:</strong>
          {apiResponse}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
