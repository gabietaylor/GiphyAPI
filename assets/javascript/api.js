//intial topics
var topics = ["Space", "Milky Way", "Astronaut", "Galaxies", "Neil DeGrasse Tyson", "Bill Nye", "Nikola Tesla"];
console.log(topics);
//displaying info

  function displayTopicInfo() {

    //grabbing info
    var space = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    space + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(space);
    console.log(queryURL);

    //Ajax for animation
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var imageDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var spaceImage = $("<img>");
        spaceImage.attr("src", results[i].images.fixed_height.url);
        imageDiv.append(p);
        imageDiv.prepend(spaceImage);
        $("#images").prepend(imageDiv);
      }
});
  }
 
//collect buttons
function renderButtons() {
 $(".collectBtns").empty();
 for (var i = 0; i < topics.length; i++) {
  var a = $("<button>");
  a.addClass("topic");
  a.attr("data-topic", topics[i]);
  a.text(topics[i]);
  $(".collectBtns").append(a);
 }
}

$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  renderButtons();
});
  renderButtons();

$(document).on("click", ".topic", displayTopicInfo);
      renderButtons();

//animate gifs
//psuedo code
// pull the still img from api like the animation then apply an on click function to get the div to switch
//bt the animation and still img/ boolean(t/f)
//Ajax for still

