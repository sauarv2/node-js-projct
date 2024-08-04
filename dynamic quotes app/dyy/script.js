const quoteBox = document.getElementById("quotes");
const author = document.getElementById("author");
const button = document.getElementById("btn");

let realData = "";
const getNewQuotes = () => {
  const randomNum = Math.floor(Math.random() * 16);

  //   console.log(realData[randomNum].text);
  //   console.log(realData[randomNum].author);
  let qutedata = realData[randomNum];
  quoteBox.innerText = `${qutedata.text}`;
  author.innerText = `${qutedata.author}`;
};
const getQuest = async () => {
  const api = "https://type.fit/api/quotes";

  try {
    let data = await fetch(api);
    realData = await data.json();
    getNewQuotes();
    // console.log(realData);
  } catch (error) {}
};

button.addEventListener("click", getNewQuotes);

getQuest();
