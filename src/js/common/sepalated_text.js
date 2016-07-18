'use strict';

import parse from 'csv-parse';
import fs from 'fs';

export default class SepalatedText {
    static readAsync(path = null, f = null) {
        if(path === null){
            throw new FileNotSpecifiedError();
        }
        fs.readFile(path, 'utf8', function (err, text) {
            if(err === null) {
                parse(text, {}, function(err, output) {
                    if(f !== null){
                        f(output);
                    }
                });
            } else {
                throw new Error(err);
            }
        });
    }
}

class FileNotSpecifiedError extends Error{};
