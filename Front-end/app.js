document.getElementById("loadNode1").addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/node1/games");
    const data = await response.json();
    const container = document.getElementById("node1Data");

    container.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
});
