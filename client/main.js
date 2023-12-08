const complimentBtn = document.getElementById("complimentButton");
const body = document.querySelector("body");
const fortuneBtn = document.createElement("button");
const form = document.querySelector("form");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune").then((res) => {
    const data = res.data.text;
    console.log(data);
    alert(data);
  });
};

const createFortune = (body) => {
  axios
    .post("http://localhost:4000/api/fortune", body)
    .then((res) => {
      console.log(res.data);
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
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateFortune = (id, text) => {
  axios
    .put(`http://localhost:4000/api/fortune/${id}`, { text })
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const submitHandler = (e) => {
  e.preventDefault();
  let text = document.querySelector("#fortuneText");

  let bodyObj = {
    text: text.value,
  };

  createFortune(bodyObj);
  console.log(bodyObj);
};

const createFortuneCard = (fortune) => {
  const fortuneCard = document.createElement("div");
  fortuneCard.classList.add("fortune-card");

  fortuneCard.innerHTML = `<p> ${fortune.text}</p>`;

  body.appendChild(fortuneCard);
};

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
fortuneBtn.setAttribute("id", "fortuneButton");
fortuneBtn.textContent = "Get a fortune";
body.appendChild(fortuneBtn);
form.addEventListener("submit", submitHandler);
