document.addEventListener("DOMContentLoaded", () => {
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    const paymentId = paymentDetails ? paymentDetails.paymentId : null;

    if (paymentId) {
        fetch(`http://localhost:8000/api/v1/content/${paymentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(contentData => {
            if (contentData.success) {
                displayContent(contentData.data);
            } else {
                document.getElementById("content").innerHTML = "Failed to load content.";
            }
        })
        .catch(error => {
            console.error("Error fetching content:", error);
            document.getElementById("content").innerHTML = "An error occurred while fetching content.";
        });
    } else {
        document.getElementById("content").innerHTML = "No payment ID found.";
    }
});

// document.addEventListener("DOMContentLoaded", () => {
//     // Fetch all payment details
//     fetch('http://localhost:8000/api/v1/payment', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             displayPaymentInfo(data.data); 
//         } else {
//             document.getElementById("content").innerHTML = "Failed to load payment details.";
//         }
//     })
//     .catch(error => {
//         console.error("Error fetching payment details:", error);
//         document.getElementById("content").innerHTML = "An error occurred while fetching payment details.";
//     });
// });

function displayContent(content) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = '';

    content.forEach(item => {
        let contentItem = `<div class="content-item">
                              <h2>${item.title}</h2>
                              <p>${item.description}</p>
                              <h3>${item.content}</h3>
                          </div>`;
        contentDiv.innerHTML += contentItem;
    });
}

// function displayPaymentInfo(paymentDetails) {
//     const paymentBody = document.getElementById("payment-body");
//     paymentDetails.forEach(detail => {
//         const row = `<tr>
//                         <td>${detail.name}</td>
//                         <td>${detail.email}</td>
//                         <td>${detail.amount}</td>
//                         <td>${detail.subscriptionPlan}</td>
//                      </tr>`;
//         paymentBody.innerHTML += row;
//     });
// }


