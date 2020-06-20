// ==UserScript==
// @name        facebook_delete all messages
// @namespace   facebook
// @version     1
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
var c1=false;
var c2=false;
var c3=false;
$(function () {
  //var el=null;
 setInterval(function(){
    if(!c1 && $("div[aria-label='Conversation actions']").length){
   	c1=true;
      console.log('row finded');
    $("div[aria-label='Conversation actions']")[0].click();      
    //el= $("li[role='row'] a")[0];      
    
   }
   	
   if(!c2 && $("span:contains(Видалити)").length){
     c2=true;
   console.log('vydalyty finded',$("span:contains(Видалити)").closest('a')[0]);
     $("span:contains(Видалити)").closest('a')[0].click();
   	
   }
   
   if($("button:contains(Видалити)").length){
     console.log($("button:contains(Видалити)"));
   		$("button:contains(Видалити)")[0].click();
     //el.remove();
     
   }else{
     c1=false;
     c2=false;
   }
   
   
   
  
   
 },200);
 
 
 
});
