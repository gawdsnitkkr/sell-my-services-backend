## sell-my-services

An open source local services search tool. This is the backend repository of https://sellmyservices.in.
To know more about product please check android repository https://github.com/gawdsnitkkr/sell-my-services-android

### Android app link
[![Android App](./screenshots/google-play.png)](https://play.google.com/store/apps/details?id=me.varunon9.sellmyservices)

#### The core idea

SellMyServices is a platform to match `service seekers` to `service sellers`. A normal flow is-

1. User installs our [Android app](https://play.google.com/store/apps/details?id=me.varunon9.sellmyservices)
2. In the App he searches for some services. Let's say he is looking for a `freelancer`.
3. All the `freelancers` active in his nearby area (range 50 KM) would be populated on google map.
4. He can browse individual search results and check their description, ratings, location etc.
5. He can contact them if interested via email/mobile/chat for a deal.
6. A few days later - after having freelancing service, he can submit feedback or rate that service on our platform.

#### Demo video-
https://youtu.be/cio7xAiRjGE

#### How to setup project

1. Clone the repo `https://github.com/gawdsnitkkr/sell-my-services-backend.git`
2. Move to project folder `cd sell-my-services-backend`
3. Install dependencies `npm install`
4. Create config.js file from config-sample.js `cd config && cp config-sample.js config.js`
5. In MySql create a database "sellMyServices" (or with any other name but must be mentioned in config.js)
6. Update `username` with your MySql username and `password` with your MySql password in config.js 
7. start the project from project root directory `node bin/www` or `nodemon`
8. To setup android part visit https://github.com/gawdsnitkkr/sell-my-services-android

### Wiki page
https://github.com/gawdsnitkkr/sell-my-services-backend/wiki/

### Releases
https://github.com/gawdsnitkkr/sell-my-services-backend/releases

### [Contributing Guidelines](CONTRIBUTING.md)

### Online Discussion Forum  
Enter the [Slack Group](https://join.slack.com/t/gawdsnitkkr/shared_invite/enQtNDExNjU0OTQwNTk4LWNhOWY0ZTkyYTU2NzdiNjAxNWUzMGY0ZTNmNDkzYjIyNjI3ODVhYzFhYmVkYTkwYjRhYjg4ODc2NDU0YmJlOTQ) and join #SellMyServices slack channel. :smile:
