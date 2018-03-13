var gifArray = ["Cats", "Dogs", "Birds", "Obama", "Trump", "Super Bowl", "Coders", "Hackers"];
console.log(gifArray);

function displayGifInfo() {
    

    

    var gifs = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=eMd2socfNFRGi6QuS2hc26VkPqjOkpov&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var rating = results[i].rating;
            var h3One = $("<h3>").text("Rating: " + rating);
            gifDiv.append(h3One);


            var gifImage = $("<img>");
            gifImage.addClass("gif");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifDiv.append(gifImage);

            $("#gifs-view").prepend(gifDiv);
        }

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
        
            if (state === "still") {
                $(this).attr("src",    $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src",    $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-gif", gifArray[i]);
        a.text(gifArray[i]);
        $("#buttons-view").append(a);
    }

}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gifs = $("#gif-input").val().trim();
    gifArray.push(gifs);
    console.log(gifArray);
    renderButtons();
});



$(document).on("click", ".gif-btn", displayGifInfo);

renderButtons();


