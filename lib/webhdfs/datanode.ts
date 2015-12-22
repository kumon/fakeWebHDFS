/// <reference path="../../typings/node/node.d.ts" />

'use strict';
import fs = require('fs');
import Webhdfs from '../webhdfs';

export default class Datanode extends Webhdfs {
    constructor() {
        super('datanode');
    }

    protected apiOpen(req: any, res: any): void {
        var path: string = this.getPath(req.path);
        fs.readFile(path, (err, content) => {
            if (err) {
                res.status(404).send(JSON.stringify(err));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
                res.end(content);
            }
        });
    }
}

