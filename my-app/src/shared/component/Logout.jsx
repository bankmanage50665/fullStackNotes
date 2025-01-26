import { redirect } from "react-router-dom";

export  function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("creatorid");
  localStorage.removeItem("userPhoneNumber");
  localStorage.removeItem("id");
  return redirect("/quizs")
}
