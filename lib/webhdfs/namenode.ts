/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/morgan/morgan.d.ts" />

'use strict';
import fs = require('fs');
import Webhdfs from '../webhdfs';
var userid = require('userid');

export default class Namenode extends Webhdfs {
    constructor() {
        super('namenode');
    }

    private getPathInfo(path: string, suffix: string) {
        var stat = fs.statSync(path);
        var r = {
            group: userid.groupname(stat.gid),
            modificationTime:stat.mtime.getTime(),
            owner: userid.username(stat.uid),
            pathSuffix:suffix,
            permission:(stat.mode & 0o777).toString(8),
        };

        if (stat.isFile()) {
            r['accessTime'] = stat.atime.getTime();
            r['blockSize'] = stat.blksize;
            r['length'] = stat.size;
            r['replication'] = 3;
            r['type'] = 'FILE';
            return r;
        }

        r['accessTime'] = 0;
        r['blockSize'] = 0;
        r['length'] = 0;
        r['replication'] = 0;
        r['type'] = 'DIRECTORY';
        return r;
    }

    protected apiOpen(req: any, res: any): void {
        var to = req.protocol + '://' + req.hostname + ':' + this.conf.datanode.port + req.originalUrl;
        res.redirect(307, to);
    }

    protected apiGetFileStatus(req: any, res: any): void {
        try {
            var path: string = this.getPath(req.path);
            var stat = fs.statSync(path);
            var r = {'FileStatus': this.getPathInfo(path, '')};
            res.send(JSON.stringify(r));
        } catch (e) {
            res.status(404).send(JSON.stringify(e.message))
        }
    }

    protected apiListStatus(req: any, res: any): void {
        try {
            var path: string = this.getPath(req.path);
            var files = [];
            var stat = fs.statSync(path);
            if (stat.isFile()) {
                files.push(this.getPathInfo(path, ''));
            } else {
                var children = fs.readdirSync(path);
                for (var i = 0; i < children.length; i++) {
                    files.push(this.getPathInfo(path + '/' + children[i], children[i]));
                }
            }
            var r = {'FileStatuses':{'FileStatus':files}};
            res.send(JSON.stringify(r));
        } catch (e) {
            res.status(404).send(JSON.stringify(e.message))
        }
    }
}

