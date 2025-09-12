export function ConfigurationReader() {
	var env = process.env.Environment;
	var config: any;

	if (env === undefined || env === null) {
		config = require('../config/data.json');
	}
	else if (env == 'QA') {
		config = require('../config/data.json');
	}
	return config;
}