const dataEl = document.getElementById("data");

fetch("quotes.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => showData(data))
  .catch((error) => console.error("Failed to fetch data:", error));

function showData(data) {
  dataEl.innerHTML = JSON.stringify(data); // or any other meaningful representation
}
