$(document).ready(function(){
  var body = $('body')
  var headerEl = $('<header>').attr({
    "class" : "p-5 mb-4",
  })
  var h1El = $('<h1>').attr({
    "class" : "display-3",
  }).text('Work Day Scheduler')
  var pEl = $('<p>').attr({
    "class" : "lead",
  }).text('A simple calendar app for scheduling your work day')
  var timeEl = $('<time>').attr({
    "class" : "lead",
    "id" : "currentDay"
  }).text(dayjs().format('D/M/YYYY - h:mm'))
  setInterval( function() {
    currentDay = dayjs().format('D/M/YYYY - h:mm')
    timeEl.text(currentDay)
  },1000)
  body.prepend(headerEl.append(
    h1El,
    pEl,
    timeEl,
  ))
  var start = 8, end = 20, mainEl = $('main')
  for(i=start ; i<end ; i++) {
    var elementHour = dayjs().startOf('day').add(i,'hour')
    var diff = dayjs().diff(elementHour,"hour",true)
    if(diff > 1) {
      var pastPresentFuture = "past"
    } else if (diff < 0) {
      var pastPresentFuture = "future"
    } else {
      var pastPresentFuture = "present"
    }
    var sectionEl = $("<section>").attr({
      "id" : `hour${i}`,
      "class" : `row time-block ${pastPresentFuture}`,
    })
    var divEl = $("<div>").attr({
      "class" : "col-2 col-md-1 hour text-center py-3",
    }).text(elementHour.format('hA'))
    var localText = ""
    if (localStorage.getItem(`texthour${i}`) !== null) {
      var localText = localStorage.getItem(`texthour${i}`)
    }
    var textareaEl = $('<textarea>').attr({
      "class" : "col-8 col-md-10 description",
      'row' : '3'
    }).text(localText)
    var buttonEl = $('<button>').attr({
      "aria-label" : `save`,
      "class" : "btn saveBtn col-2 col-md-1",
      "data-texthour" : `texthour${i}`,
    }).click(function() {
      var texthour = $(this).data("texthour");
      var textarea = $(this).siblings("textarea").val()
      localStorage.setItem(texthour,textarea );
    })
    var iEl = $('<i>').attr({
      'class' : 'fas fa-save',
      'aria-hidden' : "true"
    })
    mainEl.append(
      sectionEl.append(
        divEl,
        textareaEl,
        buttonEl.append(
          iEl
        )
      )
    )
  }
})