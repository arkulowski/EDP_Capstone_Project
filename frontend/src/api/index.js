// frontend/src/api/index.js
const BASE = import.meta.env.VITE_API_BASE_URL || '';

async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json();
}

async function postJSON(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.json();
}

export function pingServer() {
  return getJSON('/ping');
}

export function fetchEmployees(q = '') {
  return getJSON(`/employees?q=${encodeURIComponent(q)}`);
}

export function fetchEmployee(id) {
  return getJSON(`/employees/${id}`);
}

export function fetchSalary(id) {
  return getJSON(`/employees/${id}/salary`);
}

export function predictSalary(inputs) {
  return postJSON('/predict-salary', inputs);
}
