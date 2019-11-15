# `repobackup`

A docker container to mirror all owner/collaborator GitHub repositories locally, for backup purposes.

## Getting started

Create a [personal access token](https://github.com/settings/tokens), with `repo` permissions.

### Docker

Create the directory you want to store repos in, and put a `.env` file in it. In this example, that is `./mirror`.

In the directory you want to store repos in:

```shell
$ docker run \
-d \
-v $(pwd)/mirror:/mirror \
--restart always \
--name repobackup \
dan1elhughes/repobackup
```

## Environment variables

_Stored in the `.env` file_.

`USERNAME`: Your GitHub username.

`TOKEN`: Your GitHub [personal access token](https://github.com/settings/tokens), with `repo` permissions.

`DIRECTORY`: The directory to store repo mirrors in (within the Docker container). Defaults to `pwd`.

## Volumes

`DIRECTORY` should be mounted to view the repos from outside the container.

It should contain the `.env` file.

## Building
