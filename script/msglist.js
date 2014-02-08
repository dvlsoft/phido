/* global $, _, msglist:true */
/* global phiTitle, phiBar, phiQ, setup, JAM, beforeSpace */

msglist = function(echotag){ /* jshint indent:false */

var msghdrActionQueue = function(){
   $('#msgList .msgRow').each(function(){
      var $row = $(this);
      phiQ.push(function(){
         echobase.readHeader($row.data('number'), function(err, header){
            if( err ){
               $row.find(
                  '.msgFrom, .msgTo, .msgSubj, .msgDateTime'
               ).html('FAIL');
               phiQ.singleNext();
               return;
            }
            var decoded = echobase.decodeHeader(header);
            $row.find('.msgFrom').html(_.escapeHTML(
               decoded.from
            ));
            $row.find('.msgTo').html(_.escapeHTML(
               decoded.to
            ));
            $row.find('.msgSubj').html(_.escapeHTML(
               decoded.subj
            ));
            $row.find('.msgDateTime').html([
               '<nobr>',
               decoded.origTime[0], '-',
               _(decoded.origTime[1]).pad(2, '0'), '-',
               _(decoded.origTime[2]).pad(2, '0'),
               '</nobr> <nobr>',
               _(decoded.origTime[3]).pad(2, '0'), ':',
               _(decoded.origTime[4]).pad(2, '0'), ':',
               _(decoded.origTime[5]).pad(2, '0'),
               '</nobr>'
            ].join(''));
            phiQ.singleNext();
         });
      });
   });
};

phiTitle(echotag + ' - messages');
var lcEchotag = echotag.toLowerCase();

var echoNames = setup.areas.group('EchoArea').names();
var foundNames = echoNames.filter(function(echoName){
   return echoName.toLowerCase() === lcEchotag;
});

if( foundNames.length === 0 ){
   return phiBar.reportErrorHTML([
      'Sorry, the echomail area <b>',
      echotag,
      '</b> is not found on the system.'
   ].join(''));
}

var setupEchotag = foundNames[0];
var echoPath = beforeSpace(
   setup.areas.group('EchoArea').first(setupEchotag)
);
var echobase = JAM( echoPath );

var arrDesc = /-d "([^"]+?)"/.exec(
   setup.areas.group('EchoArea').first(setupEchotag)
);
var echoDesc;
if( arrDesc === null ){
   echoDesc = setupEchotag;
} else {
   echoDesc = arrDesc[1];
}

echobase.readJDX(function(err){
   if( err ) return phiBar.reportErrorHTML( _.escapeHTML('' + err) );

   var baseSize = echobase.size();
   $('#content').html([
      '<table id="msgList" ',
      'class="table table-bordered table-hover table-condensed">',
      '<tbody><tr class="inverse">',
      '<td colspan=5 style="text-align: center;">',
      echoDesc,
      '</td>',
      '</tr><tr class="inverse">',
      '<th>Num</th>',
      '<th>From</th>',
      '<th>To</th>',
      '<th>Subject</th>',
      '<th>Date / time</th>',
      '</tr></tbody></table>'
   ].join(''));
   var $currTBody = $('#msgList tbody:last');
   var currMsg;
   for( currMsg = 1; currMsg <= baseSize; currMsg++ ){
      $(['<tr class="msgRow">',
         '<td>',
            currMsg,
         '</td>',
         '<td class="msgFrom"><i class="fa fa-spinner fa-spin"></i></td>',
         '<td class="msgTo"><i class="fa fa-spinner fa-spin"></i></td>',
         '<td class="msgSubj"><i class="fa fa-spinner fa-spin"></i></td>',
         '<td class="msgDateTime"><i class="fa fa-spinner fa-spin"></i></td>',
      '</tr>'].join('')).data({
         'number': currMsg
      }).appendTo($currTBody);
   }

   msghdrActionQueue();
   phiQ.singleStep();
});

};