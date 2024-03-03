export async function updateProfile(postData) {
  try {
    const response = await fetch(APIBase + "/social/profiles/hammy_boi", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const responseData = await response.json();
    console.log("Post created successfully:", responseData);
    return responseData; // Optionally, return the response data
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

const newProfileData = {
  avatar: {
    url: "https://pawfinity.netlify.app/images/hamster-5964167_1280.jpg",
  },
};

// updateProfile(newProfileData);
