import { API } from "../Constants";

function checkResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getParameters() {
  return fetch(`${API}/getparameters`, {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  }).then((res) => checkResponce(res)
  );
}

export function getTheme() {
  return fetch(`${API}/gettheme`, {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  }).then((res) => checkResponce(res)
  );
}

export function saveParameters(parameters) {
  return fetch(`${API}/saveparameters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(parameters),
  }).then((res) => checkResponce(res));
}

export function saveTheme(theme) {
  return fetch(`${API}/savetheme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(theme),
  }).then((res) => checkResponce(res));
}