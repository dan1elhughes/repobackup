# `repobackup`

A docker container to mirror all owner/collaborator GitHub repositories locally, for backup purposes.

## Getting started

Create a [personal access token](https://github.com/settings/tokens), with `repo` permissions.

### Docker

In the directory you want to store repos in:

```shell
$ USERNAME="username"
$ TOKEN="token"

$ docker run \
-d \
-e DIRECTORY=/mirror \
-e USERNAME=$USERNAME \
-e TOKEN=$TOKEN \
-v $(pwd):/mirror \
--restart always \
--name repobackup \
dan1elhughes/repobackup
```

### Local (for debugging/testing)

Put the variables in a `.env` file for easier management.

```shell
$ source .env
$ USERNAME=$USERNAME TOKEN=$TOKEN node script.js
```

## Environment variables

`USERNAME`: Your GitHub username.

`TOKEN`: Your GitHub [personal access token](https://github.com/settings/tokens), with `repo` permissions.

`DIRECTORY`: The directory to store repo mirrors in (within the Docker container). Defaults to `pwd`.

## Volumes

`DIRECTORY` should be mounted to view the repos from outside the container.

## Building
