module.exports = grunt => {

    grunt.initConfig({
        clean: ['./build'],
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/css',
                    src: ['*.scss'],
                    dest: './src/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './src/css',
                    src: ['*.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['index.html'], dest: './build'},
                    {expand: true, cwd: 'src/js', src: ['*'], dest: './build/js'},
                    {expand: true, cwd: 'src/css', src: ['*.css'], dest: './build/css'},
                    {expand: true, cwd: 'src/img', src: ['**'], dest: './build/img'},
                    {expand: true, cwd: 'src/vendors', src: ['*'], dest: './build/vendors'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/*.js',
                dest: './build/js/app.min.js'
            }
        }
        , watch: {
            scripts: {
                files: './src/**',
                tasks: ['clean', 'cssmin', 'sass', 'copy'],
                options: {
                    debounceDelay: 5000,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean', 'sass', 'copy' ]);
    // grunt.registerTask('build', ['clean', 'cssmin', 'sass', 'copy', 'uglify']);
};