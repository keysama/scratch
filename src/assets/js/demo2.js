/**
 * main.js
 * http://www.jq22.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, jq22
 * http://www.jq22.com
 */
;(function(window) {

	'use strict';

	var closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search_fix'),
		inputSearch = searchContainer.querySelector('.search__input_fix');

	function init() {
		initEvents();	
	}

	function initEvents() {
		inputSearch.addEventListener('focus', openSearch);
		closeCtrl.addEventListener('click', closeSearch);
		document.addEventListener('keyup', function(ev) {
			// escape key.
			if( ev.keyCode == 27 ) {
				closeSearch();
			}
		});
	}

	function openSearch() {
		searchContainer.classList.add('search--open');
		inputSearch.focus();
	}

	function closeSearch() {
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
	}

	init();

})(window);