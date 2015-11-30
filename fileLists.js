(function() {
  "use strict";

  exports.coreFiles = [
  	"core/event-properties/EventProperties.js",
  	"core/event-properties/UIEventProperties.js",
  	"core/event-properties/InputEventProperties.js",
  	"core/event-properties/KeyboardEventProperties.js",
  	"core/event-properties/MouseEventProperties.js",
  	"core/event-properties/FocusEventProperties.js",
  	"core/event-properties/WheelEventProperties.js",
  	"core/event-properties/eventPropertiesFactory.js"
  ];

  exports.appFiles = exports.coreFiles.concat([     
    'core/cssPath.js',
    'core/cssPathExtended.js',    
    //'core/Trigger.js',
    'core/Recorder.js',/*
    'core/Player.js',
    'bookmarklet/Bookmarklet.js',
    'bookmarklet/UI.js',
    'core/make.js' */       
  ]);

  exports.testFiles = exports.appFiles.concat([     
    'util/testHelper.js',
    'util/testHelper.test.js',
    'core/cssPath.test.js',
    'core/cssPathExtended.test.js',
    //'core/Trigger.test.js',
    'core/Recorder.test.js',/*
    'core/Player.test.js',
    'bookmarklet/Bookmarklet.test.js'*/
  ]);
}());