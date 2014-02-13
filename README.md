SuperMinesweeper
================

This is not your grandfather's minesweeper.  Classic Minesweeper with extra tweaks and tools to make the experience more fun.

Completely built in html5 and designed to work in a browser or as part of a phonegap application.

It is also meant to be easily extendable.

Goals:
======
1. Finish basic(classic) minesweeper functionality.
2. Add Basic Features.
    1. Clicking on a revealed cell with number x that is touching x flags will reveal all unflagged squares.
3. Add Super Features.
    1. Information Circuit Linking(See description below).
    2. Special Case Training Mode.
4. Profit(for your mind).

Hopes, Dreams, and Ideas:
=========================
Allow Partial Solutions for impossible to logically solve minefields.
ie:
```
[2][3][*]
[ ][ ][*]
[2][3][*]
```
Or maybe give x number of expendable robots to be used in these case.  Could also be useful for solving long information circuits too.

Information Circuit Linking:
============================
Information circuit linking is that process of linking cells together based on there possibility of having a bomb in or to map all possibilities until it can be shown that only one possible path of information is possible.

The simplest example is, you have two hidden cells and you know that one is a bomb and the other is not.
Then, multiple of these can be strung together to create a path, or circuit.  Following the path may lead to finding a solution, at which point, the information can be propagated all the way to the beginning of the path.

Say you have this:
```
[1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[ ][ ][1][ ][ ][1][ ][ ][1][ ][ ][1][ ][ ]
```

There are two possible solutions:
```
[1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[*][1][1][*][1][1][*][1][1][*][1][1][*][1]

[1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[1][*][1][1][*][1][1][*][1][1][*][1][1][*]
```
You have absolutely no way of knowing which is the correct solution. But, if you have this instead:
```
[1][1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[ ][ ][1][ ][ ][1][ ][ ][1][ ][ ][1][ ][ ][1]
```
Then you know this:
```
[1][1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[ ][ ][1][ ][ ][1][ ][ ][1][ ][ ][1][ ][*][1]
```
and you can propagate the information:
```
[1][1][1][1][1][1][1][1][1][1][1][1][1][1][1]
[1][*][1][1][*][1][1][*][1][1][*][1][1][*][1]
```

Information circuit linking hopes to help players in these cases by providing markup extensions to the classic "flag" markup.
