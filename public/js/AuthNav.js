window.addEventListener("load", AuthNav);

function AuthNav () {
    var navbar = document.querySelector("header");
    navbar.innerHTML = `
    
    <nav id="user-overview">
    
        <div id="business-logo" class="container d-flex align-items-center justify-content-center">
            <span> Dibbasey & Associates </span>
        </div>

        <div id="business-account" class="contianer d-flex flex-column align-items-center justify-content-center">

        <span style="font-size: 12px;"> Welcome, </span>

        <span id="user-profile-pic" class="material-icons"> account_circle </span>

            <div class="container d-flex flex-column align-items-center justify-content-center">
                <span id="username"> Shannon </span>
                <span id="user-occupation"> Occupation </span>
            </div>
        </div>
            
    </nav>

    `;
}