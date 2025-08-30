const url = "https://alfa-leetcode-api.onrender.com/dailyQuestion";

class Info {
  constructor(name, difficulty, acRate, urlProblem) {
    this.name = name;
    this.difficulty = difficulty;
    this.acRate = acRate;
    this.urlProblem = urlProblem;
  }
  async getDaily() {
    const response = await fetch(url);
    const data = await response.json();

    const question = data.data.activeDailyCodingChallengeQuestion.question;
    const link = data.data.activeDailyCodingChallengeQuestion.link;

    this.name = question.questionFrontendId + ". " + question.title;
    this.difficulty = question.difficulty;

    const stats = JSON.parse(question.stats);
    this.acRate = stats.acRate;

    this.urlProblem = `https://leetcode.com${link}`;
  }
}

const info = new Info();

function actInfo() {
  let colorsBg = { Easy: "#2CBB5D", Medium: "#FFC01E", Hard: "#EF4743" };
  document.querySelector("#name").innerHTML = info.name;
  document.querySelector("#info").style.backgroundColor = colorsBg[info.difficulty];
  document.querySelector("#acRate").innerHTML = info.acRate;
}

document.addEventListener("DOMContentLoaded", async () => {
  info.getDaily().then(() => {
    actInfo();
  });
});

document.querySelector("body").addEventListener("click", function () {
  console.log("working");
  window.open(info.urlProblem, "_blank");
});
