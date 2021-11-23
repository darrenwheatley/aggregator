

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

// https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml

// https://dev.to/feed/

////////////////////////////////////////////////////////////////////

function fetchRSSMain()
{
    // Map the information in the source here so we can use it
    const txtAmount = 4;
    const txtSource = getTextRSSSource();
    const imgAmount = 4;
    const imgSource = getImageRSSSource();

    var el1 = document.getElementById("news_head");
    if (el1)
    {
        txtItems = fetchTextRSS(txtSource, txtAmount, el1);
        // el1.innerHTML = formatTextElement(txtItems[0].description, txtItems[0].author);
    }
    var el2 = document.getElementById("news_item");
    if (el2)
    {
        var imgItems = fetchImageRSS(imgSource, imgAmount, el2);
    }
}

function getTextRSSSource()
{
    var txtSource =
    {
        source: "https://dev.to/feed/tag/technology",
        attributes:
        {
            topic:
            {
                id: "title",
                type: "standard",
                target: "topic",
                sub: null
            },
            items:
            {
                id: "item",
                type: "list",
                target: "",
                sub: null
            }
        },
        items:
        {
            date:
            {
                id: "pubDate",
                type: "standard",
                target: "date",
                sub: null
            },
            title:
            {
                id: "title",
                type: "standard",
                target: "title",
                sub: null
            },
            author:
            {
                id: "author",
                type: "standard",
                target: "author",
                sub: null
            },
            description:
            {
                id: "description",
                type: "standard",
                target: "description",
                sub: null
            },
            link:
            {
                id: "link",
                type: "standard",
                target: "link",
                sub: null
            },
            cta:
            {
                id: "constant",
                type: "constant",
                target: "cta",
                sub: "Read more"
            },
            tags:
            {
                id: "category",
                type: "tags",
                target: "tags",
                sub: null
            }
        }
    };
    return txtSource;
}

function getImageRSSSource()
{
    var imgSource =
    {
        source: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
        attributes:
        {
            topic:
            {
                id: "title",
                type: "standard",
                target: "topic",
                sub: null
            },
            items:
            {
                id: "item",
                type: "list",
                target: "",
                sub: null
            }
        },
        items:
        {
            date:
            {
                id: "pubDate",
                type: "standard",
                target: "date",
                sub: null
            },
            title:
            {
                id: "title",
                type: "standard",
                target: "title",
                sub: null
            },
            img:
            {
                id: "media:content",
                type: "attribute",
                target: "img",
                sub: "url"
            },
            alt:
            {
                id: null,
                type: "pointer",
                target: "alt",
                sub: "title"
            },
            author:
            {
                id: "dc:creator",
                type: "standard",
                target: "author",
                sub: null
            },
            description:
            {
                id: "description",
                type: "standard",
                target: "description",
                sub: null
            },
            link:
            {
                id: "link",
                type: "standard",
                target: "link",
                sub: null
            },
            cta:
            {
                id: "constant",
                type: "constant",
                target: "cta",
                sub: "Read more"
            },
            tags:
            {
                id: "category",
                type: "tags",
                target: "tags",
                sub: null
            }
        }
    };
    return imgSource;
}

// Simple code... written for ease of understanding. If there is interest in the comments I will refactor the code as part of another video

function fetchRSS(source, amount, el_out)
{
    var ret = [];
    fetch(source.source)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data =>
    {
        console.log(data);
        if (source != null && source.attributes != null)
        {
            var attributes = {};
            var keys = Object.keys(source.attributes);
            for(var i=0;i<keys.length;i++)
            {
                if (source.attributes[keys[i]] != null && source.attributes[keys[i]].type != null)
                {
                    if (source.attributes[keys[i]].type == "standard")
                    {
                        if (source.attributes[keys[i]].target != null)
                        {
                            attributes[source.attributes[keys[i]].target] = data.querySelector(source.attributes[keys[i]].id).innerHTML;
                        }
                    }
                    else if (source.attributes[keys[i]].type == "list")
                    {
                        const items = data.querySelectorAll("item");
                        for (var i=0;i<items.length;i++)
                        {
                            var rssItem =
                            {
                                source: source.source,
                                date: null,
                                topic: null,
                                title: null,
                                img: null,
                                alt: null,
                                author: null,
                                description: null,
                                link:  null,
                                cta: null
                            }
                            for (var j=0;j<items[i].children.length;j++)
                            {
                                var tag = items[i].children[j].tagName;
                                // Loop through the items part of the source loop
                                var sKeys = Object.keys(source.items);
                                for (var k=0;k<sKeys.length;k++)
                                {
                                    if (source.items[sKeys[k]] != null && source.items[sKeys[k]].id == tag)
                                    {
                                        if (source.items[sKeys[k]].type == "standard")
                                        {
                                            rssItem[source.items[sKeys[k]].target] = items[i].children[j].innerHTML;
                                        }
                                        else if (source.items[sKeys[k]].type == "attribute")
                                        {
                                            var attr = items[i].children[j].attributes;
                                            for (var l=0;l<attr.length;l++)
                                            {
                                                if (attr[l] != null && attr[l].nodeName == source.items[sKeys[k]].sub && attr[l].value != null)
                                                {
                                                    rssItem[source.items[sKeys[k]].target] = attr[l].value;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else if (source.items[sKeys[k]].type == "constant")
                                    {
                                        rssItem[source.items[sKeys[k]].target] = source.items[sKeys[k]].sub;
                                    }
                                }
                            }
                            // Post processing
                            var aKeys = Object.keys(attributes);
                            for (var m=0;m<aKeys.length;m++)
                            {
                                rssItem[aKeys[m]] = attributes[aKeys[m]];
                            }
                            for (var m=0;m<sKeys.length;m++)
                            {
                                if (source.items[sKeys[m]].type == "pointer")
                                {
                                    for (var n=0;n<sKeys.length;n++)
                                    {
                                        if (source.items[sKeys[n]].id == source.items[sKeys[m]].sub)
                                        {
                                            rssItem[source.items[sKeys[m]].target] = rssItem[source.items[sKeys[m]].sub];
                                            break;
                                        }
                                    }
                                }
                            }
                            ret[ret.length] = rssItem;
                        }
                    }
                }
            }
        }
        if (ret != null && ret.length > 0)
        {
            var strRet = "";
            for (var i=0;i<amount;i++)
            {
                if (ret[i] != null)
                {
                    strRet = strRet + formatImageElement(ret[i].title, ret[i].author, ret[i].img, ret[i].alt, ret[i].topic, ret[i].description, ret[i].link, ret[i].cta);
                }
            }
            el_out.innerHTML = strRet;
        }
    });
}


function fetchImageRSS(source, amount, el_out)
{
    var ret = [];
    fetch(source.source)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data =>
    {
        console.log(data);
        if (source != null && source.attributes != null)
        {
            var attributes = {};
            var keys = Object.keys(source.attributes);
            for(var i=0;i<keys.length;i++)
            {
                if (source.attributes[keys[i]] != null && source.attributes[keys[i]].type != null)
                {
                    if (source.attributes[keys[i]].type == "standard")
                    {
                        if (source.attributes[keys[i]].target != null)
                        {
                            attributes[source.attributes[keys[i]].target] = data.querySelector(source.attributes[keys[i]].id).innerHTML;
                        }
                    }
                    else if (source.attributes[keys[i]].type == "list")
                    {
                        const items = data.querySelectorAll("item");
                        for (var i=0;i<items.length;i++)
                        {
                            var rssItem =
                            {
                                source: source.source,
                                date: null,
                                topic: null,
                                title: null,
                                img: null,
                                alt: null,
                                author: null,
                                description: null,
                                link:  null,
                                cta: null
                            }
                            for (var j=0;j<items[i].children.length;j++)
                            {
                                var tag = items[i].children[j].tagName;
                                // Loop through the items part of the source loop
                                var sKeys = Object.keys(source.items);
                                for (var k=0;k<sKeys.length;k++)
                                {
                                    if (source.items[sKeys[k]] != null && source.items[sKeys[k]].id == tag)
                                    {
                                        if (source.items[sKeys[k]].type == "standard")
                                        {
                                            rssItem[source.items[sKeys[k]].target] = items[i].children[j].innerHTML;
                                        }
                                        else if (source.items[sKeys[k]].type == "attribute")
                                        {
                                            var attr = items[i].children[j].attributes;
                                            for (var l=0;l<attr.length;l++)
                                            {
                                                if (attr[l] != null && attr[l].nodeName == source.items[sKeys[k]].sub && attr[l].value != null)
                                                {
                                                    rssItem[source.items[sKeys[k]].target] = attr[l].value;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else if (source.items[sKeys[k]].type == "constant")
                                    {
                                        rssItem[source.items[sKeys[k]].target] = source.items[sKeys[k]].sub;
                                    }
                                }
                            }
                            // Post processing
                            var aKeys = Object.keys(attributes);
                            for (var m=0;m<aKeys.length;m++)
                            {
                                rssItem[aKeys[m]] = attributes[aKeys[m]];
                            }
                            for (var m=0;m<sKeys.length;m++)
                            {
                                if (source.items[sKeys[m]].type == "pointer")
                                {
                                    for (var n=0;n<sKeys.length;n++)
                                    {
                                        if (source.items[sKeys[n]].id == source.items[sKeys[m]].sub)
                                        {
                                            rssItem[source.items[sKeys[m]].target] = rssItem[source.items[sKeys[m]].sub];
                                            break;
                                        }
                                    }
                                }
                            }
                            ret[ret.length] = rssItem;
                        }
                    }
                }
            }
        }
        if (ret != null && ret.length > 0)
        {
            var strRet = "";
            for (var i=0;i<amount;i++)
            {
                if (ret[i] != null)
                {
                    strRet = strRet + formatImageElement(ret[i].title, ret[i].author, ret[i].img, ret[i].alt, ret[i].topic, ret[i].description, ret[i].link, ret[i].cta);
                }
            }
            el_out.innerHTML = strRet;
        }
    });
}

function fetchTextRSS(source, amount, el_out)
{
    var ret = [];
    fetch(source.source)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data =>
    {
        console.log(data);
        if (source != null && source.attributes != null)
        {
            var attributes = {};
            var keys = Object.keys(source.attributes);
            for(var i=0;i<keys.length;i++)
            {
                if (source.attributes[keys[i]] != null && source.attributes[keys[i]].type != null)
                {
                    if (source.attributes[keys[i]].type == "standard")
                    {
                        if (source.attributes[keys[i]].target != null)
                        {
                            attributes[source.attributes[keys[i]].target] = data.querySelector(source.attributes[keys[i]].id).innerHTML;
                        }
                    }
                    else if (source.attributes[keys[i]].type == "list")
                    {
                        const items = data.querySelectorAll("item");
                        for (var i=0;i<items.length;i++)
                        {
                            var rssItem =
                            {
                                source: source.source,
                                date: null,
                                topic: null,
                                title: null,
                                img: null,
                                alt: null,
                                author: null,
                                description: null,
                                link:  null,
                                cta: null
                            }
                            for (var j=0;j<items[i].children.length;j++)
                            {
                                var tag = items[i].children[j].tagName;
                                // Loop through the items part of the source loop
                                var sKeys = Object.keys(source.items);
                                for (var k=0;k<sKeys.length;k++)
                                {
                                    if (source.items[sKeys[k]] != null && source.items[sKeys[k]].id == tag)
                                    {
                                        if (source.items[sKeys[k]].type == "standard")
                                        {
                                            rssItem[source.items[sKeys[k]].target] = items[i].children[j].innerHTML;
                                        }
                                        else if (source.items[sKeys[k]].type == "attribute")
                                        {
                                            var attr = items[i].children[j].attributes;
                                            for (var l=0;l<attr.length;l++)
                                            {
                                                if (attr[l] != null && attr[l].nodeName == source.items[sKeys[k]].sub && attr[l].value != null)
                                                {
                                                    rssItem[source.items[sKeys[k]].target] = attr[l].value;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else if (source.items[sKeys[k]].type == "constant")
                                    {
                                        rssItem[source.items[sKeys[k]].target] = source.items[sKeys[k]].sub;
                                    }
                                }
                            }
                            // Post processing
                            var aKeys = Object.keys(attributes);
                            for (var m=0;m<aKeys.length;m++)
                            {
                                rssItem[aKeys[m]] = attributes[aKeys[m]];
                            }
                            for (var m=0;m<sKeys.length;m++)
                            {
                                if (source.items[sKeys[m]].type == "pointer")
                                {
                                    for (var n=0;n<sKeys.length;n++)
                                    {
                                        if (source.items[sKeys[n]].id == source.items[sKeys[m]].sub)
                                        {
                                            rssItem[source.items[sKeys[m]].target] = rssItem[source.items[sKeys[m]].sub];
                                            break;
                                        }
                                    }
                                }
                            }
                            ret[ret.length] = rssItem;
                        }
                    }
                }
            }
        }
        if (ret != null && ret.length > 0)
        {
            var strRet = "";
            for (var i=0;i<amount;i++)
            {
                if (ret[i] != null)
                {
                    strRet = strRet + formatTextElement(ret[i].title, ret[i].author);
                }
            }
            el_out.innerHTML = strRet;
        }
    });
}


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

    var el = document.getElementById("news_item");
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
    else
    {
        str = splitJoin(str, "", title);
    }
    if (author != null)
    {
        str = splitJoin(str, "[[->AUTHOR<-]]", author);
    }
    else
    {
        str = splitJoin(str, "", author);
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
</div>';
    var str = "";
    str = imgFormat;
    if (title != null)
    {
        str = splitJoin(str, "[[->TITLE<-]]", title);
    }
    else
    {
        str = splitJoin(str, "", title);
    }
    if (author != null)
    {
        str = splitJoin(str, "[[->AUTHOR<-]]", author);
    }
    else
    {
        str = splitJoin(str, "", author);
    }
    if (img != null)
    {
        str = splitJoin(str, "[[->IMAGE<-]]", img);
    }
    else
    {
        str = splitJoin(str, "", img);
    }
    if (alt != null)
    {
        str = splitJoin(str, "[[->ALT<-]]", alt);
    }
    else
    {
        str = splitJoin(str, "", alt);
    }
    if (topic != null)
    {
        str = splitJoin(str, "[[->TOPIC<-]]", topic);
    }
    else
    {
        str = splitJoin(str, "", topic);
    }
    if (desc != null)
    {
        str = splitJoin(str, "[[->DESC<-]]", desc);
    }
    else
    {
        str = splitJoin(str, "", desc);
    }
    if (link != null)
    {
        str = splitJoin(str, "[[->LINK<-]]", link);
    }
    else
    {
        str = splitJoin(str, "", link);
    }
    if (cta != null)
    {
        str = splitJoin(str, "[[->CTA<-]]", cta);
    }
    else
    {
        str = splitJoin(str, "", cta);
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