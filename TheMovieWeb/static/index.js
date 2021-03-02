function DisplayTrend(url_string) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            var i;

            for (i=0;i<5;i++){
                var backdrop_path = obj["results"][i]["backdrop_path"];
                if (backdrop_path){document.getElementById("trending"+i.toString()).src = "https://image.tmdb.org/t/p/w780/"+backdrop_path;}
                else {document.getElementById("trending"+i.toString()).src = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";}
                document.getElementById("trendtext"+i.toString()).innerHTML = obj["results"][i]["title"]+" ("+obj["results"][i]["release_date"].substring(0,4)+")";
                var a=document.getElementById("home");
                a.style.color="darkred";
            }
            show();
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/"+url_string, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();
}
function show() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(show,4000);
}
function DisplayAirtv(url_string){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            var i;
            for (i=0;i<5;i++){
                var backdrop_path = obj["results"][i]["backdrop_path"];
                if (backdrop_path){document.getElementById("airtv"+i.toString()).src = "https://image.tmdb.org/t/p/w780/"+backdrop_path;}
                else {document.getElementById("airtv"+i.toString()).src = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";}
                document.getElementById("text"+i.toString()).innerHTML = obj["results"][i]["name"]+" ("+obj["results"][i]["first_air_date"].substring(0,4)+")";
            }
            showTV();
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/"+url_string, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();

}
function showTV() {
    var i;
    var slides = document.getElementsByClassName("tvslide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showTV,4000);
}

function check_input() {
    var key = document.getElementById("keyword").value;
    var category = document.getElementById("options").value;
    if(key =="" || category=="" ){
        alert("Please enter valid values.");
    }
    else{
        document.getElementById("result_content").style.display = "block";
        var poster_section = document.getElementById("poster");
        while(poster_section.firstChild && poster_section.removeChild(poster_section.firstChild));
        if(category == "Movies"){

            getGenre(key,category,"movie");


        }
        else if(category == "TV Shows"){
            getGenre(key,category,"tv");
        }
        else if(category == "Movies and TV Shows"){
            getGenre(key,category,"movie");
        }


    }
}
function clear_input() {
    document.getElementById("keyword").value='';
    document.getElementById("options").value='';
    document.getElementById("result_content").style.display="none";
    var poster_section = document.getElementById("poster");
    while(poster_section.firstChild && poster_section.removeChild(poster_section.firstChild));
}
function getGenre(key,category,url) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            if(category == "Movies"){
                DisplayMovieResult(key,category,obj);
            }
            else if(category == "TV Shows"){
                DisplayTVResult(key,category,obj);
            }
            else if(category == "Movies and TV Shows"){
                getTwoGenre(key,category,"tv",obj);
            }
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/genre/"+url, true);
    xhttp.send();
}
function getTwoGenre(key,category,url,gen_obj) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tv_genre = JSON.parse(this.response);
            DisplayMultiResult(key,category,gen_obj,tv_genre);
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/genre/"+url, true);
    xhttp.send();
}
function DisplayMovieResult(key,category,genre_obj){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);

            var max_result_number = 10;
            if(obj["results"].length<10){
                max_result_number = obj["results"].length;
            }
            if (obj["results"].length==0){
                document.getElementById("show_result").style.display="none";
                document.getElementById("no_result_found").style.display="block";
            }
            else{
                document.getElementById("show_result").style.display="block";
                document.getElementById("no_result_found").style.display="none";
                var poster_section = document.getElementById("poster");
                var media_type = "movie";
                var br_tag = document.createElement('br');
                for(i = 0;i<max_result_number;i++){
                    var id = obj["results"][i]["id"];
                    var title = obj["results"][i]["title"];
                    var overview = obj["results"][i]["overview"];
                    var poster_path = obj["results"][i]["poster_path"];
                    var release_date = obj["results"][i]["release_date"];
                    var vote_average = obj["results"][i]["vote_average"];
                    var vote_count = obj["results"][i]["vote_count"];
                    var genre_ids = obj["results"][i]["genre_ids"];

                    var poster_img = document.createElement('img');
                    poster_img.id="poster"+i.toString();
                    if (poster_path){
                        poster_img.src = "https://image.tmdb.org/t/p/w185/"+poster_path;
                    }
                    else {
                        poster_img.src = "https://cinemaone.net/images/movie_placeholder.png";
                    }
                    var poster_wrapper = document.createElement('div');
                    poster_wrapper.id="pos_wrapper"+i.toString();
                    poster_wrapper.className = "poster_wrapper";
                    poster_section.append(poster_wrapper);
                    poster_wrapper.append(poster_img);

                    var poster_h1 = document.createElement('h1');
                    var overview_section = document.createElement('div');

                    overview_section.className = "overview_section";
                    overview_section.id = "overview_sec"+i.toString();
                    poster_wrapper.append(overview_section);
                    poster_h1.innerText = title;
                    poster_h1.id = "poster_title"+i.toString();
                    overview_section.append(poster_h1);
                    overview_section.append(br_tag);

                    var poster_p = document.createElement('p');
                    var poster_p_with_no_symbol = document.createElement('p');
                    poster_p.innerText = release_date.substring(0,4)+" | ";
                    //this section is created to display genres of the movie
                    for(j=0; j<genre_ids.length;j++){
                        for(k=0;k<genre_obj["genres"].length;k++){
                            if(genre_ids[j]==genre_obj["genres"][k]["id"]){
                                poster_p.appendChild(document.createTextNode(genre_obj["genres"][k]["name"]));
                                poster_p.appendChild(document.createTextNode(", "));
                            }
                        }
                    }
                    poster_p_with_no_symbol.innerText = poster_p.innerText.substring(0,poster_p.innerText.length-2);
                    poster_p_with_no_symbol.className = "tag";
                    overview_section.append(poster_p_with_no_symbol);
                    overview_section.append(br_tag);
                    var vote_star = document.createElement('p');
                    vote_star.innerHTML = "&#9733;"+(vote_average/2).toFixed(2)+"/5 ";
                    vote_star.className = "vote_star";

                    var votes = document.createElement('span');
                    votes.innerHTML=vote_count+" votes";
                    votes.style.color="white";
                    votes.style.marginLeft="3px";
                    votes.style.verticalAlign = "top";
                    overview_section.append(vote_star);
                    vote_star.append(votes);
                    overview_section.append(br_tag);
                    var poster_overview = document.createElement('p');
                    poster_overview.innerText = overview;
                    poster_overview.className = "overview_content";
                    overview_section.append(poster_overview);
                    overview_section.append(br_tag);
                    var show_more_button = document.createElement('button');
                    show_more_button.className = "show_more";
                    show_more_button.id = "show_more"+i.toString();
                    show_more_button.innerText="Show more";
                    var addOnclick = function(id,media_type,title){
                        show_more_button.onclick= ()=>display_detail(id,media_type,title);
                    };
                    addOnclick(id,media_type,title);
                    overview_section.append(show_more_button);
                    overview_section.append(br_tag);
                }

            }
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/search/"+key+"&"+category, true);
    //xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();

}

function DisplayTVResult(key,category,genre_obj){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            var max_result_number = 10;
            if(obj["results"].length<10){
                max_result_number = obj["results"].length;
            }
            if (obj["results"].length==0){
                document.getElementById("show_result").style.display="none";
                document.getElementById("no_result_found").style.display="block";
            }
            else{
                document.getElementById("show_result").style.display="block";
                document.getElementById("no_result_found").style.display="none";
                var poster_section = document.getElementById("poster");
                var media_type = "tv";
                var br_tag = document.createElement('br');
                for(i = 0;i<max_result_number;i++){
                    var id = obj["results"][i]["id"];
                    var title = obj["results"][i]["name"];
                    var overview = obj["results"][i]["overview"];
                    var poster_path = obj["results"][i]["poster_path"];
                    var release_date = obj["results"][i]["first_air_date"];
                    var vote_average = obj["results"][i]["vote_average"];
                    var vote_count = obj["results"][i]["vote_count"];
                    var genre_ids = obj["results"][i]["genre_ids"];

                    var poster_img = document.createElement('img');
                    poster_img.id="poster"+i.toString();
                    if (poster_path){
                        poster_img.src = "https://image.tmdb.org/t/p/w185/"+poster_path;
                    }
                    else {
                        poster_img.src = "https://cinemaone.net/images/movie_placeholder.png";
                    }
                    var poster_wrapper = document.createElement('div');
                    poster_wrapper.id="pos_wrapper"+i.toString();
                    poster_wrapper.className = "poster_wrapper";
                    poster_section.append(poster_wrapper);
                    poster_wrapper.append(poster_img);

                    var poster_h1 = document.createElement('h1');
                    var overview_section = document.createElement('div');

                    overview_section.className = "overview_section";
                    overview_section.id = "overview_sec"+i.toString();
                    poster_wrapper.append(overview_section);
                    poster_h1.innerText = title;
                    poster_h1.id = "poster_title"+i.toString();
                    overview_section.append(poster_h1);
                    overview_section.append(br_tag);

                    var poster_p = document.createElement('p');
                    var poster_p_with_no_symbol = document.createElement('p');
                    poster_p.innerText = release_date.substring(0,4)+" | ";
                    //this section is created to display genres of the movie
                    for(j=0; j<genre_ids.length;j++){
                        for(k=0;k<genre_obj["genres"].length;k++){
                            if(genre_ids[j]==genre_obj["genres"][k]["id"]){
                                poster_p.appendChild(document.createTextNode(genre_obj["genres"][k]["name"]));
                                poster_p.appendChild(document.createTextNode(", "));
                            }
                        }
                    }
                    poster_p_with_no_symbol.innerText = poster_p.innerText.substring(0,poster_p.innerText.length-2);
                    poster_p_with_no_symbol.className = "tag";
                    overview_section.append(poster_p_with_no_symbol);
                    overview_section.append(br_tag);
                    var vote_star = document.createElement('p');
                    vote_star.innerHTML = "&#9733;"+(vote_average/2).toFixed(2)+"/5 ";
                    vote_star.className = "vote_star";

                    var votes = document.createElement('span');
                    votes.innerHTML=vote_count+" votes";
                    votes.style.color="white";
                    votes.style.marginLeft="3px";
                    votes.style.verticalAlign = "top";
                    overview_section.append(vote_star);
                    vote_star.append(votes);
                    overview_section.append(br_tag);
                    var poster_overview = document.createElement('p');
                    poster_overview.innerText = overview;
                    poster_overview.className = "overview_content";
                    overview_section.append(poster_overview);
                    overview_section.append(br_tag);
                    var show_more_button = document.createElement('button');
                    show_more_button.className = "show_more";
                    show_more_button.id = "show_more"+i.toString();
                    show_more_button.innerText="Show more";
                    var addOnclick = function(id,media_type,title){
                        show_more_button.onclick= ()=>display_detail(id,media_type,title);
                    };
                    addOnclick(id,media_type,title);
                    overview_section.append(show_more_button);
                    overview_section.append(br_tag);
                }

            }
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/search/"+key+"&"+category, true);
    //xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();

}
function DisplayMultiResult(key,category,movie_genre,tv_genre){

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);

            var max_result_number = 10;
            if(obj["results"].length<10){
                max_result_number = obj["results"].length;
            }
            if (obj["results"].length==0){
                document.getElementById("show_result").style.display="none";
                document.getElementById("no_result_found").style.display="block";
            }
            else{
                document.getElementById("show_result").style.display="block";
                document.getElementById("no_result_found").style.display="none";
                var poster_section = document.getElementById("poster");

                var br_tag = document.createElement('br');
                for(i = 0;i<max_result_number;i++){
                    var media_type;
                    if(obj["results"][i]["release_date"]){
                        media_type = "movie";
                        var genre_obj = movie_genre;
                        var title = obj["results"][i]["title"];
                        var release_date = obj["results"][i]["release_date"];

                    }
                    else {
                        media_type = "tv";
                        var genre_obj = tv_genre;
                        var title = obj["results"][i]["name"];
                        var release_date = obj["results"][i]["first_air_date"];
                    }
                    var id = obj["results"][i]["id"];
                    var overview = obj["results"][i]["overview"];
                    var poster_path = obj["results"][i]["poster_path"];
                    var vote_average = obj["results"][i]["vote_average"];
                    var vote_count = obj["results"][i]["vote_count"];
                    var genre_ids = obj["results"][i]["genre_ids"];
                    var poster_img = document.createElement('img');
                    poster_img.id="poster"+i.toString();
                    if (poster_path){
                        poster_img.src = "https://image.tmdb.org/t/p/w185/"+poster_path;
                    }
                    else {
                        poster_img.src = "https://cinemaone.net/images/movie_placeholder.png";
                    }
                    var poster_wrapper = document.createElement('div');
                    poster_wrapper.id="pos_wrapper"+i.toString();
                    poster_wrapper.className = "poster_wrapper";
                    poster_section.append(poster_wrapper);
                    poster_wrapper.append(poster_img);

                    var poster_h1 = document.createElement('h1');
                    var overview_section = document.createElement('div');
                    overview_section.className = "overview_section";
                    overview_section.id = "overview_sec"+i.toString();
                    poster_wrapper.append(overview_section);
                    poster_h1.innerText = title;
                    poster_h1.id = "poster_title"+i.toString();
                    overview_section.append(poster_h1);
                    overview_section.append(br_tag);

                    var poster_p = document.createElement('p');
                    var poster_p_with_no_symbol = document.createElement('p');
                    poster_p.innerText = release_date.substring(0,4)+" | ";
                    //this section is created to display genres of the movie

                    for(j=0; j<genre_ids.length;j++){
                        for(k=0;k<genre_obj["genres"].length;k++){
                            if(genre_ids[j]==genre_obj["genres"][k]["id"]){
                                poster_p.appendChild(document.createTextNode(genre_obj["genres"][k]["name"]));
                                poster_p.appendChild(document.createTextNode(", "));
                            }
                        }
                    }
                    poster_p_with_no_symbol.innerText = poster_p.innerText.substring(0,poster_p.innerText.length-2);
                    poster_p_with_no_symbol.className = "tag";
                    overview_section.append(poster_p_with_no_symbol);
                    overview_section.append(br_tag);
                    var vote_star = document.createElement('p');
                    vote_star.innerHTML = "&#9733;"+(vote_average/2).toFixed(2)+"/5 ";
                    vote_star.className = "vote_star";

                    var votes = document.createElement('span');
                    votes.innerHTML=vote_count+" votes";
                    votes.style.color="white";
                    votes.style.marginLeft="3px";
                    votes.style.verticalAlign = "top";
                    overview_section.append(vote_star);
                    vote_star.append(votes);
                    overview_section.append(br_tag);
                    var poster_overview = document.createElement('p');
                    poster_overview.innerText = overview;
                    poster_overview.className = "overview_content";
                    overview_section.append(poster_overview);
                    overview_section.append(br_tag);
                    var show_more_button = document.createElement('button');

                    var addOnclick = function(id,media_type,title){
                        show_more_button.onclick= ()=>display_detail(id,media_type,title);
                    };
                    addOnclick(id,media_type,title);

                    show_more_button.className = "show_more";
                    show_more_button.id = "show_more"+i.toString();
                    show_more_button.innerText="Show more";
                    overview_section.append(show_more_button);
                    overview_section.append(br_tag);
                }

            }
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/search/"+key+"&"+category, true);
    //xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();

}
function display_detail(id,media_type,title) {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            if (media_type == "movie") {
                var runtime = obj["runtime"];
                var release_date = obj["release_date"];

            } else {
                var runtime = obj["episode_run_time"];
                var release_date = obj["first_air_date"];
                var number_season = obj["number_of_seasons"];
            }
            var br_tag = document.createElement('br');
            var spoken_languages = obj["spoken_languages"];
            var genres = obj["genres"];
            var vote_average = obj["vote_average"];
            var vote_count = obj["vote_count"];
            var overview = obj["overview"];
            var poster_path = obj["poster_path"]
            var backdrop_path = obj["backdrop_path"];
            var backdrop_img = document.createElement("img");
            backdrop_img.id = "backdrop_img";
            if (backdrop_path) {backdrop_img.src = "https://image.tmdb.org/t/p/w780/" + backdrop_path;}
            else {backdrop_img.src = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";}
            var poster_img = document.createElement('img');
            if (poster_path) {poster_img.src = "https://image.tmdb.org/t/p/w185/" + poster_path;}
            else {poster_img.src = "https://cinemaone.net/images/movie_placeholder.png";}

            var opac = document.getElementById("opac");
            opac.style.opacity = "0.3";
            opac.style.zIndex = "1";

            var popup_page = document.getElementById("popup_page");
            popup_page.style.display = "block";
            popup_page.style.position = "absolute";
            popup_page.style.zIndex = "2";


            var close_btn = document.createElement("button");
            close_btn.innerHTML = "&#10006;";
            close_btn.onclick = ()=> close_popup();
            close_btn.id = "close_btn";
            popup_page.append(close_btn);
            popup_page.append(backdrop_img);

            var wrapper = document.createElement("div");
            wrapper.id = "popup_wrapper";
            popup_page.append(wrapper);
            var _title = document.createElement("h1")
            _title.innerHTML = title;
            _title.style.display = "inline";
            wrapper.append(_title);
            var out_link = document.createElement("button");
            out_link.id = "out_link";
            out_link.innerHTML = "&#9432;";

            out_link.onclick = ()=> pop_tab(media_type,id);
            wrapper.append(out_link);

            var poster_p = document.createElement('p');
            var poster_p_with_no_symbol = document.createElement('p');
            poster_p.innerText = release_date.substring(0,4)+" | ";
            for(k=0;k<genres.length;k++){

                poster_p.appendChild(document.createTextNode(genres[k]["name"]));
                poster_p.appendChild(document.createTextNode(", "));
            }
            poster_p_with_no_symbol.innerText = poster_p.innerText.substring(0,poster_p.innerText.length-2);
            poster_p_with_no_symbol.className = "tag";
            wrapper.append(poster_p_with_no_symbol);
            wrapper.append(br_tag);
            var vote_star = document.createElement('p');
            vote_star.innerHTML = "&#9733;"+(vote_average/2).toFixed(2)+"/5 ";
            vote_star.className = "vote_star";

            var votes = document.createElement('span');
            votes.innerHTML=vote_count+" votes";
            votes.style.color="black";
            votes.style.marginLeft="3px";
            votes.style.verticalAlign = "top";
            wrapper.append(vote_star);
            vote_star.append(votes);
            wrapper.append(br_tag);
            var poster_overview = document.createElement('p');
            poster_overview.innerText = overview;
            poster_overview.className = "overview_content";
            poster_overview.style.color = "black";
            wrapper.append(poster_overview);
            wrapper.append(br_tag);

            var spoken_p = document.createElement("p");
            var spoken_p_no_symbol = document.createElement("p");
            spoken_p.innerHTML = "Spoken languages: ";
            for(k=0;k<spoken_languages.length;k++){

                spoken_p.appendChild(document.createTextNode(spoken_languages[k]["english_name"]));
                spoken_p.appendChild(document.createTextNode(", "));
            }
            spoken_p_no_symbol.innerText = spoken_p.innerText.substring(0,spoken_p.innerText.length-2);
            spoken_p_no_symbol.id = "spoken_p";
            wrapper.append(spoken_p_no_symbol);


            var cast = document.createElement("div");
            cast.id = "cast";
            var cast_h2 = document.createElement("h2");
            cast_h2.innerHTML = "Cast";
            wrapper.append(cast);
            cast.append(cast_h2);
            getActors(media_type,id);
        }
    };

    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/detail/"+media_type+"&"+id, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();

}
function getActors(media_type,id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            var actors = obj["cast"];
            var max_actor = 8;
            if (actors.length<8){
                max_actor = actors.length;
            }
            var cast_wrapper = document.getElementById("cast");
            for( i= 0; i < max_actor;i++){
                var img_wrapper = document.createElement("div");
                img_wrapper.className = "img_wrapper"
                cast_wrapper.append(img_wrapper);
                var profile_img = document.createElement("img");
                profile_img.id = "profile_img";
                var profile_path = actors[i]["profile_path"];
                if(profile_path){profile_img.src = "https://image.tmdb.org/t/p/w185/"+profile_path;}
                else {profile_img.src = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png";}
                img_wrapper.append(profile_img);

                var name_sec = document.createElement("div");
                name_sec.className= "name_sec";
                img_wrapper.append(name_sec);
                var actor_name = document.createElement("p");
                actor_name.innerText = actors[i]["name"];
                actor_name.className = "actor_name";
                name_sec.append(actor_name);
                var as = document.createElement("p");
                as.innerText = "AS";
                name_sec.append(as);
                var character_name = document.createElement("p");
                if (actors[i]["character"]){character_name.innerHTML = actors[i]["character"];}
                else {character_name.innerHTML = "Not found";}
                name_sec.append(character_name);

            }
            display_review(media_type,id);
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/actor/"+media_type+"&"+id, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();
}

function display_review(media_type,id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.response);
            var users = obj["results"]
            var max_reviews = 5;
            if(users.length<5){max_reviews = users.length;}
            var popup_wrapper = document.getElementById("popup_wrapper");
            var review_wrapper = document.createElement("div");
            review_wrapper.className = "review_wrapper";
            popup_wrapper.append(review_wrapper);
            var review_h1 = document.createElement("h1");
            review_h1.id = "review_h1";
            review_h1.innerHTML = "Reviews";
            review_wrapper.append(review_h1);
            for(k = 0; k<max_reviews;k++){
                var username = users[k]["author_details"]["username"];
                var create_date = users[k]["created_at"];
                var year = create_date.substring(0,4);
                var month = create_date.substring(5,7);
                var day = create_date.substring(8,10);
                var user = document.createElement("p");
                user.innerHTML = username;
                user.id = "username";
                var user_after = document.createElement("span");
                user_after.appendChild(document.createTextNode(" on "));
                user_after.appendChild(document.createTextNode(month));
                user_after.appendChild(document.createTextNode("/"));
                user_after.appendChild(document.createTextNode(day));
                user_after.appendChild(document.createTextNode("/"));
                user_after.appendChild(document.createTextNode(year));
                user_after.id= "user_after";
                user.append(user_after);
                review_wrapper.append(user);


                var rating = users[k]["author_details"]["rating"];
                if (rating){
                    var vote_star = document.createElement('p');
                    vote_star.innerHTML = "&#9733;"+(rating/2).toFixed(2)+"/5 ";
                    vote_star.className = "vote_star";
                    review_wrapper.append(vote_star);
                }
                var content = users[k]["content"];
                var comment = document.createElement("p");
                comment.innerHTML = content;
                comment.id = "comment";
                review_wrapper.append(comment);
                var hr_tag = document.createElement("hr");
                review_wrapper.append(hr_tag);

            }
        }
    };
    xhttp.open("GET", "https://csci571-jingwei-hw6-python-app.azurewebsites.net/review/"+media_type+"&"+id, true);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhttp.send();
}
function pop_tab(media,id) {
    window.open("https://www.themoviedb.org/"+media+"/"+id,'_blank');
}
function close_popup() {
    var detail = document.getElementById("popup_page");
    while(detail.firstChild && detail.removeChild(detail.firstChild));
    detail.style.display = "none";
    document.getElementById("opac").style.opacity = "1";
}
function search_page() {
    document.getElementById("t_movie").style.display="none";
    document.getElementById("a_tv").style.display = "none";
    document.getElementById("search_box").style.display="block";
    document.getElementById("home").style.border="none";
    document.getElementById("home").style.color="white";
    document.getElementById("search").style.color="darkred";
    document.getElementById("search").style.borderBottom= "1px solid #f1f1f1";
    document.getElementById("results").style.display="block";
}
function hover_home() {
    document.getElementById("home").style.color = "darkred";
}
function hover_search() {
    document.getElementById("search").style.color = "darkred";
}
function home_page() {

    document.getElementById("t_movie").style.display="block";
    document.getElementById("a_tv").style.display = "block";
    document.getElementById("search_box").style.display="none";
    document.getElementById("search").style.border="none";
    document.getElementById("home").style.color="darkred";
    document.getElementById("search").style.color="white";
    document.getElementById("home").style.borderBottom= "1px solid #f1f1f1";
    document.getElementById("results").style.display="none";
}