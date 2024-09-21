let selectedPlan;
let selectedAmount;

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedPlan = button.getAttribute('data-plan');
        selectedAmount = button.getAttribute('data-amount');
        openModal();
    });
});

function openModal() {
    document.getElementById('paymentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

document.getElementById("pay-now").addEventListener("click", function () {
    const name = document.getElementById("modal-name").value;
    const email = document.getElementById("modal-email").value;

    if (!name || !email) {
        alert("Please enter your name and email.");
        return;
    }

    initiatePayment(selectedPlan, selectedAmount, name, email);
    closeModal();
});

function initiatePayment(plan, amount, name, email) {
    fetch('http://localhost:8000/api/v1/create-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            subscription_plan: plan,
            name: name,
            email: email
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let options = {
                "key": "rzp_test_Uvq7iroJd7WoZc",
                "amount": amount,
                "currency": "INR",
                "name": "Python Mastery",
                "description": `Payment for ${plan} Plan`,
                "order_id": data.order.id,
                "handler": function (response) {
                    verifyPayment(response, amount, plan, name, email);
                },
                "prefill": {
                    "name": name,
                    "email": email,
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let rzp1 = new Razorpay(options);
            rzp1.open();
        } else {
            alert("Payment initiation failed!");
        }
    });
}

function verifyPayment(response, amount, plan, name, email) {
    fetch('http://localhost:8000/api/v1/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: amount,
            name: name,
            email: email,
            subscription_plan: plan
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment verified successfully!");

           
            const paymentDetails = {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                amount: amount,
                name: name,
                email: email,
                subscriptionPlan: plan,
                paymentStatus: "Paid"
            };
            console.log(paymentDetails)

            localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
            window.location.href = "content.html"
        } else {
            alert("Payment verification failed!");
        }
    })
    .catch(error => {
        console.error("Error verifying payment:", error);
        alert("An error occurred while verifying the payment.");
    });
}

