"use strict";

const fs = require('fs');
const shell = require('shelljs');

module.exports = {

    /**
     * Change color of element to green
     * @param elem - elem for changing color
     */
    highlightSuccess: function (elem) {
        browser.executeScript('arguments[0].style.backgroundColor = "#00ff00"' , elem);
    },

    /**
     * Change color of element to red
     * @param elem - elem for changing color
     */
    highlightFail: function (elem) {
        browser.executeScript('arguments[0].style.backgroundColor = "#F20800"' , elem);
    },

    createScreenshot: function () {
        utils.createDir('./screenshot/');
        browser.takeScreenshot().then((screen)=>{
            let date = new Date().toLocaleString("en").replace(/[/:\s,]/g, '');
            let filename = './screenshot/' + date + '.png';
            fs.writeFileSync(filename, screen, 'base64', function(err) {
                if(err) {
                    throw (err);
                }
            });
        });
    },

    /**
     * create all folders for path
     * @param absolutePath
     * @returns {Promise}
     */
    createDir: function (absolutePath) {
        if (!fs.existsSync(absolutePath)) {
            shell.mkdir('-p', absolutePath);
        }

    }


};