import { config } from "../config";

export async function getResponse(message: string) {
  try {
    const response = await fetch(config.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model: config.MODEL_NAME,
        messages: [{ role: config.ROLE, content: message }],
      }),
    });
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response from AI model:", error);
    return "Failed to fetch response from AI model";
  }
}
