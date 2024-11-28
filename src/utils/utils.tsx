export async function fetchUtil<T>(endpoint: string, method: "POST" | "PATCH" | "DELETE", body?: T): Promise<Response> {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`FetchUtil request failed with status: ${response.status}`);
  }

  return response.json();
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
