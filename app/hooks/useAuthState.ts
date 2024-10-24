import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLoadingState from "./useLoading";
import { validateRefreshToken } from "../api/session";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isLoading, setLoading } = useLoadingState(); // false
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true); // Start loading
      try {
        // Validate the refresh token (API call)
        const isValid = await validateRefreshToken();

        // Update authentication status based on token validation
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/login"); // Redirect to login if the token is invalid
        }
      } catch (error) {
        console.error("Error validating refresh token:", error);
        setIsAuthenticated(false);
        router.push("/login"); // Handle errors by redirecting to login
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkAuthStatus(); // Call the function when the hook runs
  }, [router]); // Rerun if the router changes (like during navigation)

  return { isAuthenticated, isLoading };
};

export default useAuth;
