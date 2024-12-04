async function fetchNodeData(node) {
    try {
        const response = await fetch(`/${node}`);
        const data = await response.json();
        document.getElementById('output').innerHTML = `
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch (error) {
        document.getElementById('output').innerHTML = `
            <p style="color: red;">Error fetching data: ${error.message}</p>
        `;
    }
}
