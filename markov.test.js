/** Markov Tests. */

const { MarkovMachine } = require("./markov");


describe('markov machine', function () {
     test('makes chains', function () {
          let mm = new MarkovMachine("the cat in the hat");

          expect(mm.chains).toEqual(new Map([
               ["the", ["cat", "hat"]],
               ["cat", ["in"]],
               ["in", ["the"]],
               ["hat", [null]]]));
     });
});