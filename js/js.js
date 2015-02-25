$(document).ready(function(){
		$('#essay').load("text.html", function () {
			$('#word').html($('#w0').html());
		});

		function buyCursor(){
			var oldWords = parseInt($('#words').html());
			var cursors = parseInt($('#cursors').html());
			if(oldWords < 10){
				return;
			}
			var words = oldWords - 10; 

			$('#cursors').html((cursors + 1));

			removeWords(words);
			updateWps();
		}

		function removeWords(from){
			$('#words').html((from));
			updateWords();
		}

		function updateWords(){
			var words = parseInt($('#words').html());
			$('.word').each(function(){
				var id = parseInt($(this).attr('id').substring(1));
				if(id < words)
					$(this).css('display', 'inline');
				else
					$(this).css('display', 'none');
			});

			var nextWord;

			var r = true; 
			if($('#w' + words).length > 0)
				nextWord = $('#w' + words).html();
			else{
				nextWord = 'End';
				r = false; 
			}
			$('#word').html(nextWord);
			return r; 
		}

		function clickCookie(clicks){
			if(clicks  == null |clicks < 1)
				clicks = 1; 
			var words = parseInt($('#words').html());
			var words = words + clicks; 

			$('#words').html(words);
			
			if(updateWords())
				window.scrollTo(0, document.body.scrollHeight); 
		}

		function clicksPerSecond(){
			var cursors = parseInt($('#cursors').html());
			return cursors * 0.5; 
		}

		function updateWps(){
			var wps = clicksPerSecond();
			$('#wps').html(wps);
		}

		$('#cookie').click(function(){
			clickCookie();
		});

		$('#buy-cursor').click(function(){
			buyCursor();
		});

		var clicks = 0; 
		var remainder = 0;
		var cookieTimer = function(){
			clicks = clicks + (clicksPerSecond()/5); 
			remainder = clicks % 1;
			clicks = clicks - remainder; 
			if(clicks > 0){
				clickCookie(clicks);
				clicks = 0; 
			}
			clicks = remainder;
		}
		var interval = setInterval(cookieTimer, 200);

		
	});