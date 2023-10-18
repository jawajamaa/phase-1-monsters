// Deliverables
// when page loads, show first 50 Monsters with name, age and description
// Above list, create form to add a new Monster.  There should be fields for name, age and description
// and a 'Create Monster' button.  When the button is clicked, the new Monster will be added to the list
// and saved to the database.
// At the end of the list, show a button (or two; forward and backward) to load the next 50 monsters and display them.

// 1. Create fetch() function and get initial list of Monster objects with fetch call.
//          fetchMonsters()

// 2. Create renderMonster() function that creates 'cards' for each Monster object and display them
//       in the DOM - INCLUDE the ID, but do not display it?
//          renderMonsters() : name, age, description, id(not displayed)

// 3. Create the fields and button to be used to add/create a new Monster object.
//          addNewMonster() - including the addEventListener() for the submit event?

// 4. Create submit event to be used, then call the function to add/create a new Monster Object, 
//      and following that call, the function to add the new Monster to the database.

// 5. Create eventListeners() for the two buttons displayed at the bottom of the DOM (following the 
//      50 initial monsters) to toggle the page forward or backward, which then need to call the fetch function and the 
//      render function
//          moveForwardOnePage() and moveBackwardOnePage()


const createAMonsterDiv = document.querySelector("#create-monster");
const monsterForm = document.createElement("form");
let pageNo = 1;

function loadedMessage() {
    console.info("DOM loaded");
  }
  
  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", fetchMonsters());
  } else {
    // `DOMContentLoaded` has already fired
    loadedMessage();
    fetchMonsters();
    createAMonsterForm();
  };
  
  function isMonsterFormPresent() {
    if (!createAMonsterButton) {
      createAMonsterForm();
    } else {
      console.log("You already have the ability to create a monster");
    }
  }


  function createAMonsterForm() {
      const createAMonsterButton = document.createElement("button");
      const createAMonsterName = document.createElement("input");
      const createAMonsterAge = document.createElement("input");
      const createAMonsterDescription = document.createElement("input");

      monsterForm.id = "monster-form";
      createAMonsterButton.id = "monster-button";
      createAMonsterName.id = "monster-name";
      createAMonsterAge.id= "monster-age";
      createAMonsterDescription.id= "monster-description";

      createAMonsterButton.innerHTML = "Create a Monster!!";
      createAMonsterName.placeholder = "monster name...";
      createAMonsterAge.placeholder = "monster age...";
      createAMonsterDescription.placeholder = "monster description...";

      monsterForm.append(createAMonsterName, createAMonsterAge, createAMonsterDescription,        createAMonsterButton);
      console.log(monsterForm);
      createAMonsterDiv.appendChild(monsterForm);
      submitEventHorizon();
  }

 function submitEventHorizon() {
    document.querySelector("#create-monster")
    .addEventListener("submit",(event) => {
    event.preventDefault();
    // console.log("submit" , getMonsterFormData());
    postNewMonster(getMonsterFormData());
    monsterForm.reset();
  })
 }

 function getMonsterFormData() {
let monsterFormName = document.getElementById("monster-name"),
    monsterFormAge = document.getElementById("monster-age"),
    createAMonsterDescription = document.getElementById("monster-description");
    console.log(monsterFormName); 
    return newMonster = {
      name: monsterFormName.value,
      age: parseFloat(monsterFormAge.value),
      description: createAMonsterDescription.value
    }
 }


function postNewMonster(newMonster) {
  const response = fetch ("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newMonster)
  })
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return results = response.json();
    } else {
      throw error (response.statusText)
    }
  }).then(results => {
      console.log(results)
  }).catch(error=>console.log(error));     
}


  function fetchMonsters() {
        let monstLimiter = 50;

        const response = fetch(`http://localhost:3000/monsters/?_limit=${monstLimiter}&_page=${pageNo}`)
            .then (response => response.json())
            .then (results => {document.querySelector("#monster-container").innerHTML = " ";
                // console.log(results);
                // console.log(results.length);
                for (let sully = 0; sully <= results.length-1; sully++) {
                renderMonsters(results[sully]);
                }
            })
        }


function renderMonsters(results) {
    // console.log(results);
    const monsterContainer = document.querySelector("#monster-container");
    // console.log(monsterContainer);

    let monstDiv = document.createElement("div");
    monstDiv.setAttribute("id", results.id);

    let monstName = document.createElement("h2");
    monstName.textContent = `${results.name}`;
    monstDiv.appendChild(monstName);

    let monstAge = document.createElement("h4");
    monstAge.textContent = `age: ${results.age}`;
    monstDiv.appendChild(monstAge);

    let monstDescription = document.createElement("p");
    monstDescription.textContent = `description: ${results.description}`; 
    monstDiv.appendChild(monstDescription);
    // console.log(monstDiv.textContent);
    monsterContainer.append(monstDiv);
  };

document.getElementById("forward").addEventListener("click", ()=>{
  console.log("One step Forward");
  console.log(pageNo);
  pageNo++;
  console.log(pageNo);
  fetchMonsters(pageNo); 
}) 

function initialize() {
  loadedMessage();
  fetchMonsters();
  isMonsterFormPresent();
}

document.getElementById("back").addEventListener("click", ()=>{
    console.log("One step Backward");
    console.log(pageNo);
  1<pageNo?
    (pageNo--,fetchMonsters(pageNo)):
    (alert("You're already on the first page of Monsters!!"), initialize())
  },
  

)  


// Try and catch async function that seems to not work
//   async function fetchMonsters() {
//     try {
//         let pageNo = 1;
//         let monstLimiter = 50;

//         const response = await fetch(`http://localhost:3000/monsters/?_limit=${monstLimiter}&_page=${pageNo}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json" 
//             }
//         });
//         monsterHorde = await response.json();
//         console.log(monsterHorde);
//         return monsterHorde;
//     } catch (error) {
//         console.log(error);
//     } finally {
//         (monsterHorde) => {
//             let monstCont = document.querySelector("#monster-container");
//             monstCont.innerHTML = "filth flarn filth ";
//             debugger;
//             console.log(monstCont.innerHTML);
//             for (let sully = 0; sully < monsterHorde.length; sully++) {
//             console.log(monsterHorde);
//             // renderMonsters(results[sully]);
//             }
//         }};
// }