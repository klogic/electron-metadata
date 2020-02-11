const submitListener = document
  .querySelector("form")
  .addEventListener("submit", event => {
    event.preventDefault();
    const files = document.getElementById("filePicker").files;
    console.log(files);
  });
