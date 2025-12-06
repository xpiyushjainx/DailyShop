const BASE_URL = "http://localhost:5000"; // backend URL

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body || null
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Export simplified API functions
export const api = {
  get: (path, token) =>
    request(path, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  post: (path, body, token) =>
    request(path, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(body) // 🔥 IMPORTANT
    })
};
