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

	$.getJSON("data/words.json").done(function(words) {
		// DOM string to be placed
		var wordsHtml = "", word,
			$wordsContainer = $('#words_container');

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
		$wordsContainer.append(wordsHtml);

		// event listening
		$wordsContainer.on('click', 'button', function (e) {
			document.getElementById($(this).attr('data-play')).play();
		});
	});

}());