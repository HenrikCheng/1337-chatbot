import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import IngridientInput from "./IngridientInput";

const LandingPage = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState([""]); // Initial ingredient input
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ingredientsString = ingredients.join(", ");
    setPrompt(ingredientsString);
  }, [ingredients]);

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    if (index === 0) return; // Prevent removing the first ingredient
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `{Ge mig ett recept, använd följande ingridienser: ${prompt}. Inled med namnet på rätten, skriv sen recept i punktform.}`,
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
      <h1 className="mb-6 text-5xl font-bold">Recept-generatorn</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* <h3 className="mb-8 text-3xl font-bold">
          Skriv ned de matvaror du vill använda, separera dessa med ", "
        </h3> */}
        <div className="grid grid-cols-2 gap-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-4">
              <IngridientInput
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row space-x-8">
          <button
            type="button"
            onClick={handleAddIngredient}
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Ny ingridiens
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Tar fram recept..." : "Ge mig recept"}
          </button>
        </div>
      </form>
      {apiResponse && (
        <div className="mx-20 mt-20">
          <strong>Receptförslag:</strong>
          {apiResponse}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
