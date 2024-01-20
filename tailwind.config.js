module.exports = {
	purge: {
		content: ["./public/**/*.html", "./src/**/*.vue"]
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"at-light-purple": "#746fc8"
			}
		},
		fontFamily: {
			Rubik: ["Rubik, sans-serif"]
		},
		flex: {
			"1": "1 1 0%",
			"2": "2 2 0%"
		},
		container: {
			center: true,
			screens: {
				lg: "1124px",
				xl: "1124px"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
