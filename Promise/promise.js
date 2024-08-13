// selecting different elements using DOM
let container = document.getElementById("container")
let buttonDiv = document.getElementById("buttonDiv");
let button = document.getElementById("button");
let url = "https://dummyjson.com/posts";

// creating a fetch function with timer using promise method
function dataFetching(url){
    return new Promise((resolve, reject) =>{
        let timer = setTimeout(() => {
            reject("Operation timeout.")
        }, 5000);
        
        fetch(url)
          .then( response => response.json())
          .then(data =>{
            clearTimeout(timer);
            resolve(data);
          })
          .catch(error =>{
            clearTimeout(timer);
            reject(error);
         });
    })
};
// adding event listener to the button
button.addEventListener("click", displayDiv);

// displaying div
function displayDiv(){
    let dataDiv = document.createElement("div");
    dataDiv.classList.add("dataContainer-style");
    dataDiv.style.backgroundImage = "url('bgImage.png')";
    container.replaceChild(dataDiv, buttonDiv);
    dataDiv.innerHTML = "<p class='text-white'>Loading...</p>";

    // applying dataFectching function
    dataFetching(url)
    .then(data => {
        dataDiv.style.backgroundImage = "";
        let posts = data.posts;
        let postsHTML = "Posts:";
        postsHTML += "<ul>";
        posts.forEach(post => {
           postsHTML += `<li>${post.title}</li>`;
        });
        postsHTML += "</ul>";
        dataDiv.innerHTML = postsHTML;
       })
    .catch(error =>{
     dataDiv.style.backgroundImage = "";
     dataDiv.innerHTML =`<h1> Error fetching data: ${error}</h1>`
    });  

};









  