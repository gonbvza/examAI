export async function logout() {
    try {
      const response = await fetch("http://localhost:8000/user/logout/", {
          credentials: "include", // Sends sessionid cookie
      });
  
      if(response.ok) {
        return(true)
      }
    } catch (error) {
        console.error("Error checking session:", error);
        return(false)
    }
  }