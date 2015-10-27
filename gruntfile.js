/**
 * Created by carlos.matheu on 20/10/2015.
 */
'use strict';

module.exports = function (grunt) {

    // Configurable paths
    var config = {
        appFolder: 'app',
        distFolder: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= config.distFolder %>/css/styles.css': 'app/scss/*.scss'
                }
            }
        },
        linter: {
            files: ['<%= config.appFolder %>/js/*.js']
        },
        concat: {
            dist: {
                src: ['<%= config.appFolder %>/js/*.js'],
                dest: '<%= config.distFolder %>/js/script.js'
            }
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dist: {
                files: {
                    'dist/js/script.min.js': ['<%= config.appFolder %>/js/*.js']
                }
            }
        },
        watch: {
            html: {
                files: ['<%= config.appFolder %>/*.html'],
                tasks: ['copy:dist']
            },
            scripts: {
                files: ['<%= config.appFolder %>/js/*.js'],
                tasks: ['linter', 'concat', 'uglify']
            },
            styles: {
                files: ['<%= config.appFolder %>/scss/*.scss'],
                tasks: ['sass']
            }
        },
        browserSync: {
            bsFiles: {
                src : [
                    '<%= config.distFolder %>/css/*.css',
                    '<%= config.distFolder %>/js/*.js',
                    '<%= config.distFolder %>/*.html',
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: '<%= config.distFolder %>'
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.appFolder %>',
                    dest: '<%= config.distFolder %>',
                    src: [
                        'images/**/*',
                        '*.html'
                    ]
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-linter');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('build', ['linter', 'concat', 'uglify', 'sass', 'copy:dist']);
    grunt.registerTask('default', ['build', 'browserSync', 'watch']);

}