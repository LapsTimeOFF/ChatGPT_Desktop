const { Octokit } = require("octokit");

const conventionalChangelog = require('conventional-changelog');

const config = require('conventional-changelog-metahub');

const octokit = new Octokit({
    auth: process.env.GH_TOKEN
})

(async () => {
    await octokit.request('POST /repos/LapsTimeOFF/ChatGPT_Destop/releases', {
        owner: 'LapsTimeOFF',
        repo: 'ChatGPT_Destop',
        tag_name: `v${require('../package.json').version}`,
        target_commitish: 'stable',
        name: `v${require('../package.json').version}`,
        body: conventionalChangelog({config}),
        draft: true,
        prerelease: false,
        generate_release_notes: false
    })
})