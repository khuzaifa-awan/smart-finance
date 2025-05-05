import axios from "axios";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const makeRequestWithRetry = async (apiKey, userData, retryCount = 0) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         mode: "cors",
//         body: JSON.stringify({
//           prompt: {
//             text: `As a financial advisor, analyze this user data and provide monthly budget recommendations in JSON format:
//               ${JSON.stringify(userData, null, 2)}
//               Return ONLY a valid JSON object with category names as keys and recommended monthly amounts as numeric values.`,
//           },
//           temperature: 0.7,
//           candidate_count: 1,
//           max_output_tokens: 1000,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(
//         `API error: ${response.status} - ${
//           errorData.error?.message || response.statusText
//         }`
//       );
//     }

//     const data = await response.json();
//     if (!data.candidates?.[0]?.content?.text) {
//       throw new Error("Invalid response format from API");
//     }

//     const content = data.candidates[0].content.text;
//     const cleanedContent = content.replace(/```json|```/g, "").trim();
//     return JSON.parse(cleanedContent);
//   } catch (error) {
//     console.error("Request error details:", error);
//     if (retryCount < 3) {
//       const waitTime = Math.pow(2, retryCount + 1) * 1000;
//       console.log(`Error occurred. Retrying in ${waitTime / 1000} seconds...`);
//       await delay(waitTime);
//       return makeRequestWithRetry(apiKey, userData, retryCount + 1);
//     }
//     throw error;
//   }
// };

export const generateBudgetRecommendations = async (userData) => {
  try {
    const response = await fetch("/api/generate-budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: {
          ...userData,
          selectedCategories: userData.selectedCategories || [],
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate budget recommendations");
    }

    const recommendations = await response.json();
    return recommendations;
  } catch (error) {
    console.error("Budget Generation Error:", error);
    throw new Error(
      error.message || "Failed to generate budget recommendations"
    );
  }
};
