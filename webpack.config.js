module.exports = {
	entry: "./app/Calculator.js",
	output: {
		filename: "./public/bundle.js"
	},
	devServer: {
		inline: true,
		port: 3005
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel",
				query: {
					presets: ["es2015", "react"]
				}
			}
		]
	}
}