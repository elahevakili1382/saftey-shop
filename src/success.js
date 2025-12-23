document.addEventListener('DOMContentLoaded', () =>{
    const paymentData = JSON.parse(localStorage.getItem('lastPayment'));

    if(!paymentData) {
        console.warn('No payment data found');
    return;
    }

    setText('paymentDate', paymentData.date);
    setText('paymentAmount',formatPrice(paymentData.amount));
    setText('paymentBank', paymentData.bank);
    setText('trackingNumber', paymentData.trackingCode);
    setText('paymentDate', paymentData.date);
    setText('referenceNumber', paymentData.refrenceCode);

    localStorage.removeItem('cart');

    localStorage.removeItem('lastPayment');
});

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;

}

function formatPrice(price) {
    return `${(+price).toLocaleString()}تومان `
}