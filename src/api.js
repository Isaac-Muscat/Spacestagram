
const apod_url 	= "https://api.nasa.gov/planetary/apod";
const api_key 	= `?api_key=${process.env.REACT_APP_NASA_KEY}`;

export const getRandomApodImagesByCount = async(count=1) => {
	const response = await fetch(apod_url + api_key + `&count=${count}`);
	const data = await response.json();
	return [...data];
}

export const getApodImagesByStartDate = async(startDate, days=1) => {
	const start = new Date(startDate);
	const end = new Date(start.setDate(start.getDate() + days-1));
	const response = await fetch(apod_url + api_key + `&start_date=${startDate}&end_date=${end.toISOString().substring(0, 10)}`);
	const data = await response.json();
	return [...data];
}