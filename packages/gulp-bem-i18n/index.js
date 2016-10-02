'use strict';

var fs = require('fs');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var Promise = require('vow').Promise;


var PluginError = gutil.PluginError;
var pluginName = path.basename(__dirname);


var exploreI18NFolder = function (folder) {
    return fs.readdirSync(folder.path);
};

/**
 * BEM i18n gulp plugin
 *
 * @param {Object} options options for plugin
 * @param {String[]} options.langs list of supported languages
 *
 * @returns {Stream}
 */
module.exports = function (options) {
    options = options || {};
    var parsedFiles = [];

    return through.obj(function (folder, encoding, callback) {
        if(folder.isStream()) {
            return callback(new PluginError(pluginName, 'Stream not supported'))
        }
        exploreI18NFolder(folder).forEach(function (file) {
            parsedFiles.push({
                entity: folder.entity,
                level: folder.level,
                path: path.join(folder.path, file)
            });
        });
        callback();
    }, function (callback) {
        console.log('------ START1 -----');
        console.log(parsedFiles);
        console.log('------- END -------');
        callback();
    });
};
