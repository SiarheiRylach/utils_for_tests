"use strict";

const fs = require('fs');

module.exports = {
    /**
     * Change color of element to red
     * @param elem
     */
    highlightSuccess: function (elem) {
        browser.executeScript('arguments[0].style.backgroundColor = "#00ff00"' , elem);
    },

    /**
     * Change color of element to green
     * @param elem
     */
    highlightFail: function (elem) {
        browser.executeScript('arguments[0].style.backgroundColor = "#F20800"' , elem);
    },

    /**
     * highlight and after makes screenshot
     * @param elem - elem to change color
     * @param isSuccess - bool elem, false - highlightFail, true - highlightSuccess
     */
    highlightPlusScreen: function (elem, isSuccess) {
        if(isSuccess){
            this.highlightSuccess(elem);
        }else {
            this.highlightFail(elem);
        }

        return this.createScreenshot();
    },

    createScreenshot: function () {
        utils.createDir('./screenshot/');

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
    },

    /**
     * if folder doesn't exist, it will create
     * @param path
     */
    createDir: function (path) {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    },


};
