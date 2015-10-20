/**
 * Created by carlos.matheu on 20/10/2015.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compact'
                },
                files: {
                    'dist/css/style.css': 'app/scss/*.scss'
                }
            }
        },
        linter: {
            files: ['app/js/*.js']
        },
        concat: {
            dist: {
                src: ['app/js/*.js'],
                dest: 'dist/js/script.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/script.min.js': ['dist/js/script.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-linter');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass', 'linter', 'concat', 'uglify']);
}