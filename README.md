fakeWebHDFS
===========

**fakeWebHDFS** is a WebHDFS REST API mock for webHDFS dependent applications.

##Requirements
* Node.js
* npm

##How to run

Just

```
~$ ./run.sh
Express server listening on port 50070 for namenode
Express server listening on port 50075 for datanode
```

This will

* install node modules
* compile typescript
* run webserver

If you have files and dirs in your dummy hdfs like 

```
./hdfs
|-- foo
|   |-- bar.txt
|   `-- foo.txt
`-- omg.txt
```

You would get

```
~$ curl localhost:50070/webhdfs/v1/foo?op=LISTSTATUS
{"FileStatuses":{"FileStatus":[{"group":"staff","modificationTime":1450797734000,"owner":"owner","pathSuffix":"bar.txt","permission":"644","accessTime":1450798339000,"blockSize":4096,"length":4,"replication":3,"type":"FILE"},{"group":"staff","modificationTime":1450797734000,"owner":"owner","pathSuffix":"foo.txt","permission":"644","accessTime":1450798339000,"blockSize":4096,"length":4,"replication":3,"type":"FILE"}]}}
~$ 
~$ curl localhost:50070/webhdfs/v1/omg.txt?op=OPEN
Temporary Redirect. Redirecting to http://localhost:50075/webhdfs/v1/omg.txt?op=OPEN
~$ curl localhost:50075/webhdfs/v1/omg.txt?op=OPEN
omg
~$
```

The default setting is in config/default.json.
You can change dummy hdfs path and endpoints using your config file.

Such as,

```
~$ cat config/test.json
{
    "dummyhdfs": {
        "dir": "./hdfs"
    },
    "webhdfs": {
        "path": "/webhdfs/v1"
    },
    "namenode": {
        "port": 50170
    },
    "datanode": {
        "port": 50175
    }
}
```

Run with your setting.

```
~$ NODE_ENV=test ./run.sh
```

## Supported APIs
* OPEN
* GETFILESTATUS
* LISTSTATUS


