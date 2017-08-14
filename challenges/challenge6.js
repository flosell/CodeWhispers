// Generated by CoffeeScript 1.10.0
var challengeUtils, getChallenge, treasureOwner;

challengeUtils = require('./challengeUtils');

exports.challenge = function() {
  var shouldFindTreasure, shouldMeetPirate, shouldMeetSpy;
  shouldFindTreasure = Math.floor(Math.random() * 2) === 1;
  shouldMeetPirate = Math.floor(Math.random() * 2) === 1;
  shouldMeetSpy = Math.floor(Math.random() * 2) === 1;
  return getChallenge(shouldFindTreasure, shouldMeetPirate, shouldMeetSpy);
};

getChallenge = function(shouldFindTreasure, shouldMeetPirate, shouldMeetSpy) {
  var endPosition, furtherInstructions, instructions, midPosition, pirateCoordinate, preTreasure, spyCoordinate, startX, startY, treasureCoordinate, treasureIndex;
  startX = Math.floor(Math.random() * 20) + 10;
  startY = Math.floor(Math.random() * 20) + 10;
  instructions = challengeUtils.getInstructions(Math.floor(Math.random() * 10) + 10);
  treasureCoordinate = challengeUtils.calculateItemCoordinate(instructions, shouldFindTreasure, [startX, startY]);
  midPosition = challengeUtils.calculateEndPosition(instructions, [startX, startY]);
  furtherInstructions = challengeUtils.getInstructions(Math.floor(Math.random() * 10) + 10);
  pirateCoordinate = challengeUtils.calculateItemCoordinate(furtherInstructions, shouldMeetPirate, midPosition);
  endPosition = challengeUtils.calculateEndPosition(furtherInstructions, midPosition);
  treasureIndex = challengeUtils.getFirstIndexOfCoordinate(treasureCoordinate, instructions, [startX, startY]);
  preTreasure = instructions.slice(0, treasureIndex);
  spyCoordinate = challengeUtils.calculateItemCoordinate(preTreasure, shouldMeetSpy, [startX, startY]);
  return {
    question: {
      startX: startX,
      startY: startY,
      treasureX: treasureCoordinate[0],
      treasureY: treasureCoordinate[1],
      pirateX: pirateCoordinate[0],
      pirateY: pirateCoordinate[1],
      spyX: spyCoordinate[0],
      spyY: spyCoordinate[1],
      instructions: instructions.concat(furtherInstructions).join('')
    },
    answer: {
      endX: endPosition[0],
      endY: endPosition[1],
      treasureOwner: treasureOwner(shouldFindTreasure, shouldMeetPirate, shouldMeetSpy)
    }
  };
};

treasureOwner = function(foundTreasure, metPirate, metSpy) {
  if (!foundTreasure) {
    return 'no-one';
  }
  if (!metPirate === !metSpy) {
    return 'me';
  }
  if (metPirate) {
    return 'pirate';
  }
  return 'spy';
};

exports.getChallenge = getChallenge;
