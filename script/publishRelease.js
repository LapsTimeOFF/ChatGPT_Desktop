const {
    Octokit
} = require("octokit");
const {
    Writable
} = require('stream');

const conventionalChangelog = require('conventional-changelog');

const config = require('conventional-changelog-metahub');

const octokit = new Octokit({
    auth: process.env.GH_TOKEN
})

const publish = async () => {
    var myStream = new Writable({
        write(chunk, encoding, callback) {

            octokit.request('POST /repos/LapsTimeOFF/ChatGPT_Desktop/releases', {
                owner: 'LapsTimeOFF',
                repo: 'ChatGPT_Desktop',
                tag_name: `v${require('../package.json').version}`,
                target_commitish: 'stable',
                name: `v${require('../package.json').version}`,
                body: chunk.toString(),
                draft: true,
                prerelease: false,
                generate_release_notes: false
            })


            callback();
        }
    });
    conventionalChangelog({
        config
    }).pipe(myStream)

}

publish();