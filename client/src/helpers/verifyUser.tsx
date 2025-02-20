export async function verifyLogIn() {
    try {
      const response = await fetch("http://localhost:8000/user/check-session/", {
          credentials: "include", // Sends sessionid cookie
      });
  
      const data = await response.json();
      if (data.authenticated) {
          console.log("User is logged in:", data.username);
          return data.username
      } else {
          console.log("User is not logged in.");
          return ""
      }
    } catch (error) {
        console.error("Error checking session:", error);
    }
  }