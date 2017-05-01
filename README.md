# a simple tool for catching open comments from files on google drive

## uses
- google client apis with browser side only oAuth2

*completely serverless*

## what problem does this solve?

Suppose you work with a team (or even just yourself) and you use google drive's rich commenting system
to not only comment on the work, but also assign action items.  As soon as you have a few of these, it's hard to keep track of!

`gcomments` is a simple, Angular, Javascript only tool that uses the google client authentication to get access to a user's google drive, can search for files by part of the file's name, and then pull comments for each file.

* try it [here](https://scottrfrancis.github.io/gcomments/)*

I've hard coded various things to accelerate the particular workflow for my group -- like seeding the phrase "Weekly Report" and limiting the results to 5.

There are many things that could be added, if you think of any, please add to the issues list.

## limitations
I can only work with the API google exports -- v3.  As of this writing, that version does not yet provide visibility into what comments have been _assigned_ nor to _whom_.  

Replies to the original are shown in a kind of threaded manner.  Note that I suppress deleted and 'empty' replies.  Empty replies are usually a mark as resolved/reopened.  Thinking I can use this long term to perhaps figure out the identity of the assigned party.

Note that gdoc has this cool 'assign to' feature, but I have not been able to figure out how to discover that detail.  

## conclusion
All in all a pretty fun, but challenging project to get the google api integrated in to angular and that pattern could be pretty handy for others. The global message passing is a bit ugly, but far from the worst possible solution.  Likewise installing the lib via a directive seems clunky.

The decomposition in to directive, service, and controller isn't bad, but was kinda slap-dash...  I'll probably go back and clean some of it up.
