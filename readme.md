# NoveLore

## Primary Purpose

NoveLore is a web-based project.  It requires node.js.  Its purpose is to take novel snippets written in Google Docs, downloaded as HTML files, and uploaded to this application.  And turn these snippets into an organizable stream of novel writing.

## Process

- Download files from Google Docs as HTML.
- Upload these files to the NoveLore.
- NoveLore parses the files into chunks of html and saves them to the database.
- NoveLore allows you to add labels to these chunks (scenes), group them together into chapters and group the chapters into books.  You can also break scenes at any point you like.
- NoveLore will save your deleted scenes, as well as match up groups of scenes that are repeats or replace each other.  By default, all replaced or deleted scenes are hidden, but you can look at previous versions to decide which one to use.
- .

## TODO

- Make Scene/Chapter/Book classes
- They each store their own ids/locations.
- I'm sleepy sleepy sleepy