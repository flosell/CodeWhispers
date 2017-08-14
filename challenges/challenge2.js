// Generated by CoffeeScript 1.10.0
var challengeUtils;

challengeUtils = require('./challengeUtils');

exports.challenge = function() {
  var endPosition, instructions, startX, startY;
  startX = Math.floor(Math.random() * 20) + 10;
  startY = Math.floor(Math.random() * 20) + 10;
  instructions = challengeUtils.getInstructions(Math.floor(Math.random() * 10) + 10);
  endPosition = challengeUtils.calculateEndPosition(instructions, [startX, startY]);
  return {
    question: {
      startX: startX,
      startY: startY,
      instructions: instructions.join('')
    },
    answer: {
      endX: endPosition[0],
      endY: endPosition[1]
    }
  };
};
