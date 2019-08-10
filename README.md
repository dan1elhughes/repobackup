# `repobackup`

A docker container to mirror all owner/collaborator GitHub repositories locally, for backup purposes.

## Getting started

Create a file `.env` with the variables listed below. Alternatively, pass the required variables in manually.

### Docker

```shell
docker run --env DIRECTORY=/mirror -v $(pwd)/mirror:/mirror --env-file ./.env dan1elhughes/repobackup
```

### Local (for debugging/testing)

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
