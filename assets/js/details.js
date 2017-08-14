// Generated by CoffeeScript 1.10.0
$(function() {
  var addTeam, challengeSocket, currentRound, getDetails, rebuildTable, roundSocket, table, teamSocket, teams, updateInstructions;
  table = $('.branches');
  currentRound = null;
  teams = [];
  getDetails = function() {
    return $.getJSON('/details', function(data) {
      teams = data.branches;
      updateInstructions(data.round);
      return rebuildTable();
    });
  };
  rebuildTable = function() {
    var header, i, j, k, len, ref, results, team;
    table.children().remove();
    header = $("<tr>");
    header.append("<th>Teams</th>");
    for (i = j = 0, ref = currentRound; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      header.append("<th id='header-" + i + "'>" + i + "</th>");
    }
    table.append(header);
    results = [];
    for (k = 0, len = teams.length; k < len; k++) {
      team = teams[k];
      results.push(addTeam(team));
    }
    return results;
  };
  addTeam = function(item) {
    var i, j, ref, row;
    row = $("<tr id='team-" + item.name + "'>");
    row.append("<td>" + item.name + "</td>");
    for (i = j = 0, ref = currentRound; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (!item[i]) {
        item[i] = 'failure';
      }
      row.append("<td id='info-" + item.name + "-" + i + "'><img id='status-" + item.name + "-" + i + "' src='/assets/" + item[i] + ".png' height='25' width='25' /></td>");
    }
    return table.append(row);
  };
  updateInstructions = function(roundNumber) {
    if (currentRound !== roundNumber) {
      currentRound = roundNumber;
      $('.roundNumber').text(currentRound);
      return $.get("/question/" + currentRound, function(data) {
        var instructions;
        instructions = $('.instructions');
        instructions.children().remove();
        return instructions.append(data);
      });
    }
  };
  roundSocket = io.connect('/round');
  roundSocket.on('new round', function(roundNumber) {
    updateInstructions(roundNumber);
    return rebuildTable();
  });
  teamSocket = io.connect('/teams');
  teamSocket.on('new team', function(teamName) {
    var j, len, newTeam, stop, team;
    stop = false;
    for (j = 0, len = teams.length; j < len; j++) {
      team = teams[j];
      if (team.name === teamName) {
        stop = true;
      }
    }
    if (!stop) {
      newTeam = {
        name: teamName
      };
      teams.push(newTeam);
      return addTeam(newTeam);
    }
  });
  teamSocket.on('remove team', function(teamName) {
    var i, index, j, ref;
    index = null;
    for (i = j = 0, ref = teams.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (teams[i].name === teamName) {
        index = i;
      }
    }
    if (index) {
      teams.splice(index, 1);
    }
    return $("#team-" + teamName).remove();
  });
  challengeSocket = io.connect('/challenge');
  challengeSocket.on('result', function(data) {
    var j, len, results, team;
    $("#status-" + data.team + "-" + data.round).attr("src", "/assets/" + data.status + ".png");
    results = [];
    for (j = 0, len = teams.length; j < len; j++) {
      team = teams[j];
      if (team.name === data.team) {
        results.push(team[data.round] = data.status);
      } else {
        results.push(void 0);
      }
    }
    return results;
  });
  return getDetails();
});
