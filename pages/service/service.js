export async function getData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
