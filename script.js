

// const btnHam = document.querySelector('.ham-btn');
// const btnTimes = document.querySelector('.times-btn');
// const navBar = document.getElementById('nav-bar');

// btnHam.addEventListener('click', function(){
//     if(btnHam.className !== ""){
//         btnHam.style.display = "none";
//         btnTimes.style.display = "block";
//         navBar.classList.add("show-nav");
//     }
// })

// btnTimes.addEventListener('click', function(){
//     if(btnHam.className !== ""){
//         this.style.display = "none";
//         btnHam.style.display = "block";
//         navBar.classList.remove("show-nav");
//     }
// })

function triggerTest()
{
    var el = document.getElementById("news_head");
    if (el)
    {
        el.innerHTML = formatTextElement("This is a test", "darren")
    }
}


function triggerTest2()
{

    var el = document.getElementById("news_left");
    if (el)
    {
        el.innerHTML = formatImageElement("This is a test", "darren", "images/banner-news-1.jpg", "test", "topic", "desc", "link", "cta")
    }

}

function formatTextElement(title, author)
{
    var txtFormat = "<h3>[[->TITLE<-]] <span>by [[->AUTHOR<-]]</span></h3>";
    var str = "";
    str = txtFormat;
    if (title != null)
    {
        str = splitJoin(str, "[[->TITLE<-]]", title);
    }
    if (author != null)
    {
        str = splitJoin(str, "[[->AUTHOR<-]]", author);
    }
    return str;
}

function formatImageElement(title, author, img, alt, topic, desc, link, cta)
{
    var imgFormat = '<div class="hot-topic"> \
    <img src="[[->IMAGE<-]]" alt="[[->ALT<-]]"> \
    <div class="hot-topic-content"> \
        <h2>[[->TITLE<-]]</h2> \
        <h3>[[->TOPIC<-]]</h3> \
        <p>[[->DESC<-]]</p> \
        <a href="[[->LINK<-]]">[[->CTA<-]]</a> \
    </div> \
';
    var str = "";
    str = imgFormat;
    if (title != null)
    {
        str = splitJoin(str, "[[->TITLE<-]]", title);
    }
    if (author != null)
    {
        str = splitJoin(str, "[[->AUTHOR<-]]", author);
    }
    if (img != null)
    {
        str = splitJoin(str, "[[->IMAGE<-]]", img);
    }
    if (alt != null)
    {
        str = splitJoin(str, "[[->ALT<-]]", alt);
    }
    if (topic != null)
    {
        str = splitJoin(str, "[[->TOPIC<-]]", topic);
    }
    if (desc != null)
    {
        str = splitJoin(str, "[[->DESC<-]]", desc);
    }
    if (link != null)
    {
        str = splitJoin(str, "[[->LINK<-]]", link);
    }
    if (cta != null)
    {
        str = splitJoin(str, "[[->CTA<-]]", cta);
    }
    return str;
}

function splitJoin(str, match, out)
{
    var a = null;
    if (str != null && match != null && out != null)
    {
        if (typeof str != 'string')
        {
            str = String(str);
        }
        a = str.split(match);
        a = a.join(out)
    }
    else
    {
        a = str;
    }
    return (a);
}