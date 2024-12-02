export function fetchList(index) {
	const url = `${import.meta.env.VITE_API_URL}${index}`;
	return fetch(url)
	.then(response => {
		if(!response.ok)
		throw new Error("Error in fetch: " + response.statusText);

		return response.json();
	})
}

export function deleteInfo(url){
	return fetch(url, { method: 'DELETE' })
	.then(response => {
		if (!response.ok)
		throw new Error("Error in delete: " + response.statusText)

		return response.json();
	})
}

export function saveInfo(index, newInfo) {
	const url = `${import.meta.env.VITE_API_URL}${index}`
	return fetch(url, {
		method: "POST",
		headers: { "Content-type" : "application/json" },
		body: JSON.stringify(newInfo)
	})
	.then(response => {
		if(!response.ok)
		throw new Error("Error in saving: " + response.statusText);

		return response.json();
	})
}

export function updateInfo(url, updatedInfo){
	return fetch(url, {
		method: "PUT",
		headers: { "Content-type" : "application/json" },
		body: JSON.stringify(updatedInfo)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in update: " + response.statusText);

        return response.json();
    })
}