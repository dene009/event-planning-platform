export const API_BASE_URL = "http://localhost:5001";

export async function fetchWithAuth(url, options = {}) {
  // Add token to headers
  let token = localStorage.getItem("token");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Make the API request
  let response = await fetch(`${API_BASE_URL}${url}`, options);

  // Check if the response indicates an expired token
  if (response.status === 401) {
    // Attempt to refresh the token
    token = await refreshAccessToken();
    if (!token) {
      // Redirect to login if refresh failed
      window.location.href = "/login";
      return;
    }

    // Retry the original request with the new token
    options.headers.Authorization = `Bearer ${token}`;
    response = await fetch(`${API_BASE_URL}${url}`, options);
  }

  return response;
}

// Refresh token function
async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
      method: "POST",
      credentials: "include", // Include cookies for refresh token
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    localStorage.setItem("token", data.accessToken); // Update Access Token
    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
