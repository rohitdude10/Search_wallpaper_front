import axios from "axios";
import { API_URL } from "../constant";

export function GetTopics() {
  return axios
    .get(`${API_URL}topics`)
    .then((response) => response.data.topics)
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("Failed to fetch data");
    });
}

export function GetWallpaper(selectedtopic) {
  return axios
    .get(`${API_URL}wallpapers/${selectedtopic}`)
    .then((response) => response.data.theme)
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("Failed to fetch data");
    });
}

export function GetNextPage(next_page_url) {
  return axios
    .post(`${API_URL}get_next_page`, { next_page: next_page_url })
    .then((response) => response.data.theme)
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("Failed to fetch data");
    });
}

export function GetPrevPage(prev_page_url) {
  return axios
    .post(`${API_URL}get_prev_page`, { prev_page: prev_page_url })
    .then((response) => response.data.theme)
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("Failed to fetch data");
    });
}

export function SetWallpaper(value) {
    return axios
      .post(`${API_URL}set_wallpaper/`, { data: value })
      .then((response) => response)
      .catch((error) => {
        console.error("Error:", error);
        throw new Error("Failed to fetch data");
      });
  }


