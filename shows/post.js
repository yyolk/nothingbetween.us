function(doc, req) {  
  shortdescript = "";
  if (doc.message[0] === "<"){
    shortdescript = "<code>";
  } else {
    shortdescript = doc.message;
  }
  if (doc.image){
    doc.message = "<div style='position:fixed;top:20%;left:5%;text-align:center;display:block;'><img src='"+doc.image+"'></div>"
  }


  ogdata = '<meta property="og:title" content="NOTHINGBETWEEN.US">' +
    '<meta property="og:type" content="website">' +
    '<meta property="og:url" content="http://nothingbetween.us'+ '/p/' + doc._id + '">' +
    '<meta property="og:image" content="http://nothingbetween.us/nbu.png">' +
    '<meta property="og:description" content="NOTHINGBETWEEN.US">';

  return { code : 200, headers : { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type:" : "text/html",
    "Charset" : "UTF-8"   },
    body: '<html>' +
      '<head>'+
      '<meta property="og:title" content="nothingbetween.us post">'+
      '<meta property="og:type" content="website">'+
      '<meta property="og:url" content="http://nothingbetween.us/p/'+doc._id+'">'+
      '<meta property="og:image" content="http://nothingbetween.us/nbu.png">'+
      '<meta property="og:description" content="'+shortdescript+'">'+
      '<link rel="stylesheet" href="/style/main.css" type="text/css"></link>'+
      '<script src="/script/analytics.js"></script>'+
      '</head>'+
      '<body onclick="location.href='+"'http://nothingbetween.us'"+';" style="cursor:pointer;'+doc.style+'">'+
      '<div style="position:absolute;left:50%;top:50%;">'+
      '<div style="position:relative;top:-50%;left:-50%;">'+
      doc.message+
      '</div>'+
      '</div>'+
      '<div class="fb-like" data-href="http://nothingbetween.us/p/'+doc._id+'" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>'+
      '<div id="fb-root"></div>'+
      '<script>(function(d, s, id) {'+
      'var js, fjs = d.getElementsByTagName(s)[0];'+
      'if (d.getElementById(id)) return;'+
      'js = d.createElement(s); js.id = id;'+
      'js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=184836661670371";'+
      'fjs.parentNode.insertBefore(js, fjs);'+
      "}(document, 'script', 'facebook-jssdk'));</script>"+
      '</body>'+
      '</html>'
     };
}

