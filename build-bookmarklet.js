var sys = require('sys');

// concat all js files + add bookmarklet specific code
sys.puts("Building bookmarklet...");
var fs = require('fs');
var appFiles = require("./fileLists.js").appFiles;
var content = "javascript:(function(){\n/*jshint -W004 */\n";

appFiles.forEach(function(filename) {
  content += fs.readFileSync(filename, "utf8");
});

content += "\nwindow.rplbw = rpl.make.bookmarklet();\n" + 
  "var ui = new rpl.UI(window.rplbw);\n" +
  "ui.display();\n" +
  "}());";
content = content.replace(/\/\/.*/g, ""); // remove single line comments, because they break bookmarklet
content = content.replace(/\/\*\s*jshint\s*\-W087\s*\*\//g, ""); // remove jshint option to ignore debugger; statements
fs.writeFileSync("release/replaybrowser.js", content);
sys.puts("Done!");

// run jshint on the bookmarklet code
sys.puts("Running jshint...");
sys.puts("* error \"Label 'javascript' on ( statement.\", is ok. Forget about it.");
var exec = require('child_process').exec;
var isOnWindows = /^win/.test(process.platform);
var command = isOnWindows ? "jshint release" : "./jshint.sh release";

exec(command, function (error, stdout, stderr) { 
  sys.puts(stdout);
});

