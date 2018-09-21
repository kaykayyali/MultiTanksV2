'use strict';
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				src: 'dist/frontend.js',
				dest: 'build/frontend.min.js'
			}
		},
		concat: {
			dist: {
				src: [
					'src/client/phaser/*.js',
					'src/client/phaser/*/*.js',
					'src/client/phaser/*/*/*.js'
				],
				dest: 'dist/frontend.js',
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('build', ['concat', 'uglify']);

};