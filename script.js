function copyToClipboard() {
    const text = document.getElementById("output").innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy!");
    });
}
