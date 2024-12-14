import { redirect } from "react-router-dom";

export function userId() {
  const userId = localStorage.getItem("userid");
  return userId;
}

export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function getCreatorId() {
  const creatorid = localStorage.getItem("creatorid");
  return creatorid;
}

export function getUserUserPhoneNumber() {
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");
  return userPhoneNumber;
}

export function tokenLoader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
}
