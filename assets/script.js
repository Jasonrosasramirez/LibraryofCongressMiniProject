fetch('https://www.loc.gov/?fo=json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });