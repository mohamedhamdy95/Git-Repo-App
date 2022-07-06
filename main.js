// ******************* Main Variabls   ************************

let inPut = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  showData = document.querySelector(".show-data ");

getButton.onclick = function () {
  getRepo();
};

//   **************   Get Repos Fun  ***********************

function getRepo() {
  // ******* Cheeck If Input Is Empty
  if (inPut.value == "") {
    console.log("Empty");
    showData.innerHTML = "<span> Pleasa Enter Github Username </span>";
  } else {
    // console.log(inPut.value);
    fetch(`https://api.github.com/users/${inPut.value}/repos`)
      .then((res) => res.json())
      .then((repo) => {
        // ****** Empty The Container *************
        showData.innerHTML = " ";
        // ****** Loop On Repose *************
        repo.forEach((rep) => {
          // ***** Create Main Div ********
          let mainDiv = document.createElement("div");
          //   ********** Create Repo Name text  ********
          let repoName = document.createTextNode(rep.name);
          //   ******* Append Repo Name to Main Div **********
          mainDiv.appendChild(repoName);

          //   ******* Repo Url ******
          let repoUrl = document.createElement("a");
          //   ******* Repo Url Text ******
          let repoUrlText = document.createTextNode("Visit");
          repoUrl.appendChild(repoUrlText);
          //   ******* Add href To repoUrl ******
          repoUrl.href = `https://github.com/${inPut.value}/${rep.name}`;
          //   ***** Set Attribute Blanck ****
          repoUrl.setAttribute("target", "_blank");
          //   ******* Append Repo URL to Main Div **********
          mainDiv.appendChild(repoUrl);

          //   ********** Create Stars Count Span  ********
          let stars = document.createElement("span");
          //   ********** Create Stars Count Span text  ********
          let starText = document.createTextNode(
            ` Stars ${rep.stargazers_count} `
          );
          //    ******** Add Star Text To Star Span ********
          stars.appendChild(starText);
          //   ******* Append Stars Count to Main Div **********
          mainDiv.appendChild(stars);

          //   ******** Add Class To Main Div ******
          mainDiv.classList.add("repo-box");
          //   ******* Append Main Div to Main Container **********
          showData.appendChild(mainDiv);
        });
      });
  }
}
