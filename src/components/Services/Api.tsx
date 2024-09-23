import { API } from "../Constants";

function checkResponce(res: any) {
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
  }).then((res) => checkResponce(res)
  );
}

export function getTheme() {
  return fetch(`${API}/gettheme`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponce(res)
  );
}

export function saveParameters(parameters: object) {
  return fetch(`${API}/saveparameters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parameters),
  }).then((res) => checkResponce(res));
}

export function saveTheme(theme: object) {
  return fetch(`${API}/savetheme`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(theme),
  }).then((res) => checkResponce(res));
}