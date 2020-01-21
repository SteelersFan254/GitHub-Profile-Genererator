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
            name: "color"
        },
    ])
    .then(function (userInfo) {

        const queryUrl = `https://api.github.com/users/${userInfo.username}`;
        const queryStarUrl = `https://api.github.com/users/${userInfo.username}/starred`;

        githubQuery(queryUrl).then(function (data) {
            githubQueryStars(queryStarUrl).then(function (responseStars) {

                var options = { format: 'Letter' };
                pdf.create(getHTML(userInfo, responseStars, data), options).toFile(`./${userInfo.username}.pdf`, function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });
            })
        })


    });


function githubQuery(queryUrl) {
    return axios.get(queryUrl)
        .then(function (response) {

            let data = {
                fullName: (response.data.name),
                profileImg: (response.data.avatar_url + ".png"),
                gitHubUsername: (response.data.login),
                userCity: (response.data.location),
                userGitHubProfile: (response.data.html_url),
                userBlog: (response.data.blog),
                userBio: (response.data.bio),
                userRepos: (response.data.public_repos),
                userFollowers: (response.data.followers),
                userFollowing: (response.data.following)
            };




            return data;
        });
};

function githubQueryStars(queryStarUrl) {

    return axios.get(queryStarUrl)
        .then(function (responseStars) {

            return responseStars.data.length;
        });
};