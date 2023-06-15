import { useState } from "react";

const useOpenAI = (newPrompt) => {
  const [prompt, setPrompt] = useState();

  setPrompt(newPrompt);

  return prompt;
};

export default useOpenAI;
