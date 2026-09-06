const API_BASE_URL = "https://my-telegram-bot.instapayapi.workers.dev/api";

export async function postLoanStep(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message = body?.message || "Request failed. Please try again.";
    throw new Error(message);
  }

  return body;
}
