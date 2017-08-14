// Generated by CoffeeScript 1.10.0
var list, randomised, randomiser, swapper;

randomiser = require("./listRandomiser");

swapper = require("./swapper");

swapper.getBranchList(function(branches) {
  var targetBranches;
  targetBranches = randomiser.randomise(branches);
  return swapper.swapBranches(branches, targetBranches, function() {
    return console.log("Done!");
  });
});
