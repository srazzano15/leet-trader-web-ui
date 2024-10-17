import { setTokens } from "./session";

// define type for 
type LoginData = {
  email: string;
  password: string;
}

type LoginResponse = {
  access: string;
  refresh: string;
  error?: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse | void> => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Rename this to avoid shadowing
      const responseData: LoginResponse = await response.json();
  
      // Store tokens in localStorage
      setTokens(responseData.access, responseData.refresh)
  } catch (error) {
    console.error('Login Failed:', error);
  }
};
