
// selecting different elements using DOM
let container = document.getElementById("container")
let buttonDiv = document.getElementById("buttonDiv");
let button = document.getElementById("button");

// making a function to display div with deired data and fetch the data after 5 seconds of button clicking
function displayDiv(){
    let dataDiv = document.createElement("div");
    dataDiv.classList.add("dataContainer-style");
    dataDiv.style.backgroundImage = "url('bgImage.png')";
    container.replaceChild(dataDiv, buttonDiv);
    dataDiv.innerHTML = "<p class='text-white'>Please Wait for 5 Seconds...</p>";
    setTimeout(() => {
        dataDiv.style.backgroundImage = "";
        dataDiv.innerHTML = "<p>Callback executed after 5 seconds</p>";
        fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(data => {
            let posts = data.posts;
            let postsHTML = "Posts:";
            postsHTML += "<ul>";
            posts.forEach(post => {
                postsHTML += `<li>${post.title}</li>`;
            });
            postsHTML += "</ul>";
            dataDiv.innerHTML = postsHTML;
        })
        .catch(error => {
            dataDiv.innerHTML = `<h1>Error fetching data: ${error}</h1>`;
            dataDiv.style.backgroundImage = "";
        });
    }, 5000);
    
    };

// applying callback functionlity as displayDiv should run after clicking the button
button.addEventListener("click", displayDiv);


