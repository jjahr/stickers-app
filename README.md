# Quick Start:

		$ npm install
			Install node dependencies listed in package.json to /node_modules
		
		$ bower install
			Install bower dependencies listed in bower.json to /bower_components

		$ grunt
			Run grunt default task: start server and watch process, open browser.		

# Grunt Tasks

	grunt (default)

		Build to /dev, start server and watch processes, and open browser.

	grunt dist

		Build to /dist

# File Structure

	/
		/html (git root)
			/src
				index.html
				/include (grunt-processhtml can do php-style includes in your html)
				/js (grunt-contrib-uglify minifies this)
				/scss (grunt-sass processes this)
				/tmp (used by build process only)
					/css
					/js
			/dev (build for local development)
			/dist (build for deployment.  upload this to server.)
			/bower_components (controlled by bower.json)
			/node_modules (controlled by package.json)
			Gruntfile.js (grunt settings)
		/psd (photoshop files)
		/ux (wireframes)
		/font 
		/downloads (word docs, powerpoint, stock photography)


# Using Grunt-ProcessHTML

	Include HTML:
		<!-- build:include container.html -->
		This will be replaced by container.html
		<!-- /build -->

	Remove HTML:
		<!-- build:remove:dist -->
		This will be removed for build:dist
		<!-- /build -->

	Inline CSS:
		<style>
		<!-- build:include css/app.css -->
		This will be replaced by app.css
		<!-- /build -->
		</style>

	Inline Javascript:
		<script>
		<!-- build:include js-min/output.min.js -->
		This will be replaced by output.min.js
		<!-- /build -->
		</script>

