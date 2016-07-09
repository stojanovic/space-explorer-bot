# Space Explorer Bot
Space Explorer is simple Messenger chat bot that uses NASA's API to get the data and images about the space.  

It's created for fun and also as a showcase for [Claudia Bot Builder](https://github.com/claudiajs/claudia-bot-builder), node.js library for creating chat bots for various platform and deploying them on AWS Lambda.

## Watch the video

Short video is available on [Vimeo](https://vimeo.com/172001135).

## Try it live

Scan the code:

[![Messenger code](assets/images/messenger_code.png)](https://m.me/space-explorer-bot)

Or go to [m.me/space-explorer-bot](https://m.me/space-explorer-bot).

## How to run and deploy it

### Prerequests:

- Create a new bot page in Facebook and a messenger app, as explained in the Facebook Messenger Getting Started Guide.

### Steps:

1. Clone the repository and run:

   ```
   npm init
   ```

2. Install `claudia` as a global utility, if you do not have it already:

   ```
   npm install claudia -g
   ```
   
3. Create a new bot in AWS. If you changed the name of bot.js file, change the `--api-module` argument below accordingly.

   ```
   claudia create --region us-east-1 --api-module bot
   ```
   
4. Configure Facebook Bot with a following command and follow the instructions:

   ```
   claudia update --configure-fb-bot
   ```
   
And that's it :)

Full instructions for Claudia Bot Builder are available in [Getting started with Claudia Bot Builder](https://github.com/claudiajs/claudia-bot-builder/blob/master/docs/GETTING_STARTED.md) guide.
