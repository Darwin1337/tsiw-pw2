const TABLE_CONTENT = document.querySelector("table tbody");
let hasContentLoaded = false;

window.addEventListener("load", () => loadTutorials("http://127.0.0.1:3000/tutorials"));

document.querySelector("#reload-table").addEventListener("click", () => loadTutorials("http://127.0.0.1:3000/tutorials"));

document.querySelector("#search-btn").addEventListener("click", () => {
    if (hasContentLoaded && document.querySelector("#search-input").value != "" && document.querySelector("#search-input").value) {
        loadTutorials("http://127.0.0.1:3000/tutorials?title=" + document.querySelector("#search-input").value);
    } else {
        loadTutorials("http://127.0.0.1:3000/tutorials");
    }
});

function loadTutorials(qry) {
    fetch(qry)
    .then(response => {
        if (!response.ok) {
            hasContentLoaded = false;
            TABLE_CONTENT.innerHTML = `<td colspan="5"><p class="m-0 text-danger"><strong>An error occurred</strong><br>${ err }</p></td>`;
            return;
        }
        return response.json();
    })
    .then(data => {
        TABLE_CONTENT.innerHTML = "";
        if (data.length > 0) {
            data.forEach(tutorial => {
                TABLE_CONTENT.innerHTML += `<tr>
                    <td>${ tutorial.id }</th>
                    <td>${ tutorial.title }</td>
                    <td>${ tutorial.description }</td>
                    <td>${ tutorial.published == 0 ? 'No' : 'Yes' }</td>
                    <td>
                        <button type="button" class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-danger">Remove</button>
                    </td>
                </tr>`;
            });
            hasContentLoaded = true;
        } else {
            hasContentLoaded = false;
            TABLE_CONTENT.innerHTML = `<td colspan="5"><p class="m-0"><strong>No results were found</strong></p></td>`;
        }
    })
    .catch(function (err) {
        hasContentLoaded = false;
        TABLE_CONTENT.innerHTML = `<td colspan="5"><p class="m-0 text-danger"><strong>An error occurred</strong><br>${ err }</p></td>`;
    });
}