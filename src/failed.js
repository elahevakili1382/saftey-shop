document.addEventListener('DOMContentLoaded', () =>{
    const paymentError = JSON.parse(localStorage.getItem('paymentError'));

      if (paymentError) {
    console.warn('Payment failed:', paymentError);
  }

  localStorage.removeItem('lastPayment');

  if(!paymentError){
    console.warn('Direct access to failed page');
  }
})