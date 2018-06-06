![Actively Coding Test](https://d1qb2nb5cznatu.cloudfront.net/startups/i/4167157-14c67fcf812c9c85896724d0a8fe85a2-medium_jpg.jpg?buster=1512360378)

## To get started

```sh
npm i
# or yarn
npm start
# or yarn start
```

`http://localhost:9100/` will open automatically on the blockchain app, live-reloading as you develop.

`yarn test` & `yarn test:watch` to run the unit tests on the terminal.

## Task

Implement `blockClicked` to remove (or hide) all blocks of the same colour that are connected to the target element (block chain), then allow the blocks above the removed to "fall down" (similar to Tetris but you should click a block to have connected blocks removed, and the price of bitcoin).

E.g.,

Given:

![Initial state](https://trottski.s3.amazonaws.com/snaps/initial.jpg)

After clicking one of the bottom right blue boxes it should then look
like this:

![state 2](https://trottski.s3.amazonaws.com/snaps/stage2.jpg)

