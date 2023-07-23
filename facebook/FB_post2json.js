// ==UserScript==
// @name         Gacebook post to json
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/groups/*/posts/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const post = doc.querySelector("div[role='article']");
    const comments = doc.querySelectorAll("div[role='article']");

    const postAuthor = post.querySelector("a[role='link']").textContent.trim();
    const postText = post.querySelector("div[dir='auto']").textContent.trim();

    const structuredData = {
        post: {
            author: postAuthor,
            text: postText
        },
        comments: []
    };

    comments.forEach(comment => {
        const author = comment.querySelector("a[role='link']").textContent.trim();
        const text = comment.querySelector("div[dir='auto']").textContent.trim();

        structuredData.comments.push({
            author,
            text
        });
    });

    console.log(JSON.stringify(structuredData, null, 2));
    // Your code here...
})();
