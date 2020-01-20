const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const getHTML = require('./generateHTML');
const pdf = require('html-pdf');

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub Username?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ],
            name: "colors"
        },
    ])
    .then(function (userInfo) {

        const queryUrl = `https://api.github.com/users/${userInfo.username}`;
        const queryStarUrl = `https://api.github.com/users/${userInfo.username}/starred`;


        githubQuery(queryUrl).then(function (userInfo) {
            function generateHTML(userInfo) {
                return `<!DOCTYPE html>
              <html lang="en">
                 <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                    <title>Document</title>
                    <style>
                        @page {
                          margin: 0;
                        }
                       *,
                       *::after,
                       *::before {
                       box-sizing: border-box;
                       }
                       html, body {
                       padding: 0;
                       margin: 0;
                       }
                       html, body, .wrapper {
                       height: 100%;
                       }
                       .wrapper {
                       background-color: ${userInfo.colors.wrapperBackground};
                       padding-top: 100px;
                       }
                       body {
                       background-color: white;
                       -webkit-print-color-adjust: exact !important;
                       font-family: 'Cabin', sans-serif;
                       }
                       main {
                       background-color: #E9EDEE;
                       height: auto;
                       padding-top: 30px;
                       }
                       h1, h2, h3, h4, h5, h6 {
                       font-family: 'BioRhyme', serif;
                       margin: 0;
                       }
                       h1 {
                       font-size: 3em;
                       }
                       h2 {
                       font-size: 2.5em;
                       }
                       h3 {
                       font-size: 2em;
                       }
                       h4 {
                       font-size: 1.5em;
                       }
                       h5 {
                       font-size: 1.3em;
                       }
                       h6 {
                       font-size: 1.2em;
                       }
                       .photo-header {
                       position: relative;
                       margin: 0 auto;
                       margin-bottom: -50px;
                       display: flex;
                       justify-content: center;
                       flex-wrap: wrap;
                       background-color: ${userInfo.colors.headerBackground};
                       color: ${userInfo.colors.headerColor};
                       padding: 10px;
                       width: 95%;
                       border-radius: 6px;
                       }
                       .photo-header img {
                       width: 250px;
                       height: 250px;
                       border-radius: 50%;
                       object-fit: cover;
                       margin-top: -75px;
                       border: 6px solid ${userInfo.colors.photoBorderColor};
                       box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                       }
                       .photo-header h1, .photo-header h2 {
                       width: 100%;
                       text-align: center;
                       }
                       .photo-header h1 {
                       margin-top: 10px;
                       }
                       .links-nav {
                       width: 100%;
                       text-align: center;
                       padding: 20px 0;
                       font-size: 1.1em;
                       }
                       .nav-link {
                       display: inline-block;
                       margin: 5px 10px;
                       }
                       .workExp-date {
                       font-style: italic;
                       font-size: .7em;
                       text-align: right;
                       margin-top: 10px;
                       }
                       .container {
                       padding: 50px;
                       padding-left: 100px;
                       padding-right: 100px;
                       }
              
                       .row {
                         display: flex;
                         flex-wrap: wrap;
                         justify-content: space-between;
                         margin-top: 20px;
                         margin-bottom: 20px;
                       }
              
                       .card {
                         padding: 20px;
                         border-radius: 6px;
                         background-color: ${userInfo.colors.headerBackground};
                         color: ${userInfo.colors.headerColor};
                         margin: 20px;
                       }
                       
                       .col {
                       flex: 1;
                       text-align: center;
                       }
              
                       a, a:hover {
                       text-decoration: none;
                       color: inherit;
                       font-weight: bold;
                       }
              
                       @media print { 
                        body { 
                          zoom: .75; 
                        } 
                       }
                    </style>
                    </head>
                    </html>`
            }
            console.log(userInfo)
        })


    });


// function githubQuery(queryUrl) {
//     return axios.get(queryUrl)
//         .then(function (response) {

//             let data = {
//                 fullName: (response.data.name),
//                 profileImg: (response.data.avatar_url + ".png"),
//                 gitHubUsername: (response.data.login),
//                 userCity: (response.data.location),
//                 userGitHubProfile: (response.data.html_url),
//                 userBlog: (response.data.blog),
//                 userBio: (response.data.bio),
//                 userRepos: (response.data.public_repos),
//                 userFollowers: (response.data.followers),
//                 userFollowing: (response.data.following)
//             };




//             return data;
//         });
// };

// function githubStarsQuery(queryStarUrl) {

//     return axios.get(queryStarUrl)
//         .then(function (responseStars) {

//             return responseStars.data.length;
//         });
// };