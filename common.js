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
        utils.createDir('./screenshot/')
            .then(()=>{
                return new Promise((resolve, reject)=>{
                    browser.takeScreenshot().then((screen)=>{
                        let date = new Date().toLocaleString("en").replace(/[/:\s,]/g, '');
                        let filename = './screenshot/' + date + '.png';
                        fs.writeFile(filename, screen, 'base64', function(err) {
                            if(err) {
                                reject(err);
                            }
                            resolve();
                        });
                    });
                });
            });

    },

    /**
     * create all folders for path
     * @param absolutePath
     * @returns {Promise}
     */
    createDir: function (absolutePath) {
        return new Promise((resolve, reject)=> {
            if (!fs.existsSync(absolutePath)) {
                shell.mkdir('-p', absolutePath);
            }
            resolve();
        });

    }


};