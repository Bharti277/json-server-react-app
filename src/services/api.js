const API_URL = "http://localhost:4000/users";

export const getAllUsers = async () => {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (err) {
    console.log(err, "Error fetching users");
  }
};
