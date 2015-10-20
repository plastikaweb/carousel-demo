/**
 * Created by carlos.matheu on 20/10/2015.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        distFolder: 'dist',
        sass: {
            dist: {
                options: {
                    style: 'compact'
                },
                files: {
                    '<%= distFolder %>/css/styles.css': 'app/scss/*.scss'
                }
            }
        },
        linter: {
            files: ['app/js/*.js']
        },
        concat: {
            dist: {
                src: ['app/js/*.js'],
                dest: '<%= distFolder %>/js/script.js'
            }
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dist: {
                files: {
                    'dist/js/script.min.js': ['dist/js/*.js']
                }
            }
        },
        watch: {
            options: {
              livereload: true
            },
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['linter', 'concat', 'uglify']
            },
            styles: {
                files: ['app/scss/*.scss'],
                tasks: ['sass']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-linter');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['linter', 'concat', 'uglify', 'sass']);
}