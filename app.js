function processData() {
    const rawData = document.getElementById('rawData').value.trim();
    const lines = rawData.split('\n');

    const productTotals = {};
    const productCouriers = {};

    let currentProduct = null;

    lines.forEach(line => {
        line = line.trim();
        if (!line || line.includes('----')) {
            return; // Skip empty lines or lines with ----
        }

        if (line.includes('Total:')) {
            const match = line.match(/^(.*?)\s*-\s*Total:\s*(\d+)/);
            if (match) {
                currentProduct = match[1].trim();
                const total = parseInt(match[2]);
                if (!productTotals[currentProduct]) {
                    productTotals[currentProduct] = [];
                }
                productTotals[currentProduct].push(total);
            }
        } else {
            const match = line.match(/^(.*?)\s*-\s*(\d+)$/);
            if (match && currentProduct) {
                const courier = match[1].trim();
                const qty = parseInt(match[2]);
                if (!productCouriers[currentProduct]) {
                    productCouriers[currentProduct] = {};
                }
                if (!productCouriers[currentProduct][courier]) {
                    productCouriers[currentProduct][courier] = [];
                }
                productCouriers[currentProduct][courier].push(qty);
            }
        }
    });

    let outputLines = [];

    const sortedProducts = Object.keys(productTotals).sort();

    sortedProducts.forEach(product => {
        const totals = productTotals[product];
        const totalStr = totals.join("+");
        const totalSum = totals.reduce((a, b) => a + b, 0);

        outputLines.push(`Product: ${product}`);
        outputLines.push(`Total Quantity: ${totalStr} = ${totalSum}`);
        outputLines.push("🚚Couriers:");

        const couriers = productCouriers[product] || {};
        for (const courier in couriers) {
            const qtyList = couriers[courier];
            const qtyStr = qtyList.join("+");
            const qtySum = qtyList.reduce((a, b) => a + b, 0);
            outputLines.push(` . ${courier}: ${qtyStr} = ${qtySum}`);
        }

        outputLines.push("-".repeat(30));
    });

    document.getElementById('output').innerText = outputLines.join('\n');
}
