// Apache 2.0 J Chris Anderson 2011
$(function() {   
    // friendly helper http://tinyurl.com/6aow6yn
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var db = $.couch.db("nothingbetweenus");
    function drawItems() {
        db.view("nothingbetweenus/recent-items", {
            descending : "true",
            limit : 2000,
            update_seq : true,
            success : function(data) {
                setupChanges(data.update_seq);
                var them = $.mustache($("#recent-messages").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                $("#content").html(them);
            }
        });
    };
    drawItems();
    function drawLatest() {
        db.view("nothingbetweenus/recent-items", {
            descending : "true",
            limit : 10,
            update_seq : true,
            success : function(data) {
                setupChanges(data.update_seq);
                var them = $.mustache($("#recent-messages").html(),{
                    items : data.rows.map(function(r) {return r.value;})

                });
                $("#content").html(them);
            }
        });
    }
    var changesRunning = false;
    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems);
        }
    }
    function randomColor(){
        colors = [
          "aqua",
          "aliceblue",
          "antiquewhite",
          "black",
          "blue",
          "cyan",
          "darkblue",
          "darkcyan",
          "darkgreen",
          "darkturquoise",
          "deepskyblue",
          "green",
          "lime",
          "mediumblue",
          "mediumspringgreen",
          "navy",
          "springgreen",
          "teal",
          "midnightblue",
          "dodgerblue",
          "lightseagreen",
          "forestgreen",
          "seagreen",
          "darkslategray",
          "darkslategrey",
          "limegreen",
          "mediumseagreen",
          "turquoise",
          "royalblue",
          "steelblue",
          "darkslateblue",
          "mediumturquoise",
          "indigo",
          "darkolivegreen",
          "cadetblue",
          "cornflowerblue",
          "mediumaquamarine",
          "dimgray",
          "dimgrey",
          "slateblue",
          "olivedrab",
          "slategray",
          "slategrey",
          "lightslategray",
          "lightslategrey",
          "mediumslateblue",
          "lawngreen",
          "aquamarine",
          "chartreuse",
          "gray",
          "grey",
          "maroon",
          "olive",
          "purple",
          "lightskyblue",
          "skyblue",
          "blueviolet",
          "darkmagenta",
          "darkred",
          "saddlebrown",
          "darkseagreen",
          "lightgreen",
          "mediumpurple",
          "darkviolet",
          "palegreen",
          "darkorchid",
          "yellowgreen",
          "sienna",
          "brown",
          "darkgray",
          "darkgrey",
          "greenyellow",
          "lightblue",
          "paleturquoise",
          "lightsteelblue",
          "powderblue",
          "firebrick",
          "darkgoldenrod",
          "mediumorchid",
          "rosybrown",
          "darkkhaki",
          "silver",
          "mediumvioletred",
          "indianred",
          "peru",
          "chocolate",
          "tan",
          "lightgray",
          "lightgrey",
          "thistle",
          "goldenrod",
          "orchid",
          "palevioletred",
          "crimson",
          "gainsboro",
          "plum",
          "burlywood",
          "lightcyan",
          "lavender",
          "darksalmon",
          "palegoldenrod",
          "violet",
          "azure",
          "honeydew",
          "khaki",
          "lightcoral",
          "sandybrown",
          "beige",
          "mintcream",
          "wheat",
          "whitesmoke",
          "ghostwhite",
          "lightgoldenrodyellow",
          "linen",
          "salmon",
          "oldlace",
          "bisque",
          "blanchedalmond",
          "coral",
          "cornsilk",
          "darkorange",
          "deeppink",
          "floralwhite",
          "fuchsia",
          "gold",
          "hotpink",
          "ivory",
          "lavenderblush",
          "lemonchiffon",
          "lightpink",
          "lightsalmon",
          "lightyellow",
          "magenta",
          "mistyrose",
          "moccasin",
          "navajowhite",
          "orange",
          "orangered",
          "papayawhip",
          "peachpuff",
          "pink",
          "red",
          "seashell",
          "snow",
          "tomato",
          "white",
          "yellow"
        ]
        return colors[Math.floor(Math.random()*colors.length)];
    }
    function randomBorderStyle(){
        borders = [
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset"
        ];
        return borders[Math.floor(Math.random()*borders.length)];
    }
    function createStyle() {
        return "background-color:"+randomColor() + ";border:"+Math.floor(Math.random()*12+4)+"px "+ randomBorderStyle() + " "+randomColor()+ ";";
    }
    var style = "";
    function styleEntry() {
        style = createStyle();
        $("#entry").attr("style", style);
    }
    styleEntry();
    $("#entry").html($.mustache($("#new-message").html()));
    $("#create-message").submit(function(e){
        e.preventDefault();
        var form = this, doc = $(form).serializeObject();
        doc._id = hex_md5(doc.message);
        doc.style = style;
        doc.created_at = new Date();
        if (doc.message.length < 1025){
            db.saveDoc(doc, {
                success : function() {
                    form.reset();
                    styleEntry();
                },
                error : function() { alert("This has already been written."); }

            });
        } else {
            alert("Too long.");
        }
        return false;
    }).find("input").focus();
    $("#new-style #randomize").click(function(e){
        styleEntry();
    });


 });