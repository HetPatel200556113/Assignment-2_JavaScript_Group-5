class OrderSmoothie {
    constructor(SmoothieFlavor, SmoothieSize, SmoothieExtras) {
        this.SmoothieFlavor = SmoothieFlavor;
        this.SmoothieSize = SmoothieSize;
        this.SmoothieExtras = SmoothieExtras || [];
    }
// get the cost of a smoothie based on its flavor and size
    getPrice() {
        let basePrice = parseFloat(document.getElementById('SmoothieFlavor').selectedOptions[0].getAttribute('data-price'));
        let priceMultiplier = parseFloat(document.querySelector('input[name="size"]:checked').getAttribute('data-price-multiplier'));
        let ExtrasPrice = 0;
        document.querySelectorAll('input[name="extras"]:checked').forEach(extra => {
            ExtrasPrice += parseFloat(extra.getAttribute('data-price'));
        });

        return (basePrice * priceMultiplier) + ExtrasPrice;
    }
// price  for base ingredients 
    getDescription() {
        let description = `You ordered a ${this.SmoothieSize} ${this.SmoothieFlavor} smoothie`;
        if (this.SmoothieExtras.length > 0) {
            description += " with ";
            description += this.SmoothieExtras.join(", ");
        }
        description += `. \nTotal price: $${this.getPrice().toFixed(2)}.`;
        return description;
    }
}
//  create new order object using user input from form 
function placeOrder() {
    const SmoothieFlavor = document.getElementById('SmoothieFlavor').value;
    const SmoothieSize = document.querySelector('input[name="size"]:checked').value;
    const SmoothieExtras = [];
    document.querySelectorAll('input[name="extras"]:checked').forEach(extra => {
        SmoothieExtras.push(extra.value);
    });

    const smoothie = new OrderSmoothie(SmoothieFlavor, SmoothieSize, SmoothieExtras);
    document.getElementById('orderSummary').textContent = smoothie.getDescription();
}
