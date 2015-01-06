module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    var targetPath = "target/frontend"

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: {
            target: ["target"],
            dev: {
                src: ["target/frontend"]
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: "target/bower",
                    layout: "byComponent"
                }
            }
        },

        concat: {
            "target/frontend/js/app.js": [
                "target/bower/angular/angular.js",
                "target/bower/jquery/jquery.js",
                "target/bower/bootstrap/bootstrap.js",
                "src/main/js/main.js"]
        },

        copy: {
            dev: {
                files: [{
                    src: "src/main/html/index.html",
                    dest: "target/frontend/index.html"
                }]
            }
        }
    });

    grunt.registerTask("init", ["clean", "bower"]);
    grunt.registerTask("package:dev", ["clean", "bower", "concat", "copy:dev"]);
};
