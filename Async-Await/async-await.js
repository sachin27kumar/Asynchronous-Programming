// selecting different elements using DOM
let container = document.getElementById("container")
let buttonDiv = document.getElementById("buttonDiv");
let button = document.getElementById("button");
let url = "https://dummyjson.com/posts";

button.addEventListener("click", displayDiv);

async function fetchingData(url){
    let timer;
    try{
        // setting timer if it takes more than 5 seconds to fetch the data
        const fetchPromise = new Promise(async (resolve, reject)=>{
            timer = setTimeout(() => {
                reject("Operation timeout!");
            }, 5000);
        //    if data fetched before timer
            try{
                const response = await fetch(url);
                const data = await response.json();
                clearTimeout(timer);
                resolve(data);  
            }
            catch(error){
                clearTimeout(timer);
                reject(error);
            }
        }); 
        // here we get final output of fetchPromise
        return await fetchPromise;
    }
    catch(error){
        throw error;
    }
};

async function displayDiv(){
        let dataDiv = document.createElement("div");
        dataDiv.classList.add("dataContainer-style");
        dataDiv.style.backgroundImage = "url('bgImage.png')";
        container.replaceChild(dataDiv, buttonDiv);
        dataDiv.innerHTML = "<p class='text-white'>Loading...</p>";
    try{
        // data fetching
        const data = await fetchingData(url)
        dataDiv.style.backgroundImage = "";
        let posts = data.posts;
        let postsHTML = "Posts:";
        postsHTML += "<ul>";
        posts.forEach(post => {
           postsHTML += `<li>${post.title}</li>`;
        });
        postsHTML += "</ul>";
        dataDiv.innerHTML = postsHTML;
    }
    catch(error){
        dataDiv.style.backgroundImage = "";
        dataDiv.innerHTML = `<h1>Error fetching data: ${error}</h1>`;
    }
    
}

