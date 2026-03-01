window.onload = () => {
    // let loader = document.getElementById("loader");

    
    
};
if(document.readyState === "loading") {

    let loader = document.getElementById('loader')
    loader.style.visibility = "visible";
    document.addEventListener('DOMContentLoaded', (event) => {
        loader.style.visibility = "hidden";
        loader.remove()
        console.log("Document Loaded");
    });
}