'use strict';

class YMWPTT {
	allowedHost     = 'https://translate.wordpress.org/projects/';
	allowedLocales  = [ 'bel', 'uk', 'ru' ];
	translationRows = document.querySelectorAll( 'table#translations tr.editor' );

	constructor () {
		/* Exit if not translation page */
		if ( ! location.href.startsWith( this.allowedHost ) ) {
			return;
		}

		console.log( 'YM WP Translator Tools: loaded' );
		
		this.initObserver();
	}

	initObserver () {
		this.observer = new MutationObserver( mutations => {
			mutations.forEach( mutationRecord => {
				/* Checks bottom section */
				this.check( mutationRecord.target, ( t ) => {
					return t.querySelectorAll( '.suggestions__other-languages .translation-suggestion' );
				}, ( s ) => {
					return s.getAttribute( 'data-suggestion-locale' );
				});

				/* Checks side section */
				this.check( mutationRecord.target, ( t ) => {
					return t.querySelectorAll( '.sidebar-div-others-other-locales-content .other-locales li' );
				}, ( s ) => {
					return s.querySelector( '.locale' ).innerText;
				});
			});    
		});

		this.translationRows.forEach( row => {
			this.observer.observe( row, { attributes: true, attributeFilter: [ 'style' ] } );
		});
	}

	check ( target, suggestionsCb, localeCb ) {
		let suggestions = suggestionsCb( target );
		let count       = suggestions.length;

		if ( count && count > this.allowedLocales.length ) {
			// console.log( `YM WP Translator Tools: bottom loop [${count}]` );

			suggestions.forEach( suggestion => {
				const locale = localeCb( suggestion );

				if ( ! this.allowedLocales.includes( locale ) ) {
					suggestion.remove();
					// suggestion.style.background = 'red';
				}
			});
		}
	}
}

new YMWPTT();