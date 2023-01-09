module.exports = [
	{
		script: 'build/index.js',
		name: 'webapp'
		// ! set env below to be able to get fetch request in sveltekit
		// env: {
		// 	ORIGIN: 'http://<server_ip>', // copy from server-info.txt
		// 	HOST: '127.0.0.1',
		// 	PORT: '3000'
		// }
	}
];
