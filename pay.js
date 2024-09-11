const paymentMethod = document.getElementById('paymentMethod');
        const visaSection = document.getElementById('visaSection');
        const paypalSection = document.getElementById('paypalSection');
        const mpesaSection = document.getElementById('mpesaSection');

        paymentMethod.addEventListener('change', function() {
            visaSection.classList.remove('active');
            paypalSection.classList.remove('active');
            mpesaSection.classList.remove('active');

            if (this.value === 'visa') {
                visaSection.classList.add('active');
            } else if (this.value === 'paypal') {
                paypalSection.classList.add('active');
            } else if (this.value === 'mpesa') {
                mpesaSection.classList.add('active');
            }
        });
  
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('paymentForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
        
                // Retrieve form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const paymentMethod = document.getElementById('paymentMethod').value;
        
                // Display payment submitted message and personal details
                alert('Payment submitted\n\n' +
                      'Full Name: ' + name + '\n' +
                      'Email: ' + email + '\n' +
                      'Phone Number: ' + phone + '\n' +
                      'Payment Method: ' + paymentMethod);
            });
        });
        
        