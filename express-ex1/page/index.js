let id;
//GET
window.onload = get();

function get() {
    // console.log("GET TUTORIALS")
    fetch("http://127.0.0.1:3000/tutorials")
        .then(response => {
            if (!response.ok) { //TRUE if status in the range 200-299 
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                document.querySelector("#table").innerText = `ERROR: ${response.statusText}`;
                return;
            }
            // Examine the text in the response
            return response.json();
        })
        .then(data => {
            console.log(data)
            txt = "<table id='tutorials'><tr><th>id</th><th>title</th><th>description</th><th>published</th></tr>"
            data.forEach(x => {
                txt += `<tr onclick="rowHover(this)"><td>${x.id}</td><td>${x.title}</td><td>${x.description}</td><td>${x.published}</td></tr>`;
            });
            txt += "</table>"
            document.getElementById("table").innerHTML = txt;
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
            document.querySelector("#table").innerText = `ERROR: ${err}`;
        });
}

//DELETE
function remove() {
    fetch("http://127.0.0.1:3000/tutorials/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(
            function (response) {
                console.log(response.status)
                console.log(response.statusText)
                console.log(response.ok)
                // if (response.status !== 200) {
                if (!response.ok) { //TRUE if status in the range 200-299 
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    document.querySelector("#table").innerText = `ERROR: ${response.statusText}`;
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    // console.log(data);
                    get()
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

//PUT ROW DATA IN FORM
function rowHover(x) {
    id = x.getElementsByTagName("td")[0].innerHTML;
    // console.log(id)
    document.getElementById("title").value = x.getElementsByTagName("td")[1].innerHTML
    document.getElementById("description").value = x.getElementsByTagName("td")[2].innerHTML
    document.getElementById("published").value = x.getElementsByTagName("td")[3].innerHTML
}

//POST
function add() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const published = document.querySelector("#published").value;

    fetch("http://127.0.0.1:3000/tutorials", {
        method: "POST",
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            published: published
        })

    })
        .then(
            function (response) {
                if (!response.ok) { //TRUE if status in the range 200-299 
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    document.querySelector("#result").innerText = `ERROR: ${response.statusText}`;
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    document.querySelector("#result").innerText = `${data.message} Location: ${data.location}`;
                    get()
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

//PUT 
function alter() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const published = document.querySelector("#published").value;

    fetch("http://127.0.0.1:3000/tutorials/"  + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            published: published
        })

    })
        .then(
            function (response) {
                if (!response.ok) { //TRUE if status in the range 200-299 
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    document.querySelector("#result").innerText = `ERROR: ${response.statusText}`;
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    document.querySelector("#result").innerText = `${data.message} Location: ${data.location}`;
                    get()
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}