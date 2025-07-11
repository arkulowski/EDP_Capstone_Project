const BASE = import.meta.env.VITE_API_BASE_URL;

async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

async function postJSON(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export function fetchEmployees(q = '') {
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  return getJSON(`/employees${qs}`);
}

export function fetchEmployee(id) {
  return getJSON(`/employees/${id}`);
}

export function fetchSalary(id) {
  return getJSON(`/employees/${id}/salary`);
}

export function predictSalary(data) {
  let test = postJSON('/estimate_salary', data);
  console.log(test);
  return test;
}
