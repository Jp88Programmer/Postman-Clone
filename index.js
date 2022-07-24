// the post man application

// Utilties function
function getElementFromString (string) {
  let div = document.createElement('div')
  div.innerHTML = string
  return div.firstElementChild
}

// when json radio selected than json is visiable and parameter are disable 
let jsonRequest = document.getElementById('jsonRequest')
let paramsRequest = document.getElementById('paramsRequest')

// if json radio click then jsonBox visiable and parameter display none
jsonRequest.addEventListener('click', () => {
  document.getElementById('jsonBox').style.display = 'block'
  document.getElementById('paramsBox').style.display = 'none'
})

// if parameter radio click then parameter visiable and json display none
paramsRequest.addEventListener('click', () => {
  document.getElementById('jsonBox').style.display = 'none'
  document.getElementById('paramsBox').style.display = 'block'
})

// counting the parameter type 
let countPara = 1

// if + click then parameter type is add dom 
addParams.addEventListener('click', () => {

  // is the string that html to add the dom
  string = `<div class="row my-2">
                    <legend class="col-form-label col-sm-2 pt-0">Parameter${countPara + 1}</legend>
                    <div class="col">
                        <input type="text" class="form-control" id="paraKey${countPara + 1}" placeholder="Enter Parameter${countPara + 1} Key" aria-label="Enter Parameter1 Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="paraValue${countPara + 1}"  placeholder="Enter Parameter${countPara + 1} Value" aria-label="Enter Parameter${countPara + 1} Value">
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary deleteButton" style="padding-left : 15px; padding-right : 15px"> - </button>
                    </div>
            </div>`

  let paramsBox = document.getElementById('paramsBox')
  let paraDiv = getElementFromString(string)

  paramsBox.appendChild(paraDiv)

  //   here the deleteButton class to selecting - button to use for of loop and target main element button event occure
  let deleteButton = document.getElementsByClassName('deleteButton')

  //   here all deleteButton selecting and to finding which - button click to target and remove it parent element 
  for (item of deleteButton) {

    // to remove its parent element when targeting element 
    item.addEventListener('click', (e) => {

      e.target.parentElement.parentElement.remove()
    })
  }

  countPara++
})

// when sumbit click 
let submit = document.getElementById('submit')

// data read , save and process
submit.addEventListener('click', () => {

  let url = document.getElementById('url').value

  let requestType = document.querySelector("input[name='requestType']:checked").value
  let contentRequest = document.querySelector("input[name='contentRequest']:checked").value

  console.log(requestType, contentRequest, url)

  let responsefield = document.getElementById('responsefield')
  responsefield.value = 'please wait response processing...'

  let data = {}
  if (contentRequest == 'params') {
    for (let index = 0; index < countPara; index++) {
      if (document.getElementById('paraKey' + (index + 1)) != undefined) {
        let paraKey = document.getElementById('paraKey' + (index + 1)).value
        let paraValue = document.getElementById('paraValue' + (index + 1)).value
        data[paraKey] = paraValue
      }
    }
    data = JSON.stringify(data)
  }else {
    data = document.getElementById('json').value
  }

  console.log(data)

  if (requestType == 'GET') {
    fetch(url, {method: 'GET'})
      .then(response => response.text())
      .then((data) => {
        let responsefield = document.getElementById('responsefield')
        // responsefield.value = data
        responsefield.innerHTML = data
        Prism.highlightAll()
      })
  }else {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.text())
      .then((data) => {

        let responsefield = document.getElementById('responsefield')
        // responsefield.value = data
        responsefield.innerHTML = data
        Prism.highlightAll()
        
      })
  }
})


