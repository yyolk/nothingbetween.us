function(doc, req) {  
  return { code : 200, headers : { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type:" : "text/html",
    "Charset" : "UTF-8"   },
    body: '<html><head><meta property="og:title" content="NOTHINGBETWEEN.US"> <meta property="og:type" content="website"> <meta property="og:url" content="http://nothingbetween.us/p/'+doc._id+'"> <meta property="og:image" content="http://nothingbetween.us/nbu.png"> <meta property="og:description" content="'+doc.message+'"><link rel="stylesheet" href="/style/main.css" type="text/css"></link></head><body onclick="history.back();" style="cursor:pointer;'+doc.style+'"><div style="position:absolute;left:50%;top:50%;"><div style="position:relative;top:-50%;left:-50%;">'+doc.message+'</div></div><script src="/script/analytics.js"></script></body></html>'
     };
}

