import { api } from "./api";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  LoginResponse,
  User,
} from "@/types/auth";
import { AxiosError } from "axios";

/**
 * Login user with email and password
 */
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/api/v1/auth/login",
      credentials
    );

    // Store tokens and fetch user data
    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      // Fetch user profile after login
      try {
        const userResponse = await api.get<{ status: string; user: User }>(
          "/api/v1/users/me"
        );
        if (userResponse.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(userResponse.data.user));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

/**
 * Register new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      throw {
        status: "error",
        message: "Passwords do not match",
      };
    }

    // Only send fields that the API accepts
    const registerPayload = {
      username: data.username,
      email: data.email,
      password: data.password,
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.educationLevel && { educationLevel: data.educationLevel }),
      ...(data.timezone && { timezone: data.timezone }),
      ...(data.preferredStudyMethod && {
        preferredStudyMethod: data.preferredStudyMethod,
      }),
    };

    const response = await api.post<AuthResponse>(
      "/api/v1/auth/signup",
      registerPayload
    );

    // Store user data (signup returns user object directly)
    if (response.data.status === "success" && response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Now login to get tokens
      try {
        const loginResponse = await login({
          email: data.email,
          password: data.password,
        });
        return {
          status: "success",
          message: response.data.message,
          user: response.data.user,
        };
      } catch (error) {
        console.error("Auto-login after signup failed:", error);
        return response.data;
      }
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    // Backend doesn't have a logout endpoint, so just clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout error:", error);
    // Clear local storage regardless of API call success
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const response = await api.post<{
      status: string;
      message: string;
      access_token: string;
    }>("/api/v1/auth/refresh", { refreshToken });

    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.access_token);
      return response.data.access_token;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
};

/**
 * Get auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};
