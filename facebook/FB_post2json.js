// ==UserScript==
// @name         Facebook Post Scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Scrapes Facebook posts, comments, and nested comments and saves them to JSON.
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to add a custom button to the page
    function addCustomBar() {
        const bar = document.createElement("div");
        bar.id="bar";
        bar.style.position="fixed";
        bar.style.bottom="0px";
        bar.style.left="0px";
        const targetNode = document.querySelector("body");
        if (targetNode) {
            targetNode.appendChild(bar);
        }
        const button = document.createElement("button");

        button.textContent = "Scrape and Save to JSON"; // Set the button text
        button.style.margin = "10px";
        button.addEventListener("click", scrapePostAndComments);
        bar.appendChild(button)

    }

    function scrapePostAndComments() {
        const post = document.querySelector(".xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs.x126k92a > div");
        if (!post) return; // Post not found, exit.

        const postData = {
            post: {
                content: post.textContent.trim(),
                comments: [],
            },
        };

        // Function to extract comments and nested comments
        function extractComments(commentContainer, commentsArray) {
            const comments = commentContainer.querySelectorAll(".xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs > div");

            comments.forEach(comment => {
                const commentData = {
                    text: comment.textContent.trim(),
                    author: "",
                    replies: [],
                };

                // Handle nested comments
                const nestedCommentsContainer = comment.nextElementSibling;
                if (nestedCommentsContainer) {
                    extractComments(nestedCommentsContainer, commentData.replies);
                }

                commentsArray.push(commentData);
            });
        }

        // Extract post comments
        const commentContainer = document.querySelector(".x1jx94hy.x12nagc");

        if (commentContainer) {
            extractComments(commentContainer, postData.post.comments);
        }

        // Convert to JSON and save (modify this part according to your needs)
        const jsonData = JSON.stringify(postData, null, 2);
        console.log(jsonData);
    }

    window.addEventListener('load', addCustomBar);

})();
