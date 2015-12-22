/// <reference path="../typings/express/express.d.ts" />

'use strict';
import logger = require('morgan');
import express = require('express');
import http = require('http');

export default class Webhdfs {
    private role: string;
    protected conf: any;

    constructor(role) {
        this.conf = require('config');
        this.role = role;
    }

    protected getPath(reqpath: string): string {
        return this.conf.dummyhdfs.dir + '/' + reqpath.replace(new RegExp(this.conf.webhdfs.path + '/', 'g'), '');
    }

    public run(): void {
        var app = express();
        app.use(logger('dev'));

        app.get(this.conf.webhdfs.path + '/*', (req: any, res: any) => {
            if (req.query.op) {
                switch (req.query.op.toUpperCase()) {
                    case 'OPEN':
                        this.apiOpen(req, res);
                        break;
                    case 'GETFILESTATUS':
                        this.apiGetFileStatus(req, res);
                        break;
                    case 'LISTSTATUS':
                        this.apiListStatus(req, res);
                        break;
                    default:
                        this.notYetImplemented(req, res);
                }
            } else {
                res.sendStatus(400);
            }
        });

        app.get('/*', (req, res) => {
            res.sendStatus(400);
        });

        app.post(this.conf.webhdfs.path + '/*', (req, res) => {
            res.sendStatus(400);
        });

        app.post('/*', (req, res) => {
            res.sendStatus(400);
        });

        var port: number = this.conf[this.role].port;
        http.createServer(app).listen(port, () => {
            console.log('Express server listening on port ' + port + ' for ' + this.role);
        });
    }

    protected notYetImplemented(req: any, res: any): void {
        res.status(400).send('Operation ' + req.query.op + ' not yet implemented.');
    }

    protected apiOpen(req: any, res: any): void {
        res.sendStatus(400);
    }

    protected apiGetFileStatus(req: any, res: any): void {
        res.sendStatus(400);
    }

    protected apiListStatus(req: any, res: any): void {
        res.sendStatus(400);
    }
}
