export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1';

const fetchCountries = async name => {
  const response = await fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
