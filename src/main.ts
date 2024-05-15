import * as core from '@actions/core';
import * as github from '@actions/github';

export default async function run(): Promise<void> {
  try {
    core.debug('Getting owner and repo from context');
    const currentOwner = github.context.repo.owner;
    const currentRepo = github.context.repo.repo;

    core.debug('Getting inputs from the user');
    const token = core.getInput('token', { required: true });
    const tag_name = core.getInput('tag_name', { required: true });
    const owner = core.getInput('owner') || currentOwner;
    const repo = core.getInput('repo') || currentRepo;
    const octokit = github.getOctokit(token);

    const release = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag: tag_name,
    });

    const response = await octokit.rest.repos.deleteRelease({
      owner,
      repo,
      release_id: release.data.id,
    });
    core.debug(`Release deleted: ${response}`);
  } catch (error) {
    core.debug(`Release not found.`);
  }
}

if (require.main === module) {
  run();
}
