const colorBlocks = document.querySelectorAll('.color-block');
const colorDesc = document.querySelectorAll('.color-desc');
const colorInput = document.querySelector('.color-input')
const colorSelect = document.querySelector('.select')

function getData(inputValue, selectValue) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${inputValue}&format=json&mode=${selectValue}&count=5`)
    .then(res => res.json())
    .then(data => {
      data.colors.forEach((el, index) => {
        colorBlocks[index].style.backgroundColor = el.hex.value;
        colorDesc[index].textContent = el.hex.value
      })
    })
}

let inputValue = colorInput.value.slice(1);

getData(inputValue, colorSelect.value)

document.querySelector('.form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  inputValue = colorInput.value.slice(1)
  getData(inputValue, colorSelect.value)
})

colorDesc.forEach(el => {
  el.addEventListener('click', () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.innerHTML);
      document.querySelector('.tooltip').classList.add('active')
      setTimeout(() => {
        document.querySelector('.tooltip').classList.remove('active')
      }, 1200)
    }

  })

})
