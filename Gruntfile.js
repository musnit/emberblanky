module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    broccoli: {
      tool: {
        dest: 'builds/tool',
        config: 'Brocfile.js'
      },
     
      app: {
        dest: 'builds/mobileapp',
        config: 'AppBrocfile.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-broccoli');

  // Default task(s).
  grunt.registerTask('default', ['broccoli:tool:build']);
  grunt.registerTask('buildtool', ['broccoli:tool:build']);
  grunt.registerTask('buildapp', ['broccoli:app:build']);

};
