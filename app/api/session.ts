import * as jose from "jose";
import moment from "moment";

const AUTH_URL = `${process.env.API_URL}/auth`;
const DEVELOPMENT_SECRET_KEY =
  "django-insecure-e+f@1l(fs+f#@pj#cf(8cw^8ui41cv+xkd_c*o8_$^^lo7%vgg";

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

const refreshAccessToken = async (): Promise<string | any> => {
  const { refreshToken } = getTokens();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await fetch(`${AUTH_URL}/token/refresh/`, {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    localStorage.setItem("access_token", resData.access);
    return resData.access as string;
  } catch (error) {
    console.error("Failed to refresh token", error);
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

export { getTokens, setTokens, refreshAccessToken, validateAccessToken };
