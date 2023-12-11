const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const fortuneForm = document.getElementById("fortune-form");
const fortuneInput = document.getElementById("fortune-input");
const fortuneContainer = document.querySelector("#fortune-container");
const updateFortuneForm = document.querySelector("#update-fortune-form");
let globalId = 6;

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios
    .get("http://localhost:4000/api/fortune")
    .then((res) => {
      const data = res.data;
      console.log(data);
      alert(data.text);
      displayFortune([data]);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createFortune = (body) => {
  axios
    .post("http://localhost:4000/api/fortune", body)
    .then((res) => {
      const data = res.data;
      console.log(data);
      displayFortune(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteFortune = (id) => {
  axios
    .delete(`http://localhost:4000/api/fortune/${id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      displayFortune(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateFortune = (id, newText) => {
  axios
    .put(`http://localhost:4000/api/fortune/${id}`, { text: newText })
    .then((res) => {
      const data = res.data;
      console.log(data);
      displayFortune(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleSubmit = (e) => {
  e.preventDefault();

  let bodyObj = {
    id: globalId,
    text: fortuneInput.value,
  };

  console.log(bodyObj);

  createFortune(bodyObj);

  globalId++;

  fortuneInput.value = "";
};

createFortuneCard = (fortune) => {
  const fortuneCard = document.createElement("div");
  fortuneCard.classList.add("fortune-card");
  fortuneCard.dataset.fortuneId = fortune.id;

  fortuneCard.innerHTML = `<button onclick="deleteFortune(${fortune.id})">X</button>
  <p>${fortune.text}</p>
  <button class="updateFortune" data-fortune-id="${fortune.id}">Edit</button>`;

  fortuneContainer.appendChild(fortuneCard);
};

const displayFortune = (arr) => {
  fortuneContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createFortuneCard(arr[i]);
  }
};

const openModal = () => {
  const modal = document.getElementById("updateModal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("updateModal");
  modal.style.display = "none";
};

const handleFortuneUpdate = (event, fortuneIdToUpdate) => {
  event.preventDefault();
  const newText = document.getElementById("update-fortune-input").value;

  let bodyObj = {
    id: +fortuneIdToUpdate,
    text: newText,
  };

  console.log(bodyObj);

  createFortune(bodyObj);
  updateFortune(fortuneIdToUpdate, newText);
  closeModal();
};

fortuneContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("updateFortune")) {
    openModal();
    const fortuneCard = e.target.closest(".fortune-card");
    const fortuneIdToUpdate = fortuneCard.dataset.fortuneId;

    updateFortuneForm.removeEventListener("submit", handleFortuneUpdate);
    updateFortuneForm.addEventListener("submit", (e) =>
      handleFortuneUpdate(e, fortuneIdToUpdate)
    );
  }
});

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
fortuneForm.addEventListener("submit", handleSubmit);
updateFortuneForm.addEventListener("submit", handleFortuneUpdate);
