/* global jQuery */

/*
 * Highlighter.js 1.0
 *
 * Author: Matthew Conlen <matt.conlen@huffingtonpost.com>
 *         Huffington Post Labs
 *
 * Copyright 2012: Huffington Post Labs
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the WTFPL, Version 2, as
 * published by Sam Hocevar. See http://sam.zoy.org/wtfpl/
 * for more details.
 */

   (function ($) {
    /*
     * Code for triple click from
     * http://css-tricks.com/snippets/jquery/triple-click-event/
     */

     //variables
     highlighterDelay = false;

    $.event.special.tripleclick = {

        setup: function (data, namespaces) {
            var elem = this,
                $elem = jQuery(elem);
            $elem.bind('click', jQuery.event.special.tripleclick.handler);
        },

        teardown: function (namespaces) {
            var elem = this,
                $elem = jQuery(elem);
            $elem.unbind('click', jQuery.event.special.tripleclick.handler);
        },

        handler: function (event) {
            var elem = this,
                $elem = jQuery(elem),
                clicks = $elem.data('clicks') || 0;
            clicks += 1;
            if (clicks === 3) {
                clicks = 0;

                // set event type to "tripleclick"
                event.type = "tripleclick";

                // let jQuery handle the triggering of "tripleclick" event handlers
                jQuery.event.dispatch.apply(this, arguments);
            }
            $elem.data('clicks', clicks);
        }
    };

    /*
     * Attempt to get the previous sibling
     * of a container in the event of a triple
     * click.
     *
     * Adapted from http://stackoverflow.com/a/574922
     */
    function get_previoussibling(n) {
        var y = n, x;
        try {
            x = n.previousSibling;
            while (x && x.nodeType != 1) {
                y = x;
                x = x.previousSibling;
            }
        } catch (err) {
            console.log(err);
            topOffset = -15;
            return y;
        }
        return x ? x : y;
    }

    var methods = {
        init: function (options) {

            var settings = $.extend({
                'selector': '.highlighter-container',
                'minWords': 0,
                'complete': function() {}
            }, options);
            var numClicks = 0;
            var topOffset = 0;
            var leftOffset = 0;
            var isDown = false;

        var selText;

            return this.each(function () {
                /*
                 * Insert an html <span> after a user selects text.
                 * We then use the X-Y coordinates of that span
                 * to place our tooltip.
                 * Thanks to http://stackoverflow.com/a/3599599 for
                 * some inspiration.
                 */
                function insertSpanAfterSelection(clicks) {
                    var html = "<span class='dummy'><span>";
                    topOffset = 0;
                    leftOffset = 0;
                    if (numClicks !== clicks) return;
                    var isIE = (navigator.appName === "Microsoft Internet Explorer");
                    var sel, range, expandedSelRange, node;
                    var position;
                    if (window.getSelection) {
                        sel = window.getSelection();
                        selText = sel.toString();

                        if ($.trim(selText) === '' || selText.split(' ').length < settings.minWords) return;

                        if (sel.getRangeAt && sel.rangeCount) {
                            range = window.getSelection().getRangeAt(0);
                            expandedSelRange = range.cloneRange();
                            expandedSelRange.collapse(false);

                            // Range.createContextualFragment() would be useful here but is
                            // non-standard and not supported in all browsers (IE9, for one)
                            var el = document.createElement("div");
                            el.innerHTML = html;
                            var dummy = document.createElement("span");

                            if (range.startOffset === 0 && range.endOffset === 0) {

                                var cont = expandedSelRange.startContainer;
                                var prev = get_previoussibling(cont);
                                try {
                                    expandedSelRange.selectNode(prev.lastChild);
                                } catch (err) {
                                    leftOffset = 40;
                                    topOffset = -15;
                                    expandedSelRange.selectNode(prev);
                                }
                                // console.log(expandedSelRange);
                                expandedSelRange.collapse(false);
                            } else if(range.endOffset === 0 ) {
                                topOffset = -25;
                                leftOffset = 40;
                            }


                            if (numClicks !== clicks) return;
                            $(settings.selector).hide();
                            if (!isIE && $.trim(selText) === $.trim(expandedSelRange.startContainer.innerText)) {
                                expandedSelRange.startContainer.innerHTML += "<span class='dummy'>&nbsp;</span>";
                                position = $(".dummy").offset();
                                $(".dummy").remove();
                            } else if (!isIE && $.trim(selText) === $.trim(expandedSelRange.endContainer.innerText)) {
                                expandedSelRange.endContainer.innerHTML += "<span class='dummy'>&nbsp;</span>";
                                position = $(".dummy").offset();
                                $(".dummy").remove();
                            } else {
                                expandedSelRange.insertNode(dummy);
                                position = $(dummy).offset();
                                dummy.parentNode.removeChild(dummy);
                            }
                        }
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        expandedSelRange = range.duplicate();

                        selText = expandedSelRange.text;
                        if ($.trim(selText) === '' || selText.split(' ').length < settings.minWords) return;

                        range.collapse(false);
                        range.pasteHTML(html);

                        expandedSelRange.setEndPoint("EndToEnd", range);
                        expandedSelRange.select();
                        position = $(".dummy").offset();
                        $(".dummy").remove();
                    }

                    var t = $('#canvas').scrollTop();

                    $(settings.selector).css("top", position.top + topOffset + t + "px");
                    $(settings.selector).css("left", position.left + leftOffset + "px");
                    $(settings.selector).show(0,function() {
                        settings.complete(selText);
                    });
                }
                $(settings.selector).hide();
                $(settings.selector).css("position", "absolute");

                $(this).bind('mouseup.highlighter', function (e) {
                    numClicks = 1;
                    clicks = 0;

					console.log('span1')
					$('.clicked-link').removeClass('clicked-link')
                    clearTimeout(highlighterDelay);

                    textSelectionParent = getSelectionParentElement();

                    if($(textSelectionParent).is('a')){ $(textSelectionParent).addClass('targeted-text-selection'); }

                    highlighterDelay = setTimeout(function () {
					
	                    //if window text selection, let script do his thing
						//if not text selection it was a normal click, position the tooltip manually
						
						if($(textSelectionParent).is('a')){
						
							selection = window.getSelection().toString()
							
							if (selection == '') {
														
								console.log(selection)
								
								showEditLinkTooltip();
								return false;
								
							}
							
							else {
								
								console.log('let script do his thing')
								
							}
							
						}

                              if(textSelectionHasTable){ return false; }
						insertSpanAfterSelection(1);

                    }, highlightTimeout);

                });
                $(this).bind('keyup.highlighter', function (e) {
                    numClicks = 1;
                    clicks = 0;
                    clearTimeout(t);

					console.log('span1')
                    if($(textSelectionParent).is('a')){ $(textSelectionParent).addClass('clicked-link') }

                    t = setTimeout(function () {
                              if(textSelectionHasTable){ return false; }
						insertSpanAfterSelection(1);

                    }, 550);
                });
                $(this).bind('tripleclick.highlighter', function (e) {
                    numClicks = 3;

					console.log('span3')
                    if($(textSelectionParent).is('a')){ $(textSelectionParent).addClass('clicked-link') }

                    setTimeout(function () {
                         if(textSelectionHasTable){ return false; }
                        insertSpanAfterSelection(3);

                   }, 500);
                });
                $(this).bind('dblclick.highlighter', function (e) {
                    numClicks = 2;

					console.log('span2')
                    if($(textSelectionParent).is('a')){ $(textSelectionParent).addClass('clicked-link') }

                    setTimeout(function () {
                         if(textSelectionHasTable){ return false; }
                        insertSpanAfterSelection(2);

                   }, 400);
                });
                $(this).bind('mousedown.highlighter', function (e) {
                    $(settings.selector).hide();
                    resetTooltip();
                    isDown = true;
                });

            });
        },
        destroy: function (content) {
            return this.each(function () {
                $('#template-editing-canvas').unbind('mouseup.highlighter');
                $(this).unbind('mouseup.highlighter');
                $(this).unbind('tripleclick.highlighter');
                $(this).unbind('dblclick.highlighter');
                $(this).unbind('mousedown.highlighter');
            });
        }
    };

    /*
     * Method calling logic taken from the
     * jQuery article on best practices for
     * plugins.
     *
     * http://docs.jquery.com/Plugins/Authoring
     */
    $.fn.highlighter = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.highlighter');
        }

    };

})(jQuery);
