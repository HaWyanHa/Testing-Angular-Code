module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        karma: {
            app: {
                options: {
                    frameworks: ['mocha', 'chai'],
                    client: {
                        mocha: {
                            ui: 'tdd'
                        }
                    },
                    browsers: ['PhantomJS'],
                    singleRun: true,

                    files: [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-ui-router/release/angular-ui-router.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'src/js/**/*.js',
                        'test/specs/**/*.js'
                    ],

                    preprocessors: {
                        'src/js/**/*.js': ['coverage']
                    },
                    reporters: ['progress', 'coverage'],
                    coverageReporter: {
                        type: 'text-summary'
                    }

                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-karma');

};