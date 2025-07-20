# WorkAdventure - Google Workspace Integration Fork

This is a fork of the original [WorkAdventure](https://github.com/thecodingmachine/workadventure) project. The purpose of this fork is to develop and implement integration with Google Workspace.

![WorkAdventure office image](README-MAP.png)



## Setting up a production environment

We support 2 ways to set up a production environment:

- using Docker Compose
- or using a Helm chart for Kubernetes

Please check the `docs/others/self-hosting/install.md` file for more information.

## Setting up a development environment

> [!NOTE]
> These installation instructions are for local development only. They will not work on
> remote servers as local environments do not have HTTPS certificates.

Install Docker and clone this repository.

Run:

```
cp .env.template .env
docker-compose up
```

The environment will start.

You should now be able to browse to http://play.workadventure.localhost/ and see the application.
You can view the Traefik dashboard at http://traefik.workadventure.localhost

Note: on some OSes, you will need to add this line to your `/etc/hosts` file:

**/etc/hosts**
```
127.0.0.1 oidc.workadventure.localhost redis.workadventure.localhost play.workadventure.localhost traefik.workadventure.localhost matrix.workadventure.localhost extra.workadventure.localhost icon.workadventure.localhost map-storage.workadventure.localhost uploader.workadventure.localhost maps.workadventure.localhost api.workadventure.localhost front.workadventure.localhost
```
