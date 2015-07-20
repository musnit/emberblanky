module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    shell: {
        options: {
            stderr: true
        },
        app: {
            command: 'cd blanky && ./buildapp'
        },
        updatefixtures: {
            command: './updatefixtures'
        }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('app', ['shell:app']);
  grunt.registerTask('updatefixtures', ['shell:updatefixtures']);

};
