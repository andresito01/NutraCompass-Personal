import axios from "axios";
import apiKeys from "./keys.js";

const API_KEY = apiKeys.exerciseDBConfig.rapidApiKey;
const API_HOST = apiKeys.exerciseDBConfig.rapidApiHost;
const BASE_URL = "https://exercisedb.p.rapidapi.com";

const apiCall = async (url, params) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("There was a problem with the fetch operation: ", error);
  }
};

// Return list body parts
export const fetchBodyParts = async () => {
  try {
    const url = `${BASE_URL}/exercises/bodyPartList`;
    const data = await apiCall(url);
    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation: ", error);
  }
};

// Return list of exercises based on body part
export const fetchExercisesByBodypart = async (bodyPart) => {
  try {
    const url = `${BASE_URL}/exercises/bodyPart/${encodeURIComponent(
      bodyPart
    )}`;
    const data = await apiCall(url);
    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation: ", error);
  }
};
