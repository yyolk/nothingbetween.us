function(doc, req) {  
  shortdescript = "";
  if (doc.message[0] === "<"){
    shortdescript = "<code>";
  } else {
    shortdescript = doc.message;
  }

  return { code : 200, headers : { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type:" : "text/html",
    "Charset" : "UTF-8"   },
    body: '<html><head><meta property="og:title" content="NOTHINGBETWEEN.US"> <meta property="og:type" content="website"> <meta property="og:url" content="http://nothingbetween.us/p/'+doc._id+'"> <meta property="og:image" content="http://nothingbetween.us/nbu.png"> <meta property="og:description" content="'+shortdescript+'"><link rel="stylesheet" href="/style/main.css" type="text/css"></link><script src="/script/analytics.js"></script></head><body onclick="location.href='+"'http://nothingbetween.us'"+';" style="cursor:pointer;'+doc.style+'"><div style="position:absolute;left:50%;top:50%;"><div style="position:relative;top:-50%;left:-50%;">'+doc.message+'</div></div></body></html>'
     };
}

