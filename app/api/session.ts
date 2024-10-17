import * as jose from "jose";
import moment from "moment";
import axios from "axios";

/**
 * Helper functions for managing session
 */

const getTokens = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return { accessToken, refreshToken };
};

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken } = getTokens();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(
      `${process.env.API_URL}/auth/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

const validateAccessToken = (): boolean | Error => {
  const { accessToken } = getTokens();
  if (!accessToken || accessToken == "undefined") {
    throw new Error("No access token found");
  }
  const decodedToken = jose.decodeJwt(accessToken);
  const tokenExpiration = <number>decodedToken.exp * 1000;
  return moment().isBefore(tokenExpiration);
};

const validateRefreshToken = (): boolean | Error => {
  const { refreshToken } = getTokens();
  if (!refreshToken || refreshToken == "undefined") {
    return false;
  }
  const decodedToken = jose.decodeJwt(refreshToken);
  const tokenExpiration = <number>decodedToken.exp * 1000;
  return moment().isBefore(tokenExpiration);
};

/**
 * Handler for making Authenticated API calls
 */
const makeAuthenticatedRequest = async (url: string, options: object) => {
  let { accessToken } = getTokens();

  if (!accessToken) {
    throw new Error("No access token found!");
  }

  try {
    const response = await axios({
      url: `${process.env.API_URL}${url}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    });
    return response.data;
  } catch (error: any) {
    // if access token is expired attempt to refresh it
    if (error.response && error.response.status === 401) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the original request with the new access token
        const retryResponse = await axios({
          url: `${process.env.API_URL}${url}`,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          ...options,
        });
        return retryResponse.data;
      } else {
        throw new Error("Failed to refresh access token or unauthorized.");
      }
    } else {
      throw error;
    }
  }
};

export {
  validateRefreshToken,
  getTokens,
  setTokens,
  refreshAccessToken,
  validateAccessToken,
  makeAuthenticatedRequest,
};
