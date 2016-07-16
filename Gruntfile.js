'use strict';

module.exports = function(grunt) {

  var appConfig = {
    // app: require('./bower.json').appPath || 'app',
    src: 'src',
    dist: 'dist',
    vendor: 'vendor'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: appConfig,
    // vendor: grunt.file.readJSON('.bowerrc').directory,
    // process: require('./src/js/sanitize.js'),

    watch: {
      options: {
        livereload: true,
        interrupt: false,
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['watchcontexthelper:gruntfile'],
        options: {
          nospawn: true,
        },
      },
      sass: {
        files: ['<%= site.src %>/sass/**/*.{scss,sass}'],
        tasks: ['watchcontexthelper:sass'],
        options: {
          nospawn: true
        },
      },
      // js: {
      //   files: ['<%= site.src %>/js/**/*.js'],
      //   tasks: ['watchcontexthelper:js'],
      //   options: {
      //     nospawn: true
      //   },
      // },
      // img: {
      //   files: ['<%= site.src %>/images/**/*'],
      //   tasks: ['watchcontexthelper:img'],
      //   options: {
      //     nospawn: true
      //   },
      // },
      // html: {
      //   files: ['<%= site.src %>/html/**/*.hbs'],
      //   tasks: ['watchcontexthelper:html'],
      //   options: {
      //     nospawn: true
      //   },
      // },
      // json: {
      //   files: ['<%= site.src %>/js/json/*.json'],
      //   tasks: ['watchcontexthelper:json'],
      //   options: {
      //     nospawn: true
      //   },
      // },
    },

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', '<%= site.helpers %>/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Prettify test HTML pages from Assemble task.
    prettify: {
      all: {
        files: [
          {expand: true, cwd: '<%= site.dest %>', src: ['*.html'], dest: '<%= site.dest %>/', ext: '.html'}
        ]
      }
    },

    uglify: {
      // concat and minify scripts
      target: {
        files: {
          '<%= site.dest %>/js/main.min.js': ['<%= site.dest %>/js/main.js'],
          '<%= site.dest %>/js/vendor/jquery.min.js': ['<%= site.dest %>/js/vendor/jquery.js'],
          '<%= site.dest %>/js/vendor/modernizr.min.js': ['<%= site.dest %>/js/vendor/modernizr.js']
        }
      }
    },

    sass: {
      main: {
        files: {
          'styles/main.css': '<%= site.src %>/sass/main.scss',
          'styles/game-och.css': '<%= site.src %>/sass/game-och.scss',
          'styles/game-bow.css': '<%= site.src %>/sass/game-bow.scss',
          // '<%= site.dest %>/css/font-awesome.min.css': '<%= site.src %>/sass/font-awesome.min.scss',
          // '<%= site.dest %>/css/jquery-ui.css': '<%= site.src %>/sass/jquery-ui.scss',
          // '<%= site.dest %>/css/owl-carousel.css': '<%= site.src %>/sass/owl.carousel.scss',
          // '<%= site.dest %>/css/owl-theme.css': '<%= site.src %>/sass/owl.theme.scss',
          // '<%= site.dest %>/css/bootstrap.css': '<%= vendor %>/bootstrap-sass/vendor/assets/stylesheets/bootstrap.scss',
        },
      },
    },

    concat: {
      js: {
        src: [
          '<%= vendor %>/bootstrap-sass/vendor/assets/javascripts/bootstrap/collapse.js',
          '<%= vendor %>/bootstrap-sass/vendor/assets/javascripts/bootstrap/transition.js',
          '<%= vendor %>/bootstrap-sass/vendor/assets/javascripts/bootstrap/carousel.js',
          '<%= vendor %>/bootstrap-sass/vendor/assets/javascripts/bootstrap/tooltip.js',
          '<%= vendor %>/bootstrap-sass/vendor/assets/javascripts/bootstrap/modal.js',
          '<%= vendor %>/isInViewport/lib/isInViewport.js',
          '<%= vendor %>/jquery-touchswipe/jquery.touchSwipe.js',
          '<%= site.src %>/js/owl.carousel.min.js',
          '<%= site.src %>/js/jquery.jscrollpane.min.js',
          '<%= site.src %>/js/jquery.mousewheel.js',
          '<%= site.src %>/js/plugins.js',
          '<%= site.src %>/js/main.js'
        ],
        dest: '<%= site.dest %>/js/main.js'
      },
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= site.dest %>/css',
          src: [
            'bootstrap.css',
            'jquery-ui.css',
            'owl-theme.css',
            'owl-carousel.css',
            'main.css'
          ],
          dest: '<%= site.dest %>/css/',
          ext: '.min.css'
        }]
      }
    },

    // Copy H5BP files to new project, using replacement
    // patterns to convert files into templates.
    copy: {
      img: {
        files: [
          { expand: true, cwd: '<%= site.src %>/images/', src: '**/*', dest: '<%= site.dest %>/images/' },
          { expand: true, cwd: '<%= site.src %>/sass/images/', src: '**/*', dest: '<%= site.dest %>/css/images/' }
        ],
      },
      assets: {
        files: [
          { expand: true, cwd: '<%= site.src %>/assets/', src: '**/*', dest: '<%= site.dest %>/assets/' }
        ],
      },
      "js-vendor": {
        files: [
          { expand: true, cwd: '<%= vendor %>/jquery/dist/', src: 'jquery.js', dest: '<%= site.dest %>/js/vendor' },
          { expand: true, cwd: '<%= vendor %>/modernizr/', src: 'modernizr.js', dest: '<%= site.dest %>/js/vendor' },
          { expand: true, cwd: '<%= site.src %>/js/', src: 'jquery-ui-1.10.4.min.js', dest: '<%= site.dest %>/js/' }
        ],
      },
      "json": {
        files: [
          { expand: true, cwd: '<%= site.src %>/js/json/', src: '**/*', dest: '<%= site.dest %>/' }
        ],
      },
      "fonts": {
        files: [
          { expand: true, cwd: '<%= site.src %>/fonts/', src: '**/*', dest: '<%= site.dest %>/fonts/' }
        ],
      },
      "ui-files": {
        files: [
          { expand: true, cwd: '<%= site.src %>/sass/images/', src: '**/*', dest: '<%= site.dest %>/css/images/' }
        ],
      },
    },

    // Before generating new files remove files from previous build.
    // clean: {
    //   dist: ['<%= site.dest %>'],
    //   html: ['<%= site.dest %>/**.html'],
    //   css: ['<%= site.dest %>/css/'],
    //   js: ['<%= site.dest %>/js/'],
    //   "js-vendor": ['<%= site.dest %>/js/vendor'],
    //   json: ['<%= site.dest %>/**.json'],
    //   img: ['<%= site.dest %>/images/'],
    //   fonts: ['<%= site.dest %>/fonts/'],
    // }
    clean: {
      css: ['styles/'],
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('watchcontexthelper', function (target){
    switch (target) {
      case 'gruntfile':
        var child;

        var showDone = function(){
          console.log('Done');
        }

        if (grunt.watchcontext === 'production') {
          child = grunt.util.spawn({ grunt: true, args: ['production'] }, showDone);
        } else {
          child = grunt.util.spawn({ grunt: true, args: ['development'] }, showDone);
        }

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        break;
      case 'js':
        (grunt.watchcontext === 'production') ?
        grunt.task.run(['clean:js', 'copy:js-vendor', 'concat', 'uglify', 'clean:devjs']) :
        grunt.task.run(['clean:js', 'copy:js-vendor', 'concat']);
        break;
      case 'img':
        (grunt.watchcontext === 'production') ?
        grunt.task.run(['clean:img', 'copy:img']) :
        grunt.task.run(['clean:img', 'copy:img']);
        break;
      case 'html':
        (grunt.watchcontext === 'production') ?
        grunt.task.run(['clean:html', 'assemble:production']) :
        grunt.task.run(['clean:html', 'assemble:development']);
        break;
      case 'sass':
        (grunt.watchcontext === 'production') ?
        grunt.task.run(['clean:css', 'sass', 'copy:ui-files', 'cssmin', 'clean:devcss']) :
        grunt.task.run(['clean:css', 'sass', 'copy:ui-files']);
        break;
      case 'json':
        (grunt.watchcontext === 'production') ?
        grunt.task.run(['clean:json', 'copy:json']) :
        grunt.task.run(['clean:json', 'copy:json']);
        break;
    }
  });

  // Default tasks to be run.
  grunt.registerTask('default', [
    'clean:css',
    // 'copy:img',
    // 'copy:assets',
    // 'copy:js-vendor',
    // 'copy:json',
    // 'copy:fonts',
    // 'concat',
    'sass'

    //'prettify'
  ]);

  grunt.registerTask('development', [
    'default'
  ]);

  grunt.registerTask('production', [
    'clean:dist',
    'copy:img',
    'copy:assets',
    'copy:js-vendor',
    'copy:json',
    'copy:fonts',
    'concat',
    'uglify',
    'sass',
    'cssmin'
  ]);

  // Linting and tests.
  grunt.registerTask('test', ['clean', 'jshint']);
};
