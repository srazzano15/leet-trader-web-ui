import { setTokens } from "./session";
import axios from 'axios'


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

// Define the types for the registration data
interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  retypePassword: string;
}

// Define the type for the API response
interface ApiResponse {
  message?: string;
  error?: string;
  data?: any;
}


// Function for registering the user
export const registerUser = async (
  data: RegisterUserData
): Promise<ApiResponse | void> => {
  try {
    const response = await axios.post<ApiResponse>(
      "http://127.0.0.1:8000/api/auth/register/",
      data
    );

    return response.data; // Handle successful registration
  } catch (error: any) {
    if (error.response) {

      return error.response.data; // Handle API error
    } else {

      console.error("Error registering user:", error.message);
    }
  }
};


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
      return responseData
  } catch (error) {
    console.error('Login Failed:', error);
  }
};

// to logout, just remove the tokens from localStorage
export const logoutUser = (): void => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
} 