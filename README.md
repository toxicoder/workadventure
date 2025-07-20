# WorkAdventure - Google Workspace Integration Fork

This is a fork of the original [WorkAdventure](https://github.com/thecodingmachine/workadventure) project. The purpose of this fork is to develop and implement integration with Google Workspace.

![WorkAdventure office image](README-MAP.png)



## Quick Demo

These instructions will get you a demo of the application up and running in minutes. This is great for a quick look at what the app can do, but it is not a stable or long-term solution.

1. Clone this repository
2. Run `cp .env.template .env`
3. Set `DEMO_MODE=true` in the `.env` file
4. Run `docker-compose up`
5. Add the following to your `/etc/hosts` file:
```
127.0.0.1 oidc.workadventure.localhost redis.workadventure.localhost play.workadventure.localhost traefik.workadventure.localhost matrix.workadventure.localhost extra.workadventure.localhost icon.workadventure.localhost map-storage.workadventure.localhost uploader.workadventure.localhost maps.workadventure.localhost api.workadventure.localhost front.workadventure.localhost
```
6. Browse to http://play.workadventure.localhost/

## Homelab / Self-hosting

If you want a more stable deployment, for example in a homelab setting, check out the [Docker Compose install guide](contrib/docker/README.md).

For more advanced setups, including Kubernetes, please refer to the [self-hosting installation guide](docs/others/self-hosting/install.md).
