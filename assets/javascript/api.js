$(document).ready(function() {

//intial topics
var topics = ["Space", "Milky Way", "Astronaut", "Galaxies", "Neil DeGrasse Tyson", "Bill Nye", "Nikola Tesla"];
console.log(topics);
var animate = 0;
//displaying info

  function displayTopic() {

    //grabbing info
    var space = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    space + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(space);
    console.log(queryURL);

    //Ajax grab
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      console.log(results);
      //pulling the still imgs, ratings and putitng them in a div
      for (var i = 0; i < results.length; i++) {
        var imageDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var spaceImage = $("<img>").val(i);
        spaceImage.attr("src", results[i].images.fixed_height_still.url);
        spaceImage.addClass("gifs");
        //ap/prepending everything to my own div
        imageDiv.append(p);
        imageDiv.prepend(spaceImage);
        $("#images").prepend(imageDiv);
      }
      //animate gifs
      //psuedo code
      // pull the still img from api like the animation then apply an on click function to get the div to switch
      //bt the animation and still img/ boolean(t/f)
        $(".gifs").on("click", function(event) {
          console.log("gifs click");
          console.log(this.value);
          if (animate === 0) {
            var imgval = this.value;
            console.log(imgval);
            $(this).attr("src", results[imgval].images.fixed_height.url);
            animate++
            console.log(animate);
            }else{
            var imgval = this.value;
            $(this).attr("src", results[imgval].images.fixed_height_still.url);
            animate--
            console.log(animate);
          }
        });
})

}
 
//Collect Btns
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

//Add Btn Submit
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  renderButtons();
});
  renderButtons();

$(document).on("click", ".topic", displayTopic);
      renderButtons();
});