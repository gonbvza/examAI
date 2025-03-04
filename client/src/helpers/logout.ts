import { HOST, ROUTE } from '../config.ts'; 

export async function logout() {
    try {
      const response = await fetch(`${HOST}/${ROUTE}user/logout/`, {
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