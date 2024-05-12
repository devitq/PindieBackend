const getJWTFromCookie = () => {
	const cookie = document.cookie
		.split(";")
		.find((cookie) => cookie.trim().startsWith("jwt="));
	return cookie ? cookie.split("=")[1] : null;
};

const getData = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const postData = async (url, data) => {
	const jwt = getJWTFromCookie();
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: jwt && `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		});
		if (response.status !== 200) {
			throw new Error((await response.json()).message);
		}
		return response;
	} catch (err) {
		return err;
	}
};

const putData = async (url, data) => {
	const jwt = getJWTFromCookie();
	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: jwt && `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		});
		if (response.status !== 200) {
			throw new Error((await response.json()).message);
		}
		return response;
	} catch (err) {
		return err;
	}
};

const deleteData = async (url) => {
	const jwt = getJWTFromCookie();
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: jwt && `Bearer ${jwt}`,
			},
			method: "DELETE",
		});
		return response;
	} catch (err) {
		console.error(err);
	}
};

export { getData, postData, putData, deleteData };
