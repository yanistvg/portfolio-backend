#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { getConfigsFromCmd, showCmdUsage, Configuration } from '../utils';

const app: cdk.App = new cdk.App();

try {
    const config: Configuration = getConfigsFromCmd(app);

    console.log(`Deployement of ${config.environnement} version ${config.version}.${config.subversion}`)
} catch (e) {
    console.warn(e);
    showCmdUsage();
}
