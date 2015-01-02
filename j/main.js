
/*------------------------------------------------------------------------------
Function:       FunctionHandler()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  2009-04-02
Version:        0.2
Homepage:       http://github.com/easy-designs/FunctionHandler.js
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function($){var FunctionHandler={version:"0.2"},pages={};function initialize(){var body_id=$("body").attr("id");if(body_id!=false&&typeof(pages[body_id])!="undefined"){run(pages[body_id])}if(typeof(pages["*"])!="undefined"){run(pages["*"])}}$(document).ready(initialize);FunctionHandler.register=function(id,callback){if((typeof(id)!="string"&&!(id instanceof Array))||typeof(callback)!="function"){return false}if(typeof(id)=="string"&&id.indexOf(", ")!=-1){id=id.split(", ")}if(id instanceof Array){for(var i=id.length-1;i>=0;i--){add(id[i],callback)}}else{add(id,callback)}return true};function add(id,callback){if(typeof(pages[id])=="undefined"){pages[id]=[]}pages[id].push(callback)}function run(arr){if(!(arr instanceof Array)){return}for(var i=arr.length-1;i>=0;i--){arr[i]()}}window.FunctionHandler=FunctionHandler})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


// make sure a user hitting the back button doesn't kill the layout
if ( window.addEventListener )
{
	window.addEventListener('pageshow',function(e){
		if (e.persisted)
		{
			setTimeout(function(){
				window.scrollTo(window.scrollX,window.scrollY+1);
			},10);
		}
	}, false);
}


// function to adjust the viewport
(function(win,doc){
  window.adjustViewport = function( property, value )
  {
  	var
  	$viewport = $('meta[name=viewport]'),
  	currently = $viewport.attr('content'),
  	o_props		=	currently.split(/\s,\s?/),
  	n_props		= [],
  	i					=	o_props.length,
  	set       = false;
  	while ( i-- )
  	{
  		o_props[i] = o_props[i].split(/\s?=\s?/);
  		if ( o_props[i][0] == property )
  		{
  			if ( value !== false )
  			{
  				o_props[i][1] = value;
  				n_props.push( o_props[i].join('=') );
  			}
  			set = true;
  		}
  		else
  		{
  			n_props.push( o_props[i].join('=') );
  		}
  	}
  	if ( ! set )
  	{
  		n_props.push(property+'='+value);
  	}
  	n_props = n_props.join(',');
  	$viewport.attr('content',n_props);
  };
})(window);


// create the maxContentHeight method
(function(win,doc){
	var
	$window		= $(win),
	$document	= $(doc),
	$content	= $('#content');

	window.maxContentHeight = function(){
		$content.css('min-height','0');
		var
		c_height	= $content.height(),
		d_height	= $document.height(),
		w_height	= $window.height(),
		p_height	= ( d_height > w_height ? d_height : w_height ) - 
								$('#easy-network').outerHeight(true) -
								$('#top').outerHeight(true) -
								$('#bottom').outerHeight(true);
		if ( p_height > c_height )
		{
			$content.css('min-height',p_height+'px');
		}
	};
})(window,document);


// all page scripts
FunctionHandler.register(
	'*',
	function(){
		
		// Google Analytics
		//window._gaq = window._gaq || [];
		//window._gaq.push(['_setAccount', 'UA-176472-10']);
		//window._gaq.push(['_trackPageview']);
		//var
		//s  = document.getElementsByTagName('script')[0],
		//ga = document.createElement('script');
		//ga.type   = 'text/javascript';
		//ga.async  = true;
		//ga.src    = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
		//            '.google-analytics.com/ga.js';
		//s.parentNode.insertBefore(ga, s);
		
		// for iOS (remove the toolbar)
		if ( window.location.hash == '' )
		{
  			window.scrollTo(0, 1);
		}
		
		// set the content height to 100% of screen height
		maxContentHeight();
		var r_timer;
		$(window)
			.resize(function(){
				if ( r_timer ){
					clearTimeout( r_timer );
					r_timer = false;
				}
				r_timer = setTimeout( realResize, 50 );
			});
		function realResize()
		{
			clearTimeout( r_timer );
			r_timer = false;
			maxContentHeight();
		}
		
		$('#share').delegate('a','click',function(e){
			if ( $(window).width() > 700 )
			{
				e.preventDefault();
				window.open(this.href,'share-this','height=300,width=500,status=no,toolbar=no');
			}
		});

	});
