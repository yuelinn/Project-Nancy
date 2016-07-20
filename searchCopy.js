// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('MahAPIKey');
    // document.getElementById("demo") = document.getElementById("searchBar").submit(); // elements[0].value;
    // search();


    // using jquery to check if submitted
    $(function()
    {
        $('#ok').click(function()
        {
            //take the keyword and search;
            search(document.getElementById('apple').value + " eng sub");
            // document.getElementById('demo').innerHTML = document.getElementById('apple').value;
            navi();
        })
    })
}

function search(word) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: word, // document.getElementById("searchBar").elements[0].value, // $("#apple").val()), // .replace(/%20/g, "+"),
        maxResults: 3,
        type: 'video'
    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);

}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    // showResponse(response);
    var ans = response.result;
    $("#ans").html("");
    var it = 0;
    $.each(ans.items, retVid);
}

function retVid(index, item)
{
    // console.log(item);
    // $('#ans').append(item.id.videoId+" "+item.snippet.title+"<br>");
    $.get("showVid.html", function(data) {
        $("#ans").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]))
    });
}

// for converting json to html
// from fsquare
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}


//to navigate only with arrows
function navi()
{
    var buttArray = document.getElementsByClassName("clicky");
    var ifArr = document.getElementsByClassName("butts");
    var curr = 0;

    window.onkeydown= function(e)
    {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 38) {
            //focus on prev video
            // document.getElementById('demo').innerHTML = "Up";
            if (curr > 0)
                curr--;
            else
                curr = buttArray.length -1;

        }else if (key == 40) {
            //focus on next vid
            // document.getElementById('demo').innerHTML = "downz";
            if (curr < buttArray.length -1)
                curr++;
            else
                curr = 0;
            
        }else if (key == 13 && curr != 0)
        {
            // document.getElementById('demo').innerHTML = "enter";
            //play or pause vid

            if ((ifArr[curr-1].src).indexOf("&autoplay=1") == -1)
            {
                play(curr);
                buttArray[curr].innerHTML = "Press OK to Stop";
            }
            else
            {
                // (ifArr[curr-1].src).replace("&autoplay=1", "");
                ifArr[curr-1].src = (ifArr[curr-1].src).slice(0, (ifArr[curr-1].src).indexOf("&autoplay=1"));
                //pause video
                // ifArr[curr-1].pauseVideo();
                document.ifArr[curr-1].contentWindow.location.reload();
                buttArray[curr].innerHTML = "Press OK to Play";
            }
                
        }
        setTimeout((buttArray[curr]).focus(), 100);

        // set the search bar to empty
        // if(curr == 0)
        // {
        //     //clear field
        //     document.getElementById('apple').value = "";
        // }

        //set the video to be in the middle
        setMiddle(curr);
    }
}

function play(curr)
{
    var ifArr = document.getElementsByClassName("butts");
    // play butts(curr-1)
    ifArr[curr-1].src += "&autoplay=1&autohide=0"; // "//www.youtube.com/watch?v=jHY5buYTu3c" //
    // ifArr[curr-1].height = "480";

}

function setMiddle(curr)
{
    // scroll to  top of vid
    var ifArr = document.getElementsByClassName("item");
    // ifArr[curr-1].scrollTop() = 0;

    // for play button
    var buttArray = document.getElementsByClassName("clicky");
    // buttArray[curr].onClick = play(curr);
}