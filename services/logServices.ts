// import Raven from "raven-js";

function init() {
	// Raven.config("ADD YOUR OWN API KEY", {
	//   release: "1-0-0",
	//   environment: "development-test"
	// }).install();
}

function log(error:any) {
	// Raven.captureException(error);
	// console.log(error)
}

let logger = {
	init,
	log
}
export default logger