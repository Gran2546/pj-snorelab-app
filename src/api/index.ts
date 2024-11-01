// lib/api.ts
import axios from 'axios';

// Base URL for the API
// export const API_BASE_URL = 'http://localhost:3007/'; // Ensure this is correct
export const API_BASE_URL = 'https://cb53-158-108-228-115.ngrok-free.app/'; // Ensure this is correct
const multipartUrl = 'http://localhost:8000/'

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

// Function to make GET requests
export const get = async (path: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(path); // Use the axios instance for fetching data
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to make POST requests
export const post = async (path: string, data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(path, data); // Use the axios instance for sending data
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error creating item at ${path}:`, error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to make POST requests specifically for multipart data
export const postMultipart = async (path: string, formData: FormData): Promise<any> => {
    try {
        const response = await axios.post(API_BASE_URL+ path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); // Sending multipart form data
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error uploading multipart data at ${path}:`, error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to make PUT requests
export const put = async (path: string, data: any): Promise<any> => {
    try {
        const response = await axiosInstance.put(path, data); // Use the axios instance for updating data
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error updating item at ${path}:`, error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to make DELETE requests
export const del = async (path: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(path); // Use the axios instance for deleting data
        return response.data; // Return the response data
    } catch (error) {
        console.error(`Error deleting item at ${path}:`, error);
        throw error; // Rethrow the error for handling in the component
    }
};

// You can add more functions for other methods as needed
