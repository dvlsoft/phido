/* global renderAreaURL:true, _, arealist, msglist, phiBar */

renderAreaURL = function(URL, parsedURL){
   console.log('Parsed URL:');
   console.log(parsedURL);
   if( parsedURL.echoNames.length < 1 ){
      arealist();
   } else if ( parsedURL.echoNames.length === 1 ){
      msglist( parsedURL.echoNames[0][0] );
   } else {
      phiBar.reportErrorHTML([
         'Sorry, opening multiple echomail areas at once ',
         'is not (yet) supported in PhiDo.',
         '<p>The address <b>',
         _.escapeHTML(URL),
         '</b> could not be opened.',
         '</p>'
      ].join(''));
   }
};