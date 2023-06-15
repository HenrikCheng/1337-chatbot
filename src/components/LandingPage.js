import React, { useState } from "react";

const LandingPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the input value, such as sending it to a server
    console.log("Submitted value:", inputValue);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Ask a question about 1337</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          rows={6}
          cols={60}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your message"
          className="px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
