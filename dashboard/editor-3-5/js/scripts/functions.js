//open section
function openSection(title){

	var subbar_width = $('#sub-bar').width();
	var sidebar_width = $('#sidebar').width();

	$('#sub-bar').animate({

		'left': sidebar_width+'px'

	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeOutQuart', complete:  function() {

	}});

	//resize main canvas
	$('.main').animate({

		'padding-left': subbar_width+sidebar_width+'px'

	}, { duration: globalAnimationSpeed * 2, easing: 'easeOutQuart', complete:  function() {

	}})

	//hide all menus
	$('[data-menu-section]').hide();
	$('[data-menu-section="'+title.toLowerCase()+'"]').show();

	if(title == 'Styles'){

		$('#sub-bar').css('padding-top','0');

		$('[data-title="Styles"]').show();

	}

	else if(title == 'Modules'){

		if(mode == 'template' || mode == 'demo'){

			$('#sub-bar').css('padding-top','0');

		}

		else {

			$('#sub-bar').css('padding-top','34px');

		}

	}

	//remove submenu
	removeSubmenu();

}

//hide section
function hideSection(){

	var subbar_width = $('#sub-bar').width();
	var sidebar_width = $('#sidebar').width();

	$('.colorpicker-value').addClass('unfocussed');

	$('#sub-bar').animate({

		'left': '-255px'

	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeOutQuart', complete:  function() {

	}});

	$('.main').animate({

		'padding-left': '80px'

	}, { duration: globalAnimationSpeed * 1, easing: 'easeOutQuart', complete:  function() {

	}});

	hideColorOpacitySlider();

	$('.selected-table').removeClass('selected-table')

}

//open a space
function openSpace(name) {

	if(spaceFlag){ return false; }
	spaceFlag = true;

	//variables
	window_width = $(window).width();

	//remove preview url
	removePreviewUrl();

	if(name == 'image-editor-canvas'){

		tdWidth = $('#template-editing-canvas .selected-image').width();

	}

	$('body').addClass('extraStylingForPopup');

	$('.space').css({
		'-webkit-transition':'none',
		'-moz-transition':'none',
		'transition':'none',
	})

	//zoom out current space
	$('.space.active').animate({

		transform: 'scale(0.9)'

	}, openSpaceSpeed * 1.4, function() {

		//set the new position of target space
		$('[data-space="'+name+'"]').css('opacity','1').css('transform','scale(0.9) translate('+(window_width * 1.4)+'px)');

		//flick current space
		$('.space.active').animate({

			transform: 'scale(0.9) translate(-'+(window_width * 1.4)+'px)',
			'opacity': '0.2'

		}, openSpaceSpeed * 2.3, function() {

		});

		//show target space
		$('[data-space="'+name+'"]').show();

		//animate target space
		$('[data-space="'+name+'"]').animate({

			transform: 'scale(0.9) translate(0px)',
			'opacity': '1'

		}, openSpaceSpeed * 2.3, function() {

			//set target space to default state
			$('[data-space="'+name+'"]').animate({

				transform: 'scale(1) translate(0px)'

			}, openSpaceSpeed * 1.4, function() {

				$('[data-space="'+name+'"]').css('transform','');

				//remove the active state
				$('[data-space].active').removeClass('active');

				//set target space to active
				$('[data-space="'+name+'"]').addClass('active');

				$('body').removeClass('extraStylingForPopup');

				spaceFlag = false;

			});

		});

	});

}

//back to main space
function openMainSpace() {

	if(spaceFlag){ return false; }

	spaceFlag = true;

	//remove preview url
	removePreviewUrl();

	$('.back-to-gallery').text('Back to editing').removeClass('back-to-gallery')

	$('body').addClass('extraStylingForPopup');

	//zoom out current space
	$('.space.active').animate({

		transform: 'scale(0.9)'

	}, openSpaceSpeed * 1.4, function() {

		//set the new position of target space
		$('[data-space="main"]').css('opacity','0.2');

		//flick current space
		$('.space.active').animate({

			transform: 'scale(0.9) translate('+(window_width * 1.4)+'px)',
			'opacity': '0.2'

		}, openSpaceSpeed * 2.3, function() {

		});

		//show target space
		$('[data-space="main"]').show();

		//animate target space
		$('[data-space="main"]').animate({

			transform: 'scale(0.9) translate(0px)',
			'opacity': '1'

		}, openSpaceSpeed * 2.3, function() {

			//set target space to default state
			$('[data-space="main"]').animate({

				transform: 'scale(1) translate(0px)'

			}, openSpaceSpeed * 1.4, function() {

				$('[data-space="main"]').css('transform','')

				//remove the active state
				$('[data-space].active').hide().removeClass('active');

				//set target space to active
				$('[data-space="main"]').addClass('active');

				$('body').removeClass('extraStylingForPopup');

				spaceFlag = false;


			});

		});

	});

	/*

		//zoom out current space
	$('.space.active').css('transform','scale(0.9)');

	//hide image editor
	$('.image-canvas-image-wrapper .image-transparent-background').fadeOut(openSpaceSpeed * 2);

	//remove preview url
	removePreviewUrl();

	setTimeout(function(){

		//flick current space
		$('.space.active').css('transform','scale(0.9) translate('+(window_width*1.4)+'px)').css('opacity','0.2');;

		//set the new position of target space
		$('[data-space="main"]').css('opacity','1').css('transform','scale(0.9) translate(-'+(window_width*1.4)+'px)');

		//show target space
		$('[data-space="main"]').show();

		setTimeout(function(){

			//flick target space
			$('[data-space="main"]').css('transform','scale(0.9) translate(0px)');

			setTimeout(function(){

				//set target space to default state
				$('[data-space="main"]').css('transform','scale(1)');

				//remove the current state
				$('[data-space].active').removeClass('active');

				//set target space to active
				$('[data-space="main"]').addClass('active');

				//hide all spaces
				$('[data-space]').not('[data-space="main"]').hide();

			}, openSpaceSpeed + 50);

		}, openSpaceDelay);

	}, openSpaceSpeed); */

}


//check if the function should continue
function isActive(functionGlobalName){

	//if function is running
	if (isRunning.indexOf(functionGlobalName) >= 0){

		return false;

	}

	//if function can be allowed
	isRunning = isRunning + functionGlobalName;
	return true;

}

//clear all flags
function clearFlags(functionGlobalName){

	isRunning = isRunning.replace(functionGlobalName, "");

}

//activate navigation item
function activateNavigationItem(target){

	//remove the 'active' class from all active menus
	$('[data-title]').removeClass('active');

	//set active state
	$(target).addClass('active');

	//closest li, open it
	//openNavigationMenu(target)

}

//deactivatenavigation item
function deactivateeNavigationItem(){

	//remove the 'active' class from all active menus
	//$('.menu > li').removeClass('active');

}

//show title tooltip in menu
function showTitleTooltip(event){

	var title = $(event).attr('data-title');
	var pos = $(event).offset();
	var nav_width = $(event).width();
	var nav_height = $(event).height();
	var tooltip_height = $('.preview-title-wrapper').height();
	var tip_width = $('.preview-title-wrapper .color-opacity-slider-tooltip').width();
	var offset = 10; // the offset from navigation

	$('.preview-title-wrapper').css('left',(pos.left+nav_width+tip_width+offset)+'px').css('top',(pos.top+(nav_height/2) - (tooltip_height / 2))+'px');

	//show tooltip, or animate
	$('.preview-title-wrapper').css('margin-left','-'+(offset/1.5)+'px').show().find('span').text(title);

	//show tooltip, or animate
	$('.preview-title-wrapper').animate({

		'margin-left':'0',
		'opacity':'1'

	}, { duration: 250, easing: 'easeOutQuart', complete:  function() {

	}});

}

//show title tooltip in menu
function hideTitleTooltip(){

	$('.preview-title-wrapper').hide();

}

//show preview url
function showPreviewUrl(posX, posY, url) {

	//if stripHtpp is set to true, remove http and www
	if(stripHttp){

		url = url.replace('http://', '').replace('https://', '').replace('www.', '');

	}

	//if the url is empty, show empty url instead
	if(url == ''){

		url = 'empty url';

	}

	//append preview url to the bdy
	$('body').append('<div class="preview-url font-regular keep-crisp" style="left: '+posX+10+'px; top: '+posY+10+'px;">'+url.substring(0,numberOfCharacters)+'</div>');

	//on mouse move, move the position of the preview url
	$(document).on('mousemove', '#template-editing-canvas a', function(e){

		$('.preview-url').css('left',e.pageX+10+'px').css('top',e.pageY+10+'px');

	});

	//check if the url exists
	if(ifUrlExists){

		//ifURLExists(url)

	}

}

//remove preview url
function removePreviewUrl(){

	//remove preview url
	$('.preview-url').remove();

}

//reset image editing settings
function resetImageEditingSettings(){

	$('[data-name="image-overlay-opacity"]').prop('value','0')
	$('[data-name="image-opacity"]').prop('value','100');
	$('[data-name="image-overlay-opacity"]').prev('.slider-output').val('0%');
	$('[data-name="image-opacity"]').prev('.slider-output').val('100%');
	$('.image-transparent-background').css('transform','scale(1)');

	$('#image-overlay-layer').css('opacity','0');
	$('#image-canvas-image').css('opacity','1');

	disableSwitch('flip')
	disableSwitch('optimise-retina')
	disableSwitch('toggle-circular')
	disableSwitch('crop-tool')

	//remove filter tag from image
	$('#image-canvas-image').removeAttr('data-filter');

	$('.image-transparent-background').removeClass('flipped')

	//hide crop-window
	$('#crop-window').hide();
	$('#crop-window').css('border-radius','0%')

	$('.alternate-tags-textarea').val('');
	$('.alternate-tags-textarea').attr('placeholder', 'Ex. Introducing new pricing modals');

	//original data variable
	originalImageData = '';

}

//initialise image editor
function initialiseImageEditor() {

	//show image editor
	//$('.image-canvas-image-wrapper .image-transparent-background').fadeIn(openSpaceSpeed * 2);

}

//switch tabs
function switchTab(tab) {

	//remove active state from all classes
	$(tab).closest('ul').find('li').removeClass('active');

	//add active state
	$(tab).addClass('active');

}

//switch navigation
function switchImageNavigation(tab) {

	//variables
	image_navigation_name = $(tab).attr('data-tab');

	//hide all navigations
	$(tab).closest('.space').find('.image-canvas-sidebar-navigation').hide();

	//show targeted navigation
	$('[data-image-navigation="'+image_navigation_name+'"]').show();


}

//change image filter
function changeImageFilter(filter, target) {

	//show filter name
	$(target).text(filter);

}

//slider
function updateSlider(event) {

	//variables
	slider_measurement = $(event).attr('data-slider-measurement');
	slider_value = $(event).val();
	slider_name = $(event).attr('data-name')

	//if slider measurement does not exists, make it empty
	if(!slider_measurement){

		slider_measurement = '';

	}

	//show changed value
	$(event).closest('li').find('.slider-output').val(slider_value+slider_measurement);

	if(slider_name == 'image-opacity'){ updateImageOpacity(slider_value); }
	if(slider_name == 'image-overlay-opacity'){ updateOverlayOpacity(slider_value); }

	setSaveActive();

}

//detect image background brightness
function setImageBrightness(image) {

	//fetch image source
	var imageSrc = $(image).attr('src');

    //create image in memory
    var img = document.createElement("img");
    img.src = imageSrc;

    //add specific attributes
    img.style.display = "none";

    //append to DOM
    document.body.appendChild(img);

	//set color to zero
    var colorSum = 0;

	//when the image has loaded
    img.onload = function() {

        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

          for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

	   //generate brightness
   		var brightness = Math.floor(colorSum / (this.width*this.height));

		//if brightness pulls towards light, install the light theme
		if(brightness > 125){

			//remove light theme, and add dark theme
			$(image).closest('li').addClass('icon-dark');

		}

		else {

			//remove dark theme, and add light theme
			$(image).closest('li').addClass('icon-light');

		}

		//generate brightness
     //    var brightness = Math.floor(colorSum / (this.width*this.height));
	   //
	// 	swapEditingCanvasColor(brightness)

    }
}

//swap editor image
function swapEditingImage(image){

	//variables
	img_src = $(image).attr('src');

	//example targeted image
	selected_image_w = 100;
	selected_image_h = 100;

	//hide crop
	$('#crop-window').hide();

	//remove image in image editor
	$('#image-canvas').find('img').remove();

	//add image in image editor
	$('#image-canvas').find('.image-canvas-image-wrapper #crop-window').after('<img src="'+img_src+'" alt="" />');

	//fetch image width and height
	var img_w = $('.image-canvas-image-wrapper img').width();
	var img_h = $('.image-canvas-image-wrapper img').height();

	//animate to show image
	$('#image-canvas').find('img').show();

	//if the selected image is bigger
	if(img_w > selected_image_w && img_h > selected_image_h){

		//variables
		var switch_name = 'crop-tool';

		//if crop flag is set to true
		if(cropFlag){

			//reset the crop window
			resetCropWindow(selected_image_w, selected_image_h, img_w, img_h);

			//show crop
			$('#crop-window').show();

			//show switch
			activateSwitch(switch_name);

		}

		//show switch
		showSwitch(switch_name);

		//show switch
		var switch_name = 'toggle-circular';
		showSwitch(switch_name);

	}

	//if the selected image is smaller
	else {

		//hide crop tool switch, no use
		var switch_name = 'crop-tool';
		disableSwitch(switch_name);
		hideSwitch(switch_name);

		//hide circular switch, as the crop tool is removed as well
		var switch_name = 'toggle-circular';
		disableSwitch(switch_name);
		hideSwitch(switch_name);
		undoCircular();

	}

	//switch to image settings
	var tab = '[data-tab="image-settings"]';
	switchTab(tab);
	switchImageNavigation(tab);

	//if available for retina
	if((selected_image_w * 2) > img_w || (selected_image_h * 2) > img_h){

		//not compatible for retina. hide the switch
		$('[data-name="optimise-retina"]').closest('li').hide();

	}

	//compatible for retina, show it.
	else {

		//show the switch
		$('[data-name="optimise-retina"]').closest('li').show();

	}

	//disable the switch
	var switch_name = 'optimise-retina';
	disableSwitch(switch_name)

	//undo retina function
	undoForRetina();

}

//swap editing canvas color
function swapEditingCanvasColor(brightness) {

	//if brightness pulls towards light, install the light theme
	if(brightness > 125){

		//remove light theme, and add dark theme
		$('[data-space="image-editor-canvas"]').removeClass('theme-light');
		$('[data-space="image-editor-canvas"]').addClass('theme-dark');

	}

	else {

		//remove dark theme, and add light theme
		$('[data-space="image-editor-canvas"]').removeClass('theme-dark');
		$('[data-space="image-editor-canvas"]').addClass('theme-light');

	}

}

//initialise images in the image editing sidebar, whether to check if they ar small of normal
function initialiseEditingImages() {

	//get list width
	list_w = $('[data-image-navigation="image-uploads"]').find('li').width();

	//define image height
	list_h = 129;

	//loop through every image
	$('[data-image-navigation="image-uploads"] img').each(function(){

		//variables
		img = $(this);
		img_w = $(this).width();
		img_h = $(this).height();

		//add padding if image is too thin
		if(img_w < list_w){

			$(img).closest('.image-bg').css({
				'padding-left':'10px',
				'padding-right':'10px'
			})

		}

		//add padding if image is too big
		if(img_h < list_h){

			$(img).closest('.image-bg').css({
				'padding-top':'10px',
				'padding-bottom':'10px'
			})

		}

	});

}

//reset crop window
function resetCropWindow(img_w, img_h) {

	//reset crop
	$('#crop-window').css({
		'width': img_w+'px',
		'height': img_h+'px'
	});

	$('#crop-window').resizable({
		minWidth: img_w,
		minHeight: img_h,
		handles: 'n, e, s, w, ne, se, sw, nw',
		containment: '.image-transparent-background',
		aspectRatio: true,
		start : function(event, ui) {

			$('.grid-line').fadeIn(globalAnimationSpeed);
			$('.center-crop-window').remove();

		},
		stop : function(event, ui) {

			$('.grid-line').fadeOut(globalAnimationSpeed);

		},
	});

}

//flip image
function flipEditingImage(){

	//flip image
	$('.image-transparent-background').addClass('flipped')

}

//remove flip image
function removeFlipEditingImage(){

	//flip image
	$('.image-transparent-background').removeClass('flipped')

}

//hide crop tool
function hideCropTool() {

	//set crop flag to false
	cropFlag = false;

	//hide crop tool
	$('#crop-window').fadeOut(openSpaceSpeed);

}

//show crop tool
function showCropTool() {

	//set crop flag to true
	cropFlag = true;

	//hide crop tool
	$('#crop-window').fadeIn(openSpaceSpeed);

}

//make circular
function makeCircular(){

	//set flag to true
	circularFlag = true;

	//circular image
	$('#crop-window').animate({

		'border-radius':'100%',

	}, 250, function() {

		//add class circular
		$('#crop-window').addClass('circular');

		//destroy to reinitialise resizable
		//$("#crop-window").resizable("destroy");

  });

}

//undo circular
function undoCircular() {

	//set flag to true
	circularFlag = false;

	//circular image
	$('#crop-window').animate({

		'border-radius':'0%'

	}, 250, function() {

		//add class circular
		$('#crop-window').removeClass('circular');

		//destroy to reinitialise resizable
		//$("#crop-window").resizable("destroy");

		//initialise resizable
		// $('#crop-window').resizable({
		//
		// 	minWidth: img_w,
		// 	minHeight: img_h,
		// 	containment: '.image-transparent-background'
		//
		// });

  });

}

//optimise for retina
function optimiseForRetina() {

	//set flag to true
	retinaFlag = true;

	//if the image is a square one, keep the aspect ratio
	if(selected_img_w == selected_img_h){ aspectRatioBoolean = true; }
	else { aspectRatioBoolean = true; }

	//change crop window width and height for retina format
	$('#crop-window').animate({

		'width':selected_img_w * 2+'px',
		'height':selected_img_h * 2+'px',
		'left':0,
		'top':0

	}, 250, function() {

		//destroy to reinitialise
		$("#crop-window").resizable("destroy");

		//reinitialise resizable
		$('#crop-window').resizable({

			minWidth: selected_img_w * 2,
			minHeight: selected_img_h * 2,
			containment: '.image-transparent-background',
			aspectRatio: aspectRatioBoolean

		});

  });

}

//undo for retina
function undoForRetina(){

  //set flag to false
  retinaFlag = false;

  //if the image is a square one, keep the aspect ratio
  if(selected_img_w == selected_img_h){ aspectRatioBoolean = true; }
  else { aspectRatioBoolean = false; }

  //change crop window width and height for none-retina format
  $('#crop-window').animate({

	  'width':selected_img_w+'px',
	  'height':selected_img_h+'px'

  }, 250, function() {

	  //destroy to reinitialise
	  $("#crop-window").resizable("destroy");

	  //reinitialise resizable
	  $('#crop-window').resizable({

	  	minWidth: selected_img_w,
	  	minHeight: selected_img_h,
	  	containment: '.image-transparent-background',
	  	aspectRatio: aspectRatioBoolean

	  });

  });

}

//disable switch
function disableSwitch(switch_name){

	//disable switch
	$('[data-switch-name="'+switch_name+'"] .toggle-switch-knob').removeClass('on').addClass('off');

}

//activate switch
function activateSwitch(switch_name){

	//disable switch
	$('[data-switch-name="'+switch_name+'"] .toggle-switch-knob').removeClass('off').addClass('on');

}

//hide switch
function hideSwitch(switch_name){

	//hide switch
	$('[data-switch-name="'+switch_name+'"]').closest('li').hide();

}

//show switch
function showSwitch(switch_name){

	//hide switch
	$('[data-switch-name="'+switch_name+'"]').closest('li').show();

}

//update image opacity
function updateImageOpacity(slider_value) {

	//variables
	var slider_value = slider_value / 100;

	//update opacity
	$('.image-canvas-image-wrapper img').css('opacity',slider_value);

}

//update overlay opacity
function updateOverlayOpacity(slider_value) {

	//variables
	var slider_value = slider_value / 100;

	//update opacity
	$('#image-overlay-layer').css('opacity',slider_value);

}

//update overlay color
function updateOverlayColor(color){

	$('#image-overlay-layer').css('background-color',color);

}

//open code editor module only
function openCodeEditorModule(module_name, module_contents){

	//if module name is all
	if(module_name == 'All Modules'){

		//set complete template code flag to true;
		completeTemplateCode = true;

		//find html of complete template
		var module_contents = $("#code-editor-iframe").contents().find('html').html();

		//set the correct html markup




		//change codemirror value
		editor.getDoc().setValue(module_contents);
		return false;

	}

	//remove html added by framework
	$tmp = $('<div>' + module_contents + '</div>');
     $tmp.find('.module-options, .ui-resizable-handle').remove();
     $tmp.find('[contenteditable]').removeAttr('contenteditable');
	 $tmp.find('*').contents().each(function() {
 	    if(this.nodeType === Node.COMMENT_NODE) {

 			if(this.nodeValue.indexOf('gte') >= 0 || this.nodeValue.indexOf('mso') >= 0 ){

 			}

 			else {

				if(mode == 'vault'){

					$(this).remove();//comment support

				}

 			}

 	    }
 	});

	module_contents = $tmp.html();
	module_contents = module_contents.replace(/&quot;/g,"'")

	//change codemirror value
	editor.getDoc().setValue(module_contents);

	//initialise tab module list
	initialiseModulesList();

}

//scroll to code editor module
function scrollToCodeEditorModule(offset){

	//wait just a little while in order to process the selected module into the codemirror area
	setTimeout(function(){

		//scroll to position
		$("#code-editor-iframe").contents().find('html, body').animate({ scrollTop: offset.top }, 700);

	}, 30)

}

//update module name
function updateCodeEditorModuleName(module_name){

	$('.tab-module-name').text(module_name)

}

//change code editor tab
function switchCodeEditorTab(tab){

	var tab_name = $(tab).attr('data-tab-name')
	var current_tab_name = $('.code-editor-tab.active').attr('data-tab-name');
	var meta_contents = '';

	//remove all tab active states
	$('#code-editor-tabs li').removeClass('active');

	//set opacity to 0, because we need to reinitialise the theme, it takes a few ms
	$('.CodeMirror-lines').css('opacity','0');

	//add active state
	$(tab).addClass('active');

	//save contents before switching to new content
	if(current_tab_name == 'html'){ html_contents = editor.getValue(); }
	if(current_tab_name == 'css'){ css_contents = editor.getValue(); }
	if(current_tab_name == 'meta'){ meta_contents = editor.getValue(); }

	if(tab_name == 'headers'){

		//fetch only the css
		//css_contents = $('#code-editor-iframe').contents().find('[data-template-type="headers"]').find('style:not([data-stampready-font-family])').text();
		css_contents = $('[data-raw-source="headers"]').val().replace(/></g,">\n<");

		//change codemirror value
		editor.getDoc().setValue(css_contents);

		//set mode to css
		var mode = 'css';

	}

	if(tab_name == 'html'){

		var attr_name = $('.tab-module-name').text();
		$('#code-editor-iframe').contents().find('[data-module="'+attr_name+'"]').wrap('<div></div>')
		html_content = $('#code-editor-iframe').contents().find('[data-module="'+attr_name+'"]').closest('div').html();
		$('#code-editor-iframe').contents().find('[data-module="'+attr_name+'"]').unwrap('div');

		//change codemirror value
		editor.getDoc().setValue(html_contents);
		var mode = 'text/html';

	}

	if(tab_name == 'meta'){

		meta_contents = $('#code-editor-iframe').contents().find('[data-template-type="meta"]').html();

		//change codemirror value
		editor.getDoc().setValue(meta_contents);

		//set mode to html
		var mode = 'text/html';

	}

	//set theme and mode
	setTimeout(function(){

		//set mode
		editor.setOption('mode', mode);

		//show markup
		$('.CodeMirror-lines').css('opacity','1');

	}, 15)

}

//activate code editor save
function activateCodeEditorSave() {

	if(saveTimeout){ return false; }

	//activate save button
	$('#save-code-button').addClass('active');

}

//deactivate code editor save
function saveCode() {


	//1. fetch necessary data
	//2. reflect to template canvas
	//3. generate the template file based on new data
	//4. save template to files and db (headers, body and template)

	//variables
	headers = $('[data-raw-source="headers"]').val();
	body = $('[data-raw-source="body"]').val();
	codeEditorBodyContents = $('#code-editor-iframe').contents().find('[data-template-type="html"]').html();

	//body attributes
	bodyAttributes = $('[data-raw-source="body"]').val();
	var start_pos = bodyAttributes.indexOf('<body') + 5;
	var end_pos = bodyAttributes.indexOf('>',start_pos);
	bodyAttributes = bodyAttributes.substring(start_pos,end_pos);




	//alert(bodyAttributes);
	//return false;



	saveTimeout = true;

	//activate save button
	$('#save-code-button').removeClass('active');

	//grab contents
	var iframe_contents = $('#code-editor-iframe').contents().find('html').html();

	html = cleanHtml(iframe_contents);

	//append to editing canvas
	$('#template-editing-canvas').empty();
	$('#template-editing-canvas').append('<div data-template-type="headers">'+headers+'</div>');
	$('#template-editing-canvas').append('<div data-template-type="html">'+html+'</div>');

	saveTemplateToMemory();

	setSaveActive();

	saveTemplate();

	initialiseResizable();

	initialiseSortable();

	checkEmptyCanvas();

	setTimeout(function(){

		saveTimeout = false;

	}, 1000)

}

//update code preview
function updateCodePreview() {

	//variables
	var contents = editor.getValue();
	var current_tab_name = $('.code-editor-tab.active').attr('data-tab-name');

	$('#code-editor-iframe').contents().find('body').css('-webkit-font-smoothing','subpixel-antialiased');

	//if complete template modde is on
	if(completeTemplateCode){

		//update complete iframe
		$('#code-editor-iframe').contents().find('html').html(contents);
		return false;

	}

	//if html
	if(current_tab_name == 'html'){

		//update template in preview
		$('#code-editor-iframe').contents().find('[data-module]').eq(module_eq).wrap('<div class="parentForUpdate"></div>');
		$('#code-editor-iframe').contents().find('.parentForUpdate').html(contents)
		$('#code-editor-iframe').contents().find('.parentForUpdate').contents().unwrap();

	}

	//if css
	if(current_tab_name == 'headers'){

		//update css
		$('#code-editor-iframe').contents().find('[data-template-type="headers"]').find('style:not([data-stampready-font-family])').remove();
		$('#code-editor-iframe').contents().find('[data-template-type="headers"]').prepend('<style type="text/css">'+contents+'</style>');

		//update the raw source to reflect the changes
		$('[data-raw-source="headers"]').val(contents);

	}

	//if meta
	if(current_tab_name == 'meta'){

		$tmp = $('<div>' + contents + '</div>');
		meta = '';

		$tmp.find('*').each(function(){

			meta = meta + $(this)[0].outerHTML +'\n';

		});

		$('#code-editor-iframe').contents().find('head').find('[data-template-type="meta"]').html(meta);

	}

}

//initialise iframe contents
function initialiseIframe(){

	//fetch template from editing canvas
	var html = cleanHtml($('#template-editing-canvas').html());
	var css = cleanHeaders($('#template-editing-canvas').html());

	//save the current raw headers and body
	currentRawHeaders = $('[data-raw-source="headers"]').val();
	currentRawBody = $('[data-raw-source="body"]').val();

	//add to iframe dynamically
	$('#code-editor-iframe').contents().find('head').html('<div data-template-type="headers">'+css+'</div>');
	$('#code-editor-iframe').contents().find('body').html('<div data-template-type="html" style="-webkit-font-smoothing: subpixel-antialiased;">'+html+'</div>');

	//should remove necessary tags such as content editable cleanHTML and place in right order (head, styles, body)

}

//reset tooltip
function resetTooltip(){

	initialiseTooltipSwatches();

	//variables
	var tooltip = $('.highlighter-container');
	var padding = parseInt($(tooltip).find('#commands li:first-child').css('padding-left'));
	var li_count = $(tooltip).find('#commands li').size();
	var li_width = $(tooltip).find('#commands li').width();
	var swatches_count = $(tooltip).find('#tooltip-swatches li').size();
	var tooltip_new_width = (li_width * li_count) + (padding * 2);
	var swatch_width = tooltip_new_width / li_count;
	var swatch_height = $(tooltip).find('#tooltip-swatches li').height();
	var swatches_tooltip_height = Math.ceil(swatches_count / li_count) * swatch_height;
	subbar_width = $('#sub-bar').width();
	sidebar_width = $('#sidebar').width();

	//show commands
	$('#commands').show();
	$('#commands').css('opacity','1').css('margin-top','0');

	//reset create edit link button
	$('#commands .create-edit-link-button').css('width','0');

	//remove targeted selected text
	$('.targeted-text-selection').removeClass('targeted-text-selection');

	//reset tooltip width
	$(tooltip).css('width',tooltip_new_width+'px')

	//reset swatches width
	$('#tooltip-swatches li').css('width',swatch_width+'px')

	//reset swatches tooltip height
	$('#tooltip-swatches').css('height',swatches_tooltip_height+'px').css('top','-'+swatches_tooltip_height+'px');

	//reset tooltip state
	$(tooltip).removeClass('active');

	//reset tooltip position
	$(tooltip).css('margin-left','-'+(tooltip_new_width / 2 + (subbar_width + sidebar_width))+'px');

	//close swatches
	closeTooltipSwatches();

	//hide create link tooltip
	hideCreateLinkTooltip()


}

//show tooltip
function showTooltip(){

	//add active state, to animate
	$('.highlighter-container').addClass('active');
	$('.highlighter-container').show();

	hideImageTooltip();

	parentNode = window.getSelection().anchorNode.parentElement;

	alignType = $(parentNode).attr('align');

	//if align type is left
	if(alignType == 'left'){

		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '8px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','right')

	}

	//if align type is left
	if(alignType == 'right' || alignType == undefined){
		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '4px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','center')

	}

	if(alignType == 'center'){

		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '0px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','left')

	}

}

//show tooltip
function hideTooltip(){

	editLinkMode = false;

	//add active state, to animate
	$('.highlighter-container').removeClass('active');
	$('.highlighter-container').hide();

}

//tooltip toggle bold
function toggleFontStyle(style){

	//variables
	selectedElement = $('a.selected-element');

	if($(selectedElement).length > 0){

		//italic
		if(style == 'italic'){

			if($(selectedElement).css('font-style') == 'italic'){ $(selectedElement).css('font-style','') }
			else { $(selectedElement).css('font-style','italic') }

		}

		//bold
		if(style == 'bold'){

			if($(selectedElement).css('font-weight') == 'bold'){ $(selectedElement).css('font-weight','') }
			else { $(selectedElement).css('font-weight','bold') }

		}

		//underline
		if(style == 'underline'){

			if($(selectedElement).css('text-decoration') == 'underline'){ $(selectedElement).css('text-decoration','') }
			else { $(selectedElement).css('text-decoration','underline') }

		}

		//strike
		if(style == 'strikeThrough'){

			if($(selectedElement).css('text-decoration') == 'line-through'){ $(selectedElement).css('text-decoration','') }
			else { $(selectedElement).css('text-decoration','line-through') }

		}

		return false;

	}

	//tooltip toggle bold styles
	document.execCommand(style, false, null);

}

//show tooltip swatches
function showTooltipSwatches() {

	//add active state
	$('#tooltip-swatches').addClass('active');

	$('.highlighter-container').css('border-radius','0 0 2px 2px')

	//detect color
	$('#tooltip-swatches [type="button"]').each(function(){

		var color = $(this).attr('data-color');

		$(this).css('background-color',color);

	});

	$('.targeted-text-selection').addClass('selected-element')

	//show swatches
	$('#tooltip-swatches').show();
	$('#tooltip-swatches ul').slideDown(globalAnimationSpeed, "easeOutBack");

}

//close tooltip open swatches
function closeTooltipSwatches() {

	//hide swatches
	$('#tooltip-swatches ul').slideUp(globalAnimationSpeed, "easeInBack", function() {

		//remove active state
		$('#tooltip-swatches').removeClass('active');

		$('#tooltip-swatches').hide();

		$('.highlighter-container').css('border-radius','2px')

	});

}

//add color to selection
function addColorToSelection(swatch){

	setSaveActive();

	//fetch selected swatch color
	sel_color = $(swatch).attr('data-color');

	//fetch line height of parent
	var line_height = $('.selected-element').css('line-height');

	//create span element
	var span = document.createElement("span");

	//set class
	span.className = 'targeted-text-selection';

	//set style attr
	span.style.cssText = 'color: '+sel_color+';line-height: '+line_height;

	//count number of characters in text selection
    var length = document.getSelection().toString().length;
    var sel_text = document.getSelection().toString();
    var total_text = $('.selected-element').text();

	total_text = total_text.replace(/[^A-Za-z0-9]/g, '');
	total_text_length = total_text.length;

	sel_text = sel_text.replace(/[^A-Za-z0-9]/g, '');
	sel_text_length = sel_text.length;

	//if selection exists
	if (window.getSelection) {

		//animate a droplet
		animateColorSplash(sel_color, swatch);

		if($('a.selected-element').length > 0){

			$('a.selected-element').css('color',sel_color);

		}

		//if the user has selected all the characters from selected element, better to add the color to it's parent
		else if(sel_text_length == total_text_length){

			$('.selected-element').css('color',sel_color);
			return false;

		}

		//if targeted text selection exists, color that instead
		else if ($('.targeted-text-selection').length > 0) {

			$('.targeted-text-selection').css('color',sel_color);
			return false;

		}

		var sel = window.getSelection();
		if (sel.rangeCount) {
			var range = sel.getRangeAt(0).cloneRange();
			range.surroundContents(span);
			sel.removeAllRanges();
			sel.addRange(range);

			if($('.targeted-text-selection').parent('u').length > 0){

				$('.targeted-text-selection').unwrap('u')
				$('.targeted-text-selection').css('text-decoration','underline')

			}

			else if($('.targeted-text-selection').parent('i').length > 0){

				$('.targeted-text-selection').unwrap('u')
				$('.targeted-text-selection').css('font-style','italic')

			}

			else if($('.targeted-text-selection').parent('b').length > 0){

				$('.targeted-text-selection').unwrap('b')
				$('.targeted-text-selection').css('font-weight','bold')

			}

			else if($('.targeted-text-selection').parent('strike').length > 0){

				$('.targeted-text-selection').unwrap('strike')
				$('.targeted-text-selection').css('text-decoration','line-through')

			}

		}

	}

}

//make clicked element editable
function makeEditingElementSelected(element) {

	if($(element).is('.repeatable-button, .removable-button')){ return false; }

	//add/remove selected state
	$('#template-editing-canvas *').not('.module-options').removeAttr('contenteditable').removeProp('contenteditable')
	$('.selected-element').removeClass('selected-element');
	$(element).addClass('selected-element');
	$('.selected-table').removeClass('selected-table')
	$(element).closest('[data-module]').addClass('selected-table');

	//add contenteditable to element
	$(element).attr('contenteditable','true');

	//make sure to remove the bounce animation off the repeatable button
	if($('.repeatable-button').length){

		module = $(element).closest('[data-module]');
		showModuleOptions(module)

		$('.repeatable-button-wrapper, .removable-button-wrapper').remove();

	}

}

//show create link tooltip
function showCreateLinkTooltip(url){

	var url = $('.selected-element').attr('href');

	closeTooltipSwatches();

	var wait = 0;
	if ($('#tooltip-swatches.active').length > 0) {

		wait = 200;

	}

	//always empty the value
	$('#link-value-holder').val(url);

	//fetch sidebar width
	sidebar_width = $('#sidebar').width();
	subbar_width = $('#sub-bar').width();

	setTimeout(function(){

		current_tooltip_width = $('.highlighter-container').width();
		var new_tooltip_width = 340;

		//animate commands
		$('#commands').animate({

			'margin-top':'10px',
			'opacity':0

		}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

			$('.highlighter-container').width(new_tooltip_width+'px');

			if(editLinkMode){

				//reset tooltip position
				$('.highlighter-container').css('margin-left','-'+((new_tooltip_width - current_tooltip_width) / 2)+'px');

			}
			else {

				editLinkMode = false;

				//reset tooltip position
				$('.highlighter-container').css('margin-left','-'+(new_tooltip_width / 2 + (sidebar_width + subbar_width))+'px');

			}

			//hide commands
			$('#commands').hide();

			$('#create-edit-link').show();

			setTimeout(function(){

				//show creadte/edit link wrapper
				$('#create-edit-link').animate({

					'opacity':1,
					'margin-top':0

				}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

					$('.create-edit-link-button').animate({
						'width':'45px'
					}, 200);

				}});

				//focus input
				$('#link-value-holder').focus();

			}, 200)

		}})

	}, wait)

}

//hide create link tooltip
function hideCreateLinkTooltip(){

	$('#create-edit-link').hide();

	//position credte edit link wrapper a little higher for the animation
	$('#create-edit-link').css('margin-top','-10px').css('opacity','0');

}

//create a link
function createLink() {

	//create span element
	var a = document.createElement("a");

	//set class
	a.className = 'targeted-text-selection sr-created-link';

	//set style attr
	a.style.cssText = 'text-decoration: none;';

	$('.targeted-text-selection').addClass('selected-element');

	//if selection exists
	if($('.selected-element').is('a')){


	}

	else if($('.selected-element').closest('a').length){


	}

	else if (window.getSelection) {

		//id targeted text selection exists, color that instead
		if ($('.targeted-text-selection').length > 0) {

			//fetch the contents
			var contents = $('.targeted-text-selection').html();

			//fetch the color of already existing target selection
			var color = $('.targeted-text-selection').css('color');

			//add href to targeted selection
			$('.targeted-text-selection').contents().unwrap().wrap('<a href="#" style="color: '+color+'; text-decoration: none;" class="targeted-text-selection sr-created-link">');
			$('.targeted-text-selection').find('a').contents().unwrap('a');

			return false;

		}

		var sel = window.getSelection();
		if (sel.rangeCount) {
			var range = sel.getRangeAt(0).cloneRange();
			range.surroundContents(a);
			sel.removeAllRanges();
			sel.addRange(range);

			//detect if other link is present
			var elem1 = window.getSelection().anchorNode.parentElement.closest('td');

			css = $(elem1).find('a:not(.targeted-text-selection)').attr('style');
			cssSrCreatedLink = $('[data-template-type="html"]').find('.sr-created-link:not(.targeted-text-selection)').attr('style');

			if(css != undefined){

				$('.targeted-text-selection').attr('style', css);

			}

			else if(cssSrCreatedLink != undefined){

				$('.targeted-text-selection').attr('style', cssSrCreatedLink);

			}

			else {

				$('.targeted-text-selection').attr('style', 'color: rgb(52, 142, 218); text-decoration: none;');

			}


			$('.targeted-text-selection').attr('href','#');
			$('.targeted-text-selection').find('a').contents().unwrap('a');


		}

	}

	setSaveActive();

}

//check if URL exists
function ifURLExists(url){

	//check if url has only a hashtag, is empty, or has mailto
	if(url == '#' || url == ''){

		return false;

	}

	//fetch the length of the array
    length = ignoreWords.length;

    //loop through array
	while(length--) {

		//if word found, do not run the url checker
		if (url.indexOf(ignoreWords[length])!=-1) {

			return false;
		}
	}

	// //ajax connection
	// $.ajax({
	//     type: "POST",
	//     dataType: "html",
	//     url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=checkIfUrlExists",
	//     data: { url: url }
	// }).done(function(data) {
	//
	// 	if(data == 'invalid'){
	//
	// 		$('.preview-url').addClass('invalid-url');
	//
	// 	}
	//
	// 	else {
	//
	// 		$('.preview-url').removeClass('invalid-url');
	//
	// 	}
	//
	// });

}

//show main tooltip
function showMainTooltip() {

	//hide the create edit link button
	$('#create-edit-link .create-edit-link-button').animate({

		'width':0

	}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

		//show creadte/edit link wrapper
		$('#create-edit-link').animate({

			'opacity':0,
			'margin-top':'10px'

		}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

			//hide edit create link
			$('#create-edit-link').hide();

			$('#create-edit-link').css('margin-top','-10px')

			//show commands
			$('#commands').show().css('margin-top','-10px');

			setTimeout(function(){

				$('#commands').animate({

					'opacity': 1,
					'margin-top': 0

				}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

					showTooltipSwatches();

				}})

			}, 200)


		}});

		setTimeout(function(){

			$('.highlighter-container').width(current_tooltip_width+'px');

			if(editLinkMode){

				//reset tooltip position
				$('.highlighter-container').css('margin-left','0px');

				editLinkMode = false;

			}

			else {

				//reset tooltip position
				$('.highlighter-container').css('margin-left','-'+(current_tooltip_width / 2 + (subbar_width + sidebar_width))+'px');

			}

		}, 200)

	}})

}

//change link
function changeLink(link){

	console.log('thisss')

	//variables
	first3Chars = link.slice(0,3);


	//if sr_ tag
	if(first3Chars.indexOf('sr_') == 0){



	}

	else if(link.indexOf('mailto:') >= 0){

		//alert('yes mailto')

	}

	else if(link.indexOf('@') >= 0){

		if(isEmail(link)){

			link = 'mailto:'+link

		}

		//alert('yes mailto')

	}

	else {


		//if the link does not contain http & https
		if(link.indexOf('http://') == -1 && link.indexOf('https://') == -1){ link = 'http://'+link; }

	}

	if(link == 'https://' || link == 'http://'){ link = ''; }


	//check if target selection exists
	if ($('.targeted-text-selection').length > 0 || $('.selected-element').length > 0) {

		if($('.selected-element').closest('a').length){

			$('.selected-element').closest('a').addClass('targeted-text-selection');

			if(link == ''){

				//change the href
				$('a.targeted-text-selection').contents().unwrap();

			}

			else {

				//change the href
				$('a.targeted-text-selection').attr('href',link);

			}

		}

		else {

			$('.selected-element').addClass('targeted-text-selection');

			if(link == ''){

				//change the href
				$('a.targeted-text-selection').contents().unwrap();

			}

			else {

				//change the href
				$('a.targeted-text-selection').attr('href',link);

			}

		}

		$('#link-value-holder').blur();

		//$('#link-value-holder').val('');
		$('td').removeAttr('href');

		//hide create link tooltip
		showMainTooltip();

	}

	setSaveActive();


}

//show module options, such as delete, copy, etc
function showModuleOptions(module){

	//fetch html from module left options
	left_options = $('.define-module-left-options').html();
	right_options = $('.define-module-right-options').html();

	//variables
	option_height = $('.module-option').height();
	option_width = $('.module-option').width();
	module_height = $(module).height();
	options_count_left = $('.define-module-left-options').find('.module-option').size();
	options_count_right = $('.define-module-right-options').find('.module-option').size();
	shift_left = (options_count_left * option_height) / 2;
	shift_right = (options_count_right * option_height) / 2;

	if($(module).find('[data-feed-type]').length < 1){

		options_count_right = $('.define-module-right-options').find('.module-option').size() - 1;
		shift_right = (options_count_right * option_height) / 2;

		//append options, left and right
		$(module).find('td').first().append('<div contenteditable="false" class="module-options left-options keep-crisp noselect" contenteditable="false"><div class="module-options-wrapper" style="margin-top: -'+shift_left+'px;">'+left_options+'</div></div><div contenteditable="false" class="module-options right-options keep-crisp noselect"><div class="module-options-wrapper" style="margin-top: -'+shift_right+'px;">'+right_options+'</div></div>');

		$('.module-options-wrapper [data-module-option="feed"]').remove();

	}

	else {

		//append options, left and right
		$(module).find('td').first().append('<div contenteditable="false" class="module-options left-options keep-crisp noselect" contenteditable="false"><div class="module-options-wrapper" style="margin-top: -'+shift_left+'px;">'+left_options+'</div></div><div contenteditable="false" class="module-options right-options keep-crisp noselect"><div class="module-options-wrapper" style="margin-top: -'+shift_right+'px;">'+right_options+'</div></div>');

	}

	//animate module wrapper
	$('.module-options-wrapper').animate({
		'width':option_width+'px'
	}, { duration: openSpaceSpeed, easing: 'easeOutQuad', complete:  function() {

	}});


}

//hide module options
function hideModuleOptions(){

	//remove options
	$('.module-options').remove();

}

function removeModule(module){

	//auto trigger the very next module
	if($(module).next().is('[data-module]')) {

		var targetModule = $(module).next('[data-module]');

		if($('[data-title="Styles"]').hasClass('active')){

			initialiseStyles(targetModule);

			//activate navigation item
			activateNavigationItem('[data-title="Styles"]');

		}

	}

	else if($(module).prev().is('[data-module]')) {

		var targetModule = $(module).prev('[data-module]');

		if($('[data-title="Styles"]').hasClass('active')){

			initialiseStyles(targetModule);

			//activate navigation item
			activateNavigationItem('[data-title="Styles"]');

		}

	}

	else {

		$('[data-title="Styles"]').hide();

		//activate navigation item
		activateNavigationItem('[data-title="Modules"]');

		openSection('Modules');

	}

	//remove module
	$(module).remove();

	//remove unecessary fonts
	removeUnusedFonts();

	//save template to memory
	saveTemplateToMemory();

	checkEmptyCanvas();

	hideTooltip();

	hideImageTooltip();

	setSaveActive();

}

//duplicate module
function duplicateModule(module){

	//fetch html
    html_module = $(module).clone();

    $(module).after(html_module);
    $(module).next('[data-module]').find('.module-options, .ui-resizable-handle').remove();

    //vars
    elem = $("#template-editing-canvas");
    y = $(module).offset().top - elem.parent().offset().top;

    cur_module_height = $(module).height();

    $('#canvas').animate({

        scrollTop: y + cur_module_height

    }, 550, 'easeOutQuad', function () {

    });

    //hide modules
    hideModuleOptions();

    //save template to memory
    saveTemplateToMemory();

    checkEmptyCanvas();

    initialiseResizable();

    setSaveActive();


}

//initialise modules
function initialiseModules() {

	//variables
	var t_out = 0;
	var t_step = 60;

	//let's detect if the template has grouping modules $('#template-modules-holder [data-module]').each(function(){
	if($('#template-modules-holder [data-group]').length > 0){

		templateGrouping = true;

	}

	//if template grouping is set to true
	if(templateGrouping){


		//appendUI
		$('#sub-bar [data-menu-section="modules"]').append('<div id="module-accordion-holder"><div id="module-accordion-sections-holder"></div><div id="module-accordion-modules"><div id="module-accordion-modules-headline" class="font-bold"><div id="module-accordion-back-btn"></div><span>Headers</span></div><ul id="module-accordion-modules-list">List</ul></div></div>');

		$('#template-modules-holder [data-group], #template-modules-holder [data-module]:not([data-group])').each(function(){

			//variables
			groupName = $(this).attr('data-group');

			if(groupName == undefined){ groupName = 'Other'; }

			//if function is running
			if (moduleGroupingString.indexOf(groupName) >= 0){

			}

			else {

				moduleGroupingString = moduleGroupingString + groupName+'[];';

			}

		});

		moduleGroupingString = moduleGroupingString.slice(0,-1);

		//create an array from the fetched string
		var array = moduleGroupingString.split(';');

		//for each item
		for (i=0;i<array.length;i++){

			//variables
			modulesString = '';

			if(array[i] == '' || array[i] == ' '){

				return false;

			}

			//the item
			var item = array[i].substring(0, array[i].indexOf('['));
			var value = array[i].split('[')[1].split(']')[0];
			var count = $('#template-modules-holder [data-group="'+item+'"]').size();

			if(count == 0){

				var count = $('#template-modules-holder [data-module]:not([data-group])').size();

			}

			$('#sub-bar #module-accordion-sections-holder').append('<li class="module-accordion font-bold"><span class="section-name">'+item+'</span><span class="module-accordion-bubble">'+count+'</span></li>')

		}

		//after we created the groups/section, append thumbnails



		// $('#sub-bar [data-menu-section="modules"]').append('<div id="module-accordion-holder"><div id="module-accordion-sections-holder"></div><div id="module-accordion-modules"><div id="module-accordion-modules-headline" class="font-bold"><div id="module-accordion-back-btn"></div><span>Headers</span></div><ul id="module-accordion-modules-list"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></ul></div></div>');
		//
		// $('#sub-bar #module-accordion-sections-holder').append('<li class="module-accordion font-bold"><span class="section-name">headers</span><span class="module-accordion-bubble">8</span></li><li class="module-accordion font-bold"><span class="section-name">blocks</span><span class="module-accordion-bubble">2</span></li><li class="module-accordion font-bold"><span class="section-name">footers</span><span class="module-accordion-bubble">10</span></li>')

	}

	//no grouping, initialise as single
	else {

		setTimeout(function(){

			//loop through each module on the template editing canvas page
			$('#template-modules-holder [data-module]').each(function(){

				var target = $(this);

				setTimeout(function(){

					//fetch thumbnail
					var thumbnail = $(target).attr('data-thumb');

					if(thumbnail == undefined){

						thumbnail = $(target).attr('data-thumbnail');

					}

					var module_name = $(target).attr('data-module');
					var module_name_overlay = '';

					if(thumbnail == undefined){

						thumbnail = 'img/framework/thumbnail-placeholder.png';
						module_name_overlay = '<div class="module-name-overlay font-bold">'+module_name+'</div>';

					}

					var module = $('.menu[data-menu-section="modules"]').append('<li data-sidebar-module-identifier="'+module_name+'" data-module-name="'+module_name+'" data-module-type="template">'+module_name_overlay+'<img src="'+thumbnail+'"></li>')

					$(module).find('img').animate({

						'margin-left':'0px',
						'opacity': 1

					}, 500);

					initialiseDraggable();

				}, t_out);

				t_out = t_out + t_step;

			});

		}, globalAnimationSpeed * 5)

	}

}

function initialiseDraggable(){

	//drag and drop modules
	$('[data-menu-section="modules"] li:not(.module-accordion)').draggable({
		connectToSortable: '#template-editing-canvas [data-template-type="html"]',
		scroll: false,
		appendTo: 'body',
		zIndex: 10000,
		delay: 100,
		helper: 'clone',
		revert: 'invalid',
		start : function(event, ui) {
			moduleActiveFlag = true;
			outOfCanvasFlag = true;
			initialiseSortable();
		},
		stop: function(event,ui){
			moduleActiveFlag = false;
			outOfCanvasFlag = false;
		}
	});

}

function initialiseSortable(){

	$('#template-editing-canvas [data-template-type="html"]').sortable({
        items: 'table[data-module]',
        axis: 'y',
        distance: 5,
        opacity: 1,
	   scroll: false,
	   handle: '[data-module-option="drag"]',
        start: function(event, ui){

		   placeHolderFlag = true;
		   outOfCanvasFlag = false;

	   },
	   placeholder: {

	        element: function(currentItem) {

			   if ($('.ui-draggable.ui-draggable-dragging').length > 0) {

				   return $('<div class="ui-sortable-placeholder canvas-placeholder"><div class="placeholder-shadow-top"></div><div class="placeholder-shadow-bottom"></div><div class="placeholder-indicator"><div class="placeholder-indicator-top"></div><div class="placeholder-indicator-bottom"></div></div></div>')[0];

			   }

			   else {

				   //variables
				   var sortableModuleHeight = $('[data-module-option="drag"]').closest('[data-module]').height();
				   var moduleHtml = $('[data-module-option="drag"]').closest('[data-module]')[0].outerHTML;

				   return $('<div class="ui-sortable-placeholder canvas-placeholder sortable-placeholder-static" style="height: '+sortableModuleHeight+'px">'+moduleHtml+'</div>')[0];

			   }

	        },

	        update: function(container, p) {

	            return;
	        }

	   },
	   out: function(event, ui) {

		   moduleActiveFlag = true;
		   placeHolderFlag = false;
		   outOfCanvasFlag = true;
		   overCanvasFlag = false;

		   $('.editing-canvas-empty-state.active').removeClass('active');

	   },
	   over: function(event, ui) {

		   moduleActiveFlag = false;
		   var mouseX, mouseY;
		   var p = $('#template-editing-canvas').offset();
		   var s = $(window).width();

		   outOfCanvasFlag = false;
		   overCanvasFlag = true;


	   },
		stop: function(event, ui){

		   moduleActiveFlag = false;
		   moduleOptionDragFlag = false;
		   outOfCanvasFlag = false;

		   $('#canvas').css('overflow-y','');

		   setSaveActive();

	   }, receive: function (event, ui) {

		   //variables
		   moduleName = $(ui.helper).attr('data-module-name');
		   templateEditingCanvas = $('#template-editing-canvas');
		   moduleType = $(ui.helper).attr('data-module-type');
		   countModules = $('#template-editing-canvas [data-template-type="html"] [data-module]').size();

		   //set the height of the placeholder
		   $(templateEditingCanvas).find('[data-module-type]').attr('class','ui-sortable-placeholder canvas-placeholder').removeAttr('data-module-name').css('height', currentPlaceholderHeight+'px').html('<div class="placeholder-indicator"><div class="placeholder-indicator-top"></div><div class="placeholder-indicator-bottom"></div></div>');

		   if(countModules < 1){

			$('.editing-canvas-empty-state').addClass('loading');

			$('.ui-sortable-placeholder').css('opacity','0')

		   }

		   $('.canvas-placeholder').animate({

			   'height': maxElementHeight+'px'

		  }, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {

		  	loadModule(moduleType);
			adjustScrollbarToModulePosition();

			outOfCanvasFlag = false;

		  }});

	   }
	});

}

//fullscreen template
function fullscreen(){

	//variables
	var headers = cleanHeaders($('#template-editing-canvas').html());
	var html = cleanHtml($('#template-editing-canvas').html());

	//if html is empty
	if(html == ''){

		//notification
		notification('warning','Nothing to Preview','Drag a module from the left ', false);
		openSection('modules');

		return false;

	}

	var newWindow = window.open();
	newWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><title>Preview Fullscreen</title>'+headers+html+'</html>');

	/*
if(mode != 'demo'){

		var newWindow = window.open('http://www.stampready.net/dashboard/online/?id='+campaign_id, '_blank');

	}

	else {

		//variables
		var meta = cleanMeta($('#template-editing-canvas').html());
		var css = cleanHeaders($('#template-editing-canvas').html());
		var html = cleanHtml($('#template-editing-canvas').html());

		var newWindow = window.open();
		newWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">'+meta+css+html+'</html>');

	}
*/


     //newWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">'+html);

}

//clear html
function clearHtml(contents){

    $tmp = $('<div>' + contents + '</div>');
    $tmp.find('#clear_template').remove();
    $tmp.find('.parentOfBg').contents().unwrap('<div></div>');
    $tmp.find('[contenteditable]').removeAttr('contenteditable');
    $tmp.find('.last-table').removeClass('last-table');
    //$tmp.find('tr').unwrap('<tbody></tbody>')
    $tmp.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
    $tmp.find('.currentTable').removeClass('currentTable');
    $tmp.find('.resetHeight').removeClass('resetHeight');
    $tmp.find('.editable').removeClass('editable');

    contents = $tmp.html();
    return contents;

}

//initialise styles
function initialiseStyles(module){

	//open section styles
	var name = 'Styles';
	openSection(name);

	currentSwatch = $('#styles-swatches h6 span').attr('data-swatch-value');

	if(currentSwatch == 'base_colors' || currentSwatch == 'template colors'){

		removeFromSelect('swatches-options', 'Remove Swatches', 'remove_swatches');
		removeFromSelect('swatches-select', 'Remove Palette', 'remove_palette');

	}

	//variables
	var moduleHtml = $(module)[0].outerHTML;

	//insert into the html dump
	$('#html-dump').html(moduleHtml);

	//target the module
	var module = $('#html-dump');

	//fetch contents
	var module = $(module).parent().find(module);

	//reset all styles
	$('[data-styles-section] div').empty();

	//reset/show styles attributes
	$('[data-menu-section="styles"]').show();
	$('[data-styles-section]').show();

	//fetch colors
	$(module).find('[data-color]:not(img)').each(function(){

		//variables
		var attr_name = $(this).attr('data-color');
		var color = $(this).css('color');

		//convert to rgba, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

		//detect whether the color input value should be bright or dark.
		var brightness = detectBrightness(color);

		//append to div
		$('[data-styles-section="font-colors"] div').append('<li data-attr-type="color" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span> <input type="text" value="'+color+'" maxlength="7" class="colorpicker-value font-bold unfocussed" style="background-color: '+color+'; color: '+brightness+'"></li>')

	});

	//fetch images that can be colorizes
	$(module).find('img[data-color]').each(function(){

		//variables
		var attr_name = $(this).attr('data-color');
/*
		var color = $(this).css('color');

		//convert to rgba, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);
*/

		//detect whether the color input value should be bright or dark.
// 		var brightness = detectBrightness(color);

		//append to div
		$('[data-styles-section="image-colors"] div').append('<li data-attr-type="image-color" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span> <input type="text" value="#FFF" maxlength="7" class="colorpicker-value font-bold unfocussed" style="background-color: #FFF; color: #000"></li>')

	});

	//fetch borders colors
	$(module).find('[data-border-color]').each(function(){

		//variables
		var attr_name = $(this).attr('data-border-color');

		//fetch all possible border colors
		if ($(this).css('border-top')){ var color = $(this).css('border-top-color'); }
		else if ($(this).css('border-right')){ var color = $(this).css('border-right-color'); }
		else if ($(this).css('border-bottom')){ var color = $(this).css('border-bottom-color'); }
		else if ($(this).css('border-left')){ var color = $(this).css('border-left-color'); }

		//convert to rgba, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

		//detect whether the color input value should be bright or dark.
		var brightness = detectBrightness(color);

		//append to div
		$('[data-styles-section="background-colors"] div').append('<li data-attr-type="bgcolor" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span> <input type="text" value="'+color+'" maxlength="7" class="colorpicker-value font-bold unfocussed" style="background-color: '+color+'; color: '+brightness+'"></li>')

	});

	//fetch border colors (outdated)
	$(module).find('[data-border-top-color], [data-border-right-color], [data-border-bottom-color], [data-border-left-color]').each(function(){

		//fetch all possible border colors
		if ($(this).attr('data-border-top-color')){ var color = $(this).css('border-top-color'); var attr_name = $(this).attr('data-border-top-color'); }
		else if ($(this).attr('data-border-right-color')){ var color = $(this).css('border-right-color'); var attr_name = $(this).attr('data-border-right-color'); }
		else if ($(this).attr('data-border-bottom-color')){ var color = $(this).css('border-bottom-color'); var attr_name = $(this).attr('data-border-bottom-color'); }
		else if ($(this).attr('data-border-left-color')){ var color = $(this).css('border-left-color'); var attr_name = $(this).attr('data-border-left-color'); }

		//convert to rgba, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

		//detect whether the color input value should be bright or dark.
		var brightness = detectBrightness(color);

		//append to div
		$('[data-styles-section="background-colors"] div').append('<li data-attr-type="bgcolor" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span> <input type="text" value="'+color+'" maxlength="7" class="colorpicker-value font-bold unfocussed" style="background-color: '+color+'; color: '+brightness+'"></li>')

	});

	//, [data-border-top-color], [data-border-right-color], [data-border-bottom-color], [data-border-left-color]

	//fetch background colors
	$(module).find('[data-bgcolor]').each(function(){

		//variables
		var attr_name = $(this).attr('data-bgcolor');
		var color = $(this).css('background-color');
		var attr_boolean = ''; //start as empty
		var color_format = detectColorFormat(color);
		var alpha = '100';

		if(color_format == 'rgba'){

			//get rgba opacity param
			var alpha = getRgbaOpacity(color) * 100;

			//convert to rgb, regardless the color format (hex, rgba, rgba, name)
			var color = hex2rgb(color);

			//convert to hex
			var color = rgbToHex(color);

		}

		if(color_format == 'rgb'){

			//convert to rgb, regardless the color format (hex, rgba, rgba, name)
			var color = hex2rgb(color);

			//convert to hex
			var color = rgbToHex(color);

		}

		if(color_format == 'hex'){

			//convert to rgb, regardless the color format (hex, rgba, rgba, name)
			var color = hex2rgb(color);

			//convert to hex
			var color = rgbToHex(color);

		}

		//detect whether the color input value should be bright or dark.
		var brightness = detectBrightness(color);

		var hasDataBgcolorOpacity = $(this).attr('data-bgcolor-opacity');

		if (typeof hasDataBgcolorOpacity !== typeof undefined && hasDataBgcolorOpacity !== false) {

		    var attr_boolean = 'true';

		}

		//append to div
		$('[data-styles-section="background-colors"] div').append('<li data-attr-type="bgcolor" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span> <input type="text" value="'+color+'" maxlength="7" class="colorpicker-value font-bold unfocussed" data-opacity-addon="'+attr_boolean+'" data-opacity-attr="'+alpha+'" style="background-color: '+color+'; color: '+brightness+'"></li>');

		//show
		$('[data-styles-section] h6').show();

	});

	//fetch sizes and font-families
	$(module).find('[data-size]').each(function(){

		//variables
		var attr_name = $(this).attr('data-size');
		var attr_value = parseInt($(this).css('font-size'));
		var attr_min = $(this).attr('data-min');
		var attr_max = $(this).attr('data-max');
		var attr_font = $(this).css('font-family');
		var attr_font_weight = $(this).css('font-weight');

		if(!attr_value){ attr_value = 16; }
		if(!attr_min){ attr_min = 12; }
		if(!attr_max){ attr_max = 32; }

		//append size to section
		$('[data-styles-section="appearances"] div').append('<li data-attr-type="size" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name.slice(0,18)+'</span><input type="text" class="slider-output regular" value="'+attr_value+'" maxlength="3"><input class="appearances-slider" type="range" value="'+attr_value+'" min="'+attr_min+'" max="'+attr_max+'" onchange="updateSlider(this,event); updateModuleFontSize(this,event)" oninput="updateSlider(this,event); updateModuleFontSize(this,event)"></li>');

		//append font family to section
		$('[data-styles-section="font-families"] div').append('<li class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="button" value="'+attr_font.replace("'","").replace('"','').slice(0,2)+'" style="font-family: '+attr_font+';" class="font-button" data-font-attr-weight="'+getFontWeightInt(attr_font_weight)+'"data-select-name="font-family-menu" /></li>');

	});

	//fetch border-width
	$(module).find('[data-border-size]').each(function(){

		//variables
		var attr_name = $(this).attr('data-border-size');

		//fetch border width
		if ($(this).css('border-top')){ var attr_value = parseInt($(this).css('border-top-width')); }
		if ($(this).css('border-right')){ var attr_value = parseInt($(this).css('border-right-width')); }
		if ($(this).css('border-bottom')){ var attr_value = parseInt($(this).css('border-bottom-width')); }
		if ($(this).css('border-left')){ var attr_value = parseInt($(this).css('border-left-width')); }

		//fetch the min and max
		var attr_min = $(this).attr('data-border-size-min');
		var attr_max = $(this).attr('data-border-size-max');

		//check if undefined
		if(!attr_value){ attr_value = 0; }
		if(!attr_min){ attr_min = 0; }
		if(!attr_max){ attr_max = 10; }

		//append to div
		$('[data-styles-section="appearances"] div').append('<li data-attr-type="border-size" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="text" class="slider-output regular" value="'+attr_value+'" maxlength="3"><input class="appearances-slider" type="range" value="'+attr_value+'" min="'+attr_min+'" max="'+attr_max+'" onchange="updateSlider(this,event); updateModuleBorderWidth(this,event)" oninput="updateSlider(this,event); updateModuleBorderWidth(this,event)"></li>')

	});

	//fetch border-width
	$(module).find('[data-border-radius]').each(function(){

		//variables
		var attr_name = $(this).attr('data-border-radius');

		//fetch border width
		if ($(this).css('border-top-left-radius')){ var attr_value = $(this).css('border-top-left-radius'); }
		if ($(this).css('border-top-right-radius')){ var attr_value = $(this).css('border-top-right-radius'); }
		if ($(this).css('border-bottom-left-radius')){ var attr_value = $(this).css('border-bottom-left-radius'); }
		if ($(this).css('border-bottom-right-radius')){ var attr_value = $(this).css('border-bottom-right-radius'); }

		//fetch the min and max
		var attr_min = $(this).attr('data-border-radius-min');
		var attr_max = $(this).attr('data-border-radius-max');

		//check if undefined
		if(!attr_value){ attr_value = 0; }
		if(!attr_min){ attr_min = 0; }
		if(!attr_max){ attr_max = 26; }

		attr_value = attr_value.replace('px','');

		if(attr_value.indexOf('%') >= 0){

			outputValue = '100%';
			attr_value = attr_max;

		}

		else {

			outputValue = attr_value;

		}

		//append to div
		$('[data-styles-section="appearances"] div').append('<li data-attr-type="border-radius" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="text" class="slider-output regular" value="'+outputValue+'" maxlength="4"><input class="appearances-slider" type="range" value="'+attr_value+'" min="'+attr_min+'" max="'+attr_max+'" onchange="updateSlider(this,event); updateModuleBorderRadius(this,event)" oninput="updateSlider(this,event); updateModuleBorderRadius(this,event)"></li>')

	});

	//fetch height
	$(module).find('[data-height]').each(function(){

		//variables
		var attr_name = $(this).attr('data-height');
		var attr_value = parseInt($(this).attr('height'));
		var attr_min = $(this).attr('data-height-min');
		var attr_max = $(this).attr('data-height-max');

		if(!attr_value){ attr_value = 20; }
		if(!attr_min){ attr_min = 0; }
		if(!attr_max){ attr_max = 100; }

		//append to div
		$('[data-styles-section="appearances"] div').append('<li data-attr-type="height" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="text" class="slider-output regular" value="'+attr_value+'" maxlength="3"><input class="appearances-slider" type="range" value="'+attr_value+'" min="'+attr_min+'" max="'+attr_max+'" step="2" onchange="updateModuleHeight(this,event); updateSlider(this,event)" oninput="updateModuleHeight(this,event); updateSlider(this,event);"></li>')

	});

	//fetch background images
	$(module).find('[data-background], [data-bg]').each(function(){

		//variables
		var attr_name1 = $(this).attr('data-background');
		var attr_name2 = $(this).attr('data-bg');
		var bgImage = $(this).css('background-image');

		selectMenuString = 'Upload Image[upload_image];Pick From Gallery[pick_from_gallery];Direct URL[direct_url]';

		if(attr_name1 !== undefined){ attr_name = $(this).attr('data-background'); }
		else if(attr_name2 !== undefined){ attr_name = $(this).attr('data-bg'); }

		//if attr_name contains 'edited/', it's been edited with SR before
		if(bgImage.indexOf('uploads/edited/') >= 0){

			selectMenuString = 'Edit Image[edit_image];' + selectMenuString;

		}

		if(bgImage !== 'none'){

			selectMenuString = selectMenuString + ';Remove Image[remove_image];addDivider[];Set Auto Width[set_auto_width];Set Repeatable[set_repeatable];Set 100%[set_100%];No behaviour[no_behaviour]';

		}

		$('[data-styles-section="background-images"] div').append('<li data-attr-type="background" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="button" value="" class="background-images-button" data-select-name="background-images" data-select-items="addDivider[];'+selectMenuString+'" /></li>');

	});

	//fetch width
	$(module).find('[data-width]').each(function(){

		//variables
		var attr_name = $(this).attr('data-width');
		var attr_value = parseInt($(this).attr('width'));
		var attr_min = $(this).attr('data-width-min');
		var attr_max = $(this).attr('data-width-max');

		if(!attr_value){ attr_value = 20; }
		if(!attr_min){ attr_min = 0; }
		if(!attr_max){ attr_max = 100; }

		//append to div
		$('[data-styles-section="appearances"] div').append('<li data-attr-type="width" class="font-bold"><span data-attr-name="'+attr_name+'">'+attr_name+'</span><input type="text" class="slider-output regular" value="'+attr_value+'" maxlength="3"><input class="appearances-slider" type="range" value="'+attr_value+'" min="'+attr_min+'" max="'+attr_max+'" step="2" onchange="updateModuleWidth(this,event); updateSlider(this,event)" oninput="updateModuleWidth(this,event); updateSlider(this,event);"></li>')

	});

	$('.targeted-module [data-module]').unwrap();

	//remove duplicated styles
	removeDuplicatedStyles();

	//hide smpty styles
	hideEmptyStyles();

	//initialiseFontFamilyMenu
	initialiseFontFamilyMenu();

	//empty the dump
	$('#html-dump').empty();

	//set focus state on clicked element
	if(clickedElementColor){ setTimeout(function(){ $('[data-attr-type="color"] [data-attr-name="'+clickedElementColor+'"]').closest('li').find('.colorpicker-value').trigger('mousedown') }, 20); return false; }
	else if(clickedElementBgColor){ setTimeout(function(){ $('[data-attr-type="bgcolor"] [data-attr-name="'+clickedElementBgColor+'"]').closest('li').find('.colorpicker-value').trigger('mousedown') }, 20); return false;}
}

//remove duplicated styles
function removeDuplicatedStyles(){

	var sizes = {};
	var fonts = {};
    var colors = {};
    var bgcolors = {};
    var imagecolors = {};
    var backgrounds = {};

    $('[data-styles-section="font-families"] li span').each(function() {
        var txt = $(this).text();

        if (fonts[txt])
            $(this).parent().remove();
        else
            fonts[txt] = true;
    });

    $('[data-styles-section="appearances"] li span').each(function() {
        var txt = $(this).text();

        if (sizes[txt])
            $(this).parent().remove();
        else
            sizes[txt] = true;
    });

    $('[data-styles-section="font-colors"] li span').each(function() {
        var txt = $(this).text();

        if (colors[txt])
            $(this).parent().remove();
        else
            colors[txt] = true;
    });

    $('[data-styles-section="image-colors"] li span').each(function() {
        var txt = $(this).text();

        if (colors[txt])
            $(this).parent().remove();
        else
            colors[txt] = true;
    });

    $('[data-styles-section="background-colors"] li span').each(function() {
        var txt = $(this).text();

        if (bgcolors[txt])
            $(this).parent().remove();
        else
            bgcolors[txt] = true;
    });

}

//return the hex value
function rgbToHex(color) {

	color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (color && color.length === 4) ? "#" +
	("0" + parseInt(color[1],10).toString(16)).slice(-2) +
	("0" + parseInt(color[2],10).toString(16)).slice(-2) +
	("0" + parseInt(color[3],10).toString(16)).slice(-2) : '';

}

//convert to rgb
function hex2rgb(color){

	d = document.createElement("div");
	d.style.color = color;
	document.body.appendChild(d);
	var color = window.getComputedStyle(d).color;
	document.body.removeChild(d);

	return color;

}

//convert to rgba
function hex2rgba(hex,opacity){

	hex = hex.replace('#','');
	r = parseInt(hex.substring(0,2), 16);
	g = parseInt(hex.substring(2,4), 16);
	b = parseInt(hex.substring(4,6), 16);

	result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
	return result;

}

//return dark or ligt color
function detectBrightness(color){

	var brightness = 'rgba(0,0,0,0.75)';
	var c = color.substring(1);      // strip #
	var rgb = parseInt(c, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >>  8) & 0xff;  // extract green
	var b = (rgb >>  0) & 0xff;  // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	if (luma < 120) {

	    // pick a different colour
	    var brightness = 'rgba(255,255,255,0.75)';

	}

	return brightness;

}

function openPopup(){

	if(!isActive('popup')){ return false; }

	//set body to overflow hidden
    $('body:first-of-type, html:first-of-type').css('overflow', 'hidden').addClass('extraStylingForPopup');

    //make sure any previous popups are deleted
    $('#popupOverlay').remove();

	//create temporary div
    $tmp = $('<div></div>');
    if (typeof btnTrueFunction === 'undefined') { btnTrueFunction = false; }
    else { btnTrueFunction = ' onclick="'+btnTrueFunction+'"'; }

    if (typeof btnTrueFunction2 === 'undefined') { btnTrueFunction2 = false; }
    else { btnTrueFunction2 = ' onclick="'+btnTrueFunction2+'"'; }

    if (typeof headline === 'undefined') {} else {
        $tmp.append('<h3 class="font-bold">' + headline + '</h3>')
    }

    if (typeof paragraph === 'undefined') {} else {
        $tmp.append('<p class="font-regular">' + paragraph + '</p>')
    }

    if (typeof popupToken === 'undefined') {} else {
        $tmp.append('<div class="font-bold token"><span>' + popupToken + '</span></div>')
    }

    if (typeof btnTrue === 'undefined') {} else {
        $tmp.append('<input type="button" value="' + btnTrue + '" id="' + btnTrueId + '" class="btnTrue font-bold" style="left: 0px;"'+btnTrueFunction+'>')
    }

    if (typeof btnTrue2 === 'undefined') {} else {
        $tmp.append('<input type="button" value="' + btnTrue2 + '" id="' + btnTrueId2 + '" class="btnTrue2 font-bold" style="right: 0px;"'+btnTrueFunction2+'>')
    }

    if (typeof btnFalse === 'undefined') {} else {
        $tmp.append('<input type="button" value="' + btnFalse + '" class="btnFalse font-bold" style="right: 0px;" onclick="closePopup();">')
    }

    if (typeof textArea === 'undefined') {} else {
        $tmp.append('<textarea id="' + textAreaId + '" class="regular">' + textArea + '</textarea>')
    }

    if (typeof textAreaPlaceholder === 'undefined') {} else {
        $tmp.find('#'+textAreaId).attr('placeholder', textAreaPlaceholder);
    }

    if (typeof inputField === 'undefined') {} else {
        $tmp.append('<input type="text" placeholder="' + inputField + '" id="' + inputFieldId + '" class="font-regular inputField">');
    }

    if (typeof customHtml === 'undefined') {} else {
        $tmp.append(customHtml)
    }

    if (typeof blockClose === 'undefined') { blockClose = false; }

    if(typeof dropDownItems === 'undefined'){}
    else {

	    //variables
	    i = false;

	    $tmp.append('<div class="dropdown-items noselect"><span>First Item</span><ul class="dropdown-items-list hidden noselect"></ul></div>');

	    $.each(dropDownItems, function (index, value) {


		    //variables
		    var item = index.substring(0, index.indexOf('['));
		    var func = index.split('[')[1].split(']')[0];
		    var switch_boolean = index.split('][')[1].split(']')[0];

		    $tmp.find('.dropdown-items-list').append('<li data-dropdown-item="'+item+'" onclick="'+func+'" data-switch-boolean="'+switch_boolean+'" class="noselect">'+value+'</li>');

		    //if it's the first list, make it active
		    if(!i){

			    //add the switch, make hide default
			    $tmp.append('<div class="switch-holder semi_bold" style="display: none;"><div class="switch disabled popup_switch" data-switch="popup_switch"><div class="switch_thumb active" data-switch-thumb="popup_switch" style="right: 19px;"></div></div>Effect All Lists</div>');

			    $tmp.find('.dropdown-items span').text(value); $tmp.find('.dropdown-items span').attr('data-dropdown-item-present', item); $tmp.find('[data-dropdown-item]').addClass('active'); $tmp.find('.dropdown-items span').attr('data-switch-boolean',switch_boolean); i = true;

			    $tmp.find('.popup_switch').css({
				    'position':'relative',
				    'margin-left':'-50px'
			    })

			    if(switch_boolean == 'true'){

				    $tmp.find('.switch-holder').show();

			    }

		    }



	    });

    }

    content = $tmp.html();

    $('body').prepend('<div id="popupOverlay" data-block-close="'+blockClose+'" class="noselect"><div id="popup" class="activateselect">' + content + '<div class="closePopup"></div></div>');

	var popup_height = $('#popup').outerHeight();

    setTimeout(function() {

        $('#popupOverlay').css({
            'opacity': '1',
            'transition': popupSpeed+'s all ease',
        });

        $('#popup').css({
            'opacity': '1',
            'transition': popupSpeed+'s all ease',
            'transform': 'scale(1) translateY(-50%)'
        });

        $('.space.active').css({
            'transition': popupSpeed+'s all ease',
            'transform': 'scale(0.9)'
        });

    }, 50);

    setTimeout(function(){

	    //remove flags
		clearFlags('popup');

		//remove the extra styling for popup
		$('body:first-of-type, html:first-of-type').addClass('extraStylingForPopup');

		$('#popup input[type="button"], #popup input[type="submit"]').css({
			'-webkit-transition':'all 0.3s ease',
			'transition':'all 0.3s ease',
			'-moz-transition':'all 0.3s ease'
		});

    }, 400)

    btn_size = $('#popup input[type="button"]').size();
    submit_size = $('#popup input[type="submit"]').size();
    size = btn_size + submit_size;

    if (size > 1) {

        $('#popup input[type="button"], #popup input[type="submit"]').each(function() {

            $(this).css('width', '50%');

        })

    }

    if (typeof invert === 'undefined') {} else {
        $('#popup .btnFalse, #popup  .btnTrue, #popup input[type="submit"]').addClass('invert');
    }

	setTimeout(function(){

		$('#popup input[type="text"], #popup input[type="password"], #popup textarea').focus();

	}, 50)

    delete window.headline;
    delete window.paragraph;
    delete window.btnTrue;
    delete window.btnTrueId;
    delete window.btnTrue2;
    delete window.btnTrueId2;
    delete window.btnFalse;
    delete window.textArea;
    delete window.textAreaId;
    delete window.textAreaPlaceholder;
    delete window.inputField;
    delete window.customHtml;
    delete window.invert;
    delete window.btnTrueFunction;
    delete window.popupToken;
    delete window.dropDownItems;

    $(document).keyup(function(e) {

        if (e.keyCode == 27) {

            closePopup();

        }

    });

    $('.inputField').keyup(function(e) {

        if (e.keyCode == 13) {

            $('#popup .btnTrue').trigger('click');

        }

    });

    $(document).on('click', '#popup input[type="button"]', function(){

	    $('.active-popup-button').removeClass('active-popup-button')
	    $(this).addClass('active-popup-button');

    });

    $(document).on('click', '.dropdown-items span', function(e){

	    e.stopImmediatePropagation();

	    if ($('.dropdown-items-list').is(":visible")) {

		    hideDropdownItems();

	    }

	    else {

		    showDropdownItems();

		    //variables
		    dropDownItemPresent = $(this).attr('data-dropdown-item-present');

		    $('[data-dropdown-item="'+dropDownItemPresent+'"]').hide();

	    }

    });

    $(document).on('click', '[data-dropdown-item]', function(e){

	    e.stopImmediatePropagation();

	    //variables
	    dropDownItemText = $(this).text();
	    dropDownItemItem = $(this).attr('data-dropdown-item');
	    dropDownItemSwitchBoolean = $(this).attr('data-switch-boolean');

	    $('.dropdown-items span').text(dropDownItemText);
	    $('.dropdown-items span').attr('data-dropdown-item-present',dropDownItemItem);

	    hideDropdownItems();

    });

}

//close popup
function closePopup() {

	if(!isActive('popup') || $('[data-block-close="true"]').length > 0){ return false; }

	var popup_height = $('#popup').outerHeight()

	$('#popupOverlay, #create-preview-wrapper, #welcome-popup-wrapper').css({
        'opacity': '0',
    });

    $('#popup, #create-preview-popup, #send-campaign-popup, #welcome-popup').css({
        'opacity': '0',
        'transform': 'translateY(-50%) scale(0.8)'
    });

    $('.space.active').css({
        'transform': 'scale(1)'
    });

    setTimeout(function() {

		$('.space.active').css('transform','')
        $('html, body').css('overflow', '');
        $('#popupOverlay').remove();
	   	$('#create-preview-wrapper, #send-campaign-popup, #welcome-popup-wrapper').hide();
        $('.space').css({
	        'transition': 'none',
        })

		//remove flags
		clearFlags('popup');

    }, 400);

    delete window.blockClose;

}

function showDropdownItems(){

	dropDownListCount = parseInt($('.dropdown-items-list li').size()) - 1;
	dropDownListHeight = $('.dropdown-items span').height();
	dropDownExtraPadding = (dropDownListCount * dropDownListHeight) + 130;

	$('#popup').css('padding-bottom',dropDownExtraPadding+'px');
	$('.switch-holder').fadeOut(100);

	$('.dropdown-items-list, [data-dropdown-item]').show();

	setTimeout(function(){

		$('.dropdown-items-list').css({
			'-webkit-transform': 'scale(1)',
			'opacity': '1'
		});

	}, 100);

}

function hideDropdownItems(){

	$('.dropdown-items-list').css({
		'-webkit-transform': 'scale(0.9)',
		'opacity': '0'
	});

	setTimeout(function(){

		$('#popup').css('padding-bottom', '130px');

	}, 200);

	setTimeout(function(){

		$('.dropdown-items-list').hide();

		if(dropDownItemSwitchBoolean == 'true'){

			setTimeout(function(){

				$('.switch-holder').css('height','0').css('opacity','0').show();
				$('.switch-holder').animate({
					'height':'22px'
				}, 100);

				setTimeout(function(){

					$('.switch-holder').animate({
						'opacity':'1'
					}, 100)

				}, 200)

			}, 500)

		}

	}, 300)

}

//update module font size
function updateModuleFontSize(event){

	//variables
	attr = $(event).closest('li').find('span').attr('data-attr-name');
    size = $(event).val();
    output = $(event).closest('li').find('.slider-output');

	//add extra line height depending on the font size
    if (size > 16 && size < 32) {

        extra = 1.4

    }
	else if (size < 17) {

		extra = 1.5

	}
	else {

		extra = 1

	}

	//update font size
	$(effectTarget+' [data-size="' + attr + '"], '+effectTarget+'[data-size="' + attr + '"]').each(function() {

		//Change value of the selector
		$(this).css('font-size', size + 'px').css('line-height', size * extra + 'px');

	});

}

//update module border width
function updateModuleBorderWidth(event){

	//variables
	attr = $(event).closest('li').find('span').attr('data-attr-name');
    size = $(event).val();
    output = $(event).closest('li').find('.slider-output');

	//update font size
	$(effectTarget+' [data-border-size="'+attr+'"], '+effectTarget+'[data-border-size="'+attr+'"]').each(function() {

		//Change value of the selector
		$(this).css('border-top-width', size + 'px').css('border-right-width', size + 'px').css('border-bottom-width', size + 'px').css('border-left-width', size + 'px')

	});

}

//update module border width
function updateModuleBorderRadius(event){

	//variables
	attr = $(event).closest('li').find('span').attr('data-attr-name');

	//update border radius
	$(effectTarget+' [data-border-radius="'+attr+'"], '+effectTarget+'[data-border-radius="'+attr+'"]').each(function() {

		size = $(event).val();
		output = $(event).closest('li').find('.slider-output');
		max = $(event).closest('li').find('.appearances-slider').attr('max');

		$(event).closest('li').find('.slider-output').val(size);

		var moduleWidth = $(this).width();
		var moduleHeight = $(this).height();

		if(max == size){

			if(moduleWidth == moduleHeight){

				size = '100%';

			}

		}

		else {

			size = size +'px';

		}

		//Change value of the selector
		$(this).css('border-top-left-radius', size).css('border-top-right-radius', size).css('border-bottom-left-radius', size).css('border-bottom-right-radius', size)

	});

}

//open module dropdown
function openModuleDropdown(){

	$('#switch-to-module-list').attr('size',6);

}

//initialise module tab list
function initialiseModulesList(){

	//variables
	var i = 0;

	//make sure to empty the current list
	$('#switch-module-list').empty();

	//fetch all module names
	$('#template-editing-canvas [data-module]').each(function(){

		//variables
		var module_name = $(this).attr('data-module');

		//if integer is zero, add an all option
		if(i == 0){ $('#switch-module-arrow').attr('data-select-items','All Modules[ALl Modules]'); }

		//fetch current list items array
		var module_list_items = $('#switch-module-arrow').attr('data-select-items');

		//add option
		$('#switch-module-arrow').attr('data-select-items',module_list_items+'; '+module_name+'['+i+']');

		//increase integer
		i++;

	});

	//set module eq to the right option
	setTimeout(function(){

		$('#switch-module-list option[value="'+(module_eq)+'"]').prop('selected', true);

	}, 500)

}

//show color opacity slider
function showColorOpacitySlider(colorPickerElement){

	if ($('.color-opacity-slider-wrapper').is(':visible')) {

		return false;

	}

	//fetch height of colorpicker value
	colorpicker_height = $('.colorpicker-value').height();
	colorpicker_width = $('.colorpicker-value').width() + 54;
	opacity_slider_animation_distance = 15; //in pixels
	colorpicker_opacity_value = $('.colorpicker-value').not('.unfocussed').attr('data-opacity-attr');
	swatches_height = 0;
	tooltip_timeout = 0;
	swatches_padding = 0;
	subBarLeft = parseInt($('#sub-bar').css('left'));
	subBarWidth = $('#sub-bar').width();
	sidebarWidth = $('#sidebar').width();
	colorOpacityTooltipWidth  = $('.color-opacity-slider-tooltip').width();
	colorOpacitySliderOffset = 10;

	if($('#styles-swatches').is(":hidden") || subBarLeft < 0){

		tooltip_timeout = globalAnimationSpeed * 2;
		swatches_padding = parseInt($('#styles-swatches').css('padding-top'));
		swatches_height = $('#styles-swatches').height();

	}

	if(!colorpicker_opacity_value){

		colorpicker_opacity_value = 100;

	}

	setTimeout(function(){

		//variables
		var pos = $(colorPickerElement).offset();

		//position slider
		$('.color-opacity-slider-wrapper').css({

			'left':(subBarWidth+sidebarWidth+colorOpacityTooltipWidth+colorOpacitySliderOffset)+'px',
			'top':(pos.top)+'px',
			'height':colorpicker_height+'px',
			'margin-left':'-'+opacity_slider_animation_distance+'px'

		});

		//show the slider
		$('.color-opacity-slider-wrapper').show();

		//animate the slider
		$('.color-opacity-slider-wrapper').animate({

			'opacity':1,
			'margin-left':0

		}, openSpaceSpeed);

		//set correct value to the slider
		$('.color-opacity-slider-wrapper .appearances-slider, .color-opacity-slider-wrapper .slider-output').val(colorpicker_opacity_value);

	}, tooltip_timeout)

}

//hide color opacity slider
function hideColorOpacitySlider(){

	//hide slider
	$('.color-opacity-slider-wrapper').hide();

	//set opacity to zero
	$('.color-opacity-slider-wrapper').css({

		'opacity':0

	});

}

//update background color opacity
function updateBgColorOpacity(event){

	//variables
	var slider_val = $(event).val();
	var color = $('.colorpicker-value').not('.unfocussed').val();
	var attr = $('.colorpicker-value').not('.unfocussed').closest('li').find('span').text();

	//convert to rgba. we do this due to the fact we to convert any format of colour.
	var color = hex2rgb(color);

	//convert back to hex
	var color = rgbToHex(color);

	//finally convert to rgba
	var color = hex2rgba(color,slider_val);

	//add opacity attribute
	$('.colorpicker-value').not('.unfocussed').attr('data-opacity-attr',slider_val);

	//update the data-bgcolor tag
	$(effectTarget+' [data-bgcolor="' + attr + '"], '+effectTarget+'[data-bgcolor="' + attr + '"]').each(function() {

		$(this).css('background-color',color);

	});

}

//show last saved message
function showLastSavedMessage(){

	//variables
	saved_message_animation_distance = 10; // measure in pixels

	if (!$('.last-saved-message').is(':visible')) {

		//show message
		$('.last-saved-message').css('margin-top',saved_message_animation_distance+'px').show();

		//animate it to show
		$('.last-saved-message').animate({
			'margin-top':0,
			'opacity':1
		}, openSpaceSpeed)

	}

}

//show last saved message
function hideLastSavedMessage(){

	//animate it to hide
	$('.last-saved-message').animate({
		'margin-top':saved_message_animation_distance,
		'opacity':0
	}, { duration: openSpaceSpeed, easing: 'easeOutQuad', complete:  function() {

		//hide
		$('.last-saved-message').hide();

	}})

}

//update last saved message
function updateLastSavedMessage(){

	var time = getCurrentTime();

	$('.last-saved-message span').text(time);

}

//get current time
function getCurrentTime(){

	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();

	if(minutes < 10){ var minutes = '0'+minutes; }

	return hours+':'+minutes;

}

//detect color format
function detectColorFormat(color){

	var count_commas = (color.match(/,/g) || []).length;

	if(count_commas == 2){ return 'rgb'; }
	if(count_commas == 3){ return 'rgba'; }
	else { return 'hex'; }

}

//retrieve rgba opacity value
function getRgbaOpacity(color){

	var alpha = color.replace(/^.*,(.+)\)/,'$1');
	var alpha = parseFloat(alpha);
	return alpha.toFixed(2);

}

//hide empty styles
function hideEmptyStyles(){

	$('[data-styles-section]').each(function(){

		var section = $(this);
		var count_attr = $(section).find('li').size();

		if(count_attr < 1){

			$(section).hide();

		}

		else {

			$(section).show();

		}

	})

}

//create a snapshot of the template
function createVersionSnapshot(){

	//if demo, return false
	if(mode == 'demo'){ return false; }

	//variables
	var time = getCurrentTime();
	var count_states = countSelectItems('template-versions');
	var headers = cleanHeaders($('#template-editing-canvas').html());
	var template = cleanHtml($('#template-editing-canvas').html());
	var token = createToken();
	var offset = count_states * 19;

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=createVersion",
	    data: { time: time, maxVersionSnapshots: maxVersionSnapshots, headers: headers, template: template, token: token, campaign_id: campaign_id }
	}).done(function(data) {

		var select_items = $('[data-select-name="template-versions"]').attr('data-select-items');

		addToSelect('template-versions', time, token, 'start');

		if(countSelectItems('template-versions') > maxVersionSnapshots){

			lastVersionName = getLastSelectItem('template-versions','name');
			lastVersionValue = getLastSelectItem('template-versions','value');

			removeFromSelect('template-versions', lastVersionName, lastVersionValue);

		}

		$('[data-select-name="template-versions"]').attr('data-select-offset-top',offset);

		updateVersionTime(time);

	});

}

//count number of items
function countSelectItems(select_name){

	var select_items = $('[data-select-name="'+select_name+'"]').attr('data-select-items');
	var count = (select_items.match(/\[/g) || []).length;

	return count;

}


//create token
function createToken(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

//retrieve version
function getVersion(token){

	if(!snapshotChangeActivity){

		//set snapshotactivity to true
		snapshotChangeActivity = true;

		//create snapshot. This is the most recent snapshot the user can get
		createVersionSnapshot();

		//reset activity to false
		setTimeout(function(){

			snapshotChangeActivity = false;

		}, snapshotActivityTimeout);

	}

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=getVersion",
	    data: { token: token, campaign_id: campaign_id }
	}).done(function(data) {

		//$('#template-editing-canvas').html(data);
		//replace in to template editing canvas
		$('[data-template-type="headers"], [data-template-type="html"]').remove();
		$('#template-editing-canvas').prepend(data);

		checkEmptyCanvas()

		initialiseResizable();

		initialiseSortable();

		setTimeout(function(){

			$('#template-editing-canvas').find('[data-module]:first-of-type').trigger('mousedown')

		}, 250)

	});

}

//toggle user section menu
function toggleMenu(el){

	if($(el).hasClass('closed')){

		closeMenu(el);

	}

	else {

		openMenu(el)

	}

}

//close user section menu
function closeMenu(el){

	$(el).removeClass('closed');

	$(el).find('.stroke-1').animate({
	  top: '0px'
	}, 200);

	$(el).find('.stroke-3').animate({
	  top: '8px'
	}, 200);

	$(el).find('.stroke-2').animate({
	 	opacity: 1
	}, 200);

}

//open user section menu
function openMenu(){

	$(el).addClass('closed');

	$(el).find('.stroke-1').animate({
	  top: '4px'
	}, 200);

	$(el).find('.stroke-3').animate({
	  top: '4px'
	}, 200);

	$(el).find('.stroke-2').animate({
	 	opacity: 0
	}, 200);

}

//initialise styles swatches
function initialiseStylesSwatches(){

	//variables
	var subbar_width = $('#sub-bar').width();
	var subbar_padding = parseInt($('#sub-bar #styles-swatches').css('padding-left'));
	var styles_swatches_width = subbar_width - (subbar_padding * 2);
	var swatch_width = styles_swatches_width / 6;
	var currentSwatch = $('#styles-swatches h6 span').attr('data-swatch-value');

	if($('#styles-swatches #addNewColorButton').length < 1 && currentSwatch != 'base_colors'){

		$('#styles-swatches .styles-swatches-holder').prepend('<li><input type="button" data-color="#4E4E4E" id="addNewColorButton"></li>')

	}

	//set swatch width
	$('#styles-swatches li').css('width',swatch_width+'px');

	//detect color
	$('#styles-swatches [type="button"]').each(function(){

		var color = $(this).attr('data-color');

		$(this).css('background-color',color);

	});

	//initialise color order
	initialiseColorOrder();

}

//attach color to colorpicker value
function attachSwatchColor(color, swatch){

	//variables
	var colorpicker = $('.colorpicker-value').not('.unfocussed');
	var color_format = detectColorFormat(color);
	var alpha = '';

	if(color_format == 'rgba'){

		//get rgba opacity param
		var alpha = getRgbaOpacity(color) * 100;

		//convert to rgb, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

	}

	if(color_format == 'rgb'){

		//convert to rgb, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

	}

	if(color_format == 'hex'){

		//convert to rgb, regardless the color format (hex, rgba, rgba, name)
		var color = hex2rgb(color);

		//convert to hex
		var color = rgbToHex(color);

	}

	var brightness = detectBrightness(color);

	//change background color
	$('.colorpicker-value').not('.unfocussed').css('background-color',color);
	$('.colorpicker-value').not('.unfocussed').val(color);
	$('.colorpicker-value').not('.unfocussed').css('color',brightness);

	//animate splash
	animateColorSplash(color, swatch);

	//update module color
	updateModuleColor(colorpicker);

}

//switch swatch
function switchSwatch(swatch_name, swatch_value){

	editSwatches('stop');

	$('#styles-swatches h6 span').removeAttr('data-primary-1').removeAttr('data-primary-2').removeAttr('data-primary-3');

	if($('.blank-swatch').length > 0){

		//save the color to swatch
		swatchColor = $('.blank-swatch').find('[data-color]').attr('data-color');

		//save swatch
		saveSwatch(swatchColor);

		//make sure to remove the class from all added swatches
		$('.blank-swatch').removeClass('blank-swatch');

	}

	//variables
	var current_swatch_name = $('#styles-swatches h6 span').text();

	//set swatch token to span
	$('#styles-swatches h6 span').attr('data-swatch-value',swatch_value);

	//if swatch name is template-colors
	if(swatch_value == 'base_colors'){

		$('.styles-swatches-holder').empty();

		$('.styles-swatches-holder').prepend('<li><input type="button" data-color="#4E4E4E" id="addNewPaletteFromBase" style="background-color: rgb(78, 78, 78);"></li>');

		//loop through array to spit out the base palette swatches
		$.each(basePalette, function(key, item)
		{

		   $('.styles-swatches-holder').append('<li><input type="button" data-color="'+item+'" title="'+item+'"></li>');

		});

		$('#swatches-edit-button').html('<img src="http://www.stampready.net/dashboard/editor-3-5/img/icons/palette-options.png">');
		$('#swatches-edit-button').hide();

		initialiseStylesSwatches();

		removeFromSelect('swatches-options', 'Remove Swatches', 'remove_swatches');
		removeFromSelect('swatches-select', 'Remove Palette', 'remove_palette');

		$('#addNewColorButton').closest('li').show();

	}

	//if swatch name is template colors
	else if(swatch_value == 'template colors'){

		//initialise standard template swatch colors
		initialiseTemplateSwatches();

		$('#addNewColorButton').closest('li').hide();

		//set to 'create swatch'
		$('#swatches-edit-button').text('New');
		$('#swatches-edit-button').addClass('createPaletteFromTemplateColors');
		$('#swatches-edit-button').hide();

		removeFromSelect('swatches-options', 'Remove Swatches', 'remove_swatches');
		removeFromSelect('swatches-select', 'Remove Palette', 'remove_palette');

		$('.styles-swatches-holder').prepend('<li style="width: 35.833333333333336px; box-shadow: none; z-index: 0;"><input type="button" data-color="#4E4E4E" id="addNewPaletteFromBase" style="background-color: rgb(78, 78, 78);"></li>');

		$('#addNewPaletteFromBase').closest('li').show();


	}

	else {

		removeFromSelect('swatches-options', 'Remove Swatches', 'remove_swatches');
		removeFromSelect('swatches-select', 'Remove Palette', 'remove_palette');

		addToSelect('swatches-options', 'Remove Swatches', 'remove_swatches', 'end');
		addToSelect('swatches-select', 'Remove Palette', 'remove_palette', 'end');

		$('#swatches-edit-button').html('<img src="http://www.stampready.net/dashboard/editor-3-5/img/icons/palette-options.png">');
		$('#swatches-edit-button').removeClass('createPaletteFromTemplateColors')
		$('#swatches-edit-button').show();

		//fetch colors via db
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=getSwatch",
		    data: { swatch_value: swatch_value }
		}).done(function(data) {

			$('.styles-swatches-holder').html(data);

			initialiseStylesSwatches();
			$('#addNewColorButton').show();

		});

	}

	//show swatch name
	$('#styles-swatches h6 span').text(swatch_name);

}

//show styles swatches
function showStylesSwatches(){

	$('#styles-swatches').slideDown(openSpaceSpeed * 1.5, "easeOutBack");

}

//hide styles swatches
function hideStylesSwatches(){

	//if swatch is already hidden, do nothing
	if($('#styles-swatches').is(':hidden')){ return false; }

	//hide swatch
	$('#styles-swatches').slideUp(openSpaceSpeed * 1.5, "easeInBack");

	//hide opacity tooltip
	hideColorOpacitySlider();

	//save template to memory
	saveTemplateToMemory();

}

//update module color
function updateModuleColor(colorpicker){

	//variables
	var color = $(colorpicker).val();
	var attr_type = $(colorpicker).closest('li').attr('data-attr-type');
	var attr_name = $(colorpicker).closest('li').find('span').text();
	var attr_opacity = $(colorpicker).attr('data-opacity-addon');

	//if opacity addon exists
	if(attr_opacity){

		//fetch opacity
		var opacity = $(colorpicker).attr('data-opacity-attr');

		//convert to rgba
		var color = hex2rgba(color, opacity)

	}

	//if attribute type is color
	if(attr_type == 'color'){

		if($('a.targeted-text-selection, span.targeted-text-selection').length > 0){

			$(effectTarget).find('a.targeted-text-selection, span.targeted-text-selection').css('color',color);
			return false;

		}

		$(effectTarget).find('[data-color="'+attr_name+'"]').css('color',color);

	}

	if(attr_type == 'bgcolor'){

		//change background colors
		$(effectTarget).find('[data-bgcolor="'+attr_name+'"]').css('background-color',color).removeAttr('bgcolor');
		$(effectTarget+'[data-bgcolor="'+attr_name+'"]').css('background-color',color).removeAttr('bgcolor');


		$(effectTarget).find('[data-border-top-color="'+attr_name+'"], [data-border-right-color="'+attr_name+'"], [data-border-bottom-color="'+attr_name+'"], [data-border-left-color="'+attr_name+'"], [data-border-color="'+attr_name+'"]').css('border-color',color).css('border-right-color',color).css('border-bottom-color',color).css('border-left-color',color);

	}

	if(attr_type == 'image-color'){

    		if(colorizeTimeoutFlag){ return false; }

		colorizeImagenName = $('.colorpicker-value:not(.unfocussed)').closest('li').find('span').attr('data-attr-name');
		clearTimeout(convertBase64ToImagesTimeout);

	    $(effectTarget).find('img[data-color="'+colorizeImagenName+'"]').each(function(){

		    colorizeTimeoutFlag = true;

		    var token = createToken();
			$(this).attr('data-colorize-icon-mark',token);

		    colorImage(token, color);

	    });

	    setTimeout(function(){

		    colorizeTimeoutFlag = false;

	    }, colorizeTimeout);

/*
		//change background colors
		$('#template-editing-canvas').find('[data-bgcolor="'+attr_name+'"]').css('background-color',color);

		//change border colors
		$('#template-editing-canvas').find('[data-border-color="'+attr_name+'"]').css('border-top-color',color).css('border-right-color',color).css('border-left-color',color).css('border-bottom-color',color);
*/

	}

	setSaveActive()

}

//update module height
function updateModuleHeight(event){

	//variables
	attr = $(event).closest('li').find('span').text();
    size = $(event).val();
    output = $(event).closest('li').find('.slider-output');


	//update font size
	$(effectTarget+' [data-height="' + attr + '"], '+effectTarget+'[data-height="' + attr + '"]').each(function() {

		//Change value of the selector
		$(this).attr('height',size);

	});

}

//update module width
function updateModuleWidth(event){

	//variables
	attr = $(event).closest('li').find('span').text();
    size = $(event).val();
    output = $(event).closest('li').find('.slider-output');


	//update font size
	$(effectTarget+' [data-width="' + attr + '"], '+effectTarget+'[data-width="' + attr + '"]').each(function() {

		//Change value of the selector
		$(this).attr('width',size);

	});

}

//initialise template swatch colors
function initialiseTemplateSwatches(){

	//make sure to empty the styles holder
	$('.styles-swatches-holder').empty();

	$('#template-editing-canvas *').each(function(){

		//variables
		var color = $(this).css('color');
		var bgcolor = $(this).css('background-color');

		if(color.indexOf('rgba') >= 0 || bgcolor.indexOf('rgba') >= 0){



		}

		else {

			//if color exists
			if(color){

				$('.styles-swatches-holder').append('<li><input type="button" data-color="'+color+'" style="background-color: '+color+'"></li>');

			}

			if(bgcolor){

				if(bgcolor !== 'rgba(0, 0, 0, 0)'){

					$('.styles-swatches-holder').append('<li><input type="button" data-color="'+bgcolor+'" style="background-color: '+bgcolor+'"></li>');

				}

			}

		}

	});

	//initialise swatches
	initialiseStylesSwatches();
	filterSwatchesColors();

}

//filter swatches colors
function filterSwatchesColors(){

	var colors = {};

	$('.styles-swatches-holder li [type="button"]').each(function() {
        var txt = $(this).css('background-color');

        if (colors[txt])
            $(this).closest('li').remove();
        else
            colors[txt] = true;

    });

}

//initiaise tooltip swatches
function initialiseTooltipSwatches(){

	//variables
	var swatches = $('.styles-swatches-holder').html();
	var tooltipSwatchWidth = $('#tooltip-swatches').width() / 6;

	//morph the styles swatches to the tooltip swatches bar
	$('#tooltip-swatches ul').html(swatches);

	$('#tooltip-swatches li').css('width', tooltipSwatchWidth+'px').css('height','25px');

	//variables
	var tooltip = $('.highlighter-container');
	var padding = parseInt($(tooltip).find('#commands li:first-child').css('padding-left'));
	var li_count = $(tooltip).find('#commands li').size();
	var li_width = $(tooltip).find('#commands li').width();
	var swatches_count = $(tooltip).find('#tooltip-swatches li').size();
	var tooltip_new_width = (li_width * li_count) + (padding * 2);
	var swatch_width = tooltip_new_width / li_count;
	var swatch_height = $(tooltip).find('#tooltip-swatches li').height();
	var swatches_tooltip_height = Math.ceil(swatches_count / li_count) * swatch_height;


	$('#tooltip-swatches').css('height',swatches_tooltip_height+'px').css('top','-'+swatches_tooltip_height+'px');

}

//create swatch
function createSwatch(type){

	//variables
	var swatch_name = $('#swatch_name_value').val();
	var token = createToken();
	var templateColorsArray = [];

	//if type is 'template colors', create an array with fetched colors
	if(type == 'template_colors'){

		//for each module present
		$('.styles-swatches-holder [data-color]:not(#addNewColorButton)').each(function(){

			//variables
			color = rgbToHex($(this).attr('data-color'));

			//push to array
			templateColorsArray.push(color);

		});

	}

	//if swatch name is add palette
	if(swatch_name.toLowerCase() == 'base colors' || swatch_name == '' || swatch_name == ' ' || swatch_name.toLowerCase() == 'template colors'){

		('warning','Invalid Name','You\'re not able to use this name as a palette', false);

		return false;

	}

	//ajax
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=createPalette",
	    data: { swatch_name: swatch_name, token: token, templateColorsArray: templateColorsArray }
	}).done(function(data) {

		//if swatch exists
		if(data == 'swatch_exists'){

			notification('warning','Palette Exists','Looks like that name is already in use', false);
			return false;

		}

		//change the current value
		$('#styles-swatches h6 span').attr('data-swatch-value',token);

		//add to swatches list
		addToSelect('swatches-select', data, token, 'start');

		//closepopup
		closePopup();

		setTimeout(function(){

			//show empty state
			showSwatchEmptyState();

			//switch swatch
			switchSwatch(data, token);

			setTimeout(function(){

				//add new color to newly created swatch
				addNewColor();

			}, 200)

		}, globalAnimationSpeed * 1.8);

	});

}

//show swatch empty state
function showSwatchEmptyState(){

	//empty swatches
	$('.styles-swatches-holder').empty();

}

//animate color splash
function animateColorSplash(color, swatch){

	//variables
	var droplet_format = 12; //set droplet format
	var drop_fall_range = 100; //set droplet format
	var offset = $(swatch).offset();
	var swatch_height = $(swatch).height();
	var swatch_width = $(swatch).width();
	var droplet_height = $('.droplet-splash').height();
	var mark = createToken();

	//append droplet
	$('body').append('<div data-mark="'+mark+'" class="droplet-splash" style="left: '+(offset.left+(swatch_width/2)-(droplet_format/2))+'px; top: '+(offset.top+swatch_height-droplet_format)+'px; width: '+droplet_format+'px; width: '+droplet_format+'px; background-color: '+color+'"></div>');



	//animate droplet
	$('.droplet-splash').animate({

		'top': (offset.top+swatch_height-droplet_format+drop_fall_range)+'px',
		'opacity':0

	}, { duration: globalAnimationSpeed * 2, easing: 'easeInExpo', complete:  function() {

		$('[data-mark="'+mark+'"]').remove();

	}})



}

//open select
function showSelect(el){

	//remove all dropdowns
	$('.select-menu').remove();

	//fetch the items
	var select_name = $(el).attr('data-select-name');
	var select_items = $(el).attr('data-select-items');

	if(select_items == ''){ return false; }

	//append select menu, calculate size and position after
	$('body').append('<div id="select-menu-wrapper"><div class="select-menu font-bold noselect" data-select-menu-name="'+select_name+'"></div></div>');

	//fetch the items
	var select_items = $(el).attr('data-select-items');

	//create an array from the fetched string
	var array = select_items.split(';');

	//for each item
	for (i=0;i<array.length;i++){

		if(array[i] == '' || array[i] == ' '){

			return false;

		}

		//the item
		var item = array[i].substring(0, array[i].indexOf('['));
		var value = array[i].split('[')[1].split(']')[0];

		if(item == 'addDivider'){

			$('.select-menu').append('<div class="menu-divider"><div class="menu-divider-color"></div></div>');

		}

		else {

			//append to menu
			$('.select-menu').append('<li class="keep-crisp" data-select-item-value="'+value+'">'+item+'</li>');

		}

	}

	//variables
	var offset = $(el).offset();
	var select_width = $('.select-menu').width();
	var select_height = $('.select-menu').height();
	var select_items = $('.select-menu').attr('data-select-items');
	var el_width = $(el).outerWidth();
	var offset_top_distance = $(el).attr('data-select-offset-top');
	var offset_left_distance = $(el).attr('data-select-offset-left');
	var from_bottom = $(el).attr('data-select-from-bottom');
	var offsetDifference = 0;
	var offsetExtraDifference = 0;

	//if variable is undefined, set standard position
	if(!offset_top_distance){ var offset_top_distance = 20; }
	if(!offset_left_distance){ var offset_left_distance = -5; }

	//position menu
	$('.select-menu').css({
		'left':(offset.left+el_width)-offset_left_distance+'px',
		'top':(offset.top-offset_top_distance)+'px'
	});

	if((offset.top-offset_top_distance)+$('.select-menu').height() > $(window).height()){

		//variables
		offsetDifference = (offset.top-offset_top_distance)+$('.select-menu').height() - $(window).height();
		offsetExtraDifference = 40;

	}

	//position menu
	$('.select-menu').css({
		'left':(offset.left+el_width)-offset_left_distance+'px',
		'top':(offset.top-offset_top_distance)-offsetDifference-offsetExtraDifference+'px'
	})


}

//hide select
function hideSelect(){

	$('#select-menu-wrapper').fadeOut(selectFadeOutSpeed, function(){

		//set select menu flag to false
		selectMenuFlag =  false;

		$(this).remove();

	})

}

//activate select item
function activateSelectItem(event){

	if(selectMenuFlag){

		return false;

	}

	selectMenuFlag =  true;

	$(event).removeClass('active');

	setTimeout(function(){

		$(event).addClass('active');

		hideSelect();

	}, selectActiveStateDelay)

}

//remove select active state
function removeSelectActive(){

	$('.select-menu').find('.active').removeClass('active');

}

//add select active state
function addSelectActive(event){

	//add class active
	$(event).addClass('active');

}

//code editor format
function adjustFormat(format, format_name, space){

	//variables
	var window_width = $(window).width();

	//formule
	var percentage = 100 - (format * 100) / window_width;

	//if format is default, set percentage var to 50%
	if(format == 'default'){ percentage = 50;}
	if(format == 'mirror-mobile'){ requestPopup('mirror-mobile'); return false; }

	//set format
	if(space == 'code-editor-canvas'){

		//adjust format
		$('#code-editor-main-left').animate({'width': percentage+'%'}, globalAnimationSpeed * 2);

		if(format == '0'){ $('#code-editor-main-left .resize-handle').hide(); }
		else { $('#code-editor-main-left .resize-handle').show(); }

		//refresh the code editor
		editor.refresh();

	}

	if(space == 'preview-canvas'){

		hideDevicePreviewBars();

		//adjust format
		$('#mobile-preview-wrapper').animate({'width': format+'px'}, globalAnimationSpeed);
		$('.preview-screen-format').text(format_name+' - '+format+'px');

		setTimeout(function(){

			//present device preview bars
			//showDevicePreviewBars();

		}, globalAnimationSpeed + 20)

	}

}

function findAndReplace(){

	//variables
	var find = $('#code-editor-find input[type="text"]').val();
	var replace = $('#code-editor-replace input[type="text"]').val();
	var html = editor.getDoc().getValue();
	var re = new RegExp(find,"g");
	var html = html.replace(re, replace);

	//set value to code editor
	editor.getDoc().setValue(html);

	//activate the save again
	activateCodeEditorSave();

	//update code preview
	updateCodePreview();

	$('#replace-button').removeClass('active');

}

//show find and replace bars
function showFindAndReplace(){

	//show find and replace bars
	$('#code-editor-find-replace-bars').slideDown({
    	duration: globalAnimationSpeed,
    	easing: 'easeOutQuart'
    });

	//reposition the toggle button
	$('.code-editor-section-holder').animate({

		'padding-bottom':'54px'

	}, { duration: globalAnimationSpeed, easing: 'easeOutQuart', complete:  function() {

		//auto focus the find input
		$('#code-editor-find input[type="text"]').focus();

		//set toggle button to close
		$('#find-replace-toggle-button').removeClass('search').addClass('close')

		//add padding to code editor
		$('#find-replace-toggle-button').animate({

			'bottom':'54px'

		}, { duration: globalAnimationSpeed, easing: 'easeOutQuart', complete:  function() {

			editor.refresh();

		}})

	}});

}

//hide find and replace bars
function hideFindAndReplace(){

	//add padding to code editor
	$('#find-replace-toggle-button').animate({

		'bottom':'0px'

	}, { duration: globalAnimationSpeed, easing: 'easeInQuart', complete:  function() {

		//set toggle button to close
		$('#find-replace-toggle-button').removeClass('close').addClass('search')

	}})

	$('.code-editor-section-holder').animate({

		'padding-bottom':'0px'

	}, { duration: globalAnimationSpeed, easing: 'easeInQuart', complete:  function() {

		//show find and replace bars
		$('#code-editor-find-replace-bars').slideUp({
	    	duration: globalAnimationSpeed,
	    	easing: 'easeInQuart'
	    });

	    editor.refresh();

	}});

}

//show a notification
//Parameters are:
//the type: success, warning, error
//the headline
//some text
//whether the notification should stay. true/false
//
function notification(type, headline, text, hold, button){

	clearTimeout(notificationTimeout);

	//remove all notifications
	$('.notification').remove();

	//append the notification to html
	$('html').append('<div class="notification noselect '+type+'"><span class="notification-headline font-bold keep-crisp">'+headline+'</span> <span class="notification-text keep-crisp font-bold">'+text+'</span><div class="notification-close '+hold+'" onclick="removeNotification()"></div></div>');

	$('.notification').animate({

		"height": "show",
		"marginTop": "show",
		"marginBottom": "show",
		"paddingTop": "show",
		"paddingBottom": "show",
		"lineHeight" : '46px'

	}, { duration: 500, easing: 'easeOutBack' });

	setTimeout(function(){


		$('.notification').animate({

			"height": "hide",
			"marginTop": "hide",
			"marginBottom": "hide",
			"paddingTop": "hide",
			"paddingBottom": "hide",
			"lineHeight" : '0px'

		}, { duration: 500, easing: 'easeInBack' });

	}, 2500);

}

//remove notification
function removeNotification(){

	var notification_height = $('.notification').height() + 10;

	$('.notification').animate({

		'top': '-'+notification_height

	}, { duration: globalAnimationSpeed * 2, easing: 'easeInQuart', complete:  function() {

		$('.notification').remove();

	}})

}

//remove swatch
function removePalette(){

	var swatch_name = $('#styles-swatches h6 span').text();
	var swatch_value = $('#styles-swatches h6 span').attr('data-swatch-value');

	//ajax
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=removePalette",
	    data: { swatch_value: swatch_value }
	}).done(function(data) {

		//remove swatch from list. name, swatch name, swatch value
		removeFromSelect('swatches-select', swatch_name, swatch_value);

		//get next select item
		var name = getFirstSelectItem('swatches-select','name');
		var value = getFirstSelectItem('swatches-select','value');

		//change the swatches headline
		$('#styles-swatches h6 span').text(name);

		//change the current value
		$('#styles-swatches h6 span').attr('data-swatch-value',value);

		//fetch swatches
		switchSwatch(name, value)

		//close popup
		closePopup();

	});

}

//remove from select
function removeFromSelect(select_name, select_item, select_value){

	var select_items = $('[data-select-name="'+select_name+'"]').attr('data-select-items');
	var select_items = select_items.replace(';'+select_item+'['+select_value+']', '').replace('; '+select_item+'['+select_value+']', '').replace(select_item+'['+select_value+']; ', '').replace(select_item+'['+select_value+'];', '');

	//re-attach values to the select list
	$('[data-select-name="'+select_name+'"]').attr('data-select-items',select_items);

}


//get first select item
function getFirstSelectItem(select_name, type){

	//variables
	var select_items = $('[data-select-name="'+select_name+'"]').attr('data-select-items');

	if(select_items == ''){ return ''; }

	var first_select_item = select_items.substring(0, select_items.indexOf(';'));

	//if first select item is undefined
	if(!first_select_item){

		//if undefined, it's the only one left, thus no comma can be found
		first_select_item = $('[data-select-name="'+select_name+'"]').attr('data-select-items');

	}

	//fetch name
	var item_name = first_select_item.substring(0, first_select_item.indexOf('['));
	var item_value = first_select_item.split('[')[1].split(']')[0];

	//detect type to return
	if(type == 'name'){ return item_name; }
	if(type == 'value'){ return item_value; }

}

//get first select item
function getLastSelectItem(select_name, type){

	//variables
	var select_items = $('[data-select-name="'+select_name+'"]').attr('data-select-items');

	if(select_items == ''){ return ''; }

	text = select_items;
	parts = text.split(';');
	last_selected_item = parts.pop();

	//if first select item is undefined
	if(!last_selected_item){

		//if undefined, it's the only one left, thus no comma can be found
		last_selected_item = $('[data-select-name="'+select_name+'"]').attr('data-select-items');

	}

	//fetch name
	var item_name = last_selected_item.substring(0, last_selected_item.indexOf('['));
	var item_value = last_selected_item.split('[')[1].split(']')[0];

	//detect type to return
	if(type == 'name'){ return item_name; }
	if(type == 'value'){ return item_value; }

}

//add to swatches select
function addToSelect(select_name, select_item, select_value, position){

	//variables
	var select_items = $('[data-select-name="'+select_name+'"]').attr('data-select-items');

	if(select_items == ''){ var divider = ''; }
	else { var divider = ';'; }

	if(position == 'start'){ var select_items = select_item+'['+select_value+']'+divider+select_items; }
	if(position == 'end'){ var select_items = select_items+divider+select_item+'['+select_value+']'; }

	//add to select list
	$('[data-select-name="'+select_name+'"]').attr('data-select-items',select_items);

}

//add new color
function addNewColor(){

	if($('[data-swatch-value]').text() == 'Base Colors' || $('[data-swatch-value]').text() == 'Template Colors'){ return false; }

	//variables
	newColorTimeout = globalAnimationSpeed * 1.6;
	totalSwatches = $('.styles-swatches-holder li [data-color]:not(#addNewColorButton)').size();

	if(newlyCreatedColor){ return false; }

	newlyCreatedColor = true;

	if(totalSwatches >= maxAmountSwatches - 1){

		//notification
		notification('warning', 'Maximum swatches', 'Remove some swatches in order to add new ones', false);
		return false;

	}

	if($('#colorpicker').is(':visible')){

		newColorTimeout = 20;

	}

	//animate the colorpicker
	$('#colorpicker').slideDown(globalAnimationSpeed * 2, "easeOutBack");

	showStylesSwatches();

	$('#colorpicker').animate({

		'opacity': 1,
		transform: 'scale(1)'

	}, { duration: newColorTimeout, easing: 'easeOutBack', "queue": false, complete:  function() {

		//append blank color
		addBlankSwatch();

		//animate swatch
		$('.blank-swatch').slideDown(globalAnimationSpeed * 2, "easeOutBack");

		setTimeout(function(){

			animateColorSplash('#FFF', '.blank-swatch');

		}, 200)

	}});

}

//hide colorpicker (farbtastic)
function hideColorpicker(){

	$('#colorpicker').slideUp(globalAnimationSpeed * 2, "easeInBack");

	$('#colorpicker').animate({

		'opacity': 0,
		transform: 'scale(0.8)'

	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeInBack', "queue": false, complete:  function() {

		//if a blank swatch exists
		if($('.blank-swatch').length > 0){

			//save the color to swatch
			swatchColor = $('.blank-swatch').find('[data-color]').attr('data-color');

			//save swatch
			saveSwatch(swatchColor);

			//make sure to remove the class from all added swatches
			$('.blank-swatch').removeClass('blank-swatch');

			newlyCreatedColor = false;

		}

	}});

}

//append blank swatch
function addBlankSwatch(){

	//if a blank swatch exists
	if($('.blank-swatch').length > 0){

		//save the color to swatch
		swatchColor = $('.blank-swatch').find('[data-color]').attr('data-color');

		//save swatch
		saveSwatch(swatchColor);

		//make sure to remove the class from all added swatches
		$('.blank-swatch').removeClass('blank-swatch');

	}

	$('.styles-swatches-holder').append('<li style="display: none;" class="blank-swatch"><input type="button" data-color="#FFF"></li>');

	initialiseStylesSwatches();

}

//insert sr tag at caret
function insertTextAtCursor(text) {

	if(text == 'sr_unsubscribe ' || text == 'sr_view_online '){

		$('.sr-created-link').removeClass('sr-created-link');

		createLink();

		setTimeout(function(){

			$('.sr-created-link, .selected-element').attr('href',text.slice(0, -1));

		}, 50);

		return false;

	}

    var sel, range, html;
    sel = window.getSelection();
    range = sel.getRangeAt(0);
    range.deleteContents();
    var textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);
}

//animate add new module button
function animateAddNewModuleButton(type){

	if(type == 'start'){

		$('.add-new-vault-module-button').animate({

			transform: 'scale(0.85)'

		}, { duration: globalAnimationSpeed * 3, easing: 'easeOutElastic', complete:  function() {

			$('.add-new-vault-module-button').animate({

				transform: 'scale(1)'

			}, { duration: globalAnimationSpeed, easing: 'easeInElastic', complete:  function() {

			}});

		}});

	}

}

//set save active
function setSaveActive(){

	$('#save-template-button-wrapper').addClass('active');

}

//remove save active
function removeSaveActive(){

	$('#save-template-button-wrapper').removeClass('active');
	$('#save-template-progress-bar').css('box-shadow','inset 0 0 0 rgba(0,0,0,0.5)');


}

//save template
function saveTemplate(){

	//if demo, return false
	if(mode == 'demo'){ return false; }

	baseEncodedImages = fetchArrayOfBase64Images();

	//re-position the button
	$('#save-template-button-wrapper').css('bottom','0');

	//wait a little
	setTimeout(function(){

		//animate progress bar
		$('#save-template-progress-bar').css('box-shadow','inset 80px 0 0 rgba(0,0,0,0.5)');

		if(baseEncodedImages.length !== 0){

			createAndApplyConvertionBaseEncodedImages('save');
			return false;

		}

		else {

			//if links are empty or hashtag
			$('#template-editing-canvas a').each(function(){

				var el = $(this);
				var attr = $(this).attr('href');

				if(attr == undefined || attr == ''){

					$(el).contents().unwrap();

				}

			});

			//remove unecessary fonts
			removeUnusedFonts();

			//variables
			templateHtml = $('#template-editing-canvas').html();
			headers = cleanHeaders(templateHtml);
			bodyAttributes = $('[data-raw-source="body"]').val();
			var start_pos = bodyAttributes.indexOf('<body') + 5;
			var end_pos = bodyAttributes.indexOf('>',start_pos);
			bodyAttributes = bodyAttributes.substring(start_pos,end_pos);

			//fetch template from editing canvas
			var html = cleanHtml(templateHtml);
			var plainText = getPlainText(templateHtml);

			//ajax connection to save template
			$.ajax({
			    type: "POST",
			    dataType: "html",
			    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=saveTemplate",
			    data: { headers: headers, html: html, plainText: plainText, bodyAttributes: bodyAttributes, campaign_id: campaign_id }
			}).done(function(data) {

				//if session not found
				if(data == 'failed'){

					headline = 'Account Session could not be found';
					paragraph = 'This may occure if you\'ve been editing for too long. To reinitiate your session, please confirm your password.'

					inputField = 'Confirm Password';
					inputFieldId = 'confirm_password';

					btnTrue = 'Confirm';
					btnTrueId = 'confirm_password_button';
					btnTrueFunction = "confirmSession();";

					btnFalse = 'Close';

					openPopup();

					setTimeout(function(){

						$('#confirm_password').attr('type','password');

					}, 100);

					return false;

				}

				//remove save state
				removeSaveActive();

				if(continueToSendFlag){ continueToSend(); }

			});

		}

	}, 200);

}

function confirmSession(){

	//variables
	var user_email = $('body').attr('data-user-email');
	var user_pass = $('#confirm_password').val();

	//ajax connection to save template
	$.ajax({
		type: "POST",
		dataType: "html",
		url: "../../dashboard/scripts/calls.php?func=confirm_account_session",
		data: { user_email: user_email, user_pass: user_pass }
	}).done(function(data) {

		if(data == '2'){

			//notification
			notification('warning','Incorrect','Password doesn\'t match your account', false);
			return false;

		}

		if(data == '1'){

			closePopup();

			setTimeout(function(){

				//notification
				notification('success','Session Reinitiated','You can continue to edit your campaign', false);

				setSaveActive();

				setTimeout(function(){

					saveTemplate();

				}, 100)

			}, 1500)

		}

	});

}

//update version time
function updateVersionTime(time){

	//animate the time
	$('#template-versions-bar').slideDown(globalAnimationSpeed, "easeOutQuart", function() {

		//remove active state
		$('#template-versions-bar-time').animate({

			'margin-top':'24px'

		}, { duration: globalAnimationSpeed, easing: 'easeOutQuart', complete:  function() {

			$('#template-versions-bar-time').css('margin-top','-24px').text(time);

			$('#template-versions-bar-time').animate({

				'margin-top':0

			}, { duration: globalAnimationSpeed, easing: 'easeOutQuart', complete:  function() {

			}});

		}})

	});

}

//upload file
function uploadFile(){

	var formData = new FormData();
	formData.append('file', $('#upload-image-to-canvas')[0].files[0]);

	$.ajax({
		type: 'POST',
		url: 'scripts/functions.php?func=uploadFile',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function (data) {

			if(data == 'file_size_too_large'){

				//clear the file upload
				$('#upload-image-to-canvas').val('');

				//notification
				notification('warning','Error - ','Maximum of 2.5MB is allowed', false);
				buttonDisabled = false;
				return false;

			}

			else {

				//clear the file upload
				$('#upload-image-to-canvas').val('');

				//if the upload is successful
				if(data.toLowerCase().indexOf('path:') >= 0){

					var data = data.replace('path:', '')
					var data = 'http://www.stampready.net/dashboard/editor/user_uploads/image_uploads/'+data;

					if(editBackgroundImageFlag){

						//variables
						backgroundMark = createToken();
						attr_name = $('.background-images-button.active').closest('li').find('span').attr('data-attr-name');

						//remove all marks
						$('[data-edit-background-image-mark]').removeAttr('data-edit-background-image-mark');

						//set a mark
						$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').attr('data-edit-background-image-mark',backgroundMark)

						//set to none
						$('[data-edit-background-image-mark="'+backgroundMark+'"]').css('background-image','none');
						$('[data-edit-background-image-mark="'+backgroundMark+'"]').removeAttr('background');

						setTimeout(function(){

							//apply newly created image to data-edit-background-image-mark
							$('[data-edit-background-image-mark="'+backgroundMark+'"]').css('background-image','url('+data+')');
							$('[data-edit-background-image-mark="'+backgroundMark+'"]').attr('background',data);

							//remove mark
							$('[data-edit-background-image-mark]').removeAttr('data-edit-background-image-mark');

							//adapt outlook background
							adaptOutlookBackground('.selected-table', data);

							editImageFlag = false;
							editBackgroundImageFlag = false;

							editedImageToken = '';

							//set the save button to active
							setSaveActive();

							saveTemplateToMemory();

							saveTemplate();

						}, 100)

					}

					else {

						$('.selected-image').attr('src',data).removeClass('selected-image');

						hideImageTooltip();

						//set the save button to active
						setSaveActive();

						saveTemplateToMemory();

						saveTemplate();

					}

				}

				else {

				}

			}

		}
	});

}

//send test email
function sendTestEmail(){

	//if button is disabled
	if(buttonDisabled){ return false; }

	buttonDisabled = true;

	//variables
	var receiver = $('#test-email-value').val();

	//fetch contents
	headers = $('[data-template-type="headers"]').html();
	html = $('[data-template-type="html"]').html();

	//create a temporary div, where we output all possible images
	$tmp = $('<div></div>');

	//empty temp div
	$tmp.html(html);

	//remove
	$tmp.find('.canvas-placeholder, .prepeatable-button-wrapper, .module-options-wrapper, .editing-canvas-empty-state, style, meta, title, head, .ui-resizable-handle, grammarly-btn, .image-resizable-handle, link, grammarly-extension').remove();
	$tmp.find('.selected-element').removeClass('selected-element');
	$tmp.find('.ui-resizable').removeClass('ui-resizable');
	$tmp.find('.ui-wrapper').contents().unwrap();
	$tmp.find('[class=""]').removeAttr('class');
	$tmp.find('.ui-resizable-handle').remove();
	//$tmp.find('tr').unwrap('tbody');
	$tmp.find('[contenteditable]').removeAttr('contenteditable');

	html = $tmp.html();

	//body attributes
	bodyAttributes = $('[data-raw-source="body"]').val();
	var start_pos = bodyAttributes.indexOf('<body') + 5;
	var end_pos = bodyAttributes.indexOf('>',start_pos);
	bodyAttributes = bodyAttributes.substring(start_pos,end_pos);

	if(receiver == '' || receiver.indexOf('@') < 0){

		//notification
		notification('warning','Invalid','This email address looks invalid', false);
		buttonDisabled = false;
		return false;

	}

	//set loading text
	$('#send_test_email').val(btnTrueLoadingText+'..');

	//set z-index to higher than the alternate button
	$('#send_test_email').css('z-index','4');

	$('#send_test_email').css('width','100%');

	//ajax connection
	$.ajax({
		type: "POST",
		dataType: "html",
		url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=sendTestEmail",
		data: { headers: headers, html: html, bodyAttributes: bodyAttributes, receiver: receiver }
	}).done(function(data) {

		if(data == 'success'){

			closePopup();

			setTimeout(function(){

				//notification
				notification('success','Email Sent','The email has been sent to '+receiver, '');

				buttonDisabled = false;

			}, 500)

		}

		else if(data == 'not_allowed'){

			//notification
			notification('warning','You need a subscription to use this feature', '');

			//set loading text
			$('#send_test_email').val('Send Test Email');

			$('#send_test_email').css('width','50%');
			buttonDisabled = false;

		}

		else if(data == 'no_stamps'){

			//notification
			notification('warning','You don\'t have any stamps', '');

			//set loading text
			$('#send_test_email').val('Send Test Email');

			$('#send_test_email').css('width','50%');
			buttonDisabled = false;

		}

		else if(data == 'invalid email'){

			//notification
			notification('warning','Invalid Email Address',receiver+' seems incorrect', '');

			//set loading text
			$('#send_test_email').val('Send Test Email');

			$('#send_test_email').css('width','50%');
			buttonDisabled = false;

		}

		else {

			//notification
			notification('warning','Something went wrong', '');

			//set loading text
			$('#send_test_email').val('Send Test Email');

			$('#send_test_email').css('width','50%');
			buttonDisabled = false;

		}

	});

}

//show swatch indicator (growing swatch)
function showSwatchIndicator(event){

	//variables
	var color = $(event).find('[type="button"]').attr('data-color');
	var growthSize = 2;

	$(event).css('box-shadow','0 0 0 '+growthSize+'px '+color).css('z-index','1');

	if($('.editSwatchesMode').length > 0){

		$(event).find('[data-color]').addClass('presentMinusToSwatch');

	}

	if($('.editPrimaryMode').length > 0){

		if($(event).find('.primary-number').length < 1){

			$(event).find('[data-color]').closest('li').append('<div class="primary-number font-bold" data-select-items="Main Color[1];Secundary Color[2];Tertiary Color[3]" data-select-name="primary-menu"></div>');

		}

	}

}

//hide swatch indicator
function hideSwatchIndicator(event){

	$(event).closest('#styles-swatches').find('li').css('box-shadow','none').css('z-index','0');

	if($('.editSwatchesMode').length > 0){

		$(event).find('[data-color]').removeClass('presentMinusToSwatch');

	}

	if($('.editPrimaryMode').length > 0){

		$(event).find('[data-color]').closest('li').find('.primary-number:not(.active, .primary-set)').remove();

	}

}

//preview font
function loadPreviewFont(){

	//variables
	var fontFamily = $('.font-wrapper.active').attr('data-font-name').toLowerCase();
	var fontWeightInt = $('.font-editor-styles-bar li.active').attr('data-fontbar-weight');


	//remove every font in the loader
	$('.font-style-loader').empty();

	//detect if the font family is already installed
	if($('.font-style-loader [data-font-name="'+fontFamily+'"]').length){

		//check if the font weight is already installed
		if($('.font-style-loader [data-font-name="'+fontFamily+'"][data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'"]').length){


		}

		//install font weight
		else {

			$('.font-style-loader [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('data-font-weight-'+fontWeightInt, fontWeightInt);

			//variables
			var googleFontString = $('.font-style-loader [data-font-name="'+fontFamily+'"]').attr('href');
			var googleFontString = googleFontString.replace('&display',','+fontWeightInt+'&display').replace();
			var googleFontString = googleFontString.replace(/ /g,'+');

			//update in the dom
			$('.font-style-loader [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('href',googleFontString);

			updatedFont = true;

		}

	}

	//install font
	else {

		fontFamilyEncoded = capitalize_Words(fontFamily);
		fontFamilyEncoded = fontFamilyEncoded.replace(/ /g,'+');
		$('.font-style-loader').append('<link href="https://fonts.googleapis.com/css?family='+fontFamilyEncoded+':'+fontWeightInt+'&display=block" rel="stylesheet" data-font-name="'+fontFamily+'" data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'">');
		updatedFont = true;

	}

	$('.font-preview-text').css("font-family","'"+fontFamily+"', sans-serif").css('font-weight',fontWeightInt);


	//variables
	// $tmp = $('<div></div>');
	//
	// $tmp.load('js/ajax/fonts/'+font_name+'.html',function(data){
	//
	// 	font_css = $tmp.html();
	// 	$('.font-style-loader').text(font_css);
	//
	// 	//change the font family of preview text
	// 	$('.font-preview-text').css('font-family',font_name);
	//
	// });

}

//initialise font bar
function initialiseFontBar(event){

	//variables
	var styles_bar = $('.font-editor-styles-bar.initialise').clone();

	//show font styles bar
	$(event).closest('ul').after(styles_bar);

	//remove initialise
	$(event).closest('ul').next('.font-editor-styles-bar').removeClass('initialise').show();

	//hide font bar items
	$(event).closest('ul').next('.font-editor-styles-bar').find('li').hide();

	//fetch the items
	var select_items = $(event).attr('data-fonts');

	//create an array from the fetched string
	var array = select_items.split(';');

	//for each item
	for (i=0;i<array.length;i++){

		if(array[i] == '' || array[i] == ' '){

			return false;

		}

		//retrieve result
		var item = array[i].substring(0, array[i].indexOf('['));
		var value = array[i].split('[')[1].split(']')[0];

		//find font and show
		$(event).closest('ul').next('.font-editor-styles-bar').find('[data-fontbar-weight="'+value+'"]').attr('data-font-family',item).show();

	}

}

//install font in template
function installFont(){

	//variables
	var fontFamily = $('.font-wrapper.active').closest('ul').next('.font-editor-styles-bar').find('.active').attr('data-font-family').toLowerCase();
	// var font_sub_family = $('.font-wrapper.active').closest('ul').next('.font-editor-styles-bar').find('.active').attr('data-font-sub-family');
	var fontWeightInt = $('.font-editor-styles-bar li.active').attr('data-fontbar-weight');
	var font_family_css = $('.font-style-loader').html();
	var attr_name = $('.font-editor-top-bar-headline span').text();
	var font_name = $('.font-wrapper.active').attr('data-font-name');


	//detect if the font family is already installed
	if($('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"]').length){

		//check if the font weight is already installed
		if($('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'"]').length){


		}

		//install font weight
		else {

			$('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('data-font-weight-'+fontWeightInt, fontWeightInt);

			//variables
			var googleFontString = $('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"]').attr('href');
			var googleFontString = googleFontString.replace('&display',','+fontWeightInt+'&display');

			//update in the dom
			$('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('href',googleFontString);

			updatedFont = true;


		}

	}

	//install font
	else {

		fontFamilyEncoded = capitalize_Words(fontFamily);
		fontFamilyEncoded = fontFamilyEncoded.replace(/ /g,'+');
		$('#template-editing-canvas [data-template-type="headers"]').append('<link href="https://fonts.googleapis.com/css?family='+fontFamilyEncoded+':'+fontWeightInt+'&display=swap" rel="stylesheet" data-font-name="'+fontFamily+'" data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'">');
		updatedFont = true;

	}

	// //if font does not already exist
	// if ($('#template-editing-canvas [data-stampready-font-family="'+font_family+'"]').length < 1) {
	//
	// 	//install font in template
	// 	$('#template-editing-canvas [data-template-type="headers"]').append('<style data-stampready-font-family="'+font_family+'">'+font_family_css+'</style>');
	// 	// $('#template-editing-canvas').find('style:first-of-type').after('<style>'+font_family_css+'</style>');
	// 	//
	// 	// if($('#template-editing-canvas').find('style:first-of-type').length < 1){
	// 	//
	// 	// 	$('#template-editing-canvas [data-template-type="headers"]').append('<style>'+font_family_css+'</style>');
	// 	//
	// 	// }
	//
	// 	//find font style loader, remove class and add a mark
	// 	$('#template-editing-canvas').find('.font-style-loader').removeClass('font-style-loader').attr('data-stampready-font-family',font_family).attr('data-stampready-sub-font-family',font_sub_family).attr('data-font-name',font_name);
	//
	// }

	setTimeout(function(){

		//change font family for attribute name
		$(effectTarget).find('[data-size="'+attr_name+'"]').css("font-family", "'"+fontFamily+"', Arial, Helvetica, sans-serif").css('font-weight', getFontWeightInt(fontWeightInt));
		$(effectTarget+'[data-size="'+attr_name+'"]').css("font-family", "'"+fontFamily+"', Arial, Helvetica, sans-serif").css('font-weight', getFontWeightInt(fontWeightInt));

		initialiseStyles('.selected-table');

	}, globalAnimationSpeed * 2)

}

//initialise used fonts
function initialiseUsedFonts(){

	//variables
	var used_fonts_count = $('#template-editing-canvas [data-font-name]').size();

	if(used_fonts_count < 1){

		//hide the used fonts wrapper
		$('.fonts-list-used').hide();
		$('.fonts-list-used').prev('h3').hide();
		return false;

	}

	//reset the fonts-list-used wrapper
	$('.fonts-list-used').show().empty();
	$('.fonts-list-used').prev('h3').show();

	//each style in template editing canvas
	$('#template-editing-canvas [data-font-name]').each(function(){

		//variables
		var font_name = $(this).attr('data-font-name');
		var fonts = $('#font-editor-main-left').find('[data-font-name="'+font_name+'"]').attr('data-fonts');

		//if font does not exist already
		if ($('.fonts-list-used [data-font-name="'+font_name+'"]').length < 1) {

			$('.fonts-list-used').append('<li><div class="font-wrapper" data-fonts="'+fonts+'" data-font-name="'+font_name+'"><h2 class="font-bold">'+font_name.substring(0,2)+'</h2><div class="font-name font-bold">'+font_name+'</div></div></li>');

		}

	})

}

//hide the top and bottom bar
function hideDevicePreviewBars(){

	//variables
	var top_bar_height = $('#device-top-bar').height();
	var bottom_bar_height = $('#device-top-bar').height();

	//hide top and bottom bar
	$('#device-top-bar').animate({

		'top': '-'+top_bar_height+'px'

	}, globalAnimationSpeed);

	//hide top and bottom bar
	$('#device-bottom-bar').animate({

		'bottom': '-'+bottom_bar_height+'px'

	}, globalAnimationSpeed);

	//padding
	$('#iframe-wrapper').animate({

		'padding-top': '0px',
		'padding-bottom': '0px'

	}, globalAnimationSpeed)

}

//show device preview bars
function showDevicePreviewBars(){

	//variables
	var top_bar_height = $('#device-top-bar').height();
	var bottom_bar_height = $('#device-bottom-bar').height();
	var format = $('#mobile-preview-wrapper').width();
	var pos_top = 0;
	var pos_bottom = 0;
	var padding_top = 0;
	var padding_bottom = 0;

	//iphone 4 and 5
	if(format == 320){ var top_bar_height = 65; var bottom_bar_height = 45; var device_name = 'iPhone 4'; }

	//iphone 6
	else if(format == 375){ var top_bar_height = 65; var bottom_bar_height = 45; var device_name = 'iPhone 6'; }
	else if(format == 414){ var top_bar_height = 65; var bottom_bar_height = 45; var device_name = 'iPhone 6+'; }
	else { var pos_top = '-'+top_bar_height; var pos_bottom = '-'+top_bar_height; var device_name = ''; }

	//add class
	$('#device-top-bar, #device-bottom-bar').attr('data-device',device_name);

	if(device_name != ''){

		//show device name and format
		$('.preview-screen-format').text(device_name+' - '+format+'px');

		var padding_top = top_bar_height; var padding_bottom = bottom_bar_height;

	}

	//hide top and bottom bar
	$('#device-top-bar').animate({

		'top': pos_top+'px'

	}, globalAnimationSpeed);

	//hide top and bottom bar
	$('#device-bottom-bar').animate({

		'bottom': pos_bottom+'px'

	}, globalAnimationSpeed);

	//padding
	$('#iframe-wrapper').animate({

		'padding-top': padding_top+'px',
		'padding-bottom': padding_bottom+'px'

	}, globalAnimationSpeed)

}

//present mirror on mobile tooltip
function presentMirrorOnMobileTooltip(){

	//variables
	var tooltip_width = parseInt($('.mirror-on-mobile-tooltip').width());

	$('.mirror-on-mobile-tooltip').animate({

		'left':'-' + (tooltip_width + 10) + 'px',
		'opacity': '1'

	}, { duration: globalAnimationSpeed * 2, easing: 'easeOutQuart', complete:  function() {

	}});

	setTimeout(function(){

		$('.mirror-on-mobile-tooltip').animate({

			'left':'-' + (tooltip_width + 20) + 'px',
			'opacity': '0'

		}, { duration: globalAnimationSpeed * 2, easing: 'easeInQuart', complete:  function() {

			$('.mirror-on-mobile-tooltip').hide();

		}});

	}, tooltipTimeout)

}

//open campaign optimizer
function openCampaignOptimizer(){

	 stopScanningFlag = false;

	 //remove unecessary fonts
	 removeUnusedFonts();

	//append overlay
	$('body').prepend('<div id="popupOverlay"></div>');

	//show campaign optimizer
	$('#campaign-optimizer').show();

	//show overlay and its contents
	setTimeout(function() {

		$('#popupOverlay').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		});

		$('#campaign-optimizer').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(1)'
		});

		$('.space.active').css({
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(0.9)'
		});

	}, 50);

	//wait  alittle before starting to scan
	setTimeout(function(){

		//initialise calibration simulation
		initialiseCalibration();

		setTimeout(function(){

			startScanning();

			setTimeout(function(){

				$('#campaign-optimizer').draggable({
					containment: 'body',
					delay: 150,
					start: function(event, ui) {

						$('#popupOverlay').remove();

						$('.space.active').css({
						    'transition': popupSpeed+'s all ease',
						    'transform': 'scale(1)'
						});

						$('#campaign-optimizer').css({
						    'transition': ''
						});

						setTimeout(function(){

							$('html, body').css('overflow', '');
							$('#popupOverlay').remove();
							$('#create-preview-wrapper').hide();
							$('.space').css({
								'transition': 'none',
							})

							//remove flags
							clearFlags('popup');

						}, popupSpeed);

					}
				});

			}, 500)

		}, delayStartScanning);

	}, 1000);

}

//close campaign optimizer
function closeCampaignOptimizer(){

	//close campaign optimizer
	$('#campaign-optimizer').css({
        'opacity': '0',
        'transform': 'translateY(-50%) scale(0.8)'
    });

    //hide it after 400 ms
    setTimeout(function(){

	    stopScanningFlag = true;

	    //stop calibrating
	    stopCallibration();

	    //overwrite percentage variable
	    percentage = 0;

	    //hide campaign optimizer
	    $('#campaign-optimizer').hide();

	    //reset score to zero
	    $('#campaign-optimizer .score').text('0');

	    $('#campaign-optimizer #meter').attr('data-degree','-90')
	    $('#campaign-optimizer #meter').css('transform','rotate(-90)');
	    $('#campaign-optimizer #calipers-shadow').css('transform','rotate(-5)');

	    //remove lists
	     $('#campaign-optimizer ul').empty();

    }, 400)

}

//make sure links and buttons can't be removed so easily
function keepElementInTact(event){

	//fetch current text
	var text = $(event).text().replace(/ /g,'').replace(/<br\/>/g,'');

	//if text is empty, make sure to remove it completely
	if(text == ''){ $(event).empty(); }

}

//detect whether to remove the element or note during typing
function detectRemoveElement(event){

	var text = $(event).text().replace(/ /g,'');
	var text_length = $(event).text().replace(/ /g,'').length;
	if(text_length == 1){ $(event).empty(); }
	if(text == ''){ $(event).removeAttr('contenteditable'); $(event).parent().attr('contenteditable','true');  $(event).remove(); }

}


//if carret is in element
function isSelectionInsideElement(tagName) {
    var sel, containerNode;
    tagName = tagName.toUpperCase();
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            containerNode = sel.getRangeAt(0).commonAncestorContainer;
        }
    } else if ( (sel = document.selection) && sel.type != "Control" ) {
        containerNode = sel.createRange().parentElement();
    }
    while (containerNode) {
        if (containerNode.nodeType == 1 && containerNode.tagName == tagName) {
            return true;
        }
        containerNode = containerNode.parentNode;
    }
    return false;
}

//get the element you are currently typing in
function getSelectionContainerElement() {
    var range, sel, container;
    if (document.selection && document.selection.createRange) {
        // IE case
        range = document.selection.createRange();
        return range.parentElement();
    } else if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt) {
            if (sel.rangeCount > 0) {
                range = sel.getRangeAt(0);
            }
        } else {
            // Old WebKit selection object has no getRangeAt, so
            // create a range from other selection properties
            range = document.createRange();
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode, sel.focusOffset);

            // Handle the case when the selection was selected backwards (from the end to the start in the document)
            if (range.collapsed !== sel.isCollapsed) {
                range.setStart(sel.focusNode, sel.focusOffset);
                range.setEnd(sel.anchorNode, sel.anchorOffset);
            }
        }

        if (range) {
           container = range.commonAncestorContainer;

           // Check if the container is a text node and return its parent if so
           return container.nodeType === 3 ? container.parentNode : container;
        }
    }
}

//get the start/end of the element you are typing in
function getSelectionTextInfo(el) {
    var atStart = false, atEnd = false;
    var selRange, testRange;
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            selRange = sel.getRangeAt(0);
            testRange = selRange.cloneRange();

            testRange.selectNodeContents(el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            atStart = (testRange.toString() == "");

            testRange.selectNodeContents(el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            atEnd = (testRange.toString() == "");
        }
    } else if (document.selection && document.selection.type != "Control") {
        selRange = document.selection.createRange();
        testRange = selRange.duplicate();

        testRange.moveToElementText(el);
        testRange.setEndPoint("EndToStart", selRange);
        atStart = (testRange.text == "");

        testRange.moveToElementText(el);
        testRange.setEndPoint("StartToEnd", selRange);
        atEnd = (testRange.text == "");
    }

    return { atStart: atStart, atEnd: atEnd };
}

//hex to rgba for colorizing images
function hexToRgbColorize(color) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}

//color all the images
function colorImage(token, hexaColor) {

    // create hidden canvas (using image dimensions)
    var imgElement = document.querySelector("[data-colorize-icon-mark='"+token+"']")

    var canvas = document.createElement("canvas");

	var imgSrc = $('[data-colorize-icon-mark="'+token+'"]').attr('src');

	//create a temporary div, where we output all possible images
	$('#html-dump').html('<img src="'+imgSrc+'">');


    canvas.width = $('#html-dump img').width();
    canvas.height = $('#html-dump img').height();

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement,0,0,canvas.width,canvas.height);

    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

    var data = imageData.data;

    // convert image to grayscale
    var rgbColor = hexToRgbColorize(hexaColor);

    for(var p = 0, len = data.length; p < len; p+=4) {
        //if(data[p+3] == 0)
        //   continue;
        data[p + 0] = rgbColor.r;
        data[p + 1] = rgbColor.g;
        data[p + 2] = rgbColor.b;
        //data[p + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);

    // replace image source with canvas data
    imgElement.src = canvas.toDataURL();
}

//present sub-menu
function presentSubmenu(event){

	//variables
	subMenuTimeout = 0;
	submenuTitle = $(event).attr('data-title');
	var token = createToken(); //not global as we're using the token variable quite often

	//if the styles or modules button is active, set a little delay
	if($('[data-title="Modules"], [data-title="Styles"]').hasClass('active')){

		//the delay variable
		subMenuTimeout = globalAnimationSpeed * 1.5;

	}

	//add submenu-activated class to event
	$(event).addClass('submenu-activated');

	//the submenu timeout
	setTimeout(function(){

		//menu items
		var menuItems = $(event).attr('data-submenu');

		//create an array from the fetched string
		var array = menuItems.split(';');

		//position of event item
		var position = $(event).offset();
		var posY = position.top;

		//sidebar width
		var sidebar_width = $('#sidebar').width();

		//append menu to body
		$('body').prepend('<div class="navigation-submenu font-bold" data-submenu-title="'+submenuTitle+'" style="top: '+(posY+20)+'px; left: '+(sidebar_width+offsetSubmenu)+'px;" data-mark="'+token+'"><div class="navigation-submenu-tip"></div></div>');

		//for each item
		for (i=0;i<array.length;i++){

			//if array is empty or whitespace, return false
			if(array[i] == '' || array[i] == ' '){ return false; }

			//the item
			var item = array[i].substring(0, array[i].indexOf('['));

			//the value
			var value = array[i].split('[')[1].split(']')[0];

			if(item == 'Export' && subscription != 'SUBSCRIPTION'){

				item = item+"<img src='img/icons/lock.png'>";

			}

			//append to menu
			$('.navigation-submenu[data-mark="'+token+'"]').append('<li onclick="'+value+'">'+item+'</li>');

		}

		//animate sub-menu
		$('.navigation-submenu[data-mark="'+token+'"]').animate({

			transform: 'translate ('+offsetSubmenuAnimationDistance+'px 0px)',
			opacity: '1'

		}, globalAnimationSpeed / 2);

	}, subMenuTimeout);

}

//remove sub menu
function removeSubmenu() {

	//variables
	var token = createToken();

	//remove submenu-activated class
	$('.submenu-activated').removeClass()

	//set token to navigation item
	$('.navigation-submenu').attr('data-mark',token);

	//animate submenu
	$('.navigation-submenu').animate({

		transform: 'translate ('+(offsetSubmenuAnimationDistance*2)+'px 0px)',
		opacity: '0'

	}, { duration: globalAnimationSpeed / 2, complete:  function() {

		//remove the submenu on completion of animation
		$('[data-mark="'+token+'"]').remove();

	}});

}

//load module to canvas
function loadModule(moduleType){

	//disable draggable
	$('[data-menu-section="modules"] li:not(.module-accordion)').draggable('disable')

	//if module type is template
	if(moduleType == 'template'){

		//variables
		moduleIdentifier = $('.canvas-placeholder').attr('data-sidebar-module-identifier');

		//shuffle to animation
		$('.placeholder-indicator').animate({
			'height': '26px',
			'top': '50%',
			'margin-top': '-13px'
		}, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {

			//remove one placeholderindicator, no need for two circles to animate
			$('.placeholder-indicator-bottom').remove();

			//animate the circle
			$('.placeholder-indicator-top').animate({
				'height': '32px',
				'width': '32px',
				'margin-top': '-16px',
				'margin-left': '-12px'
			}, { duration: globalAnimationSpeed * 1.2, easing: 'easeOutBack', complete:  function() {

				//fetch module from template-modules-holder
				data = $('#template-modules-holder [data-module="'+moduleIdentifier+'"]')[0].outerHTML;

				//module has been fetched, put it into the dump to calculate the height
				$('#html-dump').html(data);

				//variables
				moduleHeight = $('#html-dump').find('[data-module]').prop('scrollHeight');
				moduleWidth = $('#html-dump').find('[data-module]').attr('width')

				//remove animation
				$('.placeholder-indicator-top').animate({
					'height': '0px',
					'width': '0px',
					'margin-top': '0px',
					'margin-left': '2px',
					'opacity': '0'
				}, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {


				}});

				$('.canvas-placeholder').animate({
					'height': moduleHeight+'px'
				}, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {

					//add module
					$('.canvas-placeholder').html('<div class="dropped-module">'+data+'</div>');

					if(moduleWidth == '100%'){

						//variables
						adaptPrimaryColors('module');

					}

					$('.dropped-module').animate({
						'opacity': '1'
					}, { duration: globalAnimationSpeed, easing: 'easeInQuart', complete:  function() {

						//unwrap the placeholder, so only the data-module is left
						$('.canvas-placeholder [data-module]').unwrap();
						$('.canvas-placeholder [data-module]').unwrap();

						//enable draggable again
						$('[data-menu-section="modules"] li:not(.module-accordion)').draggable('enable');

						setSaveActive();

						 saveTemplateToMemory();

						$('#template-editing-canvas').css('height','auto');

						initialiseResizable();

						checkEmptyCanvas();

						moduleClickDisable = false;

					}});

				}});


			}});

		}});

	}

	//if module is value
	else if(moduleType == 'vault'){

		//variables
		moduleIdentifier = $('.canvas-placeholder').attr('data-sidebar-module-identifier');

		//shuffle to animation
		$('.placeholder-indicator').animate({
		   'height': '26px',
		   'top': '50%',
		   'margin-top': '-13px'
	   }, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {

			//remove one placeholderindicator, no need for two circles to animate
			$('.placeholder-indicator-bottom').remove();

			//animate the circle
			$('.placeholder-indicator-top').animate({
				'height': '32px',
				'width': '32px',
				'margin-top': '-16px',
				'margin-left': '-12px'
			}, { duration: globalAnimationSpeed * 1.2, easing: 'easeOutBack', complete:  function() {

				//fetch the module
				$.ajax({
				    type: "POST",
				    dataType: "html",
				    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchVaultModule",
				    data: { moduleIdentifier: moduleIdentifier }
				}).done(function(data) {

					//if data returns the user has no subscription, show error
					if(data == 'no_subscription'){

						//notification
						notification('warning','No Subscription','You need to have an active subscription', false);

						//remove placeholder
						$('.canvas-placeholder').remove();

						///enable draggable again
						$('[data-menu-section="modules"] li').draggable('enable');

						return false;

					}

					//data = data.replace(' data-module', ' data-module-identifier="'+moduleIdentifier+'" data-module');

					//module has been fetched, put it into the dump to calculate the height
					$('#html-dump').html(data);
					$('#html-dump').find('[data-module]').attr('data-module-identifier',moduleIdentifier)
					data = $('#html-dump').html();

					installGoogleFontFromVaultModule();

					//variables
					moduleHeight = $('#html-dump').find('[data-module]').prop('scrollHeight');

					//remove animation
					$('.placeholder-indicator-top').animate({
						'height': '0px',
						'width': '0px',
						'margin-top': '0px',
						'margin-left': '2px',
						'opacity': '0'
					}, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {


					}});

					$('.canvas-placeholder').animate({
						'height': moduleHeight+'px'
					}, { duration: globalAnimationSpeed * 1.2, easing: 'easeInBack', complete:  function() {

						//add module
						$('.canvas-placeholder').html('<div class="dropped-module">'+data+'</div>');

						//variables
						adaptPrimaryColors('module');

						$('.dropped-module').animate({
							'opacity': '1'
						}, { duration: globalAnimationSpeed, easing: 'easeInQuart', complete:  function() {

							//unwrap the placeholder, so only the data-module is left
							$('.canvas-placeholder [data-module]').unwrap();
							$('.canvas-placeholder [data-module]').unwrap();

							//enable draggable again
							$('[data-menu-section="modules"] li').draggable('enable');

							setSaveActive();

							saveTemplateToMemory();

							$('#template-editing-canvas').css('height','auto');

							initialiseResizable();

							checkEmptyCanvas();

							moduleClickDisable = false;

						}});

					}});

				});

			}});

		}});

	}

}

//fetch template background color
function setModuleBackgroundColor(){

	templateBackgroundColor = '';

	//if placeholder has a data-module attribute before
	if($('.canvas-placeholder').prev('[data-module]').length){

		//variables
		templateBackgroundColor = $('.canvas-placeholder').prev('[data-module]').css('background-color');

		//if the template color is invisible
		if(templateBackgroundColor == 'rgba(0, 0, 0, 0)'){

			//fetch the first possible bgcolor
			templateBackgroundColor = $('.canvas-placeholder').prev('[data-module]').find('[data-bgcolor]').first().css('background-color');

		}

	}

	//else if placeholder has data-module attribute after
	else if($('.canvas-placeholder').next('[data-module]').length){

		//variables
		templateBackgroundColor = $('.canvas-placeholder').next('[data-module]').css('background-color');

		//if background color is invisible
		if(templateBackgroundColor == 'rgba(0, 0, 0, 0)'){

			//fetch the first possible bgcolor
			templateBackgroundColor = $('.canvas-placeholder').next('[data-module]').find('[data-bgcolor]').first().css('background-color');

		}

	}

	//set background color to new module
	if($('.dropped-module [data-module]').attr('data-bgcolor')){ $('.dropped-module [data-module]').css('background-color', templateBackgroundColor); }
	if($('.dropped-module [data-module] td').attr('data-bgcolor')){ $('.dropped-module [data-module] > tbody > tr > td').css('background-color', templateBackgroundColor); }

}

function adjustScrollbarToModulePosition(){

	//variables
	placeholderOffset = $('.canvas-placeholder').offset().top;
	currentScrollbarPosition = $('#canvas').scrollTop();

	measuredScrollbarPosition = (placeholderOffset + currentScrollbarPosition) - (windowHeight / 2) - (maxElementHeight / 2);

	$('#canvas').animate({ scrollTop: measuredScrollbarPosition }, globalAnimationSpeed * 1.5);

}

//adjust template bar on scroll
function adjustResetTemplateBar(){

	//variables
	scrollbarPosition = $('#canvas').scrollTop();

	//the variable to measure opacity
	opacityMeasurement = 1 - (scrollbarPosition / 75);

	//if opacity is zero or lower, set to 0
	if(opacityMeasurement <= 0){ opacityMeasurement = 0; }

	//set the opacity
	$('#template-top-bar').css('opacity', opacityMeasurement);

}

//present repeatable icons
function presentRepeatable(event){

	//if repeatable button already exists, clear the timeout to remove the repeatable button
	if($(event).find('.repeatable-button-wrapper').length){ clearTimeout(repeatableButtonTimeout); return false; }
	if($('.highlighter-container, #image-tooltip').is(':visible')){ return false; }

	//remove repeatable button
	$('.repeatable-button-wrapper, .removable-button-wrapper').remove();

	//variables
	var tokenRepeatable = createToken();
	repeatableElementHeight = $(event).height();
	repeatableElementWidth = $(event).width();
	dataModule = $(event).closest('[data-module]');
	offsetX = $(event).offset().left - $(event).closest('[data-module]').offset().left;
	offsetY = $(event).offset().top - $(event).closest('[data-module]').offset().top;
	countRepeatable = $(event).closest('[data-module]').find('[data-repeatable]').size();


	//append button
	$(event).find('td:eq(0)').append('<div data-mark="'+tokenRepeatable+'" class="repeatable-button-wrapper"><div class="repeatable-button bounce"></div></div><div data-mark="'+tokenRepeatable+'" class="removable-button-wrapper hidden"><div class="removable-button"></div></div>');

	setTimeout(function(){

		if(countRepeatable > 1){

			$('.removable-button-wrapper').show();
			$('.removable-button').addClass('bounce');

		}

	}, 75);

	//wait exactly 1000ms, as the animation is defined in the theme.css
	setTimeout(function(){

		//remove the class of bounce, otherwise it may flicker
		$('[data-mark="'+tokenRepeatable+'"] .repeatable-button').removeClass('bounce');

	}, 1000)

	//hide module options
	//hideModuleOptions();

}

//remove repeatable icons
function removeRepeatable(event){

	//variables
	var tokenRepeatable = $(event).find('[data-mark]').attr('data-mark');

	//wait a little before removing, the user may come back to click on the repeatable button
	repeatableButtonTimeout = setTimeout(function(){

		//remove button
		$('[data-mark="'+tokenRepeatable+'"]').remove();

	}, 500)

}

//insert repeatable module
function insertRepeatableModule(event){

	//variables
	repeatableModuleHtml = $(event).closest('[data-repeatable]')[0].outerHTML;

	//set the repeatable button flag to true
	repeatableButtonRemovedTimeout = true;

	//insert html after data-repeatable
	$(event).closest('[data-repeatable]').after(repeatableModuleHtml);

	//remove the repeatable button
	$('.repeatable-button-wrapper, .removable-button-wrapper').remove();

	//wait a little bit to reset the flag to false
	setTimeout(function(){

		//save template to memory
		saveTemplateToMemory();

		//set the repeatable button flag to false
		repeatableButtonRemovedTimeout = false;

	}, 100)

}

function removeRepeatableModule(event){

	//variables

	//set the repeatable button flag to true
	repeatableButtonRemovedTimeout = true;

	//remove data repeatable
	$(event).closest('[data-repeatable]').remove();

	//remove the repeatable button
	$('.repeatable-button-wrapper, .removable-button-wrapper').remove();

	//wait a little bit to reset the flag to false
	setTimeout(function(){

		//save template to memory
		saveTemplateToMemory();

		//set the repeatable button flag to false
		repeatableButtonRemovedTimeout = false;

	}, 100)

}

function showExportSubscription(){

	$(location).attr('href','https://stampready.net/dashboard/drafts/index.php?action=denied');

}

//export template request popup
function requestPopup(type){

	if(type == 'image_from_url'){

		//set popup parameters
		headline = 'Import Image from URL';
		paragraph = 'Copy and paste the URL to a online hosted image, often starting with HTTP.'
		inputField = 'http://';
		inputFieldId = 'import-image-url-field';
		btnTrue = 'Import';
		btnTrueId = 'import-image-from-url';
		btnTrueFunction = 'importImageFromUrl()';
		btnFalse = 'Nevermind';

		if(directImportType == 'image'){

			rememberedImage = $('.selected-image');
			rememberedImageUrl = $('.selected-image').attr('src')

		}

		else {

			rememberedBackgroundImage = $('.selected-table [data-background]');

		}

	}

	if(type == 'unavailable'){

		//set popup parameters
		headline = 'Template unavailable';
		paragraph = 'The author has either either removed or disabled this template.';
		btnTrue = 'Browse other templates';
		btnTrueId = 'browse-other-templates';
		btnTrueFunction = 'browseOtherTemplates()';
		blockClose = true;

	}

	//if type is feed
	if(type == 'feed'){

		//set popup parameters
		headline = 'Load content from your website';
		paragraph = 'We can automatically detect posts on your website and insert them in your newsletter.';
		inputField = 'http://';
		inputFieldId = 'feed-url';
		btnTrue = 'Import content';
		btnTrueId = 'import-feed-content';
		btnTrueLoadingText = 'Importing..';
		btnFalse = 'Close';
		btnTrueFunction = 'loadFeed(this, event)';

		dropDownItems = {
			'3[][false]': 'Retrieve the 3 latest posts',
			'5[][false]': 'Retrieve the 5 latest posts',
			'10[][false]': 'Retrieve the 10 latest posts',
			'15[][false]': 'Retrieve the 15 latest posts'
		};

	}

	//if type is confirm-save
	if(type == 'confirm-save'){

		//set popup parameters
		headline = 'You probably need to save your work';
		paragraph = 'You want to continue to the send page, but you haven\'t saved your template yet. Would you like to save and continue?'
		btnTrue = 'Save Template';
		btnTrueId = 'save-continue';
		btnTrueLoadingText = 'Saving template..';
		btnTrue2 = 'No, continue';
		btnTrueId2 = 'continue-send';
		btnTrueFunction2 = 'continueToSend()';

	}

	//if type is feedback
	if(type == 'feedback'){

		//set popup parameters
		headline = 'Submit feedback for Beta';
		paragraph = 'Please, be descriptive as possible.';
		btnTrue = 'Submit Feedback';
		btnTrueId = 'submit-feedback';
		btnTrueFunction = 'submitFeedback(this, event)';
		btnTrueLoadingText = 'Submitting..';
		textArea = '';
		textAreaId = 'feedback-textarea';
		textAreaPlaceholder = 'Your feedback about the editor';
		btnFalse = 'Close';

	}

	if(type == 'unpaid'){

		headline = 'This is a demo version';
    	paragraph = 'To unlock this feature and more, please see our subscriptions.';

    	btnTrue = 'Purchase';
    	btnTrueId = 'purchaseTemplate';
		btnTrueFunction = "$('#save-template-button-wrapper.demoMark').trigger('click')";

    	btnFalse = 'Cancel';

	}

	if(type == 'no_subscription'){

		headline = 'Export feature locked';
		paragraph = 'Exporting to your desktop is not allowed on your current plan. To unlock this feature and more, please see our subscriptions.';

		btnTrue = 'Subscriptions';
		btnTrueId = 'see_pricing';
		btnTrueFunction = 'showExportSubscription();';

		btnFalse = 'Close';

	}

	if(type == 'no_subscription_code'){

		headline = 'Code Editor locked';
		paragraph = 'Using the code editor is not allowed on your current plan. To unlock this feature and more, please see our subscriptions.';

		btnTrue = 'Subscriptions';
		btnTrueId = 'see_pricing';
		btnTrueFunction = 'showExportSubscription();';

		btnFalse = 'Close';

	}

	//if type is export
	if(type == 'export'){

		//if no subscription
		if(subscription != 'SUBSCRIPTION'){ requestPopup('no_subscription'); return false;}

		//detect unpaid template
		if(!detectLockedFeatures()){ requestPopup('unpaid'); return false; }

		//set popup parameters
		headline = 'Export template to desktop';
		paragraph = 'You\'re about to export your campaign to your desktop. Would you like to keep the images online?'
		btnTrue = 'Online';
		btnTrueId = 'export-online';
		btnTrueFunction = 'exportToDesktop(this, event)';


		if(mode == 'demo'){ btnTrue = 'Buy Template'; btnFalse = 'Close'; }
		else {

			btnTrue2 = 'Offline';
			btnTrueId2 = 'export-offline';
			btnTrueFunction2 = 'exportToDesktop(this, event)';
			btnTrueLoadingText = 'Preparing to export';
			inputField = 'Campaign Name';
			inputFieldId = 'exported-template-name-value';

		}

	}

	if(type == 'share-campaign'){

		if(!detectLockedFeatures()){ requestPopup('unpaid'); return false; }

		//set popup parameters
		headline = 'Share this campaign';
		paragraph = 'Would you like to duplicate this campaign to another StampReady user?';
		btnTrue = 'Share';
		btnTrueId = 'share-campaign';
		btnTrueFunction = 'shareCampaign(this, event)';
		btnTrueLoadingText = 'Sharing campaign';
		inputField = 'Email Address of Associated User';
		inputFieldId = 'share-campaign-input-value';
		btnFalse = 'Cancel';

	}

	if(type == 'remove-palette'){

		//variables
		paletteName = $('#styles-swatches h6 span').text();
		paletteValue = $('#styles-swatches h6 span').attr('data-swatch-value');
		//
		// if(paletteValue == 'base_colors' || paletteValue == 'template colors'){
		//
		// 	//notification
		// 	notification('warning', 'Not allowed', 'This palette can\'t be removed', false);
		//
		// 	return false;
		//
		// }

		//set popup parameters
		headline = 'Delete Color Palette';
		paragraph = 'You are about to delete '+paletteName+'. This action can\'t be undone.';
		btnTrue = 'Delete palette';
		btnTrueId = 'remove-palette';
		btnTrueFunction = 'removePalette()';
		btnTrueLoadingText = 'Deleting Palette';
		btnFalse = 'Close';

	}

	if(type == 'mirror-mobile'){

		if(!detectLockedFeatures()){ requestPopup('unpaid'); return false; }

		//fetch mirror token
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchMirrorToken",
		    data: { campaign_id: campaign_id }
		}).done(function(data) {

			//set popup parameters
			headline = 'Mirror Live on mobile';
			paragraph = 'To view your adjustments live, please visit <a href="http://www.stampready.net/mirror/" target="_blank">stampready.net/mirror/</a> on your mobile browser and use the code below.';
			btnFalse = 'Continue';
			popupToken = data;
			invert = true;

			//open popup
			openPopup();

		});

		return false;

	}

	if(type == 'test-email'){

		if(!detectLockedFeatures()){ openWelcomePopup(); return false; }

		headline = 'Send a test email';
        paragraph = 'Please, note that test emails are not actual campaigns and may be delivered in your spam folder.';

    	btnTrue = 'Send';
    	btnTrueId = 'send_test_email';
		btnTrueLoadingText = 'Sending email..';
        btnTrueFunction = 'sendTestEmail()';

        inputField = 'Email Address';
        inputFieldId = 'test-email-value'

        btnFalse = 'Cancel';

	}

	if(type == 'reset'){

		headline = 'Reset Editing Canvas';
        paragraph = 'Would you like to start over from scratch?';

        btnTrue = 'Yes';
        btnTrueId = 'start_over';
        btnTrueFunction = 'createVersionSnapshot();resetTemplate();';

        btnFalse = 'Cancel';

	}

	if(type == 'adapt_primary'){

		headline = 'Should we adapt your new colors?';
        	paragraph = 'All primary, secondary and tertiary colors in your template will be replaced with your handpicked colors.';

        	btnTrue = 'Adapt colors';
        	btnTrueId = 'adapt_primary';
        	btnTrueFunction = "adaptPrimaryColors('template')";

        	btnFalse = 'Close';

	}

	if(type == 'create_palette'){

		headline = 'Create a new color palette';
		paragraph = 'You can store colors in for future use. What should be the name of the palette?'

		inputField = 'Palette Name';
		inputFieldId = 'swatch_name_value';

		btnTrue = 'Create Palette';
		btnTrueId = 'confirm_swatch_button';
		btnTrueFunction = "createSwatch('new')";

		btnFalse = 'Close';

	}

	if(type == 'createPaletteFromTemplateColors'){

		headline = 'Create new palette from Template Colors';
		paragraph = 'You are about to create a new palette with the colors being used in the template.'

		inputField = 'Palette name';
		inputFieldId = 'swatch_name_value';

		btnTrue = 'Create Palette';
		btnTrueId = 'confirm_swatch_button';
		btnTrueFunction = "createSwatch('template_colors')";

		btnFalse = 'Close';

	}

	//open popup
	openPopup();

}

//export template to desktop
function exportToDesktop(event){

	//if button is disabled
	if(buttonDisabled){ return false; }

	//variables
	var type = $(event).attr('id');
	var meta = '';
	var css = '';
	var contents = '';
	var name = $('#exported-template-name-value').val();
	var imagesCount = 0;
	var imagesString = '';

	if(name == ''){ notification('warning', 'Invalid name', 'Give your exported template a name', false); buttonDisabled = false; return false;}

	//clean contents
	html = cleanHtml($('#template-editing-canvas').html());
	css = cleanHeaders($('#template-editing-canvas').html());
	meta = cleanMeta($('#template-editing-canvas').html());

	//set button disabled to true
	buttonDisabled = true;

	//set button to disabled
	$(event).addClass('buttonDisabled');

	//set loading text
	$(event).val(btnTrueLoadingText+'..');

	//set z-index to higher than the alternate button
	$(event).css('z-index','4');

	//fetch the string of any base encoded images
	baseEncodedImages = fetchArrayOfBase64Images();

	//animate the button
	$(event).css({
		'width': '100%',
	});

	//if the string with base encoded images is not null
	if(baseEncodedImages.length !== 0){

		//create and apply base encoded images, with a function to retry export
		createAndApplyConvertionBaseEncodedImages('export');

	}

	else {

		//if type is offline, fetch and convert images
		if(type == 'export-offline'){

			//create a temporary div, where we output all possible images
			$tmp = $('<div></div>');

			//empty temp div
			$tmp.html(html);

			//for each image
			$tmp.find('img').each(function(){

				//variables
				imageSrc = $(this).attr('src');
				extension = imageSrc.split('.').pop();

				//change attr
				$(this).attr('src','images/img'+imagesCount+'.'+extension);

				imagesString = imagesString + '<img src="'+imageSrc+'">';

				imagesCount++;

			});

			//for each image
			$tmp.find('td, table').each(function(){

				el = $(this);

				imageSrc = $(this).css('background-image');
				imageSrc = imageSrc.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
				extension = imageSrc.split('.').pop();

				if(imageSrc !== 'none' && imageSrc !== undefined && imageSrc !== ''){

					$(el).css('background-image','');
					$(el).attr('background','images/img'+imagesCount+'.'+extension);
					imagesString = imagesString + '<img src="'+imageSrc+'">';

					imagesCount++;

				}

			});

			html = $tmp.html();

		}

		html = html.replace(/\n\s*\n/g, '\n\n'); //remove double linebreaks

		//request export
		$.ajax({
			type: "POST",
			dataType: "html",
			url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=exportTemplate",
			data: { name: name, html: html, type: type, css: css, meta: meta, imagesString: imagesString, type: type }
		}).done(function(data) {

			if(data == 'denied'){

				$(location).attr('href','https://stampready.net/dashboard/drafts/index.php?action=denied');
				return false;

			}

			//download zip to computer
			$(location).attr('href',data);

			//set button disabled to false again
			buttonDisabled = false

			//close the popup
			closePopup();

			//wait a little bit before presenting a message
			setTimeout(function(){

				//notification
				notification('success','Export Complete',name+' has been downloaded to your computer', false);
				return false;

			}, 1000);

		});

	}

}

//save to memory
function saveTemplateToMemory(){

	//last key
	totalMemoryObjectKeys = Object.keys(memoryObject);
	lastMemoryObjectKey = totalMemoryObjectKeys[totalMemoryObjectKeys.length-1];

	//if the last key variable is not undefined
	if(lastMemoryObjectKey !== undefined){

		//if the current memory index is lower then the last key, remove all keys after
		if(memoryIndex < lastMemoryObjectKey){

			for(var i = memoryIndex; i <= lastMemoryObjectKey; i++) {

				//remove keys
				delete memoryObject[(i+1)];

			}

			totalMemoryObjectKeys = Object.keys(memoryObject);
			memoryIndex = parseInt(totalMemoryObjectKeys[totalMemoryObjectKeys.length-1]);

		}

	}

	//increase memory index
	memoryIndex++;

	//fetch template
	html = cleanHtml($('#template-editing-canvas').html());
	headers = cleanHeaders($('#template-editing-canvas').html());

	templateSnapshot = '<div data-template-type="headers">'+headers+'</div><div data-template-type="html">'+html+'</div>';

	//if the maximum is reached
	if(memoryIndex >= maxMemoryIndex){

		//which key should be deleted
		deleteKey = memoryIndex - maxMemoryIndex;

		//remove the first
		delete memoryObject[deleteKey];

	}

	//add key
	$.extend(memoryObject,{
	    [memoryIndex]: templateSnapshot
	});


}

//retrieve key from memoryObject
function retrieveMemoryKey(type){

	removePreviewUrl();

	if(type == 'decrement'){ memoryIndex--; }
	if(type == 'increment'){ memoryIndex++; }

	//fetch the template from memory by key
	templateByKey = memoryObject[memoryIndex];

	//nothing found, reset key
	if(templateByKey == undefined){

		if(type == 'decrement'){ memoryIndex++; }
		if(type == 'increment'){ memoryIndex--; }

		return false;

	}


	//replace in to template editing canvas
	$('[data-template-type="headers"], [data-template-type="html"]').remove();
	$('#template-editing-canvas').prepend(templateByKey);

	setTimeout(function(){

		initialiseResizable();

		$('#template-editing-canvas [data-template-type="html"]').sortable('refresh');

	}, globalAnimationSpeed)

}

//clean template
function cleanHtml(contents){

	//create a temporary div
	$tmp = $('<div>' + contents + '</div>');
	contents = $tmp.find('[data-template-type="html"]').html();
	$tmp = $('<div>' + contents + '</div>');

	//remove
	$tmp.find('.canvas-placeholder, .prepeatable-button-wrapper, .module-options-wrapper, .editing-canvas-empty-state, style, meta, title, head, .ui-resizable-handle, grammarly-btn, .image-resizable-handle, link, grammarly-extension').remove();
	$tmp.find('.selected-element').removeClass('selected-element');
	$tmp.find('.ui-resizable').removeClass('ui-resizable');
	$tmp.find('.ui-wrapper').contents().unwrap();
	$tmp.find('[class=""]').removeAttr('class');
	$tmp.find('.ui-resizable-handle').remove();
	//$tmp.find('tr').unwrap('tbody');
	$tmp.find('[contenteditable]').removeAttr('contenteditable');
	// $tmp.find('*').contents().each(function() {
	//     if(this.nodeType === Node.COMMENT_NODE) {
	//
	// 		if(this.nodeValue.indexOf('gte') >= 0 || this.nodeValue.indexOf('mso') >= 0 ){
	//
	// 			console.log('found gte')
	//
	// 		}
	//
	// 		else {
	//
	// 			$(this).remove();
	//
	// 		}
	//
	//     }
	// });
	$tmp.contents().each(function() {
	    if(this.nodeType === Node.COMMENT_NODE) {

			if(this.nodeValue.indexOf('gte') >= 0 || this.nodeValue.indexOf('mso') >= 0 ){

				//variables
				var parent = this.parentNode.nodeName;

				if (parent == 'DIV') {

					$(this).remove();

				}

			}

			else {

				$(this).remove();

			}

	    }
	});
	$tmp.find('[data-template-type="html"]').contents().unwrap();

	contents = $tmp.html();

	//modify tags
	contents = convertSrTags(contents);

	return contents;

}

//convert SR tags
function convertSrTags(contents){

	//convert tags
	contents = contents.replace(/sr_name/g, '*|name|*').replace(/sr_first_name/g, '*|first_name|*').replace(/sr_date_year/g, '*|date_year|*').replace(/sr_email/g, '*|email|*').replace(/sr_unsubscribe/g, '*|unsubscribe|*').replace(/sr_date/g, '*|date|*').replace(/sr_view_online/g, '*|view_online|*').replace(/sr_country/g, '*|country|*').replace(/sr_browser/g, '*|browser|*').replace(/sr_os/g, '*|os|*').replace(/sr_referrer/g, '*|referrer|*').replace(/sr_custom_1/g, '*|custom_1|*').replace(/sr_custom_2/g, '*|custom_2|*').replace(/zip:uploads/g, 'zip_uploads');

	return contents;

}

//clean meta
function cleanMeta(contents){

	//create a temporary div
	$tmp = $('<div>' + contents + '</div>');
	contents = $tmp.find('[data-template-type="meta"]').html();

	$tmp = $('<div>' + contents + '</div>');

	contents = $tmp.html();

	return contents;

}

//clean css
function cleanHeaders(contents){

	$tmp = $('<div>' + contents + '</div>');
	var currentDom = $('[data-template-type="html"]').html().toLowerCase();

	$tmp.find('*').contents().each(function() {
	    if(this.nodeType === Node.COMMENT_NODE) {

			if(this.nodeValue.indexOf('gte') >= 0 || this.nodeValue.indexOf('mso') >= 0 ){

			}

			else {

				$(this).remove();

			}

	    }
	});

	contents = $tmp.find('[data-template-type="headers"]').html();

	$tmp = $('<div>' + contents + '</div>');

	contents = $tmp.html();

	return contents;

}

//align text
function alignText(alignType){

	selectedElement = $('.selected-element');

 	if($('.selected-element').is('td')){}
	else { selectedElement = $('.selected-element').closest('td'); }

	//if align type is left
	if(alignType == 'left'){

		$(selectedElement).css('text-align','');
		$(selectedElement).attr('align',alignType);

		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '8px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','right')

	}

	//if align type is left
	if(alignType == 'right'){

		$(selectedElement).css('text-align','');
		$(selectedElement).attr('align',alignType);

		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '4px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','center')

	}

	if(alignType == 'center'){

		$(selectedElement).css('text-align','');
		$(selectedElement).attr('align',alignType);

		//animate align button to align type right
		$('.align-text-line-3, .align-text-line-1').animate({
			'left': '0px'
		}, globalAnimationSpeed);

		//set alsign type to right
		$('#command-align-text-button').attr('data-align-type','left')

	}

}

//clear text selection
function clearSelection(){

	if (window.getSelection) window.getSelection().removeAllRanges();
	else if (document.selection) document.selection.empty();

}

//open preview space
function openPreviewSpace(){

	openSpace('preview-canvas');

	//variables
	templateHtml = $('#template-editing-canvas').html();

	//fetch template from editing canvas
	var html = cleanHtml(templateHtml);
	var meta = cleanMeta(templateHtml);
	var css = cleanHeaders(templateHtml);

	//add to iframe dynamically
	$('#preview-iframe').contents().find('body').html('<div data-template-type="html" style="-webkit-font-smoothing: subpixel-antialiased;">'+html+'</div>');
	$('#preview-iframe').contents().find('head').html('<div data-template-type="headers">'+css+'</div>');

	$('#preview-iframe').contents().find('head').find('[data-template-type="headers"]').contents().unwrap('div');

	setTimeout(function(){

		presentMirrorOnMobileTooltip();

	}, openSpaceSpeed * 7);

}

//detect when the vault scroll has been reached to the bottom
function detectVaultScroll(){

	//variables
	windowHeight = $(window).height();
	vaultHeight = $('#vault-modules-canvas')[0].scrollHeight;
	spaceTopBarHeight = parseInt($('[data-space="vault"] .space-top-bar').height())+1;
	scrollbarPosition = $('#vault-modules-canvas').scrollTop();

	if((windowHeight+scrollbarPosition) >= ((vaultHeight+spaceTopBarHeight)-scrollMaximumreachedThreshold)){

		vaultMaximumScrollFlag = true;

		loadNextBadgeModules();

	}


}

//load the next badge of modules when the scrollbar has reached the end of the page
function loadNextBadgeModules(){

	//variables
	i = 0;

	//increment the faultFetchPage variables
	vaultFetchCount++;
	vaultModulesCount = 0;

	//if vault sorting is random, we need to fetch all current presented modules
	if(vaultSorting == 'random'){

		//variables
		var moduleTokensArray = [];

		//for each module present
		$('[data-space].active [data-vault-module-identifier]').each(function(){

			//variables
			identifier = $(this).attr('data-vault-module-identifier');

			//push to array
			moduleTokensArray.push(identifier);

		});

	}

	//inject animation
	$('[data-space].active .database-source-canvas-wrapper').append('<div class="vault-load-badge-animation"><div class="loader-animation"></div></div>');

	//anbimate it
	$('[data-space].active .database-source-canvas-wrapper').animate({
		'transform': 'translate(0px, -40px)'
	}, { duration: globalAnimationSpeed * 1.7, easing: 'easeOutBack', complete:  function() {

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "json",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchVaultModules",
		    data: { filter_type: filter_type, filter_category: filter_category, filter_sorting: filter_sorting, filter_favorite: filter_favorite, filter_import: filter_import, fetch_offset: vaultFetchCount, moduleTokensArray: moduleTokensArray }
		}).done(function(data) {

			if(data == 'null' || data == null || !data){

				$('[data-space].active .database-source-canvas-wrapper').animate({
					'transform': 'translate(0px, 0px)'
				}, { duration: globalAnimationSpeed * 1.7, easing: 'easeInBack', complete:  function() {

					//remove animation
					$('.vault-load-badge-animation').remove();

				}});

			}

			//save the data variable
			//variables
			modulesListLength = data.length;
			modulesList = data;
			var ul_identifier = 1;

			$('[data-space].active .database-source-canvas-wrapper').animate({
				'transform': 'translate(0px, 0px)'
			}, { duration: globalAnimationSpeed * 1.7, easing: 'easeInBack', complete:  function() {

				//remove animation
				$('.vault-load-badge-animation').remove();

				for(var i = 0; i < modulesListLength; i++) {

					//variables
					token = modulesList[i]['token'];
					firstCharacterOfToken = token.substring(0, 1);
					stars = modulesList[i]['stars'];
					extension = modulesList[i]['extension'];

					//find ul identifier
					$(vault_field).find('ul[data-vault-column="'+ul_identifier+'"]').append('<li data-vault-module-identifier="'+token+'"><div class="vault-module-image-wrapper"><img src="../vault/thumbnails/'+firstCharacterOfToken+'/'+token+'/thumbnail.'+extension+'"></div><div class="module-details"><div class="item-contents-stars clear-fix">'+stars+'</div><div class="import-module"></div><div class="favorite-module"></div><a href="https://stampready.net/vault/module/?id='+token+'" target=_blank"" class="view-button">View Module</a></div></li>');

					//increase identifier
					ul_identifier++;

					//if identifier is 4, return to 1
					if(ul_identifier == 4){ ul_identifier = 1; }

					vaultModulesCount++;

				}

				//show modules
				$(vault_field).find('ul li').animate({

					transform: 'scale(1)',
					'opacity':1

				}, { duration: openSpaceSpeed * 1.4, easing: 'easeOutQuart', complete:  function() {

					//if the fetched count is lower than expected, stop infinite scrolling
					if(vaultModulesCount < vaultFetchModulesAmount){ return false; }
					else {

						//set the maximum scroll flag to false
						vaultMaximumScrollFlag = false;
						return false;

					}

				}});

				//initialise favorites
				initialiseFavorites();

				//initialise imports
				initialiseImports();

			}});

		});

	 }});

}

//adjust the message to go back to the main space in the vault
function adjustBackfromVaultButtonMessage(type){

	if(type == 'increment'){ newlyImportedModules++; }
	else if(type == 'decrement'){

		if(newlyImportedModules == 0){ $('[data-space="vault"] .back-to-main-button-message').removeClass('adjusted').text('Back'); return false; }

		//decrement count
		newlyImportedModules--;

	}

	if(newlyImportedModules > 0){

		$('[data-space="vault"] .back-to-main-button-message').addClass('adjusted').text('Import '+newlyImportedModules+' modules');

	}

	else {

		$('[data-space="vault"] .back-to-main-button-message').removeClass('adjusted').text('Back');

	}

}

//reset template cancas
function resetTemplate(){

	//variables
	positionEmptyStateTop = $('.editing-canvas-empty-state').css('top');

	//save template to memory
	//saveTemplateToMemory();
	setSaveActive();

	//clear template
	$('#template-editing-canvas [data-template-type="html"]').empty();

	//show empty state
	$('.editing-canvas-empty-state').show();

	$('.editing-canvas-empty-state').removeClass('loading')

	//show canvas empty state icon
	$('.editing-canvas-empty-state').css({

		'top': '50%',
		'opacity': '1'

	});

	$('#template-editing-canvas, [data-template-type="html"]').css('height','100%');

	$('#template-top-bar').hide();

	$('[data-template-type="headers"] link').remove();
	$('[data-template-type="html"]').css('padding-bottom','0');

	$('[data-title="Modules"]').trigger('mousedown');

	//close popup
	closePopup();

}

//save swatch
function saveSwatch(swatchColor){

	//variables
	swatchToken = $('[data-swatch-value]').attr('data-swatch-value');
	swatchName = $('[data-swatch-value]').text();

	if(swatchName == 'Base Colors' || swatchName == 'Template Colors'){ return false; }

	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=saveSwatch",
	    data: { swatchColor: swatchColor, swatchToken: swatchToken, swatchName: swatchName }
	}).done(function(data) {

		initialiseTooltipSwatches();

		//if maximum reached
		if(data == 'maximum_reached'){

			//notification
			notification('warning', 'Maximum swatches', 'Remove some swatches in order to add new ones', false);

			$('.blank-swatch').remove();

			$('#styles-swatches li').last().addClass('blank-swatch')

		}

	});

}

//edit swatches
function editSwatches(type){

	if(type == 'edit'){

		//hide add new color button
		$('#addNewColorButton').closest('li').hide();

		//show new text in edit button
		$('#swatches-edit-message').show().text('Cancel');
		$('#swatches-edit-button').hide();

		//add edit mode to edit button
		$('#swatches-edit-message').addClass('editSwatchesMode');
		$('#swatches-edit-message').addClass('cancelEditMode');

	}

	else if(type == 'stop'){

		//hide add new color button
		$('#addNewColorButton').closest('li').show();

		//show new text in edit button
		$('#swatches-edit-message').hide().text('Edit');
		$('#swatches-edit-button').show();

		$('.primary-number').remove();

		//add edit mode to edit button
		$('#swatches-edit-message').removeClass('editSwatchesMode');
		$('#swatches-edit-message').removeClass('editPrimaryMode');
		$('#swatches-edit-message').removeClass('cancelEditMode');
		$('#swatches-edit-message').removeClass('removeSelectedSwatches');
		$('.presentMinusToSwatch').removeClass('presentMinusToSwatch');

	}

	else if(type == 'primary'){

		//fetch primary colors
		primaryFirst = $('[data-primary-1]').attr('data-primary-1');
		primarySecond = $('[data-primary-2]').attr('data-primary-2');
		primaryThird = $('[data-primary-3]').attr('data-primary-3');

		if(primaryFirst !== undefined){ $('.styles-swatches-holder').find('[data-color="'+primaryFirst+'"]').after('<div class="primary-number font-bold active primary-set" primary-order="1">1</div>') }
		if(primarySecond !== undefined){ $('.styles-swatches-holder').find('[data-color="'+primarySecond+'"]').after('<div class="primary-number font-bold active primary-set" primary-order="2">2</div>') }
		if(primaryThird !== undefined){ $('.styles-swatches-holder').find('[data-color="'+primaryThird+'"]').after('<div class="primary-number font-bold active primary-set" primary-order="3">3</div>') }

		//hide add new color button
		$('#addNewColorButton').closest('li').hide();

		//show new text in edit button
		$('#swatches-edit-message').show().text('Cancel');
		$('#swatches-edit-button').hide();

		//add edit mode to edit button
		$('#swatches-edit-message').addClass('editPrimaryMode');
		$('#swatches-edit-message').addClass('cancelEditMode');

	}

	hideColorpicker();

}

//count selected swatches
function countSelectedSwatches() {

	//count selected swatches
	countSwatches = $('.swatch-selected').size();

	if(countSwatches == 0){

		$('#swatches-edit-message').text('Cancel');
		$('#swatches-edit-message').addClass('cancelEditMode');
		$('#swatches-edit-message').removeClass('removeSelectedSwatches');

	}

	else {

		$('#swatches-edit-message').html('Remove <span style="color: #FFF">'+countSwatches+'</span>');
		$('#swatches-edit-message').removeClass('cancelEditMode');
		$('#swatches-edit-message').addClass('removeSelectedSwatches');

	}

}

//remove swatches
function removeSwatches(){

	//variables
	var swatchesArray = [];
	var swatchToken = $('[data-swatch-value]').attr('data-swatch-value');

	//for each module present
	$('.swatch-selected [data-color]').each(function(){

		//variables
		color = $(this).attr('data-color');

		//push to array
		swatchesArray.push(color);

	});

	//remove swatches
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=removeSwatches",
	    data: { swatchesArray: swatchesArray, swatchToken: swatchToken }
	}).done(function(data) {

		if(data == 'success'){

			$('.swatch-selected').remove();

			editSwatches('stop');

		}

	});

}

//set primary number
function setPrimaryNumberToSwatch(primary_name, primary_value){

	//remove the primary order if exists
	$('[primary-order="'+primary_value+'"]').remove();

	//set the primary value
	$('.primary-number.active').text(primary_value);

	//set a class to detect it's set
	$('.primary-number.active').addClass('primary-set');

	//set the primary value to an attribute
	$('.primary-number.active').attr('primary-order',primary_value);

	//remove the dropdown click
	$('.primary-number.active').removeAttr('data-select-items','');
	$('.primary-number.active').removeAttr('data-select-name','');

	countPrimaryColors();

}

//count primary colors
function countPrimaryColors(){

	//variables
	primaryOrderCount = $('[primary-order]').size();

	if(primaryOrderCount == 0){

		$('#swatches-edit-message').html('Done');
		$('#swatches-edit-message').removeClass('cancelEditMode');
		$('#swatches-edit-message').addClass('confirmPrimaryColors');

	}

	else {

		$('#swatches-edit-message').html('Done');
		$('#swatches-edit-message').removeClass('cancelEditMode');
		$('#swatches-edit-message').addClass('confirmPrimaryColors');

	}

}

//save primary colors
function savePrimaryColors(){

	//variables
	primaryColorsArray = [];
	var swatchToken = $('[data-swatch-value]').attr('data-swatch-value');

	var firstColor = $('[primary-order="1"]').closest('li').find('[data-color]').attr('data-color');
	var secondColor = $('[primary-order="2"]').closest('li').find('[data-color]').attr('data-color');
	var thirdColor = $('[primary-order="3"]').closest('li').find('[data-color]').attr('data-color');

	primaryColorsArray.push(firstColor);
	primaryColorsArray.push(secondColor);
	primaryColorsArray.push(thirdColor);

	//set primary colors to body
	$('#styles-swatches h6 span').removeAttr('data-primary-1').removeAttr('data-primary-2').removeAttr('data-primary-3');

	//save primary to db
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=savePrimaryColors",
	    data: { primaryColorsArray: primaryColorsArray, swatchToken: swatchToken }
	}).done(function(data) {

		//set primary colors to body
		$('#styles-swatches h6 span').attr('data-primary-1', firstColor)
		$('#styles-swatches h6 span').attr('data-primary-2', secondColor)
		$('#styles-swatches h6 span').attr('data-primary-3', thirdColor)

		$('[primary-order]').remove();

		//hide add new color button
		$('#addNewColorButton').closest('li').show();

		//show new text in edit button
		$('#swatches-edit-message').hide();
		$('#swatches-edit-button').show();

		//add edit mode to edit button
		$('#swatches-edit-message').removeClass('editSwatchesMode');
		$('#swatches-edit-message').removeClass('editPrimaryMode');
		$('#swatches-edit-message').removeClass('cancelEditMode');
		$('#swatches-edit-message').removeClass('removeSelectedSwatches');
		$('#swatches-edit-message').removeClass('confirmPrimaryColors');


		if(firstColor !== undefined || secondColor !== undefined || thirdColor !== undefined){

			//show popup
			requestPopup('adapt_primary');

		}

	});

}

//adapt primary colors
function adaptPrimaryColors(type){

	//variables
	firstColor = $('[data-primary-1]').attr('data-primary-1');
	secondColor = $('[data-primary-2]').attr('data-primary-2');
	thirdColor = $('[data-primary-3]').attr('data-primary-3');

	//if type is module
	if(type == 'module'){

		adaptTarget = $('.canvas-placeholder');

	}

	//if type is template
	if(type == 'template'){

		adaptTarget = $('#template-editing-canvas');

		closePopup();

	}

	if((firstColor == undefined || secondColor == undefined || thirdColor == undefined) && type == 'module'){

		moduleBgColor = undefined;

		if($('.canvas-placeholder').prev('[data-module]').length > 0){

			//variables
			$('.canvas-placeholder').prev('[data-module]').wrap('<div class="wrap-to-find-bgcolor"></div>');
			moduleBgColor = $('.wrap-to-find-bgcolor').find('[data-bgcolor]').first().css('background-color');

			$('.wrap-to-find-bgcolor').contents().unwrap('div');

		}

		else if($('.canvas-placeholder').next('[data-module]').length > 0){

			//variables
			$('.canvas-placeholder').next('[data-module]').wrap('<div class="wrap-to-find-bgcolor"></div>');
			moduleBgColor = $('.wrap-to-find-bgcolor').find('[data-bgcolor]').first().css('background-color');

			$('.wrap-to-find-bgcolor').contents().unwrap('div');


		}

		if(moduleBgColor == undefined){

		}

		else {

			$('.canvas-placeholder').find('[data-bgcolor]').first().css('background-color', moduleBgColor)

		}

	}

	$(adaptTarget).find('[data-primary-order="1"][data-primary-type="bgcolor"]').css('background-color', firstColor);
	$(adaptTarget).find('[data-primary-order="2"][data-primary-type="bgcolor"]').css('background-color', secondColor);
	$(adaptTarget).find('[data-primary-order="3"][data-primary-type="bgcolor"]').css('background-color', thirdColor);

	$(adaptTarget).find('[data-primary-order="1"][data-primary-type="color"]').css('color', firstColor);
	$(adaptTarget).find('[data-primary-order="2"][data-primary-type="color"]').css('color', secondColor);
	$(adaptTarget).find('[data-primary-order="3"][data-primary-type="color"]').css('color', thirdColor);

}

//save image
function saveImage(){

	if(saveImageFlag){ return false; }

	if(!$('#crop-window').is(':visible')){

		cropWidth = '';
		cropHeight = '';
		cropOffsetX = '';
		cropOffsetY = '';

	}

	//set text to save image button
	$('#save-image-button').text('Uploading image..');

	//add a class of 'disabled'
	$('#save-image-button').addClass('disabled');

	//if the cropwindow is hidden, set the cropWidth parameter to nothing, so we can determine it's not set server side
	if($('#crop-window').is(':hidden')){ cropWidth = ''; }

	//if flip has not class disabled, the flip is set to true
	if($('[data-switch-name="flip"] .toggle-switch-knob').hasClass('on')){ imageFlip = 'true'; }

	//if circular has not class disabled, the flip is set to true
	if($('[data-switch-name="toggle-circular"] .toggle-switch-knob').hasClass('on')){ makeCircularBoolean = 'true'; }

	//if circular has not class disabled, the flip is set to true
	if($('[data-switch-name="optimise-retina"] .toggle-switch-knob').hasClass('on')){ optimiseRetina = 'true'; }

	//connect to functions and pass along all setting data
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=saveImage",
	    data: {
		    originalImageData: originalImageData,
		    editedImageData: editedImageData,
		    cropOffsetX: cropOffsetX,
		    cropOffsetY: cropOffsetY,
		    cropWidth: cropWidth,
		    cropHeight: cropHeight,
		    selectedImageWidth: selectedImageWidth,
		    selectedImageHeight: selectedImageHeight,
		    overlayTransparency: overlayTransparency,
		    overlayTransparencyColorRed: overlayTransparencyColorRed,
		    overlayTransparencyColorGreen: overlayTransparencyColorGreen,
		    overlayTransparencyColorBlue: overlayTransparencyColorBlue,
		    imageOpacity: imageOpacity,
		    imageFlip: imageFlip,
		    filterName: filterName,
		    originalImageSource: originalImageSource,
		    editedImageToken: editedImageToken,
		    imageIsFromDatabase: imageIsFromDatabase,
		    makeCircularBoolean: makeCircularBoolean,
		    optimiseRetina: optimiseRetina,
		    trueImgWidth: trueImgWidth,
		    trueImgHeight: trueImgHeight,
		    presentedImgHeight: presentedImgHeight,
		    presentedImgWidth: presentedImgWidth
	    }
	}).done(function(data) {

		console.log(data)


		//set text to save image button
		$('#save-image-button').text(saveImageButtonText);

		//add a class of 'disabled'
		$('#save-image-button').removeClass('disabled');

		//remove new upload flag
		$('#image-canvas-image').removeClass('new-upload');

		//open the main space
		openMainSpace();

		//if editImageFlag is set to true
		if(editImageFlag){

			//apply newly created image to selected image
			$('.selected-image').attr('src', '');

			setTimeout(function(){

				var randomToken = createToken();
				newImage = data+'?random='+randomToken;
				newImageWithoutRandom = newImage.split('?')[0];

				$('.selected-image').attr('src', newImage);

				if(altTag != ''){ $('.selected-image').attr('alt', altTag); }

				if(tdWidth == undefined || tdWidth == '0'){ $('.selected-image').css('width','').css('height',''); }
				else { $('.selected-image').css('width','').css('height','').css('max-width','100%').css('max-height','100%'); }

				$('.selected-image').closest('.ui-wrapper').find('.image-resizable-handle').remove();
				$('.selected-image').closest('.ui-wrapper').contents().unwrap();
				$('.selected-image').removeClass('ui-resizable');

				copy = $('.selected-image').closest('td').html();
				$('.selected-image').closest('td').html(copy);

				saveTemplateToMemory();

				setTimeout(function(){

					$('.selected-image').attr('src', newImageWithoutRandom);
					$('.selected-image').removeClass('selected-image');

					//hide the image tooltip
					hideImageTooltip();

				}, 50)

				editImageFlag = false;
				editBackgroundImageFlag = false;

				editedImageToken = '';

			}, 50);

		}

		else if(editBackgroundImageFlag){

			//set to none
			$('[data-edit-background-image-mark="'+backgroundMark+'"]').css('background-image','none');
			$('[data-edit-background-image-mark="'+backgroundMark+'"]').removeAttr('background');

			setTimeout(function(){

				//apply newly created image to data-edit-background-image-mark
				$('[data-edit-background-image-mark="'+backgroundMark+'"]').css('background-image','url('+data+')');
				$('[data-edit-background-image-mark="'+backgroundMark+'"]').attr('background',data);

				//remove mark
				$('[data-edit-background-image-mark]').removeAttr('data-edit-background-image-mark');

				//adapt outlook background
				adaptOutlookBackground('.selected-table', data);

				selTable = $('.selected-table')

				initialiseStyles(selTable);

				saveTemplateToMemory();

				//hide the image tooltip
				hideImageTooltip();

				editImageFlag = false;
				editBackgroundImageFlag = false;

				editedImageToken = '';

			}, globalAnimationSpeed * 4)

			//alert($('[data-edit-background-image-mark]').attr('data-edit-background-image-mark'))

		}

		setTimeout(function(){

			resetImageEditingSettings();

			imageIsFromDatabase = false;

			//set save active
			setSaveActive();

			saveTemplate();

		}, globalAnimationSpeed * 5)

	});

}

function convertImageToBase(element){

	imgWidth = $(element).prop('naturalWidth');
	imgHeight = $(element).prop('naturalHeight');

	// imgWidth = $(element).width();
	// imgHeight = $(element).height();

	var img = $(element)[0];

	// first create a canvas that is the same size as the image
	// var img = $(element)[0]; // grab the first one
	// var imgWidth = $(img).width();
	// var imgHeight = $(img).height();
	// var src = $(element).attr('src');
	//
	// $tmp = $('<div><img src="'+src+'" id="image-convert-dump"></div>');
	//
	// $('#image-convert-dump').on('load', function(){
	//
	// 	alert()
	//
	// })

	var canvas = $("<canvas>");

	// set the acutal w and h
	canvas[0].width = imgWidth;
	canvas[0].height = imgHeight;

	var ctx = canvas[0].getContext('2d');

	// dump the image into the canvas
	ctx.drawImage(img,0,0, imgWidth, imgHeight);



	if($('#image-canvas-image').attr('src').indexOf('/jpeg') >= 0 || $('#image-canvas-image').attr('src').indexOf('/jpg') >= 0 || $('#image-canvas-image').attr('src').indexOf('.jpg') >= 0 || $('#image-canvas-image').attr('src').indexOf('.jpeg') >= 0){

		var data = canvas[0].toDataURL( 'image/jpeg', 1.0 );

	}

	if($('#image-canvas-image').attr('src').indexOf('/png') >= 0 || $('#image-canvas-image').attr('src').indexOf('.png') >= 0){

		var data = canvas[0].toDataURL( 'image/png', 1.0 );

	}

	if($('#image-canvas-image').attr('src').indexOf('/gif') >= 0 || $('#image-canvas-image').attr('src').indexOf('.gif') >= 0){

		var data = canvas[0].toDataURL( 'image/gif', 1.0 );

	}

	else {

		var data = canvas[0].toDataURL( 'image/png', 1.0 );

	}

	$(element).attr('src', data);

}

//preview image in canvas before uploading
function previewImageToCanvas(input){

	//initialise new FileReader
	var reader = new FileReader();
	imageFilter = false;

	//read the data as base64
	reader.readAsDataURL(input.files[0]);

	if(editBackgroundImageFlag){

		//variables
		backgroundMark = createToken();
		attr_name = $('.background-images-button.active').closest('li').find('span').attr('data-attr-name');

		selected_img_w = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').width();
		selected_img_h = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').height();

		//remove all marks
		$('[data-edit-background-image-mark]').removeAttr('data-edit-background-image-mark');

		//set a mark
		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').attr('data-edit-background-image-mark',backgroundMark)

	}

	//when loaded
	reader.onload = function (e) {

		var image = new Image();

		image.src = reader.result;

		image.onload = function() {

			//reset crop window
			resetCropWindow(selected_img_w, selected_img_h);

			//set the position of the crop to left, top 0
			$('#crop-window').css({'left': 0, 'top': 0 });

			//swap existing image with new one
			$('#image-canvas-image').attr('src', e.target.result);

			//set a flag to the image that it is a freshly uploaded image
			$('#image-canvas-image').addClass('new-upload');

			//variables
			imgWidth = image.width;
			imgHeight = image.height;

			if(selected_img_w > imgWidth || selected_img_h > imgHeight){  hideCropTool(); }
			else {

				showCropTool();

			}

			//save the original image data
			originalImageData = $('#image-canvas-image').attr('src');

			//reset edit parameters
			originalImageSource = '';
			editedImageToken = '';

			//if image has a filter set, apply filter
			if($('#image-canvas-image').attr('data-filter')){ $('.filter').filterMe(); }

			//remove the filter attached to it
			//$('#image-canvas-image').removeAttr('data-filter');

			//reset image editing settings
			//resetImageEditingSettings();

			$('#upload-image-to-canvas').val('');

			//show the editing canvas
			showEditingCanvas();

			imageIsFromDatabase = false;

			setTimeout(function(){

				//detect available image settings
				detectAvailableImageSettings();

			}, 500)

		};

	}

}

//apply filter to image
function applyFilterToImage(filter_value){

	//apply   data
	$('#image-canvas-image').attr('src', originalImageData);

	if(filter_value == 'No Filter'){

		$('.filter').attr('data-filter','No Filter');
		return false;

	}

	//apply attr to image-canvas-image
	$('.filter').removeAttr('data-filter');
	$('.filter').attr('data-filter',filter_value);

	//apply filter
	$('.filter').filterMe();

}

//nudge crop window
function nudgeCropwWindow(direction){

	//clear grid timeout
	clearTimeout(gridTimeout);

	//variables
	cropWidth = $('#crop-window').outerWidth();
	cropHeight = $('#crop-window').outerHeight();
	cropOffset = $('#crop-window').position();
	imageWidth = $('#image-canvas-image').width();
	imageHeight = $('#image-canvas-image').height();

	//if the direction is right
	if(direction == 'right'){ if((cropWidth + cropOffset.left) < imageWidth){ $('#crop-window').css('left',(cropOffset.left+1)+'px') } }

	//if the direction is left
	if(direction == 'left'){ if(cropOffset.left > 0){ $('#crop-window').css('left',(cropOffset.left-1)+'px') } }

	//if the direction is up
	if(direction == 'up'){ if(cropOffset.top > 0){ $('#crop-window').css('top',(cropOffset.top-1)+'px') } }

	//if the direction is down
	if(direction == 'down'){ if((cropHeight + cropOffset.top) < imageHeight){ $('#crop-window').css('top',(cropOffset.top+1)+'px') } }

	//show the grid
	$('.grid-line').fadeIn(globalAnimationSpeed);

	gridTimeout = setTimeout(function(){

		//hide the grid
		$('.grid-line').fadeOut(globalAnimationSpeed);

	}, gridTimeoutDelay)

}

//initialise image
function initialiseImageToCanvas(){

	resetImageEditingSettings();

	if(editImageFlag){

		var src = $('.selected-image').attr('src');
		var imgAlt = $('.selected-image').attr('alt');

		$('#html-dump').html('<img src="'+src+'">');

		// setTimeout(function(){
		//
		// 	selected_img_w = $('#html-dump').find('img').width();
		// 	selected_img_h = $('#html-dump').find('img').height();
		//
		// }, 1000)

	}

	else if(editBackgroundImageFlag){

		//variables
		attr_name = $('.background-images-button.active').closest('li').find('span').attr('data-attr-name');
		src = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css('background-image');
		src = src.replace(/url\(/g,'').replace(/\)/g,'').replace(/\"/g,'');

		$('#html-dump').html('<img src="'+src+'">');

		// setTimeout(function(){
		//
		// 	selected_img_w = $('#html-dump').find('img').width();
		// 	selected_img_h = $('#html-dump').find('img').height();
		//
		// }, 1000)

	}

	//detect if the image has been uploaded and edited with StampReady
	if(src.indexOf('image_uploads/edited/') >= 0){

		//variables
		var fileNameIndex = src.lastIndexOf("/") + 1;
		var filename = src.substr(fileNameIndex);
		var token = filename.substring(0, filename.indexOf('.'));

		//reset the crop window, because it may take a little while to load the original image and settings
		resetCropWindow(selected_img_w, selected_img_h);

		//show the editing canvas
		showEditingCanvas();

		//load corresponding image
		$.ajax({
		    type: "POST",
		    dataType: 'json',
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=loadImage",
		    data: { token: token }
		}).done(function(data) {


			//set image loaded to false
			imageLoaded = false;

			//parse as json
			obj = JSON.parse(data);

			//save the original image source in a variable
			originalImageSource = obj['source'].replace("../", "");
			editedImageToken = token;

			//reset crop window
			resetCropWindow(selected_img_w, selected_img_h);

			//add a class of 'edited'
			$('#image-canvas-image').addClass('edited-image');

			originalImageSource = originalImageSource.replace('../','');

			if(originalImageSource.indexOf('editor-3-5') >= 0){

			}

			else {

				originalImageSource = 'editor-3-5/' + originalImageSource;

			}

			//set original source as image
			$('#image-canvas-image').attr('src','http://www.stampready.net/dashboard/'+originalImageSource);

			//if optimise retina is true, activate switch and show
			if(obj['optimiseRetina'] == 'true'){ activateSwitch('optimise-retina'); }

			//if flip is set to true, flip the image
			if(obj['flip'] == 'true'){

				//activate flip
				activateSwitch('flip');

				//set the image-canvas-image wrapper to flipped
				$('.image-transparent-background').addClass('flipped');

			}

			//if circular is set to true, activate switch
			if(obj['circular'] == 'true'){

				//activate switch
				activateSwitch('toggle-circular');

				$('#crop-window').css('border-radius','100%');

			}

			//if overlaytransparency is under 100%
			if(obj['overlayTransparency'] < 100){

				//create an rgba string
				rgbString = 'rgb('+obj["overlayTransparencyColorRed"]+', '+obj["overlayTransparencyColorGreen"]+', '+obj["overlayTransparencyColorBlue"]+')';

				//convert to HEX (better readable for the customer)
				rgbString = rgbToHex(rgbString);

				//set the overlay color input
				$('[data-name="overlay-color"]').val(rgbString);

				$('[data-name="overlay-color"]').css('background-color', rgbString);

				//set the opacity to the overlay
				$('[data-name="image-overlay-opacity"]').val(100 - obj['overlayTransparency']);

				//set the slider output number
				$('[data-name="image-overlay-opacity"]').prev('.slider-output').val(100 - obj['overlayTransparency']+'%');

				//set opacity and color to overlay
				$('#image-overlay-layer').css({
					'background-color': rgbString,
					'opacity': (100 - obj['overlayTransparency']) / 100
				});

			}

			//if opacity is more than zero
			if(obj['imageOpacity'] > 0){

				//set the value
				$('[data-name="image-opacity"]').val(100 - (obj['imageOpacity'] * 100));

				//set the slider output number
				$('[data-name="image-opacity"]').prev('.slider-output').val(100 - (obj['imageOpacity']) * 100+'%');

				//set the canvas image opacity
				$('#image-canvas-image').css({
					'opacity': 1 - obj['imageOpacity'],
				});

			}

			if(imgAlt != '' && imgAlt != undefined){

				$('.alternate-tags-textarea').attr('placeholder','');
				$('.alternate-tags-textarea').val(imgAlt);

			}

			//if the selected image is bigger
			if((obj['cropWidth'] > selected_img_w && obj['cropHeight'] > selected_img_h) || obj['cropWidth'] == ''){

				hideSwitch('crop-tool');

			}

			else {

				activateSwitch('crop-tool');

			}

			//if background image
			if(editBackgroundImageFlag){

				//if selected_img_w is the same as selected_image_h,
				if(selected_img_w != selected_img_h){

					//show circular switch
					hideSwitch('toggle-circular');

				}

				// $('#crop-window').css({
				// 	'left': '0px',
				// 	'top': '0px',
				// 	'display': 'block'
				// });

				if(obj['cropOffsetX'] != '' && obj['cropWidth'] != ''){

					//set the crop window to the exact format and position as before
					$('#crop-window').css({
						'left': obj['cropOffsetX']+'px',
						'top': obj['cropOffsetY']+'px',
						'width': obj['cropWidth']+'px',
						'height': obj['cropHeight']+'px',
						'display': 'block'
					});

				}

			}

			else {

				if(obj['cropOffsetX'] != '' && obj['cropWidth'] != ''){

					//set the crop window to the exact format and position as before
					$('#crop-window').css({
						'left': obj['cropOffsetX']+'px',
						'top': obj['cropOffsetY']+'px',
						'width': obj['cropWidth']+'px',
						'height': obj['cropHeight']+'px',
						'display': 'block'
					});

				}

				activateSwitch('crop-tool');

			}

			//when the image has been loaded
			$('.image-transparent-background .edited-image').on('load', function(){

				//if image has been loaded before, return false
				if(imageLoaded){ return false; }

				imageLoaded = true;

				setTimeout(function(){

					//variables
					editedImageHeight = $('.image-transparent-background').height();
					windowHeight = $(window).height();

					if(editedImageHeight > windowHeight){

						newWidth = editedImageHeight - windowHeight;
						extraPadding = 20;

						$('.image-transparent-background').animate({'transform':'scale(0.8)'}, globalAnimationSpeed);

					}

					//convert image to base64
					convertImageToBase('.edited-image');

					originalImageData = $('#image-canvas-image').attr('src');

					//if filter name is zero, remove the filter attribute from the image canvas
					if(obj['filterName'] == null){

						//remove the filter attribute
						$('#image-canvas-image').removeAttr('data-filter');

					}

					else {

						//add the filter attribute to the image canvas image
						$('#image-canvas-image').attr('data-filter',obj['filterName']);

						//set as text in filter dropdown
						$('[data-select-name="image-filters"]').text(obj['filterName'])

						//apply filter
						$('.filter').filterMe();

					}

					//detectAvailableImageSettings();

				}, openSpaceSpeed * 4.5);

			});


		});


	}

}

//initialise image tooltip
function showImageTooltip(){

	hideTooltip();

	//variables
	marginTopTooltip = 50;
	currentUrl = $('.selected-image').parent('a').attr('href');
	if(currentUrl == undefined){ currentUrl = ''; }

	if($('#image-tooltip').is(':visible')){

		$('#image-tooltip').css({
			'transition': 'all 0.2s ease',
			'-webkit-transition': 'all 0.2s ease',
			'-moz-transition': 'all 0.2s ease'
		})

	}

	//reset the margin-top of tooltip
	$('#image-tooltip').css({
		'display': 'block',
		'margin-top': '-'+marginTopTooltip+'px',
		transform: 'scale(0.9)'
	});

	$('#image-tooltip').css('margin-top','-50px')

	//always reset the button to show
	$('#image-commands li').show();

	//detect if the image has been uploaded and edited with StampReady
	if($('.selected-image').attr('src').indexOf('image_uploads/edited/') <= 0){ $('.image-tooltip-command-edit').hide(); }

	//variables
	imageOffset = $('.selected-image').offset();
	canvasOffset = $('#canvas').offset();
	imageTooltipMarginTop = '-'+(marginTopTooltip + 10)+'px';
	imageTooltipWidth = $('#image-tooltip').width();
	imageWidth = $('.selected-image').width();
	currentScrollbarPosition = $('#canvas').scrollTop();
	imageWrappedLink = $('.selected-image').parent('a').attr('href');

	$('#change-image-link-input-field').val(imageWrappedLink);

	if(imageWrappedLink == '' || imageWrappedLink == undefined){ $('#change-image-link-input-field').attr('placeholder','http://') }
	else { $('#change-image-link-input-field').attr('placeholder','') }

	//position image tooltip
	$('#image-tooltip').css({
		'left': Math.ceil((imageOffset.left-canvasOffset.left+(imageWidth/2)-(imageTooltipWidth/2)))+'px',
		'top': imageOffset.top+currentScrollbarPosition+'px'
	});

	setTimeout(function(){

		if($('#change-image-link-input-field').is(':visible')){

			setTimeout(function(){

				$('#change-image-link-input-field').focus();

			}, 10)

		}

		$('#image-tooltip').css({
			'transition': 'all 0.2s ease',
			'-webkit-transition': 'all 0.2s ease',
			'-moz-transition': 'all 0.2s ease'
		})

		$('#image-tooltip').css({

			transform: 'scale(1)',
			'margin-top': imageTooltipMarginTop

		}, globalAnimationSpeed, function() {

		});

		$('#image-tooltip').addClass('active');

		//if image top is close to top of the screen, adjust the scrollbar a little
		if(imageOffset.top < 70){

			$('#canvas').animate({ scrollTop: currentScrollbarPosition+(imageOffset.top-80) }, globalAnimationSpeed * 1.2);

		}

		clearSelection();

	}, 10)

}

//hide image tooltip
function hideImageTooltip(){

	$('#image-tooltip').css({
		'transition': 'none',
		'-webkit-transition': 'none',
		'-moz-transition': 'none'
	})

	$('.selected-image').removeClass('selected-image')

	$('#image-tooltip').css({
		'display': 'none',
		'margin-top': '-50px',
		transform: 'scale(0.9)'
	});

	$('.create-edit-link-button').css('width','0');

	$('#change-image-link-input-field').hide().css('margin-top','-10px').css('opacity','0');

	$('#image-commands').show().css('margin-top','0px').css('opacity','1');

	$('#image-tooltip').css('width','');

}

//hide image
function hideImage(){

	$('.selected-image').animate({
		'transform': 'scale(0.9)',
		'opacity': '0'
	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeInBack', "queue": false, complete:  function() {

		$(this).remove();

	}});

	//$('.selected-image').remove();

	hideImageTooltip();

	saveTemplateToMemory();

	setSaveActive();

}

//detect available image settings
function detectAvailableImageSettings(){


		//variables
		imgWidth = $('#image-canvas-image').width();
		imgHeight = $('#image-canvas-image').height();

		//variables
		editedImageHeight = $('.image-transparent-background').height();
		windowHeight = $(window).height();

		if(editedImageHeight > windowHeight){

			newWidth = editedImageHeight - windowHeight;
			extraPadding = 20;

			$('.image-transparent-background').animate({'transform':'scale(0.8)'}, globalAnimationSpeed);

		}

		if(editBackgroundImageFlag){

			attr_name = $('.background-images-button.active').closest('li').find('span').attr('data-attr-name');

		}

		//if the selected image is bigger
		if(imgWidth > selected_img_w && imgHeight > selected_img_h){

			//if crop flag is set to true
			if(cropFlag){

				//reset the crop window
				resetCropWindow(selected_img_w, selected_img_h);

				//show crop
				$('#crop-window').show();

				//show switch
				activateSwitch('crop-tool');

			}

			//show switch
			showSwitch('crop-tool');

		}

		//if the selected image is smaller
		else {

			//hide crop tool switch, no use
			disableSwitch('crop-tool');
			hideSwitch('crop-tool');
			hideCropTool();

			//hide circular switch, as the crop tool is removed as well
			disableSwitch('toggle-circular');
			hideSwitch('toggle-circular');
			undoCircular();


		}

		if(selected_img_w == selected_img_h){

			//show switch
			showSwitch('toggle-circular');

		}

		else {

			//show switch
			hideSwitch('toggle-circular');

		}

		//switch to image settings
		switchTab('[data-tab="image-settings"]');
		switchImageNavigation('[data-tab="image-settings"]');

		//if available for retina
		if((selected_img_w * 2) > imgWidth || (selected_img_h * 2) > imgHeight){

			//not compatible for retina. hide the switch
			hideSwitch('optimise-retina')

		}

		//compatible for retina, show it.
		else {

			//show the switch
			showSwitch('optimise-retina')

		}

		//disable the switch
		disableSwitch('optimise-retina');


}

//show image overlay color picker
function showImageOverlayColorpicker(){

	//animate the colorpicker
	$('#image-editing-canvas-colorpicker').slideDown(globalAnimationSpeed * 2, "easeOutBack");

	$('#image-editing-canvas-colorpicker').animate({

		'opacity': 1,
		transform: 'scale(1)'

	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeOutBack', "queue": false, complete:  function() {

	}});



	//$('#image-editing-canvas-colorpicker').show();

}

//hide image overlay color picker
function hideImageOverlayColorpicker(){

	$('#image-editing-canvas-colorpicker').slideUp(globalAnimationSpeed * 2, "easeInBack");

	$('#image-editing-canvas-colorpicker').animate({

		'opacity': 0,
		transform: 'scale(0.8)'

	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeInBack', "queue": false, complete:  function() {


	}});

}

//show editing canvas
function showEditingCanvas(){

	$('[data-space="image-editor-canvas"]').animate({
		'padding':'0px'
	}, globalAnimationSpeed);

	$('[data-space="image-editor-canvas"] .space-top-bar').animate({
		'margin-top':'-51px'
	}, { duration: globalAnimationSpeed, "queue": false, complete:  function() {

		$('[data-space="image-editor-canvas"] .space-top-bar').hide();

		$('#image-canvas, #image-canvas-sidebar').fadeIn(globalAnimationSpeed)

		$('[data-space="image-editor-canvas"]').animate({
			'padding-left':'250px'
		}, { duration: globalAnimationSpeed * 1.6, easing: 'easeOutQuart', "queue": false, complete:  function() {


		}});

		$('#image-canvas-sidebar').animate({
			transform: 'translate(0, 0)',
		}, { duration: globalAnimationSpeed * 1.6, easing: 'easeOutQuart', "queue": false, complete:  function() {


		}});

	}});

	$('#image-database-canvas').fadeOut(globalAnimationSpeed);

}

//hide editing canvas
function hideEditingCanvas(){

	$('#image-canvas-sidebar').animate({
		transform: 'translate(-250px, 0)',
	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeInQuart', "queue": false, complete:  function() {


	}});

	$('[data-space="image-editor-canvas"]').animate({
		'padding-left':'0'
	}, { duration: globalAnimationSpeed * 1.6, easing: 'easeInQuart', "queue": false, complete:  function() {

		$('#image-canvas, #image-canvas-sidebar').fadeOut(globalAnimationSpeed);

		$('[data-space="image-editor-canvas"] .space-top-bar').show();

		$('[data-space="image-editor-canvas"] .space-top-bar').animate({
			'margin-top':'0px'
		}, { duration: globalAnimationSpeed, "queue": false, complete:  function() {

		}});

		$('[data-space="image-editor-canvas"]').animate({
			'padding':'65px 0 0 0px;'
		}, globalAnimationSpeed);

		$('#image-database-canvas').fadeIn(globalAnimationSpeed);

	}});

}

//set the selected image from the databse to the editing canvas
function setImageFromDatabaseToEditingCanvas(event){

	//variables
	databaseImageSource = $(event).attr('src').replace("thumbnail", "original");


	originalImageSource = databaseImageSource;

	$('#image-canvas-image').attr('src',databaseImageSource).attr('onload','el = $(this); setTimeout(function(){ convertImageToBase(el); originalImageData = $("#image-canvas-image").attr("src"); $(el).removeAttr("onload"); detectAvailableImageSettings();}, 500);');

	$('[data-select-name="image-filters"]').text('No Filter');

	$('#crop-window').css({'left':'0','top':'0'});

	imageIsFromDatabase = true;

	$('[data-space="image-editor-canvas"] #image-canvas-sidebar-top-section .back-to-main-button-message').addClass('back-to-gallery').text('Back to gallery');

}

//detect image database scroll
function detectImageDatabaseScroll(){

	//variables
	windowHeight = $(window).height();
	vaultHeight = $('#image-database-canvas')[0].scrollHeight;
	spaceTopBarHeight = parseInt($('[data-space="image-editor-canvas"] .space-top-bar').height())+1;
	scrollbarPosition = $('#image-database-canvas').scrollTop();

	if((windowHeight+scrollbarPosition) >= ((vaultHeight+spaceTopBarHeight)-scrollMaximumreachedThreshold)){

		imageDatabaseMaximumScrollFlag = true;

		loadNextBadgeImages();

	}

}

//load next badge images
function loadNextBadgeImages(){

	if(finishImageDatabase){ return false; }

	//increment the faultFetchPage variables
	imageDatabaseFetchCount++;
	imageDatabaseModulesCount = 0;

	//inject animation
	$('.image-database-images').append('<div class="vault-load-badge-animation"><div class="loader-animation"></div></div>');

	//anbimate it
	$('.image-database-images').animate({
		'transform': 'translate(0px, -40px)'
	}, { duration: globalAnimationSpeed * 1.7, easing: 'easeOutBack', complete:  function() {

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchImageDatabaseImages",
		    data: { image_filter_type: image_filter_type, image_filter_category: image_filter_category, image_filter_sorting: image_filter_sorting, image_filter_favorite: image_filter_favorite, fetch_offset: imageDatabaseFetchCount, imageDatabaseTokensArray: imageDatabaseTokensArray, image_fetching_mode: image_fetching_mode }
		}).done(function(data) {

			if(data == ''){

				$('.image-database-images').animate({
					'transform': 'translate(0px, 0px)'
				}, { duration: globalAnimationSpeed * 1.7, easing: 'easeInBack', complete:  function() {

					//remove animation
					$('.vault-load-badge-animation').remove();

				}});

				finishImageDatabase = true;
				return false;

			}

			//variables
			var ul_identifier = 1;
			var data = data.split(']');

			image_gallery_columns_width = 100 / image_gallery_columns;

			//for each module
			for (i = 0; i < (data.length - 1); i++){

				if(image_fetching_mode == 'uploads'){

					//variables
					string = data[i].split('[')[1].split(']')[0];
					token = string.substring(string.lastIndexOf("token=")+6,string.lastIndexOf("P1"));
					extension = string.substring(string.lastIndexOf("extension=")+10,string.lastIndexOf("P2"));
					date = string.substring(string.lastIndexOf("date=")+5,string.lastIndexOf("P3"));

					$('[data-space].active').find('ul[data-vault-column="'+ul_identifier+'"]').append('<li data-vault-module-identifier="'+token+'"><img src="'+prefixImageUpload+'/'+date+'/'+token+'.'+extension+'"></li>');

				}

				else {

					//variables
					string = data[i].split('[')[1].split(']')[0];
					token = string.substring(string.lastIndexOf("token=")+6,string.lastIndexOf("P1"));
					type = string.substring(string.lastIndexOf("type=")+5,string.lastIndexOf("P2"));
					category = string.substring(string.lastIndexOf("category=")+9,string.lastIndexOf("P3"));
					extension = string.substring(string.lastIndexOf("extension=")+10,string.lastIndexOf("P4"));
					tags = string.substring(string.lastIndexOf("tags=")+5,string.lastIndexOf("P5"));
					year = string.substring(string.lastIndexOf("year=")+5,string.lastIndexOf("P6"));
					month = string.substring(string.lastIndexOf("month=")+6,string.lastIndexOf("P7"));
					favorited = string.substring(string.lastIndexOf("favorited=")+10,string.lastIndexOf("P8"));

					$('[data-space].active').find('ul[data-vault-column="'+ul_identifier+'"]').append('<li data-vault-module-identifier="'+token+'"><img src="gallery/'+type+'/'+year+'/'+month+'/'+token+'.'+extension+'"></li>');

				}

				//increase identifier
				ul_identifier++;

				//if identifier is 4, return to 1
				if(ul_identifier == image_gallery_columns+1){ ul_identifier = 1; }

			}

			//show modules
			$(vault_field).find('ul li').animate({

				transform: 'scale(1)',
				'opacity':1

			}, { duration: openSpaceSpeed * 1.4, easing: 'easeOutQuart', complete:  function() {

			}});

			//set the maximum scroll flag to false
			imageDatabaseMaximumScrollFlag = false;

			//set initialise vault flag to true, so it won't auto load again
			initialiseImageDatabaseFlag = true;

		});

		$('.image-database-images').animate({
			'transform': 'translate(0px, 0px)'
		}, { duration: globalAnimationSpeed * 1.7, easing: 'easeInBack', complete:  function() {

			//remove animation
			$('.vault-load-badge-animation').remove();

		}});

	}});

}

//initialise vault
function initialiseImageDatabase(){

	finishImageDatabase = false;

	//variables
	vault_field = $('.image-database-images');
	column_width = 100 / vaultColumns;

	//show loader
	$('.filter-loader').fadeIn(globalAnimationSpeed);

	//empty everything
	$(vault_field).find('ul li').animate({

		transform: 'scale(0.95)',
		'opacity':0

	}, { duration: openSpaceSpeed * 1.4, easing: 'easeInQuart', complete:  function() {

		$(vault_field).find('ul li').remove();

	}});

	//hide preview html wrapper
	//hideVaultModuleHtml();
	//hideVaultEmptyState();

	//set the maximum scroll flag to false
	imageDatabaseMaximumScrollFlag = true;

	setTimeout(function(){

		//retrieve filter settings
		image_filter_type = '';
		image_filter_category = '';
		image_filter_favorite = '';
		image_filter_sorting = '';
		image_fetching_mode = $('[data-space="image-editor-canvas"] .label-switch [data-rate].active').text();
		image_presentation_mode = 'images';

		if($('[data-tab-filter="icon"]').hasClass('active')){

			image_presentation_mode = 'icons';
			image_gallery_columns = image_gallery_columns_icons;


			$('[data-space].active .database-source-canvas-wrapper').removeClass('imageMode').addClass('iconMode');
		}

		else {

			image_gallery_columns = image_gallery_columns_images;
			$('[data-space].active .database-source-canvas-wrapper').removeClass('iconMode').addClass('imageMode');

		}

		//each filter type
		$('[data-space].active [data-filter-group="type"]').find('.active').each(function(){ image_filter_type = image_filter_type + '['+$(this).attr('data-tab-filter')+']'; });

		//each filter section
		$('[data-space].active [data-filter-group="category"] li').each(function(){ image_filter_category = '['+$(this).text().toLowerCase()+']'; });

		//each filter section
		$('[data-space].active [data-filter-group="sorting"] li').each(function(){ image_filter_sorting = $(this).text().toLowerCase(); });

		//if favorite button is active
		if($('[data-space].active .favorite-filter').hasClass('active')){ image_filter_favorite = $('body').attr('data-vault-favorite-string'); }

		//if category is all
		if(image_filter_category == '[all]'){ image_filter_category= ''; }

		//set the vaultFetchCount to 1
		imageDatabaseFetchCount = 0;

		$('.database-source-canvas-wrapper').empty();

		//create the uls
		for (i = 1; i < (image_gallery_columns+1); i++){

			$('.database-source-canvas-wrapper').append('<ul data-vault-column="'+i+'"></ul>')

		}

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchImageDatabaseImages",
		    data: { image_filter_type: image_filter_type, image_filter_category: image_filter_category, image_filter_sorting: image_filter_sorting, image_filter_favorite: image_filter_favorite, fetch_offset: imageDatabaseFetchCount, image_fetching_mode: image_fetching_mode }
		}).done(function(data) {

			//hide loader
			$('.filter-loader').fadeOut(globalAnimationSpeed);

			if(!data){ showImageEditorEmptyState(); return false; }
			else { hideImageEditorEmptyState(); }

			//variables
			var ul_identifier = 1;
			var data = data.split(']');

			image_gallery_columns_width = 100 / image_gallery_columns;

			//for each module
			for (i = 0; i < (data.length - 1); i++){

				if(image_fetching_mode == 'uploads'){

					//variables
					string = data[i].split('[')[1].split(']')[0];
					token = string.substring(string.lastIndexOf("token=")+6,string.lastIndexOf("P1"));
					extension = string.substring(string.lastIndexOf("extension=")+10,string.lastIndexOf("P2"));
					date = string.substring(string.lastIndexOf("date=")+5,string.lastIndexOf("P3"));

					$('[data-space].active').find('ul[data-vault-column="'+ul_identifier+'"]').css('width',image_gallery_columns_width+'%').append('<li data-vault-module-identifier="'+token+'"><img src="'+prefixImageUpload+'/'+date+'/'+token+'.'+extension+'"><div class="remove-uploaded-image font-bold">Remove</div></li>');

				}

				else {

					//variables
					string = data[i].split('[')[1].split(']')[0];
					token = string.substring(string.lastIndexOf("token=")+6,string.lastIndexOf("P1"));
					type = string.substring(string.lastIndexOf("type=")+5,string.lastIndexOf("P2"));
					category = string.substring(string.lastIndexOf("category=")+9,string.lastIndexOf("P3"));
					extension = string.substring(string.lastIndexOf("extension=")+10,string.lastIndexOf("P4"));
					tags = string.substring(string.lastIndexOf("tags=")+5,string.lastIndexOf("P5"));
					year = string.substring(string.lastIndexOf("year=")+5,string.lastIndexOf("P6"));
					month = string.substring(string.lastIndexOf("month=")+6,string.lastIndexOf("P7"));
					favorited = string.substring(string.lastIndexOf("favorited=")+10,string.lastIndexOf("P8"));

					$('[data-space].active').find('ul[data-vault-column="'+ul_identifier+'"]').css('width',image_gallery_columns_width+'%').append('<li data-vault-module-identifier="'+token+'"><img src="gallery/'+type+'/'+year+'/'+month+'/'+token+'.'+extension+'"></li>');

				}

				//increase identifier
				ul_identifier++;

				//if identifier is 4, return to 1
				if(ul_identifier == image_gallery_columns+1){ ul_identifier = 1; }

			}

			if(image_presentation_mode == 'icons'){

				// $('[data-vault-module-identifier] img').each(function(){
				//
				// 	if($(this).hasClass('.icon-light') || $(this).hasClass('.icon-dark')){ return false; }
				//
				// 	var image = $(this);
				// 	setImageBrightness(image);
				//
				// })

			}

			//show modules
			$(vault_field).find('ul li').animate({

				transform: 'scale(1)',
				'opacity':1

			}, { duration: openSpaceSpeed * 1.4, easing: 'easeOutQuart', complete:  function() {

			}});

			//set the maximum scroll flag to false
			imageDatabaseMaximumScrollFlag = false;

			//set initialise vault flag to true, so it won't auto load again
			initialiseImageDatabaseFlag = true;


		});

	}, openSpaceSpeed * 2.1)

}

//detect if the crop tool is near center
function detectCropCenter() {

	//variables
	imageCanvasImageWidth = $('#image-canvas-image').width();
	imageCanvasImageHeight = $('#image-canvas-image').height();
	cropWindowWidth = $('#crop-window').width();
	cropWindowHeight = $('#crop-window').height();
	cropWindowPosition = $('#crop-window').position();
	threshold = 50; //determine how loose the center detection should be

	if(cropWindowPosition.left > (imageCanvasImageWidth / 2 - threshold - (cropWindowWidth / 2)) && cropWindowPosition.left < (imageCanvasImageWidth / 2 + threshold - (cropWindowWidth / 2)) && cropWindowPosition.top > (imageCanvasImageHeight / 2 - threshold - (cropWindowHeight / 2)) && cropWindowPosition.top < (imageCanvasImageHeight / 2 + threshold - (cropWindowHeight / 2))){

		if ($('.center-crop-window').length < 1) {

			$('#crop-window').append('<div class="center-crop-window bounce"><div class="center-crop-window-vertical"></div><div class="center-crop-window-horizontal"></div></div>');

		}

	}

	else {

		$('.center-crop-window').remove();

	}

}

//center crop window
function centerCropWindow(){

	//variables
	imageCanvasImageWidth = $('#image-canvas-image').width();
	imageCanvasImageHeight = $('#image-canvas-image').height();
	cropWindowWidth = $('#crop-window').width();
	cropWindowHeight = $('#crop-window').height();

	$('#crop-window').animate({
		'left': (imageCanvasImageWidth/2)-(cropWindowWidth/2)+'px',
		'top': (imageCanvasImageHeight/2)-(cropWindowHeight/2)+'px'
	}, globalAnimationSpeed);

	$('.center-crop-window').remove();

}

//send campaign
function openSendCampaignPopup() {

	if(!detectLockedFeatures()){ requestPopup('unpaid'); return false; }

	//reset campaign optimizer
	resetCampaignOptimizer();

	 $('body:first-of-type, html:first-of-type').css('overflow', 'hidden').addClass('extraStylingForPopup');

	//append overlay
	$('body').prepend('<div id="popupOverlay"></div>');

	//show campaign optimizer
	$('#send-campaign-popup').show();

	//if the save button is still active
	if($('#save-template-button-wrapper').hasClass('active')){

		$('#send-button').val('Save & Send');

	}

	else {

		$('#send-button').val('Go to send page');

	}

	//show overlay and its contents
	setTimeout(function() {

		$('#popupOverlay').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		});

		$('#send-campaign-popup').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(1) translateY(-50%)'
		});

		$('.space.active').css({
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(0.9)'
		});

		setTimeout(function(){

			startScanning();

		}, 500)

	}, 50);

	//$('#send-campaign-popup').show();

	//if the save button is still active
	// if($('#save-template-button-wrapper').hasClass('active')){
	//
	// 	//request save popup
	// 	requestPopup('confirm-save');
	//
	// }
	//
	// else {
	//
	// 	continueToSend();
	//
	// }

}

//send campaign
function sendCampaign(){

	//if the save button is still active
	if($('#save-template-button-wrapper').hasClass('active')){

		continueToSendFlag = true;

		saveTemplate();

	}

	else {

		continueToSend();

	}

}

//continue to send page
function continueToSend(){

	if(mode == 'vault'){ mode = 1; }
	else{ mode = 0; }

	 $(location).attr('href','https://www.stampready.net/dashboard/send/?campaign_id='+campaign_id+'&mode='+mode)

}

//detect marketplace for demo creation
function detectMarketPlace(event){

	//variables
	checkoutLink = $(event).val();

	//if link contains a particular marketplace name
	if(checkoutLink.indexOf('themeforest') >= 0){ marketplaceName = 'Themeforest'; }
	else if(checkoutLink.indexOf('creativemarket') >= 0){ marketplaceName = 'Creative Market'; }

	//if not, remove any marketplace headers
	else {

		//remove the corresponding class/attr
		$('#create-preview-header').removeAttr('data-marketplace');

		//hide current header
		$('.create-preview-header-marketplace-headline').fadeOut(globalAnimationSpeed, function(){

			$('.create-preview-header-headline').fadeIn(globalAnimationSpeed)

		});

		return false;

	}

	//set corresponding marketplace banner
	$('#create-preview-header').attr('data-marketplace',marketplaceName);

	//hide current header
	$('.create-preview-header-headline').fadeOut(globalAnimationSpeed, function(){

		$('.create-preview-header-marketplace-headline').text(marketplaceName).fadeIn(globalAnimationSpeed)

	});

}

//check create preview settings
function checkCreatePreviewSettings(){

	//variables
	createPreviewTemplateName = $('.create-preview-template-name').val();
	createPreviewPrice = $('.preview-price-field').val();
	createPreviewCheckoutLink = $('.create-preview-checkout-link').val();

	if(createPreviewTemplateName !== ''){

		$('#create-preview-confirm-button').removeClass('disabled');

	}

	else {

		$('#create-preview-confirm-button').addClass('disabled');

	}

}

//create live preview
function createLivePreview(){

	//variables
	createPopupHeight = $('#create-preview-popup').height();
	templateName = $('#tf_temp_name').val();
	templateCurrency = $('.preview-currency').val();
	templatePrice = $('#tf_temp_price').val();
	templateCheckoutLink = $('#tf_temp_checkout').val();
	hideLivePreview = false;

	if ($('[data-switch-name="hide_demo"] .toggle-switch-knob.on').length > 0) {

		hideLivePreview = true;

	}

	if(templateName == ''){ notification('warning','Invalid Name','Please, check out the details', false); return false; }

	//ajax connection to image converting
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: 'http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=createLivePreview&templateName='+templateName+'&templateCurrency='+templateCurrency+'&templatePrice='+templatePrice+'&templateCheckoutLink='+templateCheckoutLink+'&hideLivePreview='+hideLivePreview+'&campaign_id='+campaign_id,
	    data: { }
	}).done(function(data) {

		$('.live-preview-link').val('http://www.stampready.net/dashboard/editor-3-5/index.php?demo='+data)

		//set height to popup
		$('#create-preview-popup').css('height', createPopupHeight+'px');

		//animation first
		$('#create-preview-form').fadeOut(globalAnimationSpeed, function(){

			$('#create-preview-confirm-button, #change_info_tf_demo, .cancel_tf_demo').animate({
				'height': '0'
			}, globalAnimationSpeed);

			$('#create-preview-header').animate({
				'height': '0'
			}, { duration: globalAnimationSpeed, easing: 'easeOutQuart', complete:  function() {

				//if checkbox was active
				if($('#create-preview-form .checkbox').hasClass('active')){

					$('#create-preview-confirm-view h6').show();

				}

				$('#create-preview-confirm-view').fadeIn(globalAnimationSpeed);

				setTimeout(function(){

					$('.create-preview-confirm-view-icon').animate({
						'transform': 'rotate(-9deg)',
						'opacity': '1'
					}, globalAnimationSpeed);

					setTimeout(function(){

						$('.create-preview-confirm-view-icon').animate({
							'transform': 'rotate(4deg);'
						}, globalAnimationSpeed);

						setTimeout(function(){

							$('.create-preview-confirm-view-icon').animate({
								'transform': 'rotate(0deg);'
							}, globalAnimationSpeed);

						}, globalAnimationSpeed * 1.2);

					}, globalAnimationSpeed * 1.1);

				}, globalAnimationSpeed);

			}});

		});

	});

}

//open live preview popup
function openLivePreviewPopup(){

	if(!detectLockedFeatures()){ requestPopup('unpaid'); return false; }

	//add specific behavior for body and popup element
	$('body:first-of-type, html:first-of-type').css('overflow', 'hidden').addClass('extraStylingForPopup');

	//show preview wrapper
	$('#create-preview-wrapper').show();

	//wait a little bit
	setTimeout(function(){

		//open popup
		$('#create-preview-wrapper').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		});

		$('#create-preview-popup').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(1) translateY(-50%)'
		});

		$('.space.active').css({
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(0.9)'
		});

		$('.create-preview-template-name').focus();

	}, 100)

}

function adjustSortableScrollbar(e){

	//variables
	mousePosY = e.pageY;
	windowHeight = $(window).height() / 2;

	c = mousePosY - cursorPosition;

	if(($('#canvas').scrollTop() + $('#canvas').outerHeight()) >= currentScrollHeight && mousePosY >= newMousePosY ){

		$('#canvas').css('overflow-y','hidden')
		if(newMousePosY == 0){ newMousePosY = mousePosY; }

		return false;

	}

	newMousePosY = 0;
	$('#canvas').scrollTop(currentScrollbarPosition+c*2);
	$('#canvas').css('overflow-y','');

}

//initialise font family menu
function initialiseFontFamilyMenu(){

	//variables
	fontFamilyString = '';
	foundFontInTemplate = false;
	fontInstalledFound = false;

	$('#template-editing-canvas [data-template-type="headers"] [data-font-name]').each(function(){

		//variables
		fontFamily = $(this).attr('data-font-name');
		fontFamilyReadable = $(this).attr('data-font-name').substr(0,1).toUpperCase()+fontFamily.substr(1);

		// fontFamilyString + fontFamilyReadable + '[' + fontFamily + '-'+ getFontWeightInt(fontWeight) +'];';

		$.each(this.attributes, function() {

			if(this.specified) {

				if(this.name.indexOf('data-font-weight') >= 0){

					var fontWeight = this.value;
					var fontFamilyReadable2 = fontFamilyReadable + ' ' + fontWeight;

					if(fontFamilyString.toLowerCase().includes(fontFamilyReadable2.toLowerCase())) {}

					else {

						fontInstalledFound = true;

						//add to string
						fontFamilyString = fontFamilyString + fontFamilyReadable2 + '[' + fontFamily + '-'+ getFontWeightInt(fontWeight) +'];';

					}

				}

			}

	  });

	})

	//for each element
	$('#template-editing-canvas [data-template-type="html"] *').each(function(){

		//variables
		fontFamily = $(this).css('font-family').replace(/\"/g, "'")
		fontWeight = $(this).css('font-weight');
		fontFamilyReadable = fontFamily.replace(/\_/g, ' ').replace(/\'/g, '').replace(/\"/g, '').replace(/\*/g, '') + ' ' + fontWeight;

		//fontFamilyReadableFirstCharacter = fontFamilyReadable.charAt(0);
		//fontFamilyReadableLastCharacter = fontFamilyReadable.slice(-1);

		//if the font is chained, grab the first possible font
		if(fontFamilyReadable.indexOf(',') >= 0){ fontFamilyReadable = fontFamilyReadable.substring(0, fontFamilyReadable.indexOf(',')); }

		//if the font family is not yet in the fontFamilyString
		if (fontFamilyString.toLowerCase().includes(fontFamilyReadable.toLowerCase())) {
		}

		else {

			if(fontFamilyReadable != 'Times New Roman' && fontFamilyReadable != ''){

				if(!foundFontInTemplate && fontInstalledFound){ fontFamilyString = fontFamilyString + 'addDivider[];'; }

				foundFontInTemplate = true;

				//add too fontFamilyString
				fontFamilyString = fontFamilyString + fontFamilyReadable + '[' + fontFamily + '-'+ getFontWeightInt(fontWeight) +'];';

			}

		}

	});

	//variables
	fontFamilyString = 'Choose New Font[new_font];addDivider[];' + fontFamilyString.slice(0,-1);

	//attach to font tags
	$('[data-styles-section="font-families"] .font-button').attr('data-select-items', fontFamilyString);

	//remove fonts that are not found from headers

}

//adapt font family
function adaptFontFamily(font_family, font_weight){

	//variables
	elementName = $('.font-button.active').closest('li').find('span').text();

	$(effectTarget+' [data-size="'+elementName+'"]').css("font-family", "'"+font_family+"', Arial, Helvetica, sans-serif").css('font-weight', getFontWeightInt(font_weight));
	$(effectTarget+'[data-size="'+elementName+'"]').css("font-family", "'"+font_family+"', Arial, Helvetica, sans-serif").css('font-weight', getFontWeightInt(font_weight));

	setSaveActive();

}

//get html from text selection
function getSelectionHtml() {

	var html = "";

	if (typeof window.getSelection != "undefined") {

		var sel = window.getSelection();

		if (sel.rangeCount) {

			var container = document.createElement("div");

	   		for (var i = 0, len = sel.rangeCount; i < len; ++i) {

				container.appendChild(sel.getRangeAt(i).cloneContents());

			}

			html = container.innerHTML;

			if ($(container).find('td').length > 0) { textSelectionHasTable = true; }

		}

	}

	else if (typeof document.selection != "undefined") {

		if (document.selection.type == "Text") {

			html = document.selection.createRange().htmlText;

		}
	}

}

//convert base64 encoded images
function fetchArrayOfBase64Images(){

	//variables
	base64ImageArray = [];

	//for each images
	$('#template-editing-canvas img').each(function(){

		//variables
		var imagePath = $(this).attr('src');

		if (imagePath.indexOf('base64') > 0){

			//variables
			var randomToken = createToken();

			//mark the image
			$(this).attr('data-convert-token', randomToken);

			//add to array
			base64ImageArray.push(imagePath+'['+randomToken+']');

		}

	});

	return base64ImageArray;

}

function createAndApplyConvertionBaseEncodedImages(type){

	//ajax connection to image converting
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=convertBase64Images",
	    data: { baseEncodedImages: baseEncodedImages }
	}).done(function(data) {

		//create an array from the fetched string
		var array = data.split(';');

		//for each item
		for (i=0;i<array.length;i++){

			if(array[i] == '' || array[i] == ' '){

				return false;

			}

			//the item
			var item = array[i].substring(0, array[i].indexOf('['));
			var value = array[i].split('[')[1].split(']')[0];

			$('[data-convert-token="'+value+'"]').attr('src',item);

		}

		//remove data-convert-token
		$('[data-convert-token]').removeAttr('data-convert-token');

		if(type == 'save'){

			saveTemplate();

		}

		else if(type == 'export'){

			buttonDisabled = false;
			exportToDesktop('.active-popup-button');

		}

	});

}

//apply action to background menu
function actionToBackgroundImage(name, value){

	//variables
	backgroundMark = createToken();
	attr_name = $('.background-images-button.active').closest('li').find('span').attr('data-attr-name');
	selected_img_w = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').width();
	selected_img_h = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').height();
	selected_img_src = $('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').attr('background');

	//remove all marks
	$('[data-edit-background-image-mark]').removeAttr('data-edit-background-image-mark');

	//set a mark
	$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').attr('data-edit-background-image-mark',backgroundMark)

	//if action is remove image
	if(value == 'remove_image'){

		//remove background attr/css
		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css('background-image','');
		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').removeAttr('background');

		saveTemplateToMemory();

	}

	if(value == 'edit_image'){

		//open the image editor canvas space
		openSpace('image-editor-canvas');

		//initialise the image to the canvas
		initialiseImageToCanvas();

	}

	if(value == 'pick_from_gallery'){

		hideEditingCanvas();

		setTimeout(function(){

			openSpace('image-editor-canvas');

			setTimeout(function(){

				//if the initialise vault flag is not already set
				if(!initialiseImageDatabaseFlag){

					//initialise vault
					initialiseImageDatabase();

				}

			}, 1200)

			resetCropWindow(selected_img_w, selected_img_h);

		}, selectActiveStateDelay + selectFadeOutSpeed);

	}

	if(value == 'direct_url'){

		directImportType = 'background';
		requestPopup('image_from_url');

	}

	if(value == 'set_auto_width'){

		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css({
			'background-size': 'cover',
			'background-position': 'center center',
			'background-repeat': 'no-repeat no-repeat'
		});

	}

	if(value == 'set_repeatable'){

		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css({
			'background-size': '',
			'background-position': 'center center',
			'background-repeat': 'repeat'
		});

	}

	if(value == 'no_behaviour'){

		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css({
			'background-size': '',
			'background-position': '',
			'background-repeat': 'no-repeat no-repeat'
		});

	}

	if(value == 'set_100%'){

		$('#template-editing-canvas').find('.selected-table[data-bg="'+attr_name+'"], .selected-table[data-background="'+attr_name+'"], .selected-table [data-bg="'+attr_name+'"], .selected-table [data-background="'+attr_name+'"]').css({
			'background-size': '100%',
			'background-position': 'center center',
			'background-repeat': 'no-repeat no-repeat'
		});

	}

	setSaveActive();

}

//share campaign
function shareCampaign(event){

	//if button is disabled
	if(buttonDisabled){ return false; }

	//set to true
	buttonDisabled = true;

	//variables
	var SRemailAddress = $('#share-campaign-input-value').val();

	if(SRemailAddress == ''){

		//notification
		notification('warning','Invalid','Enter a valid email address', false);

		//set to true
		buttonDisabled = false;
		return false;

	}

	//set loading text
	$(event).val(btnTrueLoadingText+'..');

	//set z-index to higher than the alternate button
	$(event).css('z-index','4');

	//animate the button
	$(event).css('width','100%');

	//fetch mirror token
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=shareCampaign&email="+SRemailAddress+"&campaign_id="+campaign_id+'&mode='+mode,
	    data: { }
	}).done(function(data) {

		if(data == 'no_user'){

			//notification
			notification('warning','Invalid','There is no user with that email address', false);

			//set to true
			buttonDisabled = false;

		}

		if(data == 'same_user'){

			//notification
			notification('warning','Invalid','You can\'t share to your own account. Please, use the duplicate feature.', false);

			buttonDisabled = false;

		}

		if(data == 'forbidden'){

			//notification
			notification('warning','Forbidden','This campaign is probably not yours', false);

			buttonDisabled = false;

		}

		if(data == 'success'){

			closePopup();

			setTimeout(function(){

				//notification
				notification('success','Campaign shared','And email was sent to the recipient', false);

				buttonDisabled = false;

			}, 500)

			return false;

		}

		//set loading text
		$(event).val('Sharing Campaign');

		//animate the button
		$(event).css('width','50%');

		//enable button
		buttonDisabled = false;

	});

}

//initialise mode
function initialiseMode(mode){

	if(mode == 'vault'){

		initialiseModulesFromVault();

	}

	else if(mode == 'template' || mode == 'demo'){

		//remove vault ui
		$('#sub-bar').addClass('template-mode');

		$('#menu-modules-vault-tabs').remove();

		initialiseModules();
		$('.empty-state-vault-module-bar').hide();

	}

	if(mode == 'demo'){

		initialiseDemoMode();

	}

}

//open grouping section
function openGroupingSection(event){

	//variables
	subbar_width = $('#sub-bar').width();
	sidebar_width = $('#sidebar').width();
	sectionName = $(event).find('.section-name').text();
	modulesString = '';

	$('#module-accordion-modules-headline span').text(sectionName)

	if(sectionName == 'Other'){

		//fetch thumbnails
		$('#template-modules-holder [data-module]:not([data-group])').each(function(){

			//variables
			thumbnail = $(this).attr('data-thumb');

			if(thumbnail == undefined){

				thumbnail = $(this).attr('data-thumbnail');

			}

			name = $(this).attr('data-module');
			var module_name_overlay = '';

			if(thumbnail == undefined){

				thumbnail = 'img/framework/thumbnail-placeholder.png';
				module_name_overlay = '<div class="module-name-overlay font-bold">'+name+'</div>';

			}

			modulesString = modulesString + '<li data-sidebar-module-identifier="'+name+'" data-module-type="template">'+module_name_overlay+'<img src="'+thumbnail+'" style="opacity: 1; margin-left: 0px;"></li>';

		});

	}

	else {

		//fetch thumbnails
		$('#template-modules-holder [data-group="'+sectionName+'"]').each(function(){

			//variables
			thumbnail = $(this).attr('data-thumb');

			if(thumbnail == undefined){

				thumbnail = $(this).attr('data-thumbnail');

			}

			name = $(this).attr('data-module');
			var module_name_overlay = '';

			if(thumbnail == undefined){

				thumbnail = 'img/framework/thumbnail-placeholder.png';
				module_name_overlay = '<div class="module-name-overlay font-bold">'+name+'</div>';

			}

			modulesString = modulesString + '<li data-sidebar-module-identifier="'+name+'" data-module-type="template">'+module_name_overlay+'<img src="'+thumbnail+'" style="opacity: 1; margin-left: 0px;"></li>';

		});

	}

	$('#module-accordion-modules-list').html(modulesString);

	initialiseDraggable();

	$('#module-accordion-holder').animate({
		'left': '-'+(subbar_width)+'px'
	}, globalAnimationSpeed * 1.5);



}

//close grouping section
function closeGroupingSection(){

	//variables
	subbar_width = $('#sub-bar').width();
	sidebar_width = $('#sidebar').width();

	$('#module-accordion-holder').animate({
		'left': '0'
	}, globalAnimationSpeed * 1.5);

}

//initialise resizable
function initialiseResizable(){

	if(mode == 'vault'){

		$('#template-editing-canvas [data-module] > tr > td > table[width="640"] > tr > td, #template-editing-canvas [data-module] > tbody > tr > td > table[width="640"] > tbody > tr > td, [data-resizable]').resizable({
		  minHeight: 0,
		  grid: 5,
		  handles: 's',
		  stop: function(event, ui) {

			  saveTemplateToMemory();

			  setSaveActive();

			  $('[data-module ].ui-resizable-handle.active').removeClass('active');

			  checkEmptyCanvas();

		  },
		  start: function(event, ui) {

		  }
		});

	}

	else {

		$('#template-editing-canvas [data-module] > tbody > tr > td > table, [data-resizable]').resizable({
		  minHeight: 0,
		  grid: 5,
		  handles: 's',
		  stop: function(event, ui) {

			  saveTemplateToMemory();

			  setSaveActive();

			  $('[data-module ].ui-resizable-handle.active').removeClass('active');

			  checkEmptyCanvas();

		  },
		  start: function(event, ui) {

		  }
		});

	}

}

//initialise avatar
function initialiseAvatar(){

	//each list, fetch gravatar
	$(document).find('#user-avatar').each(function(){

		// // //vars
		// // email = $('[data-user-email]').attr('data-user-email');
        // //
		// // //find data and add gravatar
		// // $(this).find('.avatar-wrapper').append($.gravatar(email));
        // //
		// // //fetch img src
		// // a = $(this).find('img').attr('src');
		// // //a = a.replace("http", "https")
        // //
		// // $(this).find('img').attr('src', a+'d=https%3A%2F%2Fwww.stampready.net%2Fdashboard%2Fimg%2Fframework%2Favatar_default_ready.png');
        //
		// $(this).find('.avatar-wrapper').append('x');

	});

}

//check if canvas is empty
function checkEmptyCanvas(){

	//variables
	modulesCount = $('[data-template-type="html"] [data-module]').size();
	windowHeight = $(window).height();
	modulesHeight = 0;
	canvasPaddingTop = parseInt($('#canvas').css('padding-top'));

	if(modulesCount < 1){

		resetTemplate();

	}

	else {

		//hide template-top-bar
		$('#template-top-bar').fadeIn(globalAnimationSpeed);

		//set canvas height
		$('#template-editing-canvas, #template-canvas').css('height','100%');

		//show canvas empty state icon
		$('.editing-canvas-empty-state').css({

			'top': '60%',
			'opacity': '0'

		});

		$('.editing-canvas-empty-state').hide();


	}

	$('#template-editing-canvas [data-module]').each(function(){

		//variables
		modulesHeight = modulesHeight + $(this).height();

	})

	if(modulesHeight >= (windowHeight - (canvasPaddingTop * 2))){

		$('[data-template-type="html"]').css('padding-bottom','149px')

		$('[data-template-type="html"]').css('height','auto');

	}

	else {

		$('[data-template-type="html"]').css('padding-bottom','0');

		$('[data-template-type="html"]').css('height','100%');

	}


}

//adapt font size
function adaptOutput(event){

	//variables
	var outputSize = $(event).val();
	var attrName = $(event).closest('li').find('span').attr('data-attr-name');
	var attrType = $(event).closest('li').attr('data-attr-type');
	var attrMax = $(event).closest('li').find('.appearances-slider').attr('max');

	//if font size is below 10, do not do anything
	if(outputSize < 10 && attrType == 'size'){

		return false;

	}

	else {

		if(attrType == 'size'){

			if(localStorage.effectAllModules == 'false'){

				$('#template-editing-canvas [data-template-type="html"]  .selected-table').find('[data-size="'+attrName+'"]').css('font-size', outputSize+'px');

			}

			else {

				$('#template-editing-canvas [data-template-type="html"]').find('[data-size="'+attrName+'"]').css('font-size', outputSize+'px');

			}

			//add extra line height depending on the font size
			if (outputSize > 16 && outputSize < 32) {

				extra = 1.45

			}

			else if (outputSize > 32 && outputSize < 100) {

				extra = 1.1

			}
			else if (outputSize < 17) {

				extra = 1.7

			}
			else {

				extra = 1

			}

			if(localStorage.effectAllModules == 'false'){

				//update font size
				$('#template-editing-canvas .selected-table [data-size="' + attrName + '"]').each(function() {

					//Change value of the selector
					$(this).css('line-height', outputSize * extra + 'px');

				});

			}

			else {

				//update font size
				$('#template-editing-canvas [data-size="' + attrName + '"]').each(function() {

					//Change value of the selector
					$(this).css('line-height', outputSize * extra + 'px');

				});

			}

			if(localStorage.effectAllModules == 'false'){

				//update font size
				$('#template-editing-canvas .selected-table [data-size="' + attrName + '"]').each(function() {

					//Change value of the selector
					$(this).css('line-height', outputSize * extra + 'px');

				});

				$(event).closest('li').find('.appearances-slider').val(outputSize);

			}

			else {

				//update font size
				$('#template-editing-canvas [data-size="' + attrName + '"]').each(function() {

					//Change value of the selector
					$(this).css('line-height', outputSize * extra + 'px');

				});

				$(event).closest('li').find('.appearances-slider').val(outputSize);

			}

		}

		else if(attrType == 'border-radius'){

			if(localStorage.effectAllModules == 'false'){

				if(outputSize == '100%'){

					$(event).closest('li').find('.appearances-slider').val(attrMax);

				}

				else {

					$(event).closest('li').find('.appearances-slider').val(outputSize);

				}

				if (outputSize.indexOf('%') >= 0){

					$('#template-editing-canvas [data-template-type="html"] .selected-table').find('[data-border-radius="'+attrName+'"]').css('border-radius', outputSize+'%');

				}

				else {

					$('#template-editing-canvas [data-template-type="html"] .selected-table').find('[data-border-radius="'+attrName+'"]').css('border-radius', outputSize+'px');

				}

			}

			else {

				if(outputSize == '100%'){

					$(event).closest('li').find('.appearances-slider').val(attrMax);

				}

				else {

					$(event).closest('li').find('.appearances-slider').val(outputSize);

				}

				if (outputSize.indexOf('%') >= 0){

					$('#template-editing-canvas [data-template-type="html"]').find('[data-border-radius="'+attrName+'"]').css('border-radius', outputSize+'%');

				}

				else {

					$('#template-editing-canvas [data-template-type="html"]').find('[data-border-radius="'+attrName+'"]').css('border-radius', outputSize+'px');

				}

			}

		}

	}

	setSaveActive();

}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}

//adapt outlook background
function adaptOutlookBackground(event, outlookBackgroundImage){

	//variables
	//currentHtml = $('.selected-table').html();

	if(outlookBackgroundImage.indexOf("Warning") > -1){

		return false;

	}

	$('.selected-table').wrap('<div id="parentOfBg"></div>');
	$('#parentOfBg').find('.ui-resizable-handle').remove();
	value_1 = $('#parentOfBg').html();

    value_2 = value_1.substring(
                value_1.lastIndexOf("xmlns") + 1,
                value_1.indexOf("/v:fill")
            );

	if(value_1.indexOf("/v:fill") > -1){


	}

	else {

		value_2 = value_1.substring(
	                value_1.lastIndexOf("xmlns") + 1,
	                value_1.indexOf("/v:image")
	            );

	}


	if (value_1.indexOf('xmlns') > -1){

		console.log('xmlns found')

		if (value_2.indexOf('jpg') > -1){

	        value_3 = value_2.substring(
	                    value_2.indexOf("src=") + 5,
	                    value_2.indexOf(".jpg\"")
	                );

	        value_1 = value_1.replace(value_3+'.jpg', outlookBackgroundImage);

	    }
	    else if (value_2.indexOf('jpeg') > -1){

	        value_3 = value_2.substring(
	                    value_2.indexOf("src=") + 5,
	                    value_2.indexOf(".jpeg\"")
	                );

	        value_1 = value_1.replace(value_3+'.jpeg', outlookBackgroundImage);

	    }
	    else if (value_2.indexOf('png') > -1){

	        value_3 = value_2.substring(
	                    value_2.indexOf("src=") + 5,
	                    value_2.indexOf(".png\"")
	                );


	        value_1 = value_1.replace(value_3+'.png', outlookBackgroundImage);

	    }
	    else if (value_2.indexOf('gif') > -1){

	        value_3 = value_2.substring(
	                    value_2.indexOf("src=") + 5,
	                    value_2.indexOf(".gif\"")
	                );

	        value_1 = value_1.replace(value_3+'.gif', outlookBackgroundImage);

	    }

		value_1 = value_1.replace('.jpg""', '.jpg"');
		value_1 = value_1.replace('.png""', '.png"');
		value_1 = value_1.replace('.gif""', '.gif"');
		value_1 = value_1.replace('.jpeg""', '.jpeg"');

		$('#parentOfBg').html(value_1);
		$('#parentOfBg').contents().unwrap('<div>');

	}

	//console.log(value_1);

	//put into temporary div
	//$tmp = $("<div></div>").html(currentHtml);

	//content1 = $tmp.html().replace(selected_img_src, outlookBackgroundImage);

	//content1 = $tmp.html().replace(/(v:fill)(.*)(src=")([^"]*)/mi,'v:fill$2src="'+outlookBackgroundImage);

	//change html
	// content1 = $tmp.html().replace(/(v:fill)(.*)(src=")([^"]*)/mi,'v:fill$2src="'+outlookBackgroundImage).replace(/(v:image)(.*)(src=")([^"]*)/mi,'v:image$2src="'+outlookBackgroundImage);
	// content1 = content1.replace('</v:image>','');

	//$('.selected-table').html(content1);

	setTimeout(function(){

		initialiseResizable();

		initialiseSortable();

	}, 1000)

}

//switch canvas background
function switchCanvasBackground(){

	//variables
	canvasCurrentBackground = rgbToHex($('#canvas').css('background-color'));

	if(canvasCurrentBackground == '#e6e6e6'){ newCanvasBackgroundColor = '#494949'; newTemplateBarBackgroundColor = '#1e1e1e'; }
	if(canvasCurrentBackground == '#494949'){ newCanvasBackgroundColor = '#e6e6e6'; newTemplateBarBackgroundColor = '#d9d9d9'; }

	$('#canvas').animate({'background-color': newCanvasBackgroundColor}, globalAnimationSpeed);
	$('#template-top-bar').animate({'background-color': newTemplateBarBackgroundColor}, globalAnimationSpeed);

}

//submit feedback
function submitFeedback(event){

	//if button is disabled
	if(buttonDisabled){ return false; }

	buttonDisabled = true;

	//variables
	feedback = $('#feedback-textarea').val();

	if(feedback == ''){ buttonDisabled = false; return false; }

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=submitFeedback",
	    data: { feedback: feedback, campaign_id: campaign_id, mode: mode, authorName: authorName, user_id: user_id }
	}).done(function(data) {

		closePopup();

		setTimeout(function(){

			notification('success', 'Feedback Sent', 'Your feedback has been sent and received. Thank you.', false);
			buttonDisabled = false;

		}, 1000)

	});

}

//toggle switch on or off
function toggleSwitch(switchElement, switchName){

	//if switch is on, set to off
	if($(switchElement).find('.toggle-switch-knob').hasClass('on')){

		switchStatus = false;
		$(switchElement).find('.toggle-switch-knob').removeClass('on').addClass('off');

	}

	//if switch is off, set to on
	else {

		switchStatus = true;
		$(switchElement).find('.toggle-switch-knob').removeClass('off').addClass('on');

	}

	if(switchName == 'effect-all-modules'){

		if(switchStatus){ effectAllModules = true; effectTarget = '#template-editing-canvas'; }
		else { effectAllModules = false; effectTarget = '.selected-table'; }

		localStorage.effectAllModules = effectAllModules;

	}

	//run function in case name exists
	if(switchName == 'flip'){

		if(switchStatus){ flipEditingImage(); }
		else{ removeFlipEditingImage(); }

	}
	if(switchName == 'crop-tool'){

		if(switchStatus){ showCropTool();

			if(selected_img_w == selected_img_h){ showSwitch('toggle-circular') }

		}
		else{ hideCropTool(); hideSwitch('toggle-circular'); }

	}
	if(switchName == 'toggle-circular'){

		if(switchStatus){ makeCircular(); }
		else { undoCircular(); }

	}
	if(switchName == 'optimise-retina'){

		if(switchStatus){ optimiseForRetina(); }
		else { undoForRetina(); }

	}

}

//adjust find and replace button
function adjustFindAndReplaceButton(boolean){

	//clear timeout
	clearTimeout(findOccurencesTimer);

	if(boolean){

		$('#replace-button').addClass('active');

		findOccurencesTimer = setTimeout(function(){

			clearTimeout(findOccurencesMessageTimer);

			var findValue = $('#code-editor-find input[type="text"]').val();
			var codeEditorValue = editor.getValue();
			var findOccurences = codeEditorValue.split(findValue).length - 1;

			$('#replace-button').val(findOccurences+' found');

			findOccurencesMessageTimer = setTimeout(function(){

				$('#replace-button').val('Replace');

			}, 2000)

		}, 1000);

	}

	else { $('#replace-button').removeClass('active'); }

}

//show create image link tooltip
function showCreateImageLinkTooltip(){

	current_tooltip_width = $('#image-tooltip').width();
	var new_tooltip_width = 340;
	commands_bar_width = $('#image-commands').width();
	subbar_width = $('#sub-bar').width();
	sidebar_width = $('#sidebar').width();
	differenceTooltips = new_tooltip_width - commands_bar_width;


	//variables
	imageOffset = $('.selected-image').offset();
	imageWrappedLink = $('.selected-image').parent('a').attr('href');
	canvasOffset = $('#canvas').offset();
	imageTooltipMarginTop = parseInt($('#image-tooltip').css('margin-top')) - 10;
	imageTooltipWidth = $('#image-tooltip').width();
	imageWidth = $('.selected-image').width();
	currentScrollbarPosition = $('#canvas').scrollTop();

	//if image wrapped links is only a hashtag
	if(imageWrappedLink == '#'){ imageWrappedLink = ''; }

	$('#image-tooltip').css('width', commands_bar_width+'px');

	//animate commands
	$('#image-commands').animate({

		'margin-top':'10px',
		'opacity':0

	}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

		//position image tooltip
		$('#image-tooltip').css({
			'width': new_tooltip_width+'px',
			'left': (imageOffset.left-canvasOffset.left+(imageWidth/2)-(new_tooltip_width/2))+'px'
		});

		$('#image-commands').hide();

		$('#change-image-link-input-field').val(imageWrappedLink).show();

		if(imageWrappedLink == '' || imageWrappedLink == undefined){ $('#change-image-link-input-field').attr('placeholder','http://') }
		else { $('#change-image-link-input-field').attr('placeholder','') }

		setTimeout(function(){

			//show creadte/edit link wrapper
			$('#change-image-link-input-field').animate({

				'opacity':1,
				'margin-top':0

			}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

				$('.create-edit-link-button').animate({
					'width':'45px'
				}, 200);

				//focus input
				$('#change-image-link-input-field').focus();

			}});

		}, 200);

	}});

}

//close showCreateImageLinkTooltip
function hideCreateImageLinkTooltip(){

	console.log('image create')

	//hide the create edit link button
	$('.create-edit-link-button').animate({

		'width':0

	}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

		//show creadte/edit link wrapper
		$('#change-image-link-input-field').animate({

			'opacity':0,
			'margin-top':'10px'

		}, { duration: 200, easing: 'easeOutQuad', complete:  function() {

			//hide edit create link
			$('#change-image-link-input-field').hide();

			$('#change-image-link-input-field').css('margin-top','-10px')

			//show commands
			$('#image-commands').show().css('margin-top','-10px');

			setTimeout(function(){

				$('#image-commands').animate({

					'opacity': 1,
					'margin-top': 0

				}, { duration: 200, easing: 'easeOutQuad', complete:  function() {


				}})

			}, 200)


		}});

		setTimeout(function(){



			//position image tooltip
			$('#image-tooltip').css({
				'width': current_tooltip_width+'px',
				'left': (imageOffset.left-canvasOffset.left+(imageWidth/2)-(current_tooltip_width/2))+'px'
			});

			setTimeout(function(){

				$('#image-tooltip').css({
					'width': ''
				});

			}, 500)

		}, 200)

	}})

}

//update image link
function updateImageLink(url){

	console.log('image link')

	//variables
	first3Chars = url.slice(0,3);

	//if sr_ tag
	if(first3Chars.indexOf('sr_') == 0){



	}

	else if(url.indexOf('mailto:') >= 0){

		if(isEmail(url)){

			link = 'mailto:'+link

		}

	}

	else if(url.indexOf('@') >= 0){

		//alert('yes mailto')

	}

	else {

		//alert('no mailto')

		//if the link does not contain http & https
		if(url.indexOf('http://') == -1 && url.indexOf('https://') == -1){ url = 'http://'+url; }

	}

	if(url == 'https://' || url == 'http://'){ url = ''; }

	//if link exists
	if ($('.selected-image').parent('a').length > 0){

		if(url == ''){

			$('.selected-image').parent('a').contents().unwrap();

		}

		else {

			$('.selected-image').parent('a').attr('href', url);

		}

	}

	else {

		if(url == ''){

		}

		else {

			$('.selected-image').wrap('<a href="'+url+'" style="text-decoration: none;" border="0"></a>');

		}

	}

	setSaveActive();

}


//initialise demo mode
function initialiseDemoMode(){

	//variables
	meta = '';
	css = '';

	//for each meta tag
	$('#template-editing-canvas meta, #template-editing-canvas link, #template-editing-canvas title').each(function(){ meta = meta + $(this)[0].outerHTML +'\n'; });

	//for each style tag
	$('#template-editing-canvas style').each(function(){ css = css + $(this)[0].outerHTML +'\n'; });

	//replace the contents
	$('[data-template-type="meta"]').html(meta);
	$('[data-template-type="headers"]').html(css);

	$('[data-title="Export"]').attr('data-submenu','Export To Desktop[requestPopup(\'export\')];Share Campaign[requestPopup(\'share-campaign\')]');

	//check empty canvas
	checkEmptyCanvas();

}

//show tooltip for editing link
function showEditLinkTooltip(){

	//variables
	editLinkMode = true;
	var element = $('.selected-element');
	var elementOffset = $(element).offset();
	var canvasOffset = $('#canvas').offset();
	var elementWidth = $('.selected-element').outerWidth();
	var imageTooltipMarginTop = '10px';
	var imageTooltipWidth = $('.highlighter-container').width();
	var currentScrollbarPosition = $('#canvas').scrollTop();


	closeTooltipSwatches();

	$('.highlighter-container').show();

	//position image tooltip
	$('.highlighter-container').css({
		'left': (elementOffset.left-canvasOffset.left+(elementWidth/2)-(imageTooltipWidth/2))+'px',
		'top': elementOffset.top+currentScrollbarPosition+'px',
		'margin-left': '0',
	});

	//reset the margin-top of tooltip
	$('.highlighter-container').removeClass('active')

	setTimeout(function(){

		$('.highlighter-container').addClass('active')

	}, 20)

	//variables
	/*
imageOffset = $('.selected-image').offset();
	canvasOffset = $('#canvas').offset();
	imageTooltipMarginTop = '-'+(marginTopTooltip + 10)+'px';
	imageTooltipWidth = $('#image-tooltip').width();
	imageWidth = $('.selected-image').width();
	currentScrollbarPosition = $('#canvas').scrollTop();
	imageWrappedLink = $('.selected-image').parent('a').attr('href');

	$('#change-image-link-input-field').val(imageWrappedLink);

	if(imageWrappedLink == '' || imageWrappedLink == undefined){ $('#change-image-link-input-field').attr('placeholder','http://') }
	else { $('#change-image-link-input-field').attr('placeholder','') }

	//position image tooltip
	$('#image-tooltip').css({
		'left': (imageOffset.left-canvasOffset.left+(imageWidth/2)-(imageTooltipWidth/2))+'px',
		'top': imageOffset.top+currentScrollbarPosition+'px'
	});
*/

}

function adjustModuleDraggingShadow(e){

	//variables
	mousePosX = e.pageX;
	mousePosY = e.pageY;
	elements = $('.ui-draggable-dragging img');
	windowWidth = $(window).width() / 2;
	windowHeight = $(window).height() / 2;
	sidebarWidth = $('#sidebar').width();

	//define max offset
	moduleShadowOffsetX = 30;
	moduleShadowOffsetY = 20;
	scrollbarOffset = 200;

	//measure offset
	a = (mousePosX * moduleShadowOffsetX) / (windowWidth + sidebarWidth);
	b = (mousePosY * moduleShadowOffsetY) / windowHeight;
	c = mousePosY - cursorPosition;

	final_a = a - moduleShadowOffsetX;
	final_b = b;

	//set offset
	$(elements).css('box-shadow', final_a+'px '+final_b+'px 0px rgba(0,0,0,0.075)');

	if(moduleActiveFlag){ $('#canvas').scrollTop(currentScrollbarPosition+c); }

}

function execCommandOnElement(el, commandName, value) {
    if (typeof value == "undefined") {
        value = null;
    }

    if (typeof window.getSelection != "undefined") {
        // Non-IE case
        var sel = window.getSelection();

        // Save the current selection
        var savedRanges = [];
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            savedRanges[i] = sel.getRangeAt(i).cloneRange();
        }

        // Temporarily enable designMode so that
        // document.execCommand() will work
        document.designMode = "on";

        // Select the element's content
        sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);

        // Execute the command
        document.execCommand(commandName, false, value);

        // Disable designMode
        document.designMode = "off";

        // Restore the previous selection
        sel = window.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = savedRanges.length; i < len; ++i) {
            sel.addRange(savedRanges[i]);
        }
    } else if (typeof document.body.createTextRange != "undefined") {
        // IE case
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.execCommand(commandName, false, value);
    }
}

//load feed
function loadFeed(){

	//variables
	url = $('#feed-url').val();
	feedStart = 0;
	feedLimit = $('[data-dropdown-item-present]').attr('data-dropdown-item-present');

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=getFeed",
	    data: { url: url, feedLimit: feedLimit }
	}).done(function(data) {

		if(data.indexOf('DOMDocument::load') >= 0){

			notification('warning','Unable to load','We could not load that feed', false);

			return false;

		}

		//variables
		var obj = jQuery.parseJSON(data);
		var objCount = obj.length;

		//if count is zero
		if(objCount < 1 || objCount == undefined || objCount == ''){

			notification('warning','Unable to load','We could not load that feed', false);

			return false;

		}

		else {

			//duplicate x times
			moduleCopy = $(module)[0].outerHTML;

			for(var i=0; i < objCount -1; i++){

				if(i == 0){

					$(module).addClass('markedForFeed');

				}

				$(module).after(moduleCopy);
				$(module).next('[data-module]').addClass('markedForFeed');

			}

			feedLanguageButtonText = obj[0].language;

			$.each(obj, function(key,value) {

				$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="title"]').text(value.title);
				$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="description"]').html(value.desc).find('img[width="1"]').remove();
				$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="date"]').text(value.date);
				$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="link"]').attr('href', value.link).text(feedLanguageArray[0][feedLanguageButtonText]);
				//$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="thumbnail"]').attr('src', value.thumbnail);
				$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="thumbnail"]').closest('a').attr('href', value.link)

				if($('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="description"]').length > 0){

					descHtml = $('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="description"]').html().replace('[…]', '');
					$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="description"]').html(descHtml);

					//if an image exists in the description and thumbnail is empty
					if((value.thumbnail == '' || value.thumbnail == undefined || value.thumbnail == null || value.thumbnail == 'null')){

						//get thumbnail in description and set in data-feed-type="thumbnail"
						thumbnail = $('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="thumbnail"]').attr('src');
						$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="thumbnail"]').attr('src', thumbnail);

						$('#template-editing-canvas .markedForFeed').eq(key).find('[data-feed-type="description"] img').remove();

					}

				}

			});

			$('.markedForFeed').removeClass('markedForFeed')

			closePopup();

			initialiseResizable();

			checkEmptyCanvas();

			removePreviewUrl();

			saveTemplateToMemory();

			setSaveActive();

		}

	});

}

function browseOtherTemplates(){

	$(location).attr('href', 'https://themeforest.net/category/marketing/email-templates?term=stampready');

}

//initialise colororder
function initialiseColorOrder(){

	firstPrimaryColor = $('#styles-swatches [data-colororder="1"]').attr('data-color');
	secondPrimaryColor = $('#styles-swatches [data-colororder="2"]').attr('data-color');
	thirdPrimaryColor = $('#styles-swatches [data-colororder="3"]').attr('data-color');

	if(firstPrimaryColor != undefined){ $('#styles-swatches h6 span').attr('data-primary-1', firstPrimaryColor); }
	if(secondPrimaryColor != undefined){ $('#styles-swatches h6 span').attr('data-primary-2', secondPrimaryColor); }
	if(thirdPrimaryColor != undefined){ $('#styles-swatches h6 span').attr('data-primary-3', thirdPrimaryColor); }

}

//present avatar menu
function presentAvatarMenu(){

	clearTimeout(avatarMenu);

	//show menu
	$('.menu-wrapper').animate({
		'transform': 'translate(0px, 0px) rotate(45deg)'
	}, globalAnimationSpeed)

	$('#sr-avatar').fadeOut(globalAnimationSpeed);

}

//hide avatar menu
function hideAvatarMenu(){

	avatarMenu = setTimeout(function(){

		//show menu
		$('.menu-wrapper').animate({
			'transform': 'translate(47px, 47px) rotate(45deg)'
		}, globalAnimationSpeed)

		$('#sr-avatar').fadeIn(globalAnimationSpeed);

	}, 750)

}

function showImageEditorEmptyState(){

	$('.image-editor-empty-state').show();

}

//hide vault empty state
function hideImageEditorEmptyState(){

	$('.image-editor-empty-state').hide();

}

//adjust the navigation for the image editor
function adjustImageEditorNavigation(tab){

	$('[data-tab-filter]').removeClass('active');

	//variables
	if(tab == 'gallery'){

		$('[data-tab-filter="image"], [data-tab-filter="icon"]').hide();
		$('[data-tab-filter="column"], [data-tab-filter="background"], [data-filter-group="category"], [data-filter-group="sorting"]').show();

	}

	else if(tab == 'uploads'){

		$('[data-tab-filter="column"], [data-tab-filter="background"], [data-filter-group="category"], [data-filter-group="sorting"]').hide();
		$('[data-tab-filter="image"], [data-tab-filter="icon"]').show();

		$('[data-tab-filter="image"]').addClass('active');

	}

}

function initialiseResizableImages(event){

	$(event).find('img').load(function(){

		//variables
		tdWidth = $(this).closest('td').width();
		tdHeight = $(this).closest('td').height();
		tdText = $(this).closest('td').text().trim();

		if (tdText != '' ) {
			return false;
    	}


		// do stuff
		$(this).resizable({
			minWidth: 12,
			minHeight: 12,
			maxWidth: tdWidth,
			maxHeight: tdHeight,
			handles: 'ne',
			aspectRatio: true,
			create : function() {


				$(this).closest('div').find('.ui-resizable-handle').addClass('image-resizable-handle');
				$(this).closest('div').find('.ui-resizable-handle').closest('.ui-wrapper').css('top','0').css('overflow','').css('position','relative')
				$(this).closest('div').find('.ui-resizable-handle').removeClass('ui-resizable-handle');

			},
			start : function() {

				calculateImageGridSnapSizes(event);

			},
			stop : function() {

				// imgWidth = $(this).closest('div').find('img').width();
				// imgHeight = $(this).closest('div').find('img').height();
				// img = $(this).closest('div').find('img');

				if(imageGridSnap){

					$(this).find('img').css('width',imageGridSnap+'px').css('height','');

				}

				setSaveActive();

				saveTemplateToMemory();

			},
			resize: function(){

				imgWidth = $(this).closest('div').find('img').width();
				imgHeight = $(this).closest('div').find('img').height();
				img = $(this).closest('div').find('img');
				tdWidth = $(this).closest('td').width();

				imageGridSnap = detectImageGridSnap(imgWidth);

				if(imgWidth == tdWidth){

					//animateImageResizeBoundries(img);

				}

				//
				// gridX = Math.ceil((imgWidth/5));
				// gridY = Math.ceil((imgHeight/5));
				//
				// // if(gridX < 10 || gridY < 10){
				// //
				// // 	gridX = Math.ceil((imgWidth/5));
				// // 	gridY = Math.ceil((imgHeight/5));
				// //
				// // }
				//
				// if(imageGridSnap){
				//
				// 	console.log(imageGridSnap)
				//
				// 	$(this).resizable({minWidth: 12,
				// 	minHeight: 12,
				// 	handles: 'ne',
				// 	grid: [gridX, gridY],
				// 	aspectRatio: true});
				//
				// }
				//
				// else {
				//
				// 	$(this).resizable({minWidth: 12,
				// 	minHeight: 12,
				// 	handles: 'ne',
				// 	grid: [0, 0],
				// 	aspectRatio: true});
				//
				// }

				// if (gridSnapSizes.indexOf(w) >= 0 || gridSnapSizes.indexOf(w+1) >= 0 || gridSnapSizes.indexOf(w+2) >= 0 || gridSnapSizes.indexOf(w-1) >= 0 || gridSnapSizes.indexOf(w-2) >= 0){
				//
				// 	$(this).closest('div').find('img')
				//
				// }

			}
		});

	}).each(function() {
		if(this.complete) $(this).load();
	});

}

function showResizableImageHandle(event){

	$(event).closest('div').find('.image-resizable-handle').css('opacity','1');

}

function hideResizableImageHandle(event){

	$(event).find('.image-resizable-handle').css('opacity','0')

}

function calculateImageGridSnapSizes(event){

	gridSnapSizes = '';

	$(event).find('img').each(function(){

		//variables
		moduleImageWidth = $(this).width();
		moduleImageHeight = $(this).height();

		gridSnapSizes = gridSnapSizes + 'w:'+moduleImageWidth+'h:'+moduleImageHeight;

	})

}

function detectImageGridSnap(imgWidth){

	if (gridSnapSizes.indexOf('w:'+imgWidth) >= 0){ return imgWidth; }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth+1)) >= 0){ return (imgWidth+1); }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth+2)) >= 0){ return (imgWidth+2); }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth+3)) >= 0){ return (imgWidth+3); }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth-1)) >= 0){ return (imgWidth-1); }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth-2)) >= 0){ return (imgWidth-2); }
	else if (gridSnapSizes.indexOf('w:'+(imgWidth-3)) >= 0){ return (imgWidth-3); }
	else { return false; }

}

function animateImageResizeBoundries(img){

	//variables
	imgWidth = $(img).width();
	scale = 1;

	if(imgWidth > 100){

		scale = '03';

	}

	$(img).animate({
		'transform':'scale(1.'+scale+')'
	}, globalAnimationSpeed / 2)

	setTimeout(function(){

		$(img).animate({
			'transform':'scale(1)'
		}, globalAnimationSpeed / 2)

	}, globalAnimationSpeed / 2)

}

function initialiseLocalStorageSettings(){

	if(localStorage.effectAllModules == 'false'){

		//variables
		switchElement = $('[data-switch-name="effect-all-modules"]');
		switchName = 'effect-all-modules';

		//toggle switch on or off
		toggleSwitch(switchElement, switchName);

	}

}

//open welcome popup
function openWelcomePopup(){

	hideAvatarMenu();

	//add specific behavior for body and popup element
	$('body:first-of-type, html:first-of-type').css('overflow', 'hidden').addClass('extraStylingForPopup');

	//show preview wrapper
	$('#welcome-popup-wrapper').show();

	//wait a little bit
	setTimeout(function(){

		//open popup
		$('#welcome-popup-wrapper').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		});

		$('#welcome-popup').css({
		    'opacity': '1',
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(1) translateY(-50%)'
		});

		$('.space.active').css({
		    'transition': popupSpeed+'s all ease',
		    'transform': 'scale(0.9)'
		});

		$('#welcome-input').focus();

	}, 100)

}

//register account
function registerAccount(){

	if(registerFlag){ return false; }

	//variables
	emailAddress = $('#welcome-input').val();

	if(!validateEmail(emailAddress)){

		notification('warning','Invalid Email','Looks like your email address is incorrect', false);

	}

	else if(!$('#welcome-checkbox').hasClass('active')){

		notification('warning','Terms - ','Agreeing with our terms is required to continue', false);

	}

	else if(validateEmail(emailAddress)){

		registerFlag = true;

		$('#welcome-popup-submit').text('Registering..');

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=registerAccount",
		    data: { emailAddress: emailAddress }
		}).done(function(data) {

			if(data == 'invalid_email'){

				notification('warning','Invalid email','Your email address looks invalid', false);

			}

			else if(data == 'unauthorized'){

				notification('warning','Unauthorized','You\'re not able to create an account at this time', false);

			}

			else if(data == 'user_exists'){

				notification('warning','Email exists','Looks like this email address is associated with another account', false);

			}

			else if(data == 'error_esp'){

				notification('warning','Error','Looks like something went wrong registering an account.', false);

			}

			else {

				$('#welcome-popup-submit').html('<img src="img/icons/welcome-submit-check.png" class="hidden">');
				$('#welcome-popup-submit img').fadeIn(globalAnimationSpeed * 2);

				$('#welcome-popup-submit').css({
					'width':'45px',
					'border-radius': '45px',
					'left':'158px'
				});

				setTimeout(function(){

					closePopup();
					$('[data-user-email]').attr('data-user-email',emailAddress);
					$('#user-avatar img').remove();
					firstLetter = emailAddress.slice(0,1)

					//set the first letter
					$('#sr-avatar').attr('data-avatar-color',firstLetter);
					$('#sr-avatar .avatar-letter-image').text(firstLetter);

					lock = false;

				}, 1750)

			}

		});

	}

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function detectLockedFeatures(){

	if(lock){ return false;  }
	else { return true; }

}

//initialise meta tags
function initialiseMeta(){



}

function constructTemplate(){


}

function cleanTemplateCanvas(){

	//create a temporary div
	contents = $('#template-editing-canvas [data-template-type="html"]').html();
	$tmp = $('<div>' + contents + '</div>');

	//remove
	$tmp.find('meta, style, title, link').remove();
	$tmp.contents().each(function() {
	    if(this.nodeType === Node.COMMENT_NODE) {

			if(this.nodeValue.indexOf('gte') >= 0 || this.nodeValue.indexOf('mso') >= 0 ){

				//variables
				var parent = this.parentNode.nodeName;

				if (parent == 'DIV') {

					$(this).remove();

				}

			}

			else {

				$(this).remove();

			}

	    }
	});
	$tmp.find('[data-template-type="html"]').contents().unwrap();

	contents = $tmp.html();

	$('#template-editing-canvas [data-template-type="html"]').html(contents)


}

function preloadUI(){

	$('<img src="img/framework/farbtastic/wheel.png"/>');

}

function addBackgroundFormatToMenu(el){

	module = $('.selected-table');
	moduleName = $('.selected-table').attr('data-module');
	attrName = $(el).prev('[data-attr-name]').attr('data-attr-name');
	errorImage = false;

	$(module).find('[data-bg="'+attrName+'"], [data-background="'+attrName+'"]').each(function(){

		//get from the table self
		src = $('#template-editing-canvas').find('.selected-table[data-bg="'+attrName+'"], .selected-table[data-background="'+attrName+'"]').css('background-image');

		//if not found
		if(src == '' || src == 'undefined' || src == undefined){

			//get from any of the td
			src = $('#template-editing-canvas').find('.selected-table [data-bg="'+attrName+'"], .selected-table [data-background="'+attrName+'"]').css('background-image');

		}

		if(src == '' || src == 'undefined' || src == undefined){

			src = $('#template-editing-canvas').find('.selected-table[data-bg="'+attrName+'"], .selected-table[data-background="'+attrName+'"]').attr('background');

			//if not found
			if(src == '' || src == 'undefined' || src == undefined){

				src = $('#template-editing-canvas').find('.selected-table [data-bg="'+attrName+'"], .selected-table [data-background="'+attrName+'"]').attr('background');

			}

		}

		if(src != '' && src != 'undefined' && src != undefined && src != 'none'){

			//replace unecessary data
			src = src.replace(/url\(/g,'').replace(/\)/g,'').replace(/\"/g,'');

		}

		else {

			errorImage = true;

		}

		//if the background has been found
		// if(src != '' && src != 'undefined' && src1 != undefined){
		//
		// 	//replace unecessary data
		// 	src = src.replace(/url\(/g,'').replace(/\)/g,'').replace(/\"/g,'');
		//
		// }
		//
		// else {
		//
		//
		//
		// }

		//variables
		// backgroundAttrName = $(this).attr('data-bg');
		// src1 = $('#template-editing-canvas').find('.selected-table[data-bg="'+backgroundAttrName+'"], .selected-table[data-background="'+backgroundAttrName+'"], .selected-table [data-bg="'+backgroundAttrName+'"], .selected-table [data-background="'+backgroundAttrName+'"]').css('background-image');
		// if(src1 != '' && src1 != 'undefined' && src1 != undefined){
		//
		// 	src1 = src1.replace(/url\(/g,'').replace(/\)/g,'').replace(/\"/g,'');
		//
		// }
		// src2 = $('#template-editing-canvas').find('.selected-table[data-bg="'+backgroundAttrName+'"], .selected-table[data-background="'+backgroundAttrName+'"], .selected-table [data-bg="'+backgroundAttrName+'"], .selected-table [data-background="'+backgroundAttrName+'"]').attr('background');
		//
		// console.log('src1:'+ src1)
		// console.log('src2:'+ src2)


		if(!errorImage){

			$('#html-dump').html('<img src="'+src+'">');

			bgImg = $('#html-dump img');

			bgImg.bind('load', function(){

				background_img_w = $('#html-dump').find('img').width();
				background_img_h = $('#html-dump').find('img').height();

				setTimeout(function(){

					$('.select-menu').prepend('<li data-select-item-value="disable">'+background_img_w+' x '+background_img_h+'</li>')

				}, 20);

			});

		}

		else {

			setTimeout(function(){

				$('.select-menu').prepend('<li data-select-item-value="disable">Image Not Found</li>')

			}, 20)

		}

	})

}

function changeRateSwitch(event){

	//variables
	switchPosition = $(event).position();
	switchWidth = $(event).width();
	switchRateName = $(event).attr('data-rate');

	//remove active state
	$(event).parent().find('.active').removeClass('active');

	//set active state
	$(event).addClass('active');

	if(switchPosition.left == 0){ switchPosition.left = 3; switchWidth = switchWidth-3;}

	$('.switch-highlighter').css('left',switchPosition.left+'px').css('width',switchWidth+'px');

}

function checkOldEditor(bool){

	if(bool){

		setTimeout(function(){

			//set popup parameters
			headline = 'New Editor';
			paragraph = 'We released our new editor! This will make editing templates even easier. To switch to the old editor, go to the <a href="../account/settings/">settings</a> page';
			btnTrue = 'Continue';
			btnTrueId = 'close-neweditor-message';
			btnTrueFunction = 'rememberEditorMessage();';

			//open popup
			openPopup();

		}, 500)

	}

}

function rememberEditorMessage(){

	localStorage.remindNewEditorPopup = true;

	closePopup();

}

function installGoogleFontFromVaultModule(){

    webSafeFontArray = ['helvetica', 'source_sans_proregular'];
	updatedFont = false;

    //variables
    $('#html-dump').find('[data-module] [data-size][style], [data-module] [data-color][style]').each(function(){

        //variables
        fontFamily = $(this).css('font-family')
        fontFamily = fontFamily.substr(0, fontFamily.indexOf(',')).toLowerCase();
		fontFamily = fontFamily.replace(/\"/g,'').replace(/\'/g,'');
        var fontWeight = $(this)[0].style.fontWeight;
        var module = $(this);
        //if font family is not empty
        if(fontFamily != ''){

            //variables
            var fontWeightInt = getFontWeightInt(fontWeight, fontFamily);

            //if the font detected is in the web safe fonts array
            if($.inArray(fontFamily.toLowerCase(), webSafeFontArray) !== -1){}
            else {

                //detect if the font family is already installed
                if($('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"]').length){

                    //check if the font weight is already installed
                    if($('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'"]').length){


                    }

                    //install font weight
                    else {

                        $('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('data-font-weight-'+fontWeightInt, fontWeightInt);

                        //variables
                        var googleFontString = $('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"]').attr('href');
                        var googleFontString = googleFontString.replace('&display',','+fontWeightInt+'&display');

                        //update in the dom
                        $('#template-editing-canvas [data-template-type="headers"] [data-font-name="'+fontFamily+'"][data-font-name="'+fontFamily+'"]').attr('href',googleFontString);

						updatedFont = true;

                    }

                }

                //install font
                else {

					fontFamilyEncoded = capitalize_Words(fontFamily);
					fontFamilyEncoded = fontFamilyEncoded.replace(/ /g,'+');
                    $('#template-editing-canvas [data-template-type="headers"]').append('<link href="https://fonts.googleapis.com/css?family='+fontFamilyEncoded+':'+fontWeightInt+'&display=swap" rel="stylesheet" data-font-name="'+fontFamily+'" data-font-weight-'+fontWeightInt+'="'+fontWeightInt+'">');
					updatedFont = true;

                }

            }

        }

    });

	if(updatedFont){ updateRawHeaders(); }

}

function updateRawHeaders(){

	headers = cleanHeaders($('#template-editing-canvas').html());
	newRawSourceHeaders = vaultDoctype + headers + '</head>';

	$('[data-raw-source="headers"]').val(newRawSourceHeaders);

}

function getFontWeightInt(fontWeight, fontFamily){

    if(fontWeight == 'lighter'){ convertedFontWeight = '300'; }
    else if(fontWeight == 'light'){ convertedFontWeight = '400'; }
    else if(fontWeight == 'normal'){ convertedFontWeight = '400'; }
    else if(fontWeight == 'bold'){ convertedFontWeight = '700'; }
    else if(fontWeight == 'bolder'){ convertedFontWeight = '900'; }
    else if(fontWeight == '100'){ convertedFontWeight = '100'; }
    else if(fontWeight == '200'){ convertedFontWeight = '200'; }
    else if(fontWeight == '300'){ convertedFontWeight = '300'; }
    else if(fontWeight == '400'){ convertedFontWeight = '400'; }
    else if(fontWeight == '500'){ convertedFontWeight = '500'; }
    else if(fontWeight == '600'){ convertedFontWeight = '600'; }
    else if(fontWeight == '700'){ convertedFontWeight = '700'; }
    else if(fontWeight == '800'){ convertedFontWeight = '800'; }
    else if(fontWeight == '900'){ convertedFontWeight = '900'; }
    else { convertedFontWeight = '400'; }

    //return
    return convertedFontWeight;

}

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function importImageFromUrl(){

	//variables
	var importedImageUrl = $('#import-image-url-field').val();


	if(directImportType == 'image'){

		$(rememberedImage).attr('src', importedImageUrl);

		$(rememberedImage).error(function() {

			$(rememberedImage).attr('src', rememberedImageUrl);

			notification('warning','Error',' - Couldn\'t load image', false);

		});

	}

	else {

		$(rememberedBackgroundImage).attr('background', importedImageUrl);
		$(rememberedBackgroundImage).css('background-image', 'url('+importedImageUrl+')');

	}

	closePopup();

}

//create the plain text file, which we add as an additional message to sent newsletters
function getPlainText(){

	plain_text = '';

	//fetch plain text
	$('[data-template-type="html"]').find('td').each(function(){

		//variables
		var el = $(this);

		//if the element contains table, skip
		if($(el).children('table').length) {}

		//if it doesn't contain any table, continue
		else {

			//variables
			var text = $(el).text();
			var text = text.replace(/<br\/>/g, '').replace(/\n/g, '').replace(/	/g, '').replace(/  /g, '').replace(/VIEW ONLINE/g, '').replace(/view online/g, '');
			var count = text.split(' ').length;

			//trim whitespace
			if($.trim($(el).html()) == '' || $.trim($(el).html()) == ' '){}

			//if element is empty, skip
			else if($(el).is(':empty')) {}

			//if element has blank space, skip
			else if(count == 1){}

			//if text has blank space, skip
			else if(text == ' '){}

			//seems good, fetch text
			else {

				//add to plain text variable
				plain_text = plain_text+text;
				plain_text = plain_text+'\r';

			}

		}

	});

	//append to the plain text file
	return plain_text;

}

//remove uploaded image
function removeUploadedImage(event){

	//variables
	var uploadedImageToken = $(event).closest('li').attr('data-vault-module-identifier');

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=removeUploadedImage",
	    data: { uploadedImageToken: uploadedImageToken }
	}).done(function(data) {

		$(event).closest('li').remove();

	});

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//initialise modules from cookie
function initialiseModulesFromCookie(){

	if(getCookie('localStorageImportModules') == '' && getCookie('localStorageFavoriteModules') == ''){

		if($('[data-vault-import-string]').attr('data-vault-import-string')  == '' && $('[data-vault-favorite-string]').attr('data-vault-favorite-string')  == ''){



		}

		else {

			$('[data-vault-favorite-string]').attr('data-vault-favorite-string', getCookie('localStorageFavoriteModules'))
			$('[data-vault-import-string]').attr('data-vault-import-string', getCookie('localStorageImportModules'))
			initialiseModulesFromVault();

		}

	}

	else {

		$('[data-vault-favorite-string]').attr('data-vault-favorite-string', getCookie('localStorageFavoriteModules'))
		$('[data-vault-import-string]').attr('data-vault-import-string', getCookie('localStorageImportModules'))
		initialiseModulesFromVault();

	}

}

//detect email registration for the welcome popup
function detectRegistrationEmailVerification(){

	//variables
	var emailVal = $('#welcome-input').val();

	if(emailVal.indexOf('@') >= 0 && emailVal.indexOf('.') >= 0 && $('#welcome-checkbox').hasClass('active')){

		$('#welcome-popup-submit').removeClass('disabled')

	}

	else {

		$('#welcome-popup-submit').addClass('disabled')

	}

}

function removeUnusedFonts(){

	//remove all installed fonts that are NOT found in the template
	$('#template-editing-canvas').find('[data-template-type="headers"] [data-font-name]').each(function(){

		//variables
		var foundFont = $(this).attr('data-font-name');
		var fontHasBeenFound = false;

		$('#template-editing-canvas [data-template-type="html"]').find('[data-size], [data-color]').each(function(){

			//variables
			var foundFontFamily = $(this).css('font-family').toLowerCase();

			if(foundFontFamily.indexOf(foundFont) >= 0){

				fontHasBeenFound =  true;

			}

		});

		if(fontHasBeenFound){


		}

		else {

			$('#template-editing-canvas [data-template-type="headers"]').find('[data-font-name="'+foundFont+'"]').remove();
			//console.log('removed: '+foundFont)

		}

	});

}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
