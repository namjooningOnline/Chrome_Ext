let myLeads = [];
// JSON.parse() turns myLeads into an array
// JSON.stringify() turns myLeads back into a string
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");

localStorage.clear();
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // string to array

// falsey values: false | 0 | "" | null | undefined | NaN

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads); // saves leads even when refreshed
}

tabBtn.addEventListener("click", function () {
  // Grab the URL of the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let activeTabId = activeTab.id;
  });
  myLeads.push(tabs[0].url);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
          <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
          </a>
        </li>
      `;
    // create element: const li = document.createElement("li")
    // set text content: li.textContent = myLeads[i]
    // append to ul: ulEl.appent(li)
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// listening for a double click
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
