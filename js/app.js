(function () {

    function getWordHtml(value) {
        var ret = "";
        ret += '<span class="word">\
            <span class="text">' + value.text + '</span>\
            <span class="pron">\\' + value.pron + '\\</span>';
        if (!!value.audio) {
            ret += '<audio id="audio_' + value.text + '">\
                <source src="http://media.merriam-webster.com/soundc11/' + value.audio[0] + '/' + value.audio + '.wav" type="audio/wav">\
                </audio>\
                <button data-play="audio_' + value.text + '"><svg class="icon" viewBox="0 0 75 75"><use xlink:href="#g1"></use></svg></button>';
        }
        ret += '</span>';
        return ret;
    }

	// Event listening for the play button
	var $wordsContainer = $('#words_container')
	$wordsContainer.on('click', 'button', function (e) {
		document.getElementById($(this).attr('data-play')).play();
	});

	// Get the words and create the dynamic DOM
	$.getJSON("data/words.json").done(function(words) {
		// DOM string to be placed
		var wordsHtml = "", word;

		for (index in words) {
			word = words[index];
			wordsHtml += '<div class="words">';
			wordsHtml += getWordHtml(word);
			if (word.compare) {
				wordsHtml += '<span class="diff">, </span>';
				wordsHtml += getWordHtml(word.compare);
			}
			wordsHtml += '</div>';
		}

		// DOM modifications
		$('.wordsCount').html(words.length.toString());
		$wordsContainer.html(wordsHtml);
	});

}());