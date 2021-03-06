/* global renderAreaURL:true, generateAreaURL:true */
/* global _, arealist, msglist, singleMessage, areaFile, phiBar */

renderAreaURL = function(URL, parsedURL){
   if( parsedURL.echoNames.length < 1 ){
      arealist();
      return;
   }
   if( parsedURL.objectPath.length > 0 ){
      areaFile(URL, parsedURL);
      return;
   }
   if( parsedURL.echoNames.length > 1 ){
      phiBar.reportErrorHTML([
         'Sorry, opening multiple echomail areas at once ',
         'is not (yet) supported in PhiDo.',
         '<p>The address <b>',
         _.escapeHTML(URL),
         '</b> could not be opened.',
         '</p>'
      ].join(''));
      return;
   }
   // parsedURL.echoNames.length === 1
   var foundMSGID = false;
   for( var i = 0; i < parsedURL.optionalParams.length; i++ ){
      if( parsedURL.optionalParams[i].name === 'msgid' ){
         foundMSGID = true;
         break;
      }
   }
   if( foundMSGID ){
      singleMessage(parsedURL.echoNames[0][0], parsedURL);
      return;
   }
   msglist( parsedURL.echoNames[0][0] );
};

generateAreaURL = function(echotag, decoded){
   /* jshint indent:false */
   if( decoded.msgid ) return [
      'area://',
      encodeURIComponent(echotag),
      '/?msgid=',
      encodeURIComponent(decoded.msgid),
      '&time=',
      encodeURIComponent(decoded.origTime[0])
   ].join('').replace('%20', '+');

   return [
      'area://',
      encodeURIComponent(echotag),
      '/?time=',
      encodeURIComponent(decoded.origTime[0]), '/',
      encodeURIComponent(_(decoded.origTime[1]).pad(2, '0')), '/',
      encodeURIComponent(_(decoded.origTime[2]).pad(2, '0')), 'T',
      encodeURIComponent(_(decoded.origTime[3]).pad(2, '0')), ':',
      encodeURIComponent(_(decoded.origTime[4]).pad(2, '0')), ':',
      encodeURIComponent(_(decoded.origTime[5]).pad(2, '0'))
   ].join('').replace('%20', '+');
};