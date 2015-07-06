// Minify javascript
// Unminified bower components go here
function uglifyfiles(dir) {
  var files = {};
  
  files['src/js/zz-grunt-uglify/app.min.js'] = [
    'bower_components/fastclick/lib/fastclick.js',
    'src/js/app.js'
  ];
  
  files[dir+'/js/modernizr.min.js'] = [
    'bower_components/modernizr/modernizr.js'
  ];
  
  return files;
}


// Concatenate minified javascript
// Minified bower components go here
function concatfiles(dir) {
  var files = {};

  files.src = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/foundation/js/foundation.min.js',
    'bower_components/fabric.js/dist/fabric.min.js',
    'src/js/zz-grunt-uglify/app.min.js' // Minified from uglify
  ],

  files.dest = dir+'/js/app.min.js';

  return files;
}


// Sync files to the build folder
function syncfiles(dir) {

  var files = [
    {cwd:'src/www/', src:'**', dest:dir}, // HTML
    {cwd:'src/img/', src:'**', dest:dir+'/img'}, // Images
    {cwd:'src/extra/', src:'**', dest:dir}, // Extra
  ];

  return files;
}


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    sass: {
      options: {
        loadPath: ['bower_components/foundation/scss']
      },

      dev: {
        files: {
          // Compile to app.css
          'dev/css/app.css': 'src/scss/app.scss'
        },
        options: {
          // nested, compact, compressed, expanded
          style: 'expanded'
        }
      },
      // Target: Dist
      dist: {
        files: {
          // Compile to app.css
          'dist/css/app.css': 'src/scss/app.scss'
        },
        options: {
          // nested, compact, compressed, expanded
          style: 'compressed'
        }
      }
    },


    uglify: {
      dev: {
        files: uglifyfiles('dev'),
        options: {
          beautify: true
        }
      },
      dist: {
        files: uglifyfiles('dist'),
        options: {
          compress: {
            drop_console: true
          }
        }
      }
    },


    concat: {
      options: {
        separator: ';\n'
      },
      dev: concatfiles('dev'),
      dist: concatfiles('dist')
    },


    sync: {
      dev: {
        files: syncfiles('dev'),
        verbose: true // Display log messages when copying files
      },
      dist: {
        files: syncfiles('dist')
      }
    },


    processhtml: {
      // https://www.npmjs.org/package/grunt-processhtml
      options: {
        
      },
      dev: {
        // Unused
        options: {
          data: {
            message: 'Hello world, this is processhtml:dev.',
            process: true
          }
        },
        files: {
          // Process any includes first
          //'src/tmp/include/container.html': ['src/include/container.html'],
          // Copy files to dev folder
          'dev/index.html': ['src/index.html'],
        }
      },
      dist: {
        // Unused
        options: {
          data: {
            message: 'Hello world, this is processhtml:dist.',
            process: true
          }
        },
        files: {
          // Process any includes first
          //'src/include/container-processed.html': ['src/include/container.html'],
          // Copy files to dist folder
          'dist/index.html': ['src/index.html'],
        }
      }
    },


    watch: {
      // Trigger livereload for all matches.
      options: {
        livereload: 1337
      },
      // When gruntfile changes, build everything.
      grunt: { 
        files: ['Gruntfile.js'],
        tasks: ['build'],
      },
      html: {
        files: ['src/index.html', 'src/include/container.html'],
        tasks: ['processhtml:dev']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass:dev','processhtml:dev']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['uglify:dev','concat:dev','processhtml:dev']
      },
      syncfiles: {
        files: ['src/extra/**', 'src/img/**', 'src/www/**'],
        tasks: ['sync:dev']
      }
    },




    // connect: {
    //   // Server
    //   server: {
    //     options: {
    //       port: 8000
    //     }
    //   }
    // },


    // open : {
    //   // Open browser window
    //   dev : {
    //     path: 'http://127.0.0.1:8000/dev/',
    //     app: 'Google Chrome'
    //   },
    //   dist : {
    //     path: 'dist',
    //     app: 'Finder'
    //   }
    // }


  });


  // Register Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  // grunt.loadNpmTasks('grunt-open');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');



  // Custom Tasks
  grunt.registerTask('build', ['sass:dev','uglify:dev','concat:dev','processhtml:dev','sync:dev']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('dist', ['sass:dist','uglify:dist','concat:dist','processhtml:dist','sync:dist']);


}