let refreshValue = 0
let errorCount = 0
let errorCheckCount = 0
let errorCloseCount = 0
let xVal = 0
let content
let userns
let scrollCheck = 0
let chatBotOpenCloseCheck = "close"
let navBarElementHeight
let firstMessageTimer = 10000
let firstMessageIdleTimer
let messageIntervalCheck = "not set"
let recheckTimer = 500
let scrollingTimer
let firstMessageSent
let numberOfMessagesSent = 1
let maxMessages = 3
let subsequentMessageTimer = 7000
let scrollWaitTimer = 3000
let chatBotUrl = "h0ey00a9hg9wjfyx/float.js"
let clientId = 275121720
let specialPromptSelector = "natural";
let subsequentVarForSubsequentMessages = 0;
console.log('FMT', firstMessageTimer, 'SMT', subsequentMessageTimer, 'CHATBOTURL', chatBotUrl, 'CLIENTID', clientId, 'SWT', scrollWaitTimer)

logM()
checkConvToken()
checkIframe()

const currentUrl = window.location.href;
console.log(currentUrl);
if(currentUrl.includes("sexual-medicine")) {
  specialPromptSelector = 'true'
  console.log("true")
}
else if(currentUrl.includes("sexual-education") || currentUrl.includes("sexual-wellness")){
  specialPromptSelector = 'false'
  console.log("false")
}

async function logM() {
  let url
  console.log("Starting the load of UCHAT Script");
  if (chatBotUrl === 'h0ey00a9hg9wjfyx/float.js') {
    url = `https://www.uchat.com.au/js/widget/h0ey00a9hg9wjfyx/float.js`
  }

  else {
    url = `https://app.thechatman.ai/js/widget/ibt076czwzox9hsq/float.js`
  }

  console.log(url)

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = url

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}


async function checkConvToken() {
  let newCookie = document.cookie
  const strToCheck = 'conv_token'

  if (newCookie.includes(strToCheck)) {
    console.log('Conv_Token found')
    clickandClose()
  } else {
    console.log('Conv_Token not found')
    setTimeout(checkConvToken, 500)
  }
}

function clickandClose() {
  console.log('uChat widget script has been loaded.')

  checkTarget()
  checkClose()
}

async function checkTarget() {
  const targetElement = document.querySelector('.bot-widget-bubble.bot-elements--right.bot-elements--right')
  const element = document.getElementById('chatbot_live_chat_widget')

  if (targetElement) {
    setTimeout(() => {
      targetElement.click()
      element.style.visibility = "hidden"

      console.log('Element clicked')
      refreshValue = 6
    }, 1500)
  } else {
    console.log('Element not found! Waiting for it to exist', errorCheckCount)
    if (errorCheckCount < 250) {
      setTimeout(checkTarget, 100)
    }

    errorCheckCount = errorCheckCount + 1
  }
}

async function checkClose() {
  const closeElement = document.querySelector(
    '.bot-elements--right.bot-elements--right.bot-widget-bubble.bot--close'
  )
  const element = document.getElementById('chatbot_live_chat_widget')

  if (closeElement && refreshValue === 6) {
    setTimeout(() => {
      closeElement.click()
      element.style.visibility = "visible"
      console.log('Element Closed')
      xVal = 1298
      console.log('Set xVal to 1298')
      setupMutationObserver();
    }, 500)
  } else {
    console.log('Close not found. Waiting for it to exist', errorCloseCount)
    if (errorCloseCount < 250) {
      setTimeout(checkClose, 100)
    }

    errorCloseCount = errorCloseCount + 1
  }
}

async function checkIframe() {
  const iframeCheck = document.getElementById('chatbot_live_chat_widget')

  if (iframeCheck && xVal === 1298) {
    console.log('Before Retrieval Call')
    retrieveUUIDandUSERNS()
  } else {
    console.log('Waiting for Iframe to exist or Element not closed yet', errorCount)
    if (errorCount < 250) {
      setTimeout(checkIframe, 100)
    }

    errorCount = errorCount + 1

  }
}
async function retrieveUUIDandUSERNS() {
  setTimeout(async () => {
    try {
      let url = await getDocumentFromID()
      console.log('URL: ' + url)
      let urlsrc = await updateUrl(url)
      let userdata = await sendUrl(urlsrc,clientId)
      console.log(userdata)
      userns = userdata.userdata.userns
      console.log('USERNS: ' + userns)
      scrollCheck = 23

    } catch (error) {
      console.error('Error while getting elements from URL:', error)
    }
  }, 2000)
}

async function getDocumentFromID() {
  const iframeElement = document.getElementById('chatbot_live_chat_widget')
  console.log(iframeElement.src)

  console.log(iframeElement)

  return iframeElement.src
}

async function updateUrl(url) {
  let x
  console.log(url)
  const convToken = await getCookie('conv_token')
  let myCookie = 'conv_token=' + convToken
  const strToCheck = 'conv_token'

  if (url.includes(strToCheck)) {
    x = url
  } else {
    x = url + '&' + myCookie
  }

  console.log('UPDATED URL: ' + x)

  return x

}
async function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  return null
}

async function sendUrl(src,cid) {
  const url = 'https://blog-uchat-nudge.thechatman.ai:3001/getuserns?url=' + src + '&cid=' + cid
  console.log("HHHHHHHHHHHH",url)
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error:', error)

  }
}
function setupMutationObserver() {
  const visibleElement = document.querySelector(".bot-widget-holder.bot-elements--right.bot-elements--right");

  if (!visibleElement) {
    console.log("Element not found. Waiting and retrying...");
    setTimeout(setupMutationObserver, 500);
    return;
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    console.log(visibleElement)
    console.log(window.getComputedStyle(visibleElement))
    let impChecker = window.getComputedStyle(visibleElement).visibility;
    let shadow = window.getComputedStyle(visibleElement).boxShadow

    if (impChecker === 'visible') {
      if (shadow !== "none") {
        chatBotOpenCloseCheck = "open"
        console.log(chatBotOpenCloseCheck)
      }
      else {
        chatBotOpenCloseCheck = "close"
        console.log(chatBotOpenCloseCheck)

        clearTimeout(scrollingTimer)
      }
    }


    else {

      chatBotOpenCloseCheck = "close"
      console.log(chatBotOpenCloseCheck)

      clearTimeout(scrollingTimer)
    }

  });

  observer.observe(visibleElement, { attributes: true });
}

function sendFirstMessage() {
  firstMessageIdleTimer = setTimeout(async function checkPElementsAndSend() {
    if (scrollCheck === 23 && messageIntervalCheck === "set" && chatBotOpenCloseCheck === "close") {

      try {
        content = await getVisibleParagraphs(clientId)
        console.log(content)
        console.log("OK")
      } catch (error) {
        console.error('Error while getting visible paragraphs:', error)
      }

      try {


        await postDataToAPI(content, userns)
        firstMessageSent = "sent"
        console.log(firstMessageSent)

        


      }
      catch (error){
        console.log('ERROR: ', error)
      }

      try{
        window.addEventListener('scroll', subsequentMessageScroll)
        console.log("BEFORE SET")
        setTimeout(setVarAfterFirstMessage, subsequentMessageTimer);
      }
      catch (error) {
        console.error(error)
      }


    } else {
      clearTimeout(firstMessageIdleTimer)
      firstMessageIdleTimer = setTimeout(checkPElementsAndSend, recheckTimer)
    }

  }, recheckTimer)


}

function setVarAfterFirstMessage() {
  subsequentVarForSubsequentMessages = 1;
  console.log("SET SUB VAR")
}


function setMessageInterval() {
  messageIntervalCheck = "set"
  sendFirstMessage()
  console.log(messageIntervalCheck)
}
function setVar() {
  setTimeout(setMessageInterval, firstMessageTimer)
}
function getNavBarHeight() {
  const navBarElement = document.getElementById('navbarTop')

  if (navBarElement) {
    navBarElementHeight = navBarElement.offsetHeight;
    console.log("MY HEIGHT", navBarElementHeight)
  }
}

function newCall() {
  setVar();
  getNavBarHeight();
}

if (document.readyState === "complete") {
  newCall()
} else {
  window.addEventListener('load', newCall);
}

async function getVisibleParagraphs(cid) {

  let body
  let selectors

  switch(cid)
  {
    case 275121720 : body = `.flex.flex-col.items-start.justify-start.mt-4` ; selectors = `h1, h2, h3, h4, h5, h6, strong`;  break;
    case 275121721 : body = `*`; selectors = `h1, h2, h3, h4, h5, h6, strong`; break;
    case 222: body = `*`; selectors = `h1, h2, h3, h4, h5, h6, strong`; break;
  }
  console.log('This works too')
  console.log('Navbar height:', navBarElementHeight)
  // const containerDiv = document.querySelector('.flex.flex-col.items-start.justify-start.mt-4');
  const containerDiv = document.querySelector(body); 
  const paragraphs = containerDiv.querySelectorAll(selectors);


  let pageTop 
  if(navBarElementHeight){
    pageTop = 0 + navBarElementHeight
  }
  else {
    pageTop = 0
  }

  let visibleParagraphs = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const rect = paragraph.getBoundingClientRect();

    if (rect.bottom >= pageTop && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      visibleParagraphs = visibleParagraphs + paragraph.outerHTML;
    }
  }

  const h1 = document.querySelector('h1');
  let newData = "####\n" + (h1 ? h1.innerText : '') + "\n####\n****\n" + visibleParagraphs + "\n****";

  if(cid===222){
    newData = "****\n" + visibleParagraphs + "\n****\n####\n" + (h1 ? h1.innerText : '') + "\n####";
  }
  return newData;
}

async function postDataToAPI(data, userns) {
  console.log(specialPromptSelector)
  const article = {
    content: data,
    userns: userns,
    cid: clientId,
    prompt: specialPromptSelector
  }

  const jsonArticle = JSON.stringify(article)
  console.log(article)


  const url = 'https://blog-uchat-nudge.thechatman.ai:3001/postapi'


  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonArticle,
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.json())
        console.log('Data posted successfully.')
        return 67;
      } else {
        console.log('Failed to post data. Status code:', response.status)
        console.log(body)
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function subsequentMessageScroll() {
  if (scrollingTimer) {
    clearTimeout(scrollingTimer)
  }
  if (numberOfMessagesSent < maxMessages) {
    console.log(subsequentVarForSubsequentMessages)
    scrollingTimer = setTimeout(async function checkPElementsAndSend() {
      if (firstMessageSent === "sent" && chatBotOpenCloseCheck === "close" && subsequentVarForSubsequentMessages === 1) {

        try {
          content = await getVisibleParagraphs(clientId)
        } catch (error) {
          console.error('Error while getting visible paragraphs:', error)
        }

        try {
          await postDataToAPI(content, userns)
          console.log("Subsequent Message Number: " + numberOfMessagesSent)
          numberOfMessagesSent = numberOfMessagesSent + 1
          subsequentVarForSubsequentMessages = 0
          setTimeout(setVarAfterFirstMessage, subsequentMessageTimer)
          if (numberOfMessagesSent === maxMessages) {
            window.removeEventListener('scroll', subsequentMessageScroll)
            console.log("Removed Event Listener")
          }

        } catch {
          console.log('ERROR')
        }

      } else {
        clearTimeout(scrollingTimer)
        scrollingTimer = setTimeout(checkPElementsAndSend, recheckTimer)
      }

    }, scrollWaitTimer)
  }

}
