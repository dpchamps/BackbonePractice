/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.


    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },
      markdown: {
          all: {
              files: [
                  {
                      expand: true,
                      flatten: true,
                      src: 'notes/*.md',
                      dest: 'notes/html/',
                      ext: '.html'
                  }
              ]
          }
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');

  // Default task.
  grunt.registerTask('default', ['markdown']);

};
