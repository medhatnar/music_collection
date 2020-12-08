# music_collection

`npm run test` to run all tests

## Solution 1: 

The first solution is a much cleaner approach for fellow team members to easily read. This is the solution I would choose if this feature had more priority in ensuring team members can parse through it quickly!

All commands sent to `music.js` dictate what method and parameters are passed to the `MusicCollection` class.

`MusicCollection` also takes care of the consoling to avoid repeating the loop in the `show` method and cluttering `music.js` with said loops.

Bonus:
* `show played` command.
* You can pass any filter as long you prepend it with `show all by`

Downside to this approach:
* In terms of scalability, any new commands added would have to be manually added one by one to the switch statement in `music.js` with their corresponding method/paramters. 
This can be nice though because adding new commands is very straight forward! :) 
