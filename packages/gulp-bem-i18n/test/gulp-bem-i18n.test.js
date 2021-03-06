'use strict';

var path = require('path');
var lib = require('..');
var gutil = require('gulp-util');
var StreamFromArray = require('stream-from-array');
var through = require('through2');

var basePath = path.join(__dirname, '..');

// Явно устанавливаем рабочую директорию, что бы она не зависела от ПО запуска тестов
process.chdir(basePath);

var folders = [];
var commonBlocks = [
    {
        path: 'test/fixtures/common.blocks/page/page.i18n',
        entity: {
            block: 'page'
        },
        level: 'common.blocks'
    },
    {
        path: 'test/fixtures/common.blocks/header/header.i18n',
        entity: {
            block: 'header'
        },
        level: 'common.blocks'
    }
];

var desktopBlocks = [
    {
        path: 'test/fixtures/desktop.blocks/header/header.i18n',
        entity: {
            block: 'header'
        },
        level: 'desktop.blocks'
    },
    {
        path: 'test/fixtures/desktop.blocks/page/page.i18n',
        entity: {
            block: 'page'
        },
        level: 'desktop.blocks'
    }
];

describe.skip('gulp-bem-i18n', function () {
    before(function () {
        var createFolder = function(block) {
            var file = new gutil.File({
                path: block.path
            });
            file.level = block.level;
            file.entity = block.entity;

            return file;
        };

        commonBlocks.forEach(function (block) {
            folders.push(createFolder(block))
        });

        desktopBlocks.forEach(function (block) {
            folders.push(createFolder(block))
        });
    });

    it('test', function (done) {
        StreamFromArray.obj(folders).pipe(lib({langs: ['ru', 'en']})).pipe(through.obj(function (result) {
            console.log('------ START -----');
            console.log(result);
            console.log('------- END -------');
            done();
        }));
    });
});
