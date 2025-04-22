const getWinsAndLosesPerStudentByLevel = (matchesPerStudent, level) => {
  const lvl_ms = matchesPerStudent.map(student => {
    const wins = student.matches.filter(match => (match.ownedByLevel.level === level) && (match.status == "Victoria")).length;
    const loses = student.matches.filter(match => (match.ownedByLevel.level === level) && (match.status == "Derrota")).length;
    return {wins, loses};
  });
  return lvl_ms;
}

const getStatusCount = (levelMatches, status) => {
  return levelMatches.reduce((acc, student) => acc + student[status], 0);
};

module.exports = {getWinsAndLosesPerStudentByLevel, getStatusCount};