const conventionalChangelog = require('conventional-changelog');

const config = require('conventional-changelog-metahub');
conventionalChangelog({config}).pipe(process.stdout);