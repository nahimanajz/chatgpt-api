This is an application for working with ChatGPT `openai` along with `davinci model`

Important features

Every endpoints depends on this route url: `localhost:3001`

| API | Description |
| ------ | ------ |
| GET /find-complexity | Measure written source code complexity Ex: O(1), 0(n), 0(nˆ2), n log n |
| GET /transcribe | Convert audio into readable text `English` |
| POST /summarize | Generate summary from a phrase |

# Testing guide 
## Rest apis
 - Clone [this](https://github.com/nahimanajz/chatgpt-api.git) repository 
 ```   
    cd RestAPIs
     npm install
     npm start 
 ```
- Finally open Postman and use `localhost:3001` along with endpoint mentioned above
## Mobile app
This application is for  testing weather from different location?
Are you just need to do is to type the place and
current temperature is shown up

 - Clone [this](https://github.com/nahimanajz/chatgpt-api.git) repository 
 ```   
    cd MobileApp
     npm install
     npm start 
     choose ios or android 
     then enjoy weather revealing
 ```
