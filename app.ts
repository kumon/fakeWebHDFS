'use strict';

import Namenode from './lib/webhdfs/namenode';
import Datanode from './lib/webhdfs/datanode';

var namenode = new Namenode();
namenode.run();

var datanode = new Datanode();
datanode.run();

