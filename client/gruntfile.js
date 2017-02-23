module.exports = function(grunt) {
    // load grunt tasks based on dependencies in package.json
    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        // Remove all files from dist directory
        clean: ['dist/*'],

        // Inject bower components into index.html
        wiredep: {
          task: {
            src: ['app/**/*.html']
          }
        },

        // Copy necessary files into dist directory
        copy:{
            main: {
                files: [
                    { src: './app/index.html', dest: 'dist/index.html' }
                ]
            }
        },

        // Create usemin configuration based on commment blocks in index.html
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },

        // Global options for cssmin
        cssmin: {
            options: {
                keepSpecialComments: 0
            }
        },

        // Run usemin configurations on index.html
        usemin:{
            html:['dist/index.html']
        },

        // Minify html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },

        // Remove unused CSS
        uncss: {
            dist: {
                src: ['dist/index.html'],
                dest: 'dist/styles/style.css',
                options: {
                    report: 'min'
                }
            }
        },

        // Start a web server
        connect: {
            serve: {
                options: {
                    port: 8080,
                    hostname: 'localhost',
                    base: 'dist',
                    open: false,
                    keepalive: true
                }
            }
        }
    });

    grunt.registerTask('default',[
        'clean',
        'wiredep',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'htmlmin',
        'uncss'
    ]);

    grunt.registerTask('serve',[
        'default',
        'connect'
    ]);
}

