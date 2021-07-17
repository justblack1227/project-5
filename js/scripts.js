
/* Project
 * Public Api Requests
 * By Justin Black
 */
 

const cardProfile = document.getElementById("gallery"); 
const userData = fetchAPI("https://randomuser.me/api/?results=12");
let exit_btn = "";

/**
* Fetches API and handles data retrieved
*/
userData.then( data => {
  createHTML(data);

  document.querySelectorAll(".card").forEach(item => {
    item.addEventListener("click", (e) => {
        const targetNum = item.getAttribute("data-num");
        createModal(data.results[targetNum])
        exit_btn = document.querySelector("#modal-close-btn");
    });
  });
});


/**
* Event listener for exit button on Modal Window
*/
document.addEventListener("click", (e) => {
  if (e.target.parentNode === exit_btn || e.target === exit_btn) {
    document.querySelector(".modal-container").remove();  
  }
});

/**
* Fetches Data and uses then and catch methods
* @param {string} url - This is the url of api request.
*/
function fetchAPI(url) {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => alert("Looks like something went wrong", error));
}  

/**
* Checks status API Request
* @param {boolean} result - The clicked button element
* @return {boolean} True if status is ok, false if not.
*/
function checkStatus(res) {
  if (res.ok) {
    return Promise.resolve(res); 
  } else {
    return Promise.reject(new Error(res.statusText)); 
  }
}

/**
* Creates the DIV containers for each employee profile.
* @param {Object Array} data - this is the array of employees and their info.
*/
function createHTML(data) {
  for ( let i = 0; i < data.results.length; i++) {
    const cardDiv =  document.createElement("div");
    const imgDiv =  document.createElement("div");
    const infoDiv =  document.createElement("div");
    let dataNum = document.createAttribute("data-num");
    
    dataNum.value = i;
    cardDiv.setAttributeNode(dataNum);
    cardDiv.className = "card";
    imgDiv.className =  "card-img-container";
    infoDiv.className = "card-info-container";
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(infoDiv);
    document.getElementById("gallery").appendChild(cardDiv);
    
    infoDiv.innerHTML = '<h3 id="name" class="card-name cap">' + 
                        data.results[i].name.first + " " + 
                        data.results[i].name.last + '</h3>' + 
                        '<p class="card-text">' + 
                        data.results[i].email + '</p>'+ 
                        '<p class="card-text cap">' + 
                        data.results[i].location.city + ', ' + 
                        data.results[i].location.state + '</p>';
    
    imgDiv.innerHTML = '<img class="card-img" src="' + 
                        data.results[i].picture.medium + 
                        '" alt="profile picture">';
  };
}

/**
* Creates the modal window for one employee profile.
* @param {Object} data - this is an object of one employee's info.
*/
function createModal(data) {
  const modalContainDiv =  document.createElement("div");
  const modalDiv =  document.createElement("div");
  const infoContainDiv =  document.createElement("div");
  const dobString = Date(data.dob.date).split(' ');
  const dob = data.dob.date.substr(5,2) + '/' + data.dob.date.substr(8,2) + '/' + data.dob.date.substr(0,4);
  
  modalDiv.innerHTML = '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
  
  infoContainDiv.innerHTML = '<img class="modal-img" src="' + 
                             data.picture.medium + '" alt="profile picture">' +
                             '<h3 id="name" class="modal-name cap">'  + 
                             data.name.first + " " + data.name.last + '</h3>' +
                             '<p class="modal-text">' + data.email + '</p>' +
                             '<p class="modal-text cap">' + data.location.city + '</p>' +
                             '<hr>'+
                             '<p class="modal-text">' + data.phone + '</p>' +
                             '<p class="modal-text">' + data.location.street.number + 
                             ' ' + data.location.street.name + ', ' + data.location.city + 
                             ', ' + data.location.state + ' ' + data.location.postcode + '</p>' +
                             '<p class="modal-text">Birthday: ' + dob + '</p>';
  
  modalContainDiv.className = "modal-container";
  modalDiv.className =  "modal";
  infoContainDiv.className = "modal-info-container";
  modalDiv.appendChild(infoContainDiv);
  modalContainDiv.appendChild(modalDiv);
  document.getElementById("gallery").appendChild(modalContainDiv);
};

