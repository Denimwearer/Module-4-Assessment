const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const fortuneForm = document.getElementById("fortune-form");
const fortuneInput = document.getElementById("fortune-input");
const fortuneContainer = document.querySelector("#fortune-container");
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
      displayFortune(data);
      console.log(data);
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

  fortuneCard.innerHTML = `<button onclick="deleteFortune(${fortune.id})">X</button><p>${fortune.text}</p><button onclick="openModal()">Edit</button>`;

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

fortuneContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("updateFortune")) {
    openModal();
    const fortuneIdToUpdate = document
      .getElementById("update-fortune-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const newText = document.getElementById("update-fortune-input").value;
        updateFortune(fortuneIdToUpdate, newText);
        closeModal();
      });
  }
});

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
fortuneForm.addEventListener("submit", handleSubmit);
