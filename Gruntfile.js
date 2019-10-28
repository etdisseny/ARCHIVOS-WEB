module.exports = function(grunt) {

	// load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        //Copia los archivos de la carpeta src a la carpeta dist que sera la que luego colgaremos en nuestro servidor
        //Copiara todos los archivos excepto los .less i .scss
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ["**", "!css/**/*.less", "!css/**/*.scss"],
                dest: 'dist/'
            }
        },
         // hace el compilado de .less a .css en la carpeta src/css
        less: {
            options: {
                paths: ['src/css']
            },
            src: {        
                expand: true,
                cwd:    "src/css",
                src:    "*.less",
                ext:    ".css",
                dest:   "src/css"
            }
        },
        //hace el compilado de .scss a .css en la carpeta src/css
		sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd:    "src/css",
                    src:    ["*.scss"],
                    dest:  "src/css",
                    ext:    ".css"
                }]
            }
		},
        //mira las tareas y las ejecuta - las tareas less sass y copy
        //en options ponemos livereload en true y si tenemos la extesión del navegador instalada, hace recarga de página automática
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            less: {
                files: ['src/css/**/*.less'],
                tasks: ['less']
            },
            sass: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass']
            },
            copy: {
                files: ['src/**'],
                tasks: ['copy:main']
            }
        }
		
	});

	grunt.registerTask('default', ['watch']);
};