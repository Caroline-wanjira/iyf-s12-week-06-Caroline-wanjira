# Week 6: OpenWeather App

## Author
- **Name:** Caroline Wanjra Wanjiru
- **GitHub:** [@Caroline-wanjira](https://github.com/Caroline-wanjira)
- **Date:** 10 November, 2026

## Project Description
I created a rensponsive Weather Application built to demonstrate asynchronus javascript and API . This app features real-time weather data whike handling API  key security by pushing secrets vi\a github action flows while deploying.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Git and Github
- Visual Studio Code

## Features
- **Real-Time Weather Search:** Fetches and displays live weather data for user-queried locations using the OpenWeather API.
- **Secure Secret Management:** Uses `.gitignore` to keep API keys private in local development and GitHub Repository Secrets during automated deployment.


## How to Run
1. Clone this repository
``` bash 
git clone iyf-s12-week-06-Caroline-wanjira
2. Open `index.html` in your browser and run it with vs code live server
   

## Lessons Learned
Learned how to manage environment secrets securely using GitHub Repository Secrets and GitHub Actions workflows without leaking API keys into public code repositories.
​Mastered asynchronous JavaScript patterns using async/await and standard fetch() syntax for network API requests.
​
## ​Challenges Faced
​API Key Security on GitHub Pages: Prevented exposing the secret API key in public commits by ignoring config.js locally and configuring GitHub Actions to dynamically write config.js from secrets during the automated build pipeline.
​API Error Handling: Handled potential 404 responses (invalid city names) and network errors gracefully to keep the UI stable without breakin

## Screenshots 
![OpenWeather App Screenshot](screenshot.png)

## Live Demo 
[OpenWeather App](https://caroline-wanjira.github.io/iyf-s12-week-06-Caroline-wanjira/)