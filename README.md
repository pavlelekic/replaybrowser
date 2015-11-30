Unit tests
----------

Most of the code is unit tested. I used Karma test runner so you can run tests in parallel on any number of browsers/devices. Also I added jshint checks before every test run. To run tests (and linter before tests) do the following:

1. start karma server (`karma-server.cmd` on Windows, or `./karma-server.sh` on Linux)
2. connect at least one browser by navigating to [localhost:9876](http://localhost:9876/)
3. run `lint-and-test.cmd` on Windows, or `./lint-and-test.sh` on Linux from the root directory of the project
  
To add new files for testing open `fileLists.js` and add files in the order in which you want Karma to load them.


Coverage analysis
-----------------

To get coverage analysis, run `karma-coverage-server.cmd` on Windows, or `./karma-coverage-server.sh` on Linux. Then run tests same as before. In the coverage/ dir you will see a new directory generated for every browser. Open `index.html` to see coverage results.


Release
-------

To concat all the js files into a working bookmarklet run `node build-bookmarklet.js`. You will see a finished version in the `release/` directory.