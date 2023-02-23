//your code here
const loadNextBtn = document.getElementById("load_next");
const loadPrevBtn = document.getElementById("load_prev");
const issuesList = document.getElementById("issues");
let currentPage = 1;

loadNextBtn.addEventListener("click", loadNextPage);
loadPrevBtn.addEventListener("click", loadPrevPage);

function loadNextPage() {
  currentPage++;
  loadIssues(currentPage);
  loadPrevBtn.disabled = false;
}

function loadPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadIssues(currentPage);
  }
  if (currentPage === 1) {
    loadPrevBtn.disabled = true;
  }
}

function loadIssues(pageNumber) {
  fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`)
    .then(response => response.json())
    .then(data => {
      issuesList.innerHTML = "";
      data.forEach(issue => {
        const issueName = issue.title;
        const listItem = document.createElement("li");
        listItem.textContent = issueName;
        issuesList.appendChild(listItem);
      });
    })
    .catch(error => console.log(error));
}

loadIssues(currentPage);

