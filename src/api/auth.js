// src/api/auth.js
const BASE_URL = "http://localhost:8080/auth"; // Change if your backend runs elsewhere

// src/api/auth.js
export const loginUser = async (payload) => {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (res.ok) {
    return { success: true, data }; // ✅ MUST return data inside result
  } else {
    return { success: false, message: data.message || "Login failed" };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};



// export async function sendOtp(data) {
//   const response = await fetch(`${BASE_URL}/sendOtp`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// export async function changePassword(data) {
//   const response = await fetch(`${BASE_URL}/changePassword`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

export async function getUserProfile(userId) {
  try {
    const res = await fetch(`http://localhost:8080/api/users/${userId}`);

    if (!res.ok) throw new Error("Failed to fetch user profile");
    // console.log("Fetched Profile:", data);
    return await res.json();
  } catch (err) {
    console.error("getUserProfile error:", err);
    throw err;
  }
}

export const getUserPosts = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/posts/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return await response.json();
};
