(function($){
	var i = 1;
	$('#tweets li').each(function(){
		$(this).addClass(function(){
			var theclass;
			if ( i > 2 )
			{
				theclass = 'three';
				i = 1;
			}
			else
			{
				theclass = ( i == 2 ? 'two' : 'one' );
				i++;
			}
			return theclass;
		});
	});
})(jQuery)