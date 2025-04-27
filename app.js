function copyOutput() {
    const outputText = document.getElementById('output').innerText;
    const copyButton = document.querySelector('.copy-btn');
    const copyStatus = document.getElementById('copyStatus');

    if (!outputText) {
        alert("No output to copy!");
        return;
    }

    navigator.clipboard.writeText(outputText)
        .then(() => {
            // Show success message
            copyStatus.style.display = 'block';

            // Change button to copied ✔️
            copyButton.innerText = "✔️ Copied!";
            copyButton.style.backgroundColor = "#218838";

            // After 2 seconds, reset everything
            setTimeout(() => {
                copyButton.innerText = "Copy Output";
                copyButton.style.backgroundColor = "#28a745";
                copyStatus.style.display = 'none';
            }, 2000);
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}
