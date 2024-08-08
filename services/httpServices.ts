import axios from "axios"
import logger from "./logServices"


axios.interceptors.response.use(null, error => {
	const expectedError = error.response && error.response.status >= 400 && error.response.status < 500

	if (!expectedError) {
		logger.log(error)
		if (error.Error === "Network Error") {
			console.error("Network Error")
		}
	}

	return Promise.reject(error)
})



export function setJwt(jwt:string | null) {
	if (typeof window === "object") {
		axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`
	}
}

let http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt
}
export default http;