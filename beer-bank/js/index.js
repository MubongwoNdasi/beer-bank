window.onload = function() {
    // defining routes
    let random = 'https://api.punkapi.com/v2/beers/random';
    let beers = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';

    // defining global e1s of the modal
    let modal_container = $("#modal-container");
    let img_div = document.createElement("div");
    let modal_container1 = document.createElement("div");
    modal_container1.classList.add("container1");
    img_div.classList.add("img");

    let img_details_container = document.createElement("div");
    img_details_container.classList.add("detail");

    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let h3_last = document.createElement("h3");
    h3_last.classList.add("h3_last");
    let h4 = document.createElement("h4");

    let modal_p_des = document.createElement("p");
    modal_p_des.classList.add("description");

    let modal_span_main_container = document.createElement("div");
    modal_span_main_container.setAttribute("class", "spanContainer");

    let modal_span1Container_des_top = document.createElement("div");
    let modal_span2Container_des_top = document.createElement("div");
    let modal_span3Container_des_top = document.createElement("div");

    let modal_span1_tag = document.createElement("span");
    let modal_span2_tag = document.createElement("span");
    let modal_span3_tag = document.createElement("span");

    modal_span1_tag.innerHTML = "IBU: ";
    modal_span2_tag.innerHTML = "ABV: ";
    modal_span3_tag.innerHTML = "EBC: ";

    let modal_span1_des_top = document.createElement("span");
    let modal_span2_des_top = document.createElement("span");
    let modal_span3_des_top = document.createElement("span");

    let modal_ul = document.createElement("ul");
    modal_ul.setAttribute('id', 'ul');


    let modal_last = document.createElement("div");
    modal_last.classList.add("modal-flex");

    let currentIbu;
    let globalIbu = modal_span1_des_top;
    let currentAbv;
    let globalAbv = modal_span2_des_top;
    let currentEbc;
    let globalEbc = modal_span3_des_top;

    let currentTitle;
    let globalTitle = h2;

    let currentSubTitle;
    let globalSubTitle = h4;

    let currentDescription;
    let globalDescription = modal_p_des;

    let currentImage;
    let globalImage = new Image();
    globalImage.setAttribute("alt", "image");

    // global variables for the first display and the modal e1
    let main = document.getElementById("load");

    let modal = document.getElementById('modal');
    let span = document.getElementsByClassName("close")[0];

    function setUp() {

        delay();
        $.get(beers).
        then(list => {
            // third fetch request of the search
            $.get('https://api.punkapi.com/v2/beers?page=3&per_page=80', (data1) => {
                for (let i in data1) {
                    let list = document.createElement("li");
                    list.classList.add("list-item");
                    list.innerHTML = data1[i].name;
                    list.addEventListener("click", (e) => {
                        $("#search").val(data1[i].name);
                        $("#result").css("display", "none");
                        $('#load').html('');

                        //create block e1
                        let div = document.createElement("div");
                        div.setAttribute("class", "block");

                        // creating span e1
                        let star_container = document.createElement("div");
                        star_container.classList.add("star-container");
                        let star = document.createElement("span");
                        star.classList.add("star", "glyphicon", "glyphicon-star-empty");
                        star_container.appendChild(star);

                        // create image container
                        let image_container = document.createElement("div");
                        image_container.classList.add("img-container", "img");

                        // creating p tag e1s
                        let p_title = document.createElement("p");
                        p_title.setAttribute("class", "title");

                        let p_des = document.createElement("p");
                        p_des.setAttribute("class", "des");

                        // appending
                        main.append(div);
                        div.append(star_container);
                        div.append(image_container);
                        div.append(p_title);
                        div.append(p_des);

                        // assigning
                        let img = new Image();
                        img.src = data1[0].image_url;
                        img.setAttribute("alt", "image");

                        image_container.append(img);
                        p_title.innerHTML = data1[0].name;
                        p_des.innerHTML = data1[0].tagline;
                    })
                    $("#result").append(list);
                };
            });
            // marking selected beers
            $(".star.glyphicon").on("click", function() {
                $(this).toggleClass("glyphicon-star glyphicon-star-empty");
                if ($(this).hasClass("glyphicon-star")) {
                    $(".nav .fav").on("click", () => {})
                    localStorage.setItem('myCat', 'Tom');
                    console.log("checked");
                } else {
                    console.log("unchecked")
                }
                $(this).css("color", "#F79400");
            });
            return $.get(beers);
        }).
        catch(function(error) {
            console.log(error);
        })
    }
    setUp();

    function display() {
        let promise = $.get(beers).then(function(beer) {
            for (let i in beer) {
                //create block e1
                let div = document.createElement("div");
                div.setAttribute("class", "block");

                // creating span e1
                let star_container = document.createElement("div");
                star_container.classList.add("star-container");
                let star = document.createElement("span");
                star.classList.add("star", "glyphicon", "glyphicon-star-empty");
                star_container.appendChild(star);

                // create image container
                let image_container = document.createElement("div");
                image_container.classList.add("img-container", "img");

                // creating p tag e1s
                let p_title = document.createElement("p");
                p_title.setAttribute("class", "title");

                let p_des = document.createElement("p");
                p_des.setAttribute("class", "des");

                // appending
                main.append(div);
                div.append(star_container);
                div.append(image_container);
                div.append(p_title);
                div.append(p_des);

                // assigning
                let img = new Image();
                img.src = beer[i].image_url;
                img.setAttribute("alt", "image");

                image_container.append(img);
                p_title.innerHTML = beer[i].name;
                p_des.innerHTML = beer[i].tagline;

                // accessing the modal
                image_container.addEventListener("click", function(e1) {
                    modal.style.display = "block";
                    span.onclick = function() {
                        modal.style.display = "none";
                    }
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    };

                    // setting-up global e1s
                    let presentImage = beer[i].image_url;
                    currentImage = presentImage;
                    globalImage.src = currentImage;

                    let presentTitle = beer[i].name;
                    currentTitle = presentTitle;
                    globalTitle.innerHTML = currentTitle;

                    let presentSubTitle = beer[i].tagline;
                    currentSubTitle = presentSubTitle;
                    globalSubTitle.innerHTML = currentSubTitle;

                    let presentDescription = beer[i].description;
                    currentDescription = presentDescription;
                    globalDescription.innerHTML = currentDescription;

                    let presentIbu = beer[i].ibu;
                    currentIbu = presentIbu;
                    globalIbu.innerHTML = currentIbu;

                    let presentAbv = beer[i].abv + "%";
                    currentAbv = presentAbv;
                    globalAbv.innerHTML = currentAbv;

                    let presentEbc = beer[i].ebc;
                    currentEbc = presentEbc;
                    globalEbc.innerHTML = currentEbc;


                    img_details_container.append(h2);
                    img_details_container.append(h4);
                    img_details_container.append(modal_span_main_container);
                    img_details_container.append(modal_p_des);
                    img_details_container.append(h3);
                    img_details_container.append(modal_ul);

                    // appending span elements
                    modal_span1Container_des_top.appendChild(modal_span1_tag);
                    modal_span1Container_des_top.appendChild(modal_span1_des_top);

                    modal_span2Container_des_top.appendChild(modal_span2_tag);
                    modal_span2Container_des_top.appendChild(modal_span2_des_top);

                    modal_span3Container_des_top.appendChild(modal_span3_tag);
                    modal_span3Container_des_top.appendChild(modal_span3_des_top);

                    // span main container appendings
                    modal_span_main_container.appendChild(modal_span1Container_des_top);
                    modal_span_main_container.appendChild(modal_span2Container_des_top);
                    modal_span_main_container.appendChild(modal_span3Container_des_top);

                    // appending modal container
                    modal_container.append(modal_container1);
                    modal_container1.append(img_div);
                    img_div.append(globalImage);
                    modal_container1.append(img_details_container);
                    modal_container.append(h3_last);
                    modal_container.append(modal_last);

                    // inputing html contents
                    h2.innerHTML = beer[i].name;
                    h4.innerHTML = beer[i].tagline;
                    modal_p_des.innerHTML = beer[i].description;
                    h3.innerHTML = "Best served with: ";
                    h3_last.innerHTML = "You might also like: ";

                    // food pairing
                    $.each(beer[i].food_pairing, food_item => {
                        let li = document.createElement("li");
                        li.classList.add("modal-li");
                        li.innerHTML = beer[i].food_pairing[food_item];
                        modal_ul.append(li);
                    });

                });

            };

            // first fetch request of the search
            $.get('https://api.punkapi.com/v2/beers?page=1&per_page=80', (data1) => {
                for (let i in data1) {
                    let list = document.createElement("li");
                    list.classList.add("list-item");
                    list.innerHTML = data1[i].name;
                    list.addEventListener("click", (e) => {
                        $("#search").val(data1[i].name);
                        $("#result").css("display", "none");
                        $('#load').html('');

                        //create block e1
                        let div = document.createElement("div");
                        div.setAttribute("class", "block");

                        // creating span e1
                        let star_container = document.createElement("div");
                        star_container.classList.add("star-container");
                        let star = document.createElement("span");
                        star.classList.add("star", "glyphicon", "glyphicon-star-empty");
                        star_container.appendChild(star);

                        // create image container
                        let image_container = document.createElement("div");
                        image_container.classList.add("img-container", "img");

                        // creating p tag e1s
                        let p_title = document.createElement("p");
                        p_title.setAttribute("class", "title");

                        let p_des = document.createElement("p");
                        p_des.setAttribute("class", "des");

                        // appending
                        main.append(div);
                        div.append(star_container);
                        div.append(image_container);
                        div.append(p_title);
                        div.append(p_des);

                        // assigning
                        let img = new Image();
                        img.src = data1[0].image_url;
                        img.setAttribute("alt", "image");

                        image_container.append(img);
                        p_title.innerHTML = data1[0].name;
                        p_des.innerHTML = data1[0].tagline;
                    })
                    $("#result").append(list);
                };
            });
            return $.get(beers);
        });
    }
    async function delay() {
        await display();
        $.get(beers).
        then(preview => {
            let loop = 0;
            // let randomBeer = random;
            while (loop < 3) {
                let index = 0;
                // let index = getRandomInt(minimum, length);
                $.get(random).then(e1 => {

                    let imgURl = e1[index].image_url;
                    let beerName = e1[index].name;
                    let beerTag = e1[index].tagline;
                    // console.log(beerName);

                    // Creating img tag
                    let img = new Image();
                    img.src = imgURl;
                    let imageContainer = document.createElement("div");
                    imageContainer.classList.add("beer-images");
                    imageContainer.append(img);

                    // creating h2 tag for title
                    let p_title = document.createElement('p');
                    p_title.classList.add('title');
                    p_title.innerHTML = beerName;

                    // creating h4 tag for subtitle
                    let p_des = document.createElement('p');
                    p_des.classList.add('des');
                    p_des.innerHTML = beerTag;

                    let div = document.createElement('div');
                    div.classList.add('block', 'try');

                    div.append(imageContainer);
                    div.append(p_title);
                    div.append(p_des);

                    modal_last.append(div);


                    div.addEventListener("click", () => {
                        // editing the global variables on the onclick() function

                        let beerImageUrl = e1[index].image_url;
                        currentImage = beerImageUrl;
                        // console.log(e1[index].name);
                        let beerTitle = e1[index].name;
                        currentTitle = beerTitle;

                        let beerSubTitle = e1[index].tagline;
                        currentSubTitle = beerSubTitle;

                        let beerDescription = e1[index].description;
                        currentDescription = beerDescription;

                        let beerIbu = e1[index].ibu;
                        currentIbu = beerIbu;
                        // console.log(beerIbu);
                        let beerAbv = e1[index].abv + "%";
                        currentAbv = beerAbv;

                        let beerEbc = e1[index].ebc;
                        currentEbc = beerEbc;

                        globalImage.src = currentImage;
                        globalTitle.innerHTML = currentTitle;
                        globalSubTitle.innerHTML = currentSubTitle;
                        globalDescription.innerHTML = currentDescription;

                        globalIbu.innerHTML = currentIbu;
                        globalAbv.innerHTML = currentAbv;
                        globalEbc.innerHTML = currentEbc;

                        img_div.style.height = "500px";
                        // let modal_li = document.querySelectorAll('.modal-li');

                        while (modal_ul.firstChild) {
                            modal_ul.removeChild(modal_ul.firstChild);
                        };
                        $.each(e1[index].food_pairing, food_item => {
                            let li = document.createElement("li");
                            li.classList.add("new-modal-li");
                            li.innerHTML = e1[index].food_pairing[food_item];
                            modal_ul.append(li);
                        });

                    });
                });
                loop++;
            };
            // second fetch request of the search
            $.get('https://api.punkapi.com/v2/beers?page=2&per_page=80', (data1) => {
                for (let i in data1) {
                    let list = document.createElement("li");
                    list.classList.add("list-item");
                    list.innerHTML = data1[i].name;
                    list.addEventListener("click", (e) => {
                        $("#search").val(data1[i].name);
                        $("#result").css("display", "none");
                        $('#load').html('');

                        //create block e1
                        let div = document.createElement("div");
                        div.setAttribute("class", "block");

                        // creating span e1
                        let star_container = document.createElement("div");
                        star_container.classList.add("star-container");
                        let star = document.createElement("span");
                        star.classList.add("star", "glyphicon", "glyphicon-star-empty");
                        star_container.appendChild(star);

                        // create image container
                        let image_container = document.createElement("div");
                        image_container.classList.add("img-container", "img");

                        // creating p tag e1s
                        let p_title = document.createElement("p");
                        p_title.setAttribute("class", "title");

                        let p_des = document.createElement("p");
                        p_des.setAttribute("class", "des");

                        // appending
                        main.append(div);
                        div.append(star_container);
                        div.append(image_container);
                        div.append(p_title);
                        div.append(p_des);

                        // assigning
                        let img = new Image();
                        img.src = data1[0].image_url;
                        img.setAttribute("alt", "image");

                        image_container.append(img);
                        p_title.innerHTML = data1[0].name;
                        p_des.innerHTML = data1[0].tagline;
                    })
                    $("#result").append(list);
                };
            });

            return $.get(beers);
        }).catch((error) => {
            console.log(error);
        });
    }

    // global functions when the DOM is ready
    $(document).ready(function() {
        $("#search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#result li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            $("#result").css("display", "block");
        });

        // scrolling back to top

        var visible = false;
        //Check to see if the window is top if not then display button
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (!visible && scrollTop > 100) {
                $(".scrollToTop").fadeIn();
                visible = true;
            } else if (visible && scrollTop <= 100) {
                $(".scrollToTop").fadeOut();
                visible = false;
            }
        });

        //Click event to scroll to top
        $(".scrollToTop").click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });

    });
};