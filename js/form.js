function handleSubmit(event) {
    event.preventDefault();
    
    //to get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;

    //for validation
    if (!name || !email || !mobile || !message) {
        alert('Please fill in all fields');
        return false;
    }

    // log to console and show an alert
    console.log({
        name: name,
        email: email,
        mobile: mobile,
        message: message
    });

    alert('Message sent successfully!');
    
    //to Clear the form
    document.getElementById('contactForm').reset();
    
    return false; // this prevents the form submission since this is a demo
}