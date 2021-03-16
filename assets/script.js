var searchFormEl = document.querySelector('#search-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var searchInput = document.querySelector('#searchCongress');
var searchContainer = document.querySelector('#search-container');
var congressSearchTerm = document.querySelector('congress-search-term');

var formSubmitHandler = function(event) {
    event.preventDefault();;
    if (searchInput) {
        getSearch(searchInput);

        searchContainer.textContent = '';
        searchInput.value = '';
    } else {
        alert('Please enter a search topic..');
    }
};


var getSearch = function(searchInput) {
    var apiUrl = 'https://www.loc.gov/search/?q=' + searchInput + '&fo=json';

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displaySearch(data, searchInput);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Library of Congress');
        });
};

/*getfeaturedrepos needs changing*/
var getFeaturedRepos = function(language) {
    var apiUrl = 'https://www.loc.gov/search/?q=' + searchInput + '&fo=json';

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displaySearch(data.items, language);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

var displaySearch = function(search, searchTerm) {
    if (search.length === 0) {
        searchContainer.textContent = 'No results found.';
        return;
    }

    congressSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        var repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
};

searchFormEl.addEventListener('submit', formSubmitHandler);