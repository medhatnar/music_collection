# music_collection

`npm run test` to run all tests

## Solution 2: 

Unlike the first solution, there's a lot more heavy lifting done in `music.js`. The biggest difference being how `show ` commands are handled. Unlike **Solution 1**, where we need to have a command specific case, we instead take any command staring with `show ` and dynamically add filters based on anything following the word show.
I like this approach because we never have to keep adding more and more commands for show, we can just add more and more properties to our Album entries and all filters will be checked against them.

A command like `show unplayed 1999` could be possible if we added the year albums were made so only unplayed albums from 1999 would be displayed.

Additonally, the `MusicCollection` class instead returns what should be displayed in the console and `music.js` handles the consoling.
I like this approach more as well because it keeps the `MusicCollection` class nice and modular and you can decide what to do with the returned output when using it.


Bonus:
* You can pass any filter as long you prepend it with `show `

Downside to this approach:
* The code in `music.js` gets to be a bit clunkier in order to make it more dynamic. Nothing that isn't too huge to parse through but definitley not as straightforward to build up on without context, like Solution 1. 
Otherwise though, this solution is definitley more powerful!
