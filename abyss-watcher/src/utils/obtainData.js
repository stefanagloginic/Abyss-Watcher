export default async function obtainData(url) {
	const res = await fetch(url);
	return await res.json();
}