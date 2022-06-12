$(document).ready(function() {

	//click dropdown result
    $(document).on('click', '.dropdown-result', function(){

        openDropdown(this);

    }).on('mouseleave', '.dropdown', function(){

        //variables
        dropdown = $(this);
        dropdownTypeLeave = $(this).attr('data-dropdown');

        dropdownTimeout = setTimeout(function(){

            closeDropdown(dropdown);

        }, 400)

    }).on('mouseenter', '.dropdown', function(){

        //variables
        dropdownTypeEnter = $(this).attr('data-dropdown');

        if(dropdownTypeLeave == dropdownTypeEnter){ clearTimeout(dropdownTimeout); }

    });

    //on input welcome popup email
    $(document).on('keyup', '#welcome-input', function(){

        detectRegistrationEmailVerification();

    })

	//change dropdown
    $(document).on('click', '.dropdown li', function(){

        filterHasChanged = true;
        changeDropdownResult(this);

    });

	//imported favorited switch
    $(document).on('click', '.switch-section', function(){

        if($(this).hasClass('active')){

            $('.switch-section').removeClass('active');

        }

        else {

            $('.switch-section').removeClass('active');
            $(this).addClass('active');

        }

        initialiseVault();

    });

	//remove uploaded image
	$(document).on('click', '.remove-uploaded-image', function(e){

		//variables

		removeUploadedImage(this);

	});

	$(document).on('click', '#welcome-popup-submit', function(){

		$(location).attr('href','https://stampready.net/register')

	})

	//open welcome popup
	$(document).on('click', '[data-title="test"]', function(){

		openWelcomePopup();

	});

	$(document).on('mouseenter', '.highlighter-container li, #image-commands li', function(){

		$(this).parent().find('li:not(.image-tooltip-command-new, #tooltip-swatches li)').css('opacity','0.5')

		$(this).css('opacity','1')

	})

	$(document).on('mouseleave', '.highlighter-container li, #image-commands li', function(){

		$(this).parent().find('li').css('opacity','1')

	});

	//demo url click
	$(document).on('click', '#save-template-button-wrapper.demoMark', function(e){

		e.stopPropagation();

		$(location).attr('href', checkout);
		return false;

	})

	//prevent url open new tab
	$('body').on('click', 'a:not(#popup a, .read-more-checkout, .menu a, #go-to-vault-store-button a, .view-button)', function(e){

		e.preventDefault();

	});

	$(document).on('click', '#image-tooltip .create-edit-link-button', function(){

		hideCreateImageLinkTooltip();

	});

	$(document).on('click', '.editing-canvas-empty-state', function(){

		// class="canvas-empty-state"('Modules');
		//
		// activateNavigationItem('modules')

		$('[data-title="Modules"]').trigger('mousedown')

	})

	//on click module thumbnail
	$(document).on('click', '[data-menu-section="modules"] li:not(.module-accordion)', function(){

		if(moduleClickDisable){ return false; }
		moduleClickDisable = true;

		moduleType = $(this).attr('data-module-type');
		moduleIdentifier = $(this).attr('data-sidebar-module-identifier');
		moduleName = $(this).attr('data-module-name');

		$('#template-editing-canvas [data-template-type="html"]').append('<div class="ui-sortable-placeholder canvas-placeholder" data-sidebar-module-identifier="'+moduleIdentifier+'" style="height: 250px; display: block; opacity: 1;"><div class="placeholder-shadow-top" style="opacity: 0;"></div><div class="placeholder-shadow-bottom"></div><div class="placeholder-indicator" style="height: 100%;"><div class="placeholder-indicator-top"></div><div class="placeholder-indicator-bottom"></div></div></div>');

		//show canvas empty state icon
		$('.editing-canvas-empty-state').css({

			'top': '60%',
			'opacity': '0'

		});

		$('#canvas').animate({ scrollTop: $('[data-template-type="html"]').outerHeight() + 149 - $(document).height() }, globalAnimationSpeed * 1.5);

		loadModule(moduleType);

	})

	//on click feedback
	$(document).on('click', '#feedback-btn', function(){

		requestPopup('feedback');

	})

	//open module grouping section
	$(document).on('click', '.module-accordion', function(){

		openGroupingSection(this);

	});

	$(document).on('click', '.rate-switch [data-rate]:not(.active)', function(){

		changeRateSwitch(this);

	})

	//open module grouping section
	$(document).on('click', '#module-accordion-back-btn', function(){

		closeGroupingSection();

	})

	//create preview confirm button
	$(document).on('click', '#create-preview-confirm-button:not(.disabled)', function(){

		//create a live preview from the uploaded template
		createLivePreview();

	});

	//checkboxes
	$(document).on('click', '.checkbox-label', function(){

		//if checkbox is active, deactive. Vice versa.
		if($(this).find('.checkbox').hasClass('active')){ $(this).find('.checkbox').removeClass('active') }
		else{ $(this).find('.checkbox').addClass('active') }

        detectRegistrationEmailVerification();

	});

	$(document).on('click', '.select-all', function(){

		$(this).select();

	});

	//save template
	$(document).on('click', '#save-template-button-wrapper.active', function(){

		//save template
		saveTemplate();

	});

	//upload a file as a link
	$(document).on('click', '.tooltip-command-upload-file', function(){

		//trigger click uploaded file input
		$('#user-uploaded-file').trigger('click');

	});

	//add new module button (open vault)
	$(document).on('click', '.modules-vault-tab-add', function(){

		//open the vault
		openSpace('vault');

		//wait a little bit before initialising the vault
		setTimeout(function(){

			//if the initialise vault flag is not already set
			if(!initialiseVaultFlag){

				//initialise vault
				initialiseVault();

			}

		}, openSpaceSpeed * 5);

	});

	//save campaign and continue to send page
	$(document).on('click', '#save-continue', function(){

		continueToSendFlag = true;

		saveTemplate();

	});

	//reset the template, start over
	$(document).on('click', '#reset-template-button', function(){

		//request reset popup
		requestPopup('reset');

	});

	//scroll menu
	$('[data-menu-section="styles"]').on('scroll', function(){

		scrollTop = $('[data-menu-section="styles"]').scrollTop();

		$('.color-opacity-slider-wrapper').css('margin-top','-'+scrollTop+'px')

	})

	//click a vault module thumbnail
	$(document).on('click', '#vault-modules-canvas li img, .module-imported-overlay, #vault-modules-canvas .import-module', function(){

		//if the list container has a class of 'active'
		if($(this).closest('li[data-vault-module-identifier]').hasClass('active')){

			//remove the class 'active'
			$(this).closest('li[data-vault-module-identifier]').removeClass('active');

			//remove the module from imported
			removeModuleFromImport(this);

			//adjust the back-to-main button message
			adjustBackfromVaultButtonMessage('decrement');
		}

		//if it has not a class of 'active'
		else {

			//add the class of 'active'
			$(this).closest('li[data-vault-module-identifier]').addClass('active');

			//add the module to imported
			addModuleToImport(this);

			//adjust the back-to-main button message
			adjustBackfromVaultButtonMessage('increment');

		}

	});

	//back from vault button
	$(document).on('click', '.back-from-vault', function(){

		//wait a little bit
		setTimeout(function(){

			//initialise the modules from vault in the sidebar
			initialiseModulesFromVault();

			//save imported and favorited modules
			saveImportedFavoritedModules();

		}, openSpaceSpeed * 5);

	});

	//preview the vault module
	$(document).on('click', '[data-vault-option-type="preview"]', function(){

		//show the HTML version of the vault module
		showVaultModuleHtml(this);

	});

	//add or remove favorite status from a vault module
	$(document).on('click', '.favorite-module', function(){

		//if the module contains the class of 'active'
		if($(this).hasClass('active')){

			//remove the module from favorites
			removeModuleFromFavorite(this);

			//remove the class of 'active'
			$(this).removeClass('active');

		}

		//of the module does not contain a class of 'active'
		else {

			//add module to favorites
			addModuleToFavorite(this);

			//add the class of 'acitve'
			$(this).addClass('active');

		}

	});

	//add a new module to the sidebar
	$(document).on('click', '.add-new-vault-module-button', function(){

		// //animate the add new module button
		// animateAddNewModuleButton('start');
		//
		// //wait a little
		// setTimeout(function(){
		//
		// 	//open the vault
		// 	openSpace('vault');
		//
		// 	//wait a little before initialising the vault modules
		// 	setTimeout(function(){
		//
		// 		//if the flag is false
		// 		if(!initialiseVaultFlag){
		//
		// 			//initialise vault
		// 			initialiseVault();
		//
		// 		}
		//
		// 	}, openSpaceSpeed * 5);
		//
		// }, globalAnimationSpeed);

		//$(location).attr('href',vaultUrl)

	});

	//popupoverlay click event, to close the popup
	$(document).on('click', '#popupOverlay, #create-preview-wrapper, #close-create-preview-button, #welcome-popup-wrapper', function(){

		//closepopup
		closePopup();

	});

	//hide image command
	$(document).on('click', '.image-tooltip-command-hide', function(){

		//hide image
		hideImage();

	});

	//hide image command
	$(document).on('click', '.image-tooltip-command-link', function(){

		showCreateImageLinkTooltip();

	});


	//edit image command
	$(document).on('click', '.image-tooltip-command-edit', function(){

		//open the image editor canvas space
		openSpace('image-editor-canvas');

		//initialise the image to the canvas
		initialiseImageToCanvas();

	});

	//align text command
	$(document).on('click', '#command-align-text-button', function(){

		//variables
		var alignType = $(this).attr('data-align-type');

		alignText(alignType);

		setSaveActive();

	});

	//popup overlay click/close
	$(document).on('click', '#popup, #create-preview-popup, #welcome-popup', function(e){

		//stop other events from kicking in
		e.stopPropagation();

	});

	//save campaign, but only when active
	$(document).on('click', '#save-button.active', function(){

		//save the current template
		saveCampaign();

	});

	//click on repeatable button
	$(document).on('click', '.repeatable-button', function(e){

		//insert new repeatable data
		insertRepeatableModule(this);

	});

	//click on repeatable button
	$(document).on('click', '.removable-button', function(e){

		//insert new repeatable data
		removeRepeatableModule(this);

	});

	//back-to-main button
	$(document).on('click', '.back-to-main-button', function(){

		//open the main space
		openMainSpace();

	});

	//click on switch module arrow in code editor
	$(document).on('click', '#switch-module-arrow', function(){

		//present dropdown of modules
		openModuleDropdown();

	});

	//on click find and replace toggle button
	$(document).on('click', '#find-replace-toggle-button', function(){

		//if this has a class of 'active'
		if($(this).hasClass('active')){

			//remove class of 'active'
			$('#find-replace-toggle-button').removeClass('active')

			//hide the find and replace bar
			hideFindAndReplace();

		}

		//if not a class of 'active'
		else {

			//add class of 'active'
			$('#find-replace-toggle-button').addClass('active')

			//show find and replace bar
			showFindAndReplace();

		}

	});

	//on click of save button of the code editor
	$(document).on('click', '#save-code-button', function(){

		//if no subscription
		if(subscription != 'SUBSCRIPTION'){ requestPopup('no_subscription_code'); return false;}

		//update code editor preview
		updateCodePreview();

		setTimeout(function(){

			//save the code and apply to current template
			saveCode();

		}, 100);

	});

	//tooltip open swatches
	$(document).on('click', '.tooltip-command-open-swatches [type="button"]', function(){

		if($('#tooltip-swatches ul').is(':hidden')){ showTooltipSwatches(); }
		else { closeTooltipSwatches(); }

	});

	//tooltip create link
	$(document).on('click', '.tooltip-command-open-link [type="button"]', function(){

		//create a link on text selection (empty url, but wraps an A tag)
		createLink();

		//show the input field to type in an URL
		showCreateLinkTooltip();

	});

	//edit URL
	$(document).on('click', '.create-edit-link-button', function(){

		//variables
		var link = $('#link-value-holder').val();

		//add or change the link to the text selection
		changeLink(link);

	});

	//intercept click of data-module tag
	$(iframe).on('click', '[data-module]', function(event) {

		//variables
		// var el = $(this);
		// var module_name = $(this).attr('data-module');
		// var module_contents = $(this)[0].outerHTML;
		// var offset = $(this).position();
		//
		// var a = $('#code-editor-iframe').contents().find('[data-template-type="html"] > *').length;
		// var b = $('#code-editor-iframe').contents().find('[data-template-type="html"] > [data-module]').length;
		// var c = a - b;
		//
		// //$(this).closest('#template-editing-canvas').find(el).index('#template-editing-canvas [data-module]'); //make it global for later use
		// module_eq = $('#code-editor-iframe').contents().find(el).index();  //make it global for later use
		// module_eq = c - module_eq;
		// module_eq = Math.abs(module_eq)
		//
		// //open code editor module
		// openCodeEditorModule(module_name, module_contents);
		//
		// //scroll to module
		// scrollToCodeEditorModule(offset);
		//
		// //update the name
		// updateCodeEditorModuleName(module_name);
		//
		// //switch tab to html
		// switchCodeEditorTab('[data-tab-name="html"]');

	});

	//stop edit swatches button
	$(document).on('click', '.cancelEditMode', function(){

		//stop editing swatches
		editSwatches('stop');

	});

	//remove swatches
	$(document).on('click', '.removeSelectedSwatches', function(){

		//remove swatches
		removeSwatches();

	});

	//intercept click of links
	$(iframe).on('click', 'a', function(event) {

		//prevent default
		event.preventDefault();

	});

	//intercept click of links
	$(iframePreview).on('click', 'a', function(event) {

		//prevent default
		event.preventDefault();

	});

	//replace button
	$(document).on('click', '#replace-button.active', function(){

		//find and replace text in code editor
		findAndReplace();

	});

	//click on navigation item
	$(document).on('click', '.navigation-submenu li', function(e){

		//remove submenu
		removeSubmenu();

	});

	//save image
	$(document).on('click', '#save-image-button', function(){

		//variables
		editedImageData = $('#image-canvas-image').attr('src');
		cropOffsetX = parseInt($('#crop-window').css('left'));
		cropOffsetY = parseInt($('#crop-window').css('top'));
		cropWidth = parseInt($('#crop-window').outerWidth());
		cropHeight = parseInt($('#crop-window').outerHeight());

		//fetch selected image
		selectedImageWidth = selected_img_w;
		selectedImageHeight = selected_img_h;
		overlayTransparency = $('[data-name="image-overlay-opacity"]').val();
		overlayTransparencyColor = hexToRgbColorize($('.image-editing-color-field').val());
		overlayTransparencyColorRed = overlayTransparencyColor.r;
		overlayTransparencyColorGreen = overlayTransparencyColor.g;
		overlayTransparencyColorBlue = overlayTransparencyColor.b;
		imageOpacity = $('[data-name="image-opacity"]').val() / 100;
		filterName = $('#image-canvas-image').attr('data-filter');
		optimiseRetina = 'false';
		imageFlip = 'false';
		makeCircularBoolean = 'false';
		saveImageButtonText = $('#save-image-button').text();
		altTag = $('.alternate-tags-textarea').val();
		presentedImgWidth = $('#image-canvas-image').width();
		presentedImgHeight = $('#image-canvas-image').height();
		trueImgWidth = $('#image-canvas-image').prop('naturalWidth');
		trueImgHeight = $('#image-canvas-image').prop('naturalHeight');

		//save image server side
		saveImage();

	});

	//add new image button
	$(document).on('click', '#image-canvas-add-new', function(){

		//simulate a click
		$('#upload-image-to-canvas').trigger('click')

	});

	$(document).on('click', '#template-editing-canvas img', function(e){

		//stop all other events from kicking in
		e.stopImmediatePropagation();

		//remove class of 'selected-image'
		$('.selected-image').removeClass('selected-image');

		//add class of selected-image
		$(this).addClass('selected-image');

		//fetch selected image
		selected_img_w = $('.selected-image').width();
		selected_img_h = $('.selected-image').height();

		editImageFlag = true;
		editBackgroundImageFlag = false;

		selectMenuName = getFirstSelectItem('image-commands', 'name');
		selectMenuValue = getFirstSelectItem('image-commands', 'value');

		if(selectMenuName == 'addDivider'){ }

		else {

			removeFromSelect('image-commands', selectMenuName, selectMenuValue);

		}

		addToSelect('image-commands', selected_img_w+' x '+selected_img_h, 'disable', 'start')

		//$('[data-select-name="image-commands"]').attr('data-select-items','');
		//removeFromSelect('image-commands', lastVersionName, lastVersionValue);

		//show image tooltip
		showImageTooltip();

	});

	//detect brightness image vault click image
	$(document).on('click', '[data-image-navigation="image-uploads"] li', function(){

		//variables
		var image = $(this).find('img');


		//swap editing image
		swapEditingImage(image);

		//get the brightness of image and apply to image editing canvas
		getImageBrightness(image);

	});


	//on click of a module options
	$(document).on('click', '#canvas, .module-options', function(){

		//hide section
		//hideSection();

		//deactivate navigation item
		deactivateeNavigationItem();

		//hide image tooltip
		hideImageTooltip();

	})

	//stop other events from kicking in
	$(document).on('click', '#template-canvas, .module-option, .highlighter-container, #image-tooltip', function(e){

		e.stopPropagation();

	});

	//click on colorpicker value
	$(document).on('click', '.colorpicker-value', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//set flag to true
		//colorSliderOpacityMouseDown = true;

	});

	//remove data-module
	$(document).on('click', '[data-module-option="remove"]:not(.disabled)', function(e){

		e.stopImmediatePropagation();

		//variables
		var module = $(this).closest('[data-module]');

		//remove module
		removeModule(module);

	});

	//duplicate module
	$(document).on('click', '[data-module-option="duplicate"]:not(.disabled)', function(){

		//duplicate module
		var module = $(this).closest('[data-module]');

		//duplicate module
		duplicateModule(module)

	});

	//duplicate module
	$(document).on('click', '[data-module-option="feed"]:not(.disabled)', function(){

		//duplicate module
		module = $(this).closest('[data-module]');

		//request popup
		requestPopup('feed');

	});

	//open code of module
	$(document).on('click', '[data-module-option="code"]:not(.disabled)', function(){

		//if no subscription
		if(mode == 'demo'){ requestPopup('unpaid'); return false;}
		if(subscription != 'SUBSCRIPTION'){ requestPopup('no_subscription_code'); return false;}

		//variables
		var el = $(this).closest('[data-module]');
		var module_name = $(this).closest('[data-module]').attr('data-module');
		var module_contents = $(this).closest('[data-module]')[0].outerHTML;
		module_eq = $(this).closest('#template-editing-canvas').find(el).index('#template-editing-canvas [data-module]'); //make it global for later use



		//open the code editor
		openCodeEditorModule(module_name, module_contents, module_eq);

		//refresh code editor
		editor.refresh();

		//open space code editor
		openSpace('code-editor-canvas');
		var offset = $(this).closest('[data-module]').position();

		//empty iframe
		$('#code-editor-iframe').contents().find('body').empty();

		//wait a little
		setTimeout(function(){

			//initialise iframe
			initialiseIframe();

			//update the name of the module
			updateCodeEditorModuleName(module_name);

			//scroll to correct module
			scrollToCodeEditorModule(offset);

			//switch tab to html
			switchCodeEditorTab('[data-tab-name="html"]');

		}, openSpaceSpeed * 6.8);

	});

	//fullscreen
	$(document).on('click', '[data-menu-action="fullscreen"]', function(){

		//open template in new tab
		fullscreen();

	});

	//change font button
	// $(document).on('mousedown', '.font-button', function(){
	//
	// 	//variables
	// 	var attr_name = $(this).closest('li').find('span').text();
	// 	selected_element_current_font_family = $('#template-editing-canvas .selected-element').closest('[data-module]').find('[data-size="'+attr_name+'"]').css('font-family'); //global
	//
	// 	//set preview font to current font family
	// 	$('.font-preview-text').css('font-family', selected_element_current_font_family);
	//
	// 	//set headline in top bar of font editor
	// 	$('.font-editor-top-bar-headline span').text(attr_name)
	//
	// 	//initialise used fonts
	// 	initialiseUsedFonts();
	//
	// 	//open font editor canvas
	// 	openSpace('font-editor-canvas');
	//
	// });

	//import fonts button
	$(document).on('click', '.import-fonts-button', function(){

		//install font
		installFont();

		//open main space
		openMainSpace();

		setSaveActive();

	});

	//show editing canvas
	$(document).on('click', '#show-editing-canvas', function(){

		//show editing canvas
		showEditingCanvas();

	});

	//click on image in #image-database-canvas
	$(document).on('click', '#image-database-canvas img', function(){

		//show image editing canvas
		showEditingCanvas();

		setImageFromDatabaseToEditingCanvas(this);

	});

	$(document).on('click', '.back-to-gallery', function(e){

		e.stopPropagation();

		hideEditingCanvas();

	});















	/* Change events */

	//on change of user uploaded file to attach to a link
	$(document).on('change', '#user-uploaded-file', function(event){

		//prevent default browser behavior
		event.preventDefault();

		//upload the file
		uploadFile();

	});

	//upload image to canvas
	$(document).on('change', '#upload-image-to-canvas', function(){

		//variables
		imageName = $('#upload-image-to-canvas').val();

		if(imageName.indexOf('.gif') >= 0){

			//prevent default browser behavior
			event.preventDefault();

			//upload the file
			uploadFile();

			return false;

		}

		//preview image to canvas
		previewImageToCanvas(this);

		//if the current space is not 'image-editor-canvas'
		if(!$('[data-space="image-editor-canvas"]').hasClass('active')){

			//openspace image editor canvas
			openSpace('image-editor-canvas');

		}

	});

	//on palette list change
	$(document).on('change', '#switch-swatch', function(){

		//variables
		var swatch_name = $(this).find('option:selected').val();

		//switch swatch
		switchSwatch(swatch_name);

	})

	$(document).on('change, keyup', '.colorpicker-value', function(){

		newlyCreatedColor = false;

	})












	/* Mousedown events */



	//mousedown label switch
	$(document).on('mousedown', '.label-switch [data-rate]', function(){

		//variables
		tab = $(this).attr('data-label-switch')

		adjustImageEditorNavigation(tab);

	});




	//prevent default data-space="image-editor-canvas" span
	$(document).on('mousedown', '[data-space="image-editor-canvas"] #vault-top-bar-filter-navigation li', function(e){

		e.stopPropagation();
		e.stopImmediatePropagation();

		// //notification
		// notification('warning', 'Disabled', 'This navigation is still being developed');
		//
		// return false;

	})

	$(document).on('mousedown', '.toggle-switch', function(e){

		e.stopPropagation();
		e.stopImmediatePropagation();

		colorSliderOpacityMouseDown = true;

		//variables
		switchElement = $(this);
		switchName = $(this).attr('data-switch-name');

		//toggle switch on or off
		toggleSwitch(switchElement, switchName);

	});

	$(document).on('mousedown', '.menu', function(){

		$('.colorpicker-value').addClass('unfocussed');

	})

	//font button
	$(document).on('mousedown', '[data-module].ui-resizable-handle', function(){

		$(this).addClass('active');

	});

	$(document).on('mousedown', '.font-button', function(){

		//variables
		attrName = $(this).closest('li').find('span').attr('data-attr-name');

		$('.font-button').removeClass('active');
		$(this).addClass('active');

		//reset current fontfamly flag
		currentFontFamily = $('.selected-table').find('[data-size="'+attrName+'"], [data-color="'+attrName+'"]').css('font-family');
		currentFontWeight = $('.selected-table').find('[data-size="'+attrName+'"], [data-color="'+attrName+'"]').css('font-weight');

	});

	$(document).on('mousedown', '.background-images-button', function(){

		$('.background-images-button').removeClass('active');
		$(this).addClass('active');

	});

	//background images button
	$(document).on('mousedown', '.background-images-button', function(){

		editImageFlag = false;
		editBackgroundImageFlag = true;

	});

	//create palette from template colors
	$(document).on('mousedown', '.createPaletteFromTemplateColors', function(e){

		e.stopImmediatePropagation();

		//open popup
		requestPopup('createPaletteFromTemplateColors');

	});

	//add new color to palette button
	$(document).on('mousedown', '#addNewColorButton', function(e){

		//stop all other events
		e.stopImmediatePropagation();

		//set color slider opacity flag to true
		colorSliderOpacityMouseDown = true;

		//add new color
		addNewColor();

	});

	//add new color to palette button
	$(document).on('mousedown', '#addNewPaletteFromBase', function(e){

		//stop all other events
		e.stopImmediatePropagation();

		//set color slider opacity flag to true
		colorSliderOpacityMouseDown = true;

		//variables
		totalPalettes = $('#styles-swatches h6 [data-select-items]').attr('data-select-items').split(";").length - 5;

		//if maximum amount of palettes is reached
		if(totalPalettes >= maxAmountPalettes){

			//notificiation
			notification('warning','Maximum Palettes','You can\'t have more than '+maxAmountPalettes+' color palettes', false);
			return false;

		}

		//add new color
		requestPopup('create_palette');

	});

	//show imported modules
	$(document).on('mousedown', '.modules-vault-tab-import', function(){

		//show imported modules
		showVaultModules('import');

	});

	//show favorited modules
	$(document).on('mousedown', '.modules-vault-tab-favorite', function(){

		//show favorited modules
		showVaultModules('favorite');

	});

	//filter button in vault
	$(document).on('mousedown', '[data-space="vault"] [data-tab-filter]', function(){

		//clear the timeout if it was set
		clearTimeout(filterVaultTimeout);

		//set a new timeout for the filter in the vault
		filterVaultTimeout = setTimeout(function(){

			//initialise the vault with new modules by filter
			initialiseVault();

		}, 1000);

	});

	//filter button in vault
	$(document).on('mousedown', '[data-space="image-editor-canvas"] [data-tab-filter], [data-space="image-editor-canvas"] .label-switch', function(){

		//clear the timeout if it was set
		clearTimeout(filterImageDatabaseTimeout);

		//variables
		filterTab = $(this).attr('data-tab-filter');

		if(filterTab == 'uploaded' || filterTab == 'gallery'){

			$('[data-filter-group="section"] li').not(this).removeClass('active');

		}

		//set a new timeout for the filter in the vault
		filterImageDatabaseTimeout = setTimeout(function(){

			//initialise the vault with new modules by filter
			initialiseImageDatabase();

		}, 1000);

	});

	//mousedown on an element that contains a menu
	$(document).on('mousedown', '[data-select-items]', function(){

		//variables
		var el = $(this);
		var elName = $(this).attr('data-select-name');

		if(elName == 'background-images'){

			addBackgroundFormatToMenu(el);

		}

		//show menu
		showSelect(el);

	});

	//close menu
	$(document).on('mousedown', '#select-menu-wrapper', function(e){

		//stop all other events
		e.stopPropagation();

		//hide menu
		hideSelect();

	});

	//mousedown on primary number
	$(document).on('mousedown', '.primary-number', function(){

		//if the clicked element has a class of 'primary-set'
		if($(this).hasClass('primary-set')){

			//remove the primary number
			$(this).remove();

			//count primary colors
			countPrimaryColors();

		}

		//remove all active primary numbers
		$('.primary-number').removeClass('active');

		//add a class of 'active' to it
		$(this).addClass('active');

	});

	//confirm primary colors
	$(document).on('mousedown', '.confirmPrimaryColors', function(){

		//save primary colors
		savePrimaryColors();

	});

	//prevent events from running when clicking on the image editing canvas
	$(document).on('mousedown', '[data-space="image-editor-canvas"]', function(e){

		//stop other events from kicking in
		e.stopPropagation();

		//hide image overlay color picker
		hideImageOverlayColorpicker();

	});

	$(document).on('mousedown', '.image-editing-color-field', function(e){

		e.stopPropagation();

	});

	$(document).on('mousedown', '.slider', function(e){

		e.stopPropagation();

	});

	//prevent event from kicking in
	$(document).on('mousedown', '.select-menu', function(e){

		//prevent events from kicking in
		e.stopImmediatePropagation();

	});

	//detect the cursor position of a thumbnail
	$(document).on('mousedown', '.menu li.ui-draggable, [data-module-option="drag"]', function(e){

		//variables
		cursorPosition = e.pageY;
		currentScrollHeight = $('#canvas')[0].scrollHeight;
		currentScrollbarPosition = $('#canvas').scrollTop();

	});

	$(document).on('mousedown', '[data-module-option="drag"]', function(){

		moduleOptionDragFlag = true;

	});

	//mousedown on sidebar
	$(document).on('mousedown', '#sidebar', function(e){

		//hide styles swatches
		hideStylesSwatches();

		//hide the colorpicker
		hideColorpicker();

		colorSliderOpacityMouseDown =  false;

		//add unfocussed state
		$('.colorpicker-value').addClass('unfocussed');

	});

	//popup overlay click/close
	$(document).on('mousedown', '.module-options div', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();
		e.stopPropagation();

	});

	//mousedown on tab filter
	$(document).on('mousedown', '[data-tab-filter]', function(){

		el = $(this);

		if($('[data-space="image-editor-canvas"]').hasClass('active') && $('[data-label-switch="uploads"]').hasClass('active')){

			$('[data-tab-filter="image"], [data-tab-filter="icon"]').removeClass('active');
			$(el).toggleClass('active');
			return false;


		}

		//if the tab has a class of 'active'
		if($(this).hasClass('active')){

			//remove the class of active
			$(this).removeClass('active');

		}

		//if not
		else {

			//add a class of active
			$(this).addClass('active');

		}

	});

	//switch tab (html, css, meta) in code editor
	$(document).on('mousedown', '.code-editor-tab:not(.active)', function(){

		//switch tab
		switchCodeEditorTab(this);

	});

	//mousedown on a swatch in tooltip
	$(document).on('mousedown', '#tooltip-swatches [type="button"]', function(){

		//variables
		var swatch = $(this);
		isMouseDown = true;

		//add color to text selection or link
		addColorToSelection(swatch);

	});

	//mousedown on repeatable button stop other events from kicking in
	$(document).on('mousedown', '.repeatable-button, .removable-button', function(e){

		e.stopImmediatePropagation();

	});

	//mousedown on td img in template editing canvas
	$(document).on('mousedown', 'td img', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();
		e.stopPropagation();

		//variables
		var element = $(this).closest('td');
		var module = $(this).closest('[data-module]');

		// //make the closest td editable
		// makeEditingElementSelected(element);
		//
		// //initialise styles
		// initialiseStyles(module);
		//
		// //activate navigation item
		// activateNavigationItem('[data-title="Styles"]');
		//
		// //hide color opacity slider
		// hideColorOpacitySlider();

		$('.colorpicker-value:not(.unfocussed)').addClass('unfocussed');

		//hide styles swatches
		hideStylesSwatches();

		//hide colorpicker
		//hideColorpicker();

	});


	//mousedown on td (not the very first in a module)
	$(document).on('mousedown', '[data-template-type="html"] *:not(table, tr, tbody, img, .ui-resizable-ne)', function(e) {

		//stop other events from kickin in
		e.stopImmediatePropagation();

		//variables
		clickedElement = $(this);
		clickedElementColor = $(this).attr('data-color');
		closestElementColor = $(this).closest('[data-color]').attr('data-color')
		clickedElementBgColor = $(this).closest('[data-bgcolor]').attr('data-bgcolor');
		currentFocussedAttr = $('.colorpicker-value:not(.unfocussed)').closest('li').find('span').attr('data-attr-name');
		var module = $(this).closest('[data-module]');
		tagName = e.target.tagName;
		clickedElementHeight = $(this).height();
		clickedElementWidth = $(this).width();
		clickedElementAllowThreshold = 15; //minimum height/width should have to allow it to be editable
		memoryElement = $(this);
		memoryclickedElementBgColor = '';
		editableMode = 'size';

		$('a.targeted-text-selection').removeClass('targeted-text-selection');
		$('a.selected-element').removeClass('selected-element');
		$('.selected-element').removeClass('selected-element');

		if($(this).hasClass('selected-element')){  }
		else {

			$('a.selected-element').removeClass('selected-element');
			editLinkMode = false;

			if(clickedElementColor == undefined && closestElementColor != undefined){

				clickedElementColor = closestElementColor;

			}

			activateNavigationItem('[data-title="Styles"]');

			if(currentFocussedAttr == clickedElementColor && currentFocussedAttr !== undefined && $(this).closest('[data-module]').hasClass('selected-table') || currentFocussedAttr == clickedElementBgColor && clickedElementColor == undefined && $(this).closest('[data-module]').hasClass('selected-table')){

				$('.selected-table').removeClass('selected-table')
				$(this).closest('[data-module]').addClass('selected-table');

				if(tagName == 'TD'){

					if($(this).find('td').length > 0){

						return false;

					}

				}

				//make the closest td editable
				makeEditingElementSelected(clickedElement);

				//open section styles
				openSection('Styles');

			}

			else {

				$('.selected-table').removeClass('selected-table')
				$(this).closest('[data-module]').addClass('selected-table');

				//hide image tooltip
				hideImageTooltip();

				if(tagName == 'TD'){

					if($(this).find('td').length > 0){ }
					else if(clickedElementHeight < clickedElementAllowThreshold || clickedElementWidth < clickedElementAllowThreshold){


					}
					else { makeEditingElementSelected(clickedElement); }

				}

				else {

					//make the closest td editable
					makeEditingElementSelected(clickedElement);

				}

				//initialise styles
				initialiseStyles(module);

				//activate navigation item
				activateNavigationItem('[data-title="Styles"]');

				//hide color opacity slider
				hideColorOpacitySlider();

				//hide styles swatches
				//hideStylesSwatches();

			}

		}

	});

	//on mousedown any td item
	$(document).on('mousedown', '#template-editing-canvas [data-color], #template-editing-canvas [data-bgcolor], #template-editing-canvas [data-size]', function(e) {

		e.stopPropagation();

		//variables
		clickedElement = $(this);
		clickedElementColor = $(this).attr('data-color');
		clickedElementBgColor = $(this).attr('data-bgcolor');
		closestElementBgColor = $(this).closest('[data-bgcolor]').attr('data-bgcolor');
		currentFocussedAttr = $('.colorpicker-value:not(.unfocussed)').closest('li').find('span').attr('data-attr-name');
		hasSelectedTable = false;
		editableMode = 'bgcolor';

		if($(this).hasClass('selected-table') || $(this).closest('[data-module]').hasClass('selected-table') && editableMode !== 'size'){

			hasSelectedTable = true;

		}

		$('.selected-table').removeClass('selected-table')
		$('a.selected-element').removeClass('selected-element');

		if($(this).attr('data-module')){ var module = $(this); $(this).addClass('selected-table'); }
		else { var module = $(this).closest('[data-module]'); $(this).closest('[data-module]').addClass('selected-table'); }

		if(hasSelectedTable && memoryclickedElementBgColor == clickedElementBgColor){

			openSection('Styles');
			//activate navigation item
			activateNavigationItem('[data-title="Styles"]');
			return false;

		}

		$('.selected-element').removeClass('selected-element');

		//initialise styles
		initialiseStyles(module);

		//activate navigation item
		activateNavigationItem('[data-title="Styles"]');

		//hide the image tooltip
		hideImageTooltip();

		memoryElement = $(this);
		memoryclickedElementBgColor = $(this).attr('data-bgcolor');

	});

	//on mousedown on one of the navigations items, but not any active or one with a data-submenu tag
	$(document).on('mousedown', '[data-menu="main"] > li:not(.active)', function(){

		//cleartimeout
		clearTimeout(t);

		//hide title tooltip
		hideTitleTooltip();

		//variables
		var target = $(this);
		var title = $(this).attr('data-title');

		//activate menu item
		activateNavigationItem(target);

		if(title == 'Styles'){

			openSection(title);

		}

		if(title == 'Modules'){

			openSection(title);

		}

	});

	//mousedown on submenu
	$(document).on('mousedown', '[data-menu="main"] [data-submenu], #user-avatar', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//hide the section
		hideSection();

		//variables
		section = $(this).attr('data-title');

		//if submenu has already been activated
		if($(this).hasClass('submenu-activated')){

			//stop script from running further
			return false;

		}


		//if navigation submenu exists
		if($('.navigation-submenu').length > 0){

			//remove submenu
			removeSubmenu();

		}

		if(section == 'Account'){

			$('.menu > li').removeClass('active');

		}

		//present submenu
		presentSubmenu(this);

		//deactivate navigation item
		//deactivateeNavigationItem();

	});

	//mousedown on data-tab attribute
	$(document).on('mousedown', '[data-tab]', function(){

		//variables
		var tab = $(this);

		//switch the tab
		switchTab(tab);

		//switch image navigation tab
		switchImageNavigation(tab);

	});

	//mousedown on data-tab 'image-uploads'
	$(document).on('mousedown', '[data-tab="image-uploads"]', function(){

		//initialise editing images
		initialiseEditingImages(); // detects whether each image should have a padding or not

	});

	//mousedown on body
	$(document).on('mousedown', 'body', function(){

		//hide the tooltip
		hideTooltip();

		//hide image tooltip
		hideImageTooltip();

		//hide coloropacity slider
		hideColorOpacitySlider();

		//add a class of 'unfocussed' on the opacity addon attribute
		$('[data-opacity-addon]').addClass('unfocussed');

	});

	//mousedown on image tooltip
	$(document).on('mousedown', '#image-tooltip', function(e){

		//stop other events from kicking in
		e.stopPropagation();

	})

	//mousedown on highlighter-container
	$(document).on('mousedown', '.highlighter-container', function(e){

		//stop other events from kicking in
		e.stopPropagation();

	});

	//mousedown on styles swatches
	$(document).on('mousedown', '#styles-swatches', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//set flag to true
		colorSliderOpacityMouseDown = true;

	});

	//mousedown on appearances slider
	$(document).on('mousedown', '.appearances-slider', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//set flag to true
		colorSliderOpacityMouseDown = true;

		//hide tooltip
		hideTooltip();

		//hide image tooltip
		hideImageTooltip();

	});

	//mousedown on styles swatches
	$(document).on('mousedown', '#styles-swatches', function() {

		//set mousedown flag to true
		isMouseDown = true;

	});

	//mousedown on swatches list
	$(document).on('mousedown', '#styles-swatches li', function() {

		//if edit mode is active
		if($('.editSwatchesMode').length > 0){

			//if the swatch has already the selected state, undo
			if($(this).hasClass('swatch-selected')){

				//remove class of 'swatch-selected'
				$(this).removeClass('swatch-selected');

			}

			else {

				//add class of 'swatch-selected'
				$(this).addClass('swatch-selected');

			}

			//count selected swatches
			countSelectedSwatches();

			return false;

		}

		//if edit primary color mode
		else if($('.editPrimaryMode').length > 0){

			//stop events from running further
			return false;

		}

		//set mousedown flag to true
		isMouseDown = true;

		//variables
		var color = $(this).find('[type="button"]').attr('data-color');
		var swatch = $(this);

		//attach color
		attachSwatchColor(color, swatch);
		setSaveActive();

	});

	//mousedown on opacity slider
	$(document).on('mousedown', '.color-opacity-slider-wrapper', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//set flag to true
		colorSliderOpacityMouseDown = true;

	});

	//select a font
	$(document).on('mousedown', '.font-wrapper', function(){

		//variables
		var font_name = $(this).attr('data-font-name');
		var font_bar = $('.font-editor-styles-bar:not(.initialise)');
		var el = $(this);

		//remove the font bar
		$(font_bar).remove();

		//if this has a class of 'active'
		if($(this).hasClass('active')){

			//show back button
			$('[data-space="font-editor-canvas"] .back-to-main-button').show();

			//hide import font button
			$('[data-space="font-editor-canvas"] .import-fonts-button').hide();

			//font
			$('.font-preview-text').css('font-family', selected_element_current_font_family);

			//remove active state
			$('.font-wrapper').removeClass('active');

			//stop script from running further
			return false;

		}

		//if this has not a class of 'active'
		else {

			//remove active state
			$('.font-wrapper').removeClass('active');

			//add active state
			$(this).addClass('active');

			//initialise styles bar
			initialiseFontBar(el);

		}

		//if one of these elements are visible
		if ($('#font-editor-main-left .font-editor-styles-bar [data-font-sub-family="'+font_sub_family+'"]:visible').length > 0) {

			//set font sub family
			$('#font-editor-main-left .font-editor-styles-bar').find('[data-font-sub-family="'+font_sub_family+'"]').trigger('mousedown');

		}

		//if not visible
		else {

			//show back button
			$('[data-space="font-editor-canvas"] .back-to-main-button').show();

			//hide import font button
			$('[data-space="font-editor-canvas"] .import-fonts-button').hide();

		}

	});

	//mousedown on a font family
	$(document).on('mousedown', '#font-editor-main-left .font-editor-styles-bar li', function(){

		//variables
		font_sub_family = $(this).attr('data-font-sub-family');
		font_name = $(this).attr('data-font-family');

		//remove active state
		$('.font-editor-styles-bar li').removeClass('active');

		//add active state
		$(this).addClass('active');

		//hide back button
		$('[data-space="font-editor-canvas"] .back-to-main-button').hide();

		//show import font button
		$('[data-space="font-editor-canvas"] .import-fonts-button').show();

		//load font
		loadPreviewFont(font_name);

	});

	$(document).on('click', '.center-crop-window', function(){

		centerCropWindow();

	})

	// $(document).on('mousedown', '[data-styles-section="font-families"] [data-select-items]', function(){
	//
	// 	$('[data-styles-section="font-families"] [data-select-items]').removeClass('active');
	// 	$(this).addClass('active');
	//
	// });












	/* Keydown events */

	$(document).on('keydown', 'td', function(){

		//hide tooltip for text commands
		hideTooltip();

		//hide the tooltip for image commands
		hideImageTooltip();

		//set the save button to active
		setSaveActive();

	});

	//keydown on template-editing-canvas 'a' and 'span' tags
	$(document).on('keydown', '#template-editing-canvas a, #template-editing-canvas span', function (e) {

		//if event is 'backspace'
		if (event.keyCode == 8) {

			//detect to remove the element
		    detectRemoveElement(this);

		}

	});

	//on keydown in the template-editing-canvas
	$(document).on('keydown', '#template-editing-canvas', function (e) {

		//variables
		var el = getSelectionContainerElement();

		//if element is 'a' or 'span'
		if($(el).is('a') || $(el).is('span')){

			//if keycode is left, up, right, down
			if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {

				//variables
				var selInfo = getSelectionTextInfo(el);

				//if keycode is left
				if (e.keyCode == 37){

					//if selection at start is present
					if(selInfo.atStart){

						//set the parent element a attribute of contenteditable true
						$(el).parent().attr('contenteditable','true');

						//remove contenteditable on element
						$(el).removeAttr('contenteditable');

					}

				}

				//if keycode is right
				else if (e.keyCode == 39){

					//if selection at end is present
					if(selInfo.atEnd){

						//set the parent element a attribute of contenteditable true
						$(el).parent().attr('contenteditable','true');

						//remove contenteditable on element
						$(el).removeAttr('contenteditable');

					}

				}

		    }

		}

	});

	//nummeric only
	$(document).on('keydown', '.nummeric-only', function(e){

		//chain of allowable keycodes
		-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault();

	});




	/* drag start events */
	$(document).on('dragstart', '.menu li img', function(event) {

		event.preventDefault()

	});








	/* Mousemove events */

	$(document).mousemove(function(e) {

		if(outOfCanvasFlag){ return false; }

		var p = $('#template-editing-canvas').offset();
		mouseX = e.pageX - p.left + 4;
		mouseY = e.pageY;
		height_ui = $('.ui-sortable-placeholder').height();
		$('.ui-sortable-placeholder').show();

		count = $('#template-editing-canvas [data-template-type="html"] [data-module]').size();


		if ($('.ui-draggable.ui-draggable-dragging').length > 0) {

				if ($(count).length > 0) {

					templateEditingCanvasHalf = parseInt($('#template-editing-canvas').width()) / 2;

					a = maxElementHeight / templateEditingCanvasHalf;
					b = mouseX * a;

					if(mouseX > templateEditingCanvasHalf){

						c = (maxElementHeight * 2) - b;

						$('.ui-sortable-placeholder').css('height',c+'px');

						currentPlaceholderHeight = c;

					}

					else {

						$('.ui-sortable-placeholder').css('height',b+'px');

						currentPlaceholderHeight = b;

					}

				}

				else {

					$('.ui-sortable-placeholder').css('height',maxElementHeight+'px');

					$('.placeholder-indicator').hide();

					 $('.ui-sortable-placeholder').css('opacity','0')

					 currentPlaceholderHeight = maxElementHeight;

				}

				$('.editing-canvas-empty-state').addClass('active')


		}

	});

	//mousemove on body (dynamic shadow)
	$(document).on('mousemove', function(e){

		//if moduleActiveFlag or placeHolderFlag is set to true
		if(moduleActiveFlag || placeHolderFlag){

			if(moduleOptionDragFlag) {

				$('#template-editing-canvas [data-template-type="html"]').sortable('refresh');
				adjustSortableScrollbar(e);

			}

			else {

				$('#template-editing-canvas [data-template-type="html"]').sortable('refresh');

				//adjust the module dragging shadow
				adjustModuleDraggingShadow(e);

			}

		}

	});

	//mousemove on data repeatable tag
	$(document).on('mousemove', '[data-repeatable]', function(e){

		//variables
		repeatableOffset = $(this).offset();
		repeatableMouseX = e.pageX;
		repeatableMouseY = e.pageY;
		repeatableMouseX = repeatableMouseX - repeatableOffset.left;
		repeatableMouseY = repeatableMouseY - repeatableOffset.top;
		windowWidth = $(window).width() / 2;
		windowHeight = $(window).height() / 2;
		sidebarWidth = $('#sidebar').width();
		elementWidth = $(this).width();
		elementHeight = $(this).height();
		repeatableButtonOffsetX = -15;
		repeatableButtonOffsetY = -10;

		//measure offset
		a = (repeatableMouseX * repeatableButtonOffsetX) / elementWidth
		b = (repeatableMouseY * repeatableButtonOffsetY) / elementHeight;

		//calculate final positions
		final_a = a - repeatableButtonOffsetX;
		final_b = b;

		//set offset
		$('.repeatable-button-wrapper, .removable-button-wrapper').css('transform', 'translate('+final_a+'px, '+final_b+'px)');

	});



	/* mouse enter elements */
	$(document).on('mousedown', '[data-template-type="html"] *:not(table, tr, tbody, img, [contentedtiable="true"])', function(e) {

		$('[contenteditable]').removeAttr('contenteditable');
		$(this).attr('contenteditable','true')

	});






	/* Mouseenter events */

	$(document).on('mouseenter', '[data-module] .ui-wrapper', function(){

		showResizableImageHandle(this)

	})

	$(document).on('mouseenter', '[data-module]', function(){

		//initialiseResizableImages(this)

	})

	$(document).on('mouseenter', '.menu[data-menu="main"] [data-title]', function(){

		$('.menu[data-menu="main"] [data-title]:not(.active)').css('opacity','0.5');

		$(this).css('opacity','1');

	});

	//enter a vault module thumbnail
	$(document).on('mouseenter', '#vault-modules-canvas li', function(){

		//variables
		var module = $(this);

		//set a timeout before showing the vault module options
		// showVaultModuleOptionsTimeout = setTimeout(function(){
		//
		// 	//show vault module options
		// 	showVaultModuleOptions(module);
		//
		// }, 500);

	});

	//enter a menu item
	$(document).on('mouseenter', '.select-menu li:not([data-select-item-value="disable"])', function(){

		//if the menu flag is set to true, stop this event
		if(selectMenuFlag){ return false; }

		//remove the active state
		removeSelectActive();

		//add select state
		addSelectActive(this);

	});

	//show last saved message
	$(document).on('mouseenter', '#save-button-wrapper, .last-saved-message', function(){

		//clear time out for last saved message
		clearTimeout(lastSavedMessageTimeout);

		//show last saved message
		showLastSavedMessage();

	});

	//mouseenter data repeatable tag
	$(document).on('mouseenter', '[data-repeatable]', function(){

		//if repeatable button removed timeout is active, stop from running further
		if(repeatableButtonRemovedTimeout){ return false; }

		//show repeatable buttons
		presentRepeatable(this);

	});

	//if mousedown and mouseover swatches in toolip, add color
	$(document).on('mouseenter', '#tooltip-swatches [type="button"]', function(){

		//variables
		var swatch = $(this);
		var swatchIndicator = $(this).parent();

		//of mouse is down, add color
		if(isMouseDown){

			//add color to text selection or link
			addColorToSelection(swatch);

		}

	});

	//mouseenter on navigation menu, to show the tooltip
	$(document).on('mouseenter', '[data-menu="main"] > li:not(.active)', function(e){

		/*
//cleartimeout
		clearTimeout(t);

		//variables
		var el = $(this);

		//set timeout
		t = setTimeout(function(){

			showTitleTooltip(el);

		}, 750)
*/

	});

	//mouseenter on navigation submenu item
	$(document).on('mouseenter', '#sidebar, .navigation-submenu', function(e){

		//clear timeout
		clearTimeout(navigationSubmenuTimeout);

		presentAvatarMenu();

	});

	//mouseenter on submenu if it's the first of type
	$(document).on('mouseenter', '.navigation-submenu li:first-of-type', function(){

		//add a class of 'active'
		$('.navigation-submenu-tip').addClass('activated');

	});

	//mouse enter data module
	$(document).on('mouseenter', '[data-module]', function(){

		//variables
		var module = $(this);

		//timeout
		t = setTimeout(function(){

			//show module options
			showModuleOptions(module);

		}, globalAnimationSpeed * 2.5);

	});

	//mousedown on a swatch
	$(document).on('mouseenter', '#styles-swatches li', function(){

		if($(this).find('#addNewColorButton, #addNewPaletteFromBase').length > 0){ return false; }

		//show swatch indicator
		showSwatchIndicator(this);

		//if mousedown flag is active
		if(isMouseDown){

			//variables
			var color = $(this).find('[type="button"]').attr('data-color');
			var swatch = $(this);

			//attach color
			attachSwatchColor(color, swatch);

		}

	});

	$(document).on('mouseenter', '[data-module-type]', function(){

		initialiseSortable();

	})

	//show & hide handle bars for mobile preview
	$(document).on('mouseenter', '#mobile-preview-wrapper', function(){

		//show resize handle
		$('.resize-handle').show();

	});

	//preview font in template
	$(document).on('mouseenter', '[data-select-menu-name="font-family-menu"] li:not([data-select-item-value="new_font"])', function(){

		//variables
		var font_name = $(this).text();
		var font_value = $(this).attr('data-select-item-value');
		var font_family = font_value.split('-')[0];
		var font_weight = font_value.split('-').pop();

		attrName = $('.font-button.active').closest('li').find('span').attr('data-attr-name');

		$(effectTarget).find('[data-size="'+attrName+'"], [data-color="'+attrName+'"]').css('font-family', font_family).css('font-weight',getFontWeightInt(font_weight));
		$(effectTarget+'[data-size="'+attrName+'"], '+effectTarget+'[data-color="'+attrName+'"]').css('font-family', font_family).css('font-weight',getFontWeightInt(font_weight));

	});

	$(document).on('mouseenter', '[data-select-item-value="new_font"]', function(){

		$(effectTarget).find('[data-size="'+attrName+'"]').css('font-family', currentFontFamily);
		$(effectTarget+'[data-size="'+attrName+'"]').css('font-family', currentFontFamily);

	});












	/* Mouseleave events */

	$(document).on('mouseleave', '[data-module] .ui-wrapper', function(){

		hideResizableImageHandle(this);

	});

	//mouseleave sidebar item
	$(document).on('mouseleave', '.menu[data-menu="main"] [data-title]', function(){

		$('.menu[data-menu="main"] [data-title]').css('opacity','1');

	})

	//leave a vault module thumbnail
	$(document).on('mouseleave', '#vault-modules-canvas li:not(".module-favorite-animation")', function(){

		//clear the timeout
		clearTimeout(showVaultModuleOptionsTimeout);

		//hide vault module options
		hideVaultModuleOptions(this);

	});

	//leave event on a menu item
	$(document).on('mouseleave', '.select-menu', function(){

		//remove select state from menu item
		removeSelectActive();

	});

	//close menu on sidebar leave
	$(document).on('mouseleave', '#sidebar', function(){

		//close menu
		closeMenu('#menu-button');

	});

	//leave on save button, hide last saved message
	$(document).on('mouseleave', '#save-button-wrapper', function(){

		//set the timeout
		lastSavedMessageTimeout = setTimeout(function(){

			//hide last saved message
			hideLastSavedMessage();

		}, 500);

	});

	//mouseleave on data-repeatable tag
	$(document).on('mouseleave', '[data-repeatable]', function(){

		//hide repeatable buttons
		removeRepeatable(this);

	});

	//mouseleave of navigaiton item, hide tooltip
	$(document).on('mouseleave', '[data-menu="main"] > li', function(e){

		//clear timeout
		clearTimeout(t);

		//hide tooltip
		hideTitleTooltip();

	});

	//mouseleave on submenu, remove submenu
	$(document).on('mouseleave', '#sidebar, .navigation-submenu', function(e){

		//cleartimeout
		clearTimeout(navigationSubmenuTimeout);

		//variables
		var el = $(this)

		//set the timout
		navigationSubmenuTimeout = setTimeout(function(){

			//remove submenu
			removeSubmenu();

		}, 750);

		hideAvatarMenu();

	});

	//mouseleave on first item of navigation submenu
	$(document).on('mouseleave', '.navigation-submenu li:first-of-type', function(){

		//remove the class of 'active'
		$('.navigation-submenu-tip').removeClass('activated');

	});

	//mouseenter on a link in the template-editing-canvas
	$(document).on('mouseenter', '#template-editing-canvas a', function(e){

		//variables
		var posX = e.pageX;
		var posY = e.pageY;
		var url = $(this).attr('href');

		//show preview url
		showPreviewUrl(posX, posY, url);

	});

	//mouseleave of a link in the template editing canvas
	$(document).on('mouseleave', '#template-editing-canvas a', function(e){

		//remove preview url
		removePreviewUrl();

	});

	//on mouseleave of a data-module tag
	$(document).on('mouseleave', '[data-module]', function(){

		//variables
		var module = $(this);

		//hide module options
		hideModuleOptions();

		//clear the timeout
		clearTimeout(t)

	});

	//mouseleave on styles swatches list item
	$(document).on('mouseleave', '#styles-swatches li', function() {

		//remove all box shadows
		hideSwatchIndicator(this);

	});

	//hide resize handles
	$(document).on('mouseleave', '#mobile-preview-wrapper', function(){

		$('.resize-handle').hide();

	});

	$(document).on('mouseleave', '[data-select-menu-name="font-family-menu"]', function(){

		if(changingFontFlag){ return false; }

		//$('#template-editing-canvas [data-template-type="html"]').find('[data-size="'+attrName+'"], [data-color="'+attrName+'"]').css('font-family', currentFontFamily).css('font-weight',currentFontWeight)
		$(effectTarget).find('[data-size="'+attrName+'"], [data-color="'+attrName+'"]').css('font-family', currentFontFamily).css('font-weight',currentFontWeight)
		$(effectTarget+'[data-size="'+attrName+'"], '+effectTarget+'[data-color="'+attrName+'"]').css('font-family', currentFontFamily).css('font-weight',currentFontWeight)

	});













	/* Mouseup events */

	//menu button
	$(document).on('mouseup', '#menu-button', function(){

		//variables
		var el = (this);

		//toggle the menu
		toggleMenu(el);

	});

	//mouseup on menu item
	$(document).on('mouseup', '.select-menu li:not([data-select-item-value="disable"])', function(){

		//activate menu item
		activateSelectItem(this);

	});

	//image filters menu
	$(document).on('mouseup', '[data-select-menu-name="background-images"] li', function(){

		//variables
		var name = $(this).text();
		var value = $(this).attr('data-select-item-value');

		if(value == 'upload_image'){ $('#upload-image-to-canvas').trigger('click'); return false; }
		else {

			//wait a little
			setTimeout(function(){

				//apply action to corresponding background image
				actionToBackgroundImage(name, value);

			}, selectActiveStateDelay + selectFadeOutSpeed);

		}

	});

	//image filters menu
	$(document).on('mouseup', '[data-select-menu-name="image-filters"] li', function(){

		//variables
		var filter_name = $(this).text();
		var filter_value = $(this).attr('data-select-item-value');

		//set text to filter dropdown
		$('.image-editing-dropdown h5').text(filter_value)

		//apply filter to image
		applyFilterToImage(filter_value);

	});

	//font family menu
	$(document).on('mouseup', '[data-select-menu-name="font-family-menu"] li', function(){

		//variables
		var name = $(this).text();
		var value = $(this).attr('data-select-item-value');
		var font_family = value.split('-')[0];
		var font_weight = value.split('-').pop();
		changingFontFlag = true;

		setTimeout(function(){

			changingFontFlag = false;

		}, 500)

		if(value == 'new_font'){

			//variables
			var attr_name = $('.font-button.active').closest('li').find('span').text();
			selected_element_current_font_family = $('#template-editing-canvas .selected-element').closest('[data-module]').find('[data-size="'+attr_name+'"]').css('font-family'); //global

			//set preview font to current font family
			$('.font-preview-text').css('font-family', selected_element_current_font_family);

			//set headline in top bar of font editor
			$('.font-editor-top-bar-headline span').text(attr_name)

			//initialise used fonts
			initialiseUsedFonts();

			setTimeout(function(){

				//open font editor canvas
				openSpace('font-editor-canvas');

			}, selectActiveStateDelay + selectFadeOutSpeed);

			return false;

		}

		adaptFontFamily(font_family, font_weight);

		initialiseStyles('.selected-table');

	});

	//vault sorting menu
	$(document).on('mouseup', '[data-select-menu-name="filter-sorting-select"] li', function(){

		//variables
		var select_name = $(this).text();
		vaultSorting = $(this).text().toLowerCase();
		activeSpace = $('[data-space].active').attr('data-space');

		//wait a little
		setTimeout(function(){

			//set sorting name as text
			$('[data-filter-group="sorting"] li').text(select_name);


			if(activeSpace == 'image-editor-canvas'){

				initialiseImageDatabase();

			}

			else {

				//initialise vault
				initialiseVault();

			}

		}, selectActiveStateDelay + selectFadeOutSpeed);

	});

	//vault category menu
	$(document).on('mouseup', '[data-select-menu-name="filter-category-select"] li', function(){

		//variables
		var select_name = $(this).text();
		activeSpace = $('[data-space].active').attr('data-space');

		//wait a little
		setTimeout(function(){

			//set category name a stext
			$('[data-filter-group="category"] li').text(select_name)

			if(activeSpace == 'image-editor-canvas'){

				initialiseImageDatabase();

			}

			else {

				//initialise vault
				initialiseVault();

			}

		}, selectActiveStateDelay + selectFadeOutSpeed);

	});

	//live preview currency menu
	$(document).on('mouseup', '[data-select-menu-name="currency-select"] li', function(){

		//variables
		var select_name = $(this).text();
		var select_value = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//set category name a stext
			$('.preview-currency').val(select_value)

			//focus to price tag
			$('.preview-price-field').focus();

		}, selectActiveStateDelay + selectFadeOutSpeed);

	});

	//palette menu
	$(document).on('mouseup', '[data-select-menu-name="swatches-select"] li', function(){

		//variables
		var swatch_name = $(this).text();
		var swatch_value = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//hide the colorpicker
			hideColorpicker();

			//if swatch value is 'new palette', request the popup to create a new one
			if(swatch_value == 'new_palette'){

				//variables
				totalPalettes = $('#styles-swatches h6 [data-select-items]').attr('data-select-items').split(";").length - 5;

				//if maximum amount of palettes is reached
				if(totalPalettes >= maxAmountPalettes){

					//notificiation
					notification('warning','Maximum Palettes','You can\'t have more than '+maxAmountPalettes+' color palettes', false);
					return false;

				}

				//request the popup
				requestPopup('create_palette');

				//stop event from running further
				return false;


			}

			//if swatch value is 'remove_palette', request the popup to remove it
			if(swatch_value == 'remove_palette'){

				//remove palette
				requestPopup('remove-palette');
				// removeSwatch();

				//stop event from running further

				return false;

			}

			//otherwise, switcht the palette
			switchSwatch(swatch_name, swatch_value);

		}, selectActiveStateDelay + selectFadeOutSpeed);

	});

	//edit swatches menu
	$(document).on('mouseup', '[data-select-menu-name="swatches-options"] li', function(){

		//variables
		var swatch_name = $(this).text();
		var swatch_value = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//if swatch value is 'remove_swatches'
			if(swatch_value == 'remove_swatches'){

				//set swatches mode to 'edit'
				editSwatches('edit');

				//stop event from running further
				return false;

			}

			//if swatch value is 'set_primary'
			if(swatch_value == 'set_primary'){

				//set swatches mode to primary
				editSwatches('primary');

				//stop event from running further
				return false;

			}

		}, selectActiveStateDelay + selectFadeOutSpeed);

	})

	//primary numbers menu
	$(document).on('mouseup', '[data-select-menu-name="primary-menu"] li', function(){

		//variables
		var primary_name = $(this).text();
		var primary_value = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//set primary number to swatches
			setPrimaryNumberToSwatch(primary_name, primary_value);

		}, selectActiveStateDelay + selectFadeOutSpeed);

	});

	//image commands menu
	$(document).on('mouseup', '[data-select-menu-name="image-commands"] li', function(){

		//variables
		var command_name = $(this).text();
		var command_value = $(this).attr('data-select-item-value');

		//if command value is 'upload'
		if(command_value == 'upload'){

			//trigger click the hidden button to upload an image
			$('#upload-image-to-canvas').trigger('click');

		}

		if(command_value == 'direct_url'){

			directImportType = 'image';
			requestPopup('image_from_url');

		}

		if(command_value == 'gallery'){

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

	});

	//template version menu
	$(document).on('mouseup', '[data-select-menu-name="template-versions"] li', function(){

		//variables
		var token = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//get the version of the template with the corresponding token and apply to the template editing canvas
			getVersion(token);

		}, selectActiveStateDelay + selectFadeOutSpeed);

	})

	//swatches options menu
	$(document).on('mouseup', '[data-select-menu-name="swatches-options"] li', function(){

		//variables
		var swatch_name = $(this).attr('data-select-item-value');

		//wait a little
		setTimeout(function(){

			//if swatch name is 'remove swatch'
			if(swatch_name == 'remove swatch'){

				//initialise popup
				headline = 'You are about to delete a swatch';
				paragraph = 'Oi fucka fucka'
				btnTrue = 'Delete Swatch';
				btnTrueId = 'delete-swatch-confirm';
				btnFalse = 'Nevermind';
				btnTrueFunction = 'removeSwatch()'

				//open popup
				openPopup();

			}

			//if swatch name is 'add new color'
			if(swatch_name == 'add new color'){

				//add a new color to the palette
				addNewColor();

			}

			//if swatch name is 'add new swatch'
			if(swatch_name == 'add new swatch'){

				//request the popup to create a new palette
				requestPopup('create_palette');

			}

		}, selectActiveStateDelay + selectFadeOutSpeed);

	})

	//mobile formats menu
	$(document).on('mouseup', '[data-select-menu-name="mobile-formats"] li', function(){

		//variables
		var format = $(this).attr('data-select-item-value');
		var format_name = $(this).text();
		var space = $('.space.active').attr('data-space');

		//wait a little
		setTimeout(function(){

			//adjust the preview canvas to the selected format
			adjustFormat(format, format_name, space);

		}, selectActiveStateDelay + selectFadeOutSpeed)

	})

	//font list menu
	$(document).on('mouseup', '[data-select-menu-name="fonts-list"] li', function(){

		//variables
		var font_value = $(this).attr('data-select-item-value');
		var font_name = $(this).text();

		//wait a little
		setTimeout(function(){

			//update font family
			updateModuleFontFamily(font_value, font_name)

		}, selectActiveStateDelay + selectFadeOutSpeed)

	})

	//StampReady tags menu
	$(document).on('mouseup', '[data-select-menu-name="sr-tags"] li', function(){

		//variables
		var item_value = $(this).attr('data-select-item-value');
		var item_name = $(this).text();

		//wait a little
		setTimeout(function(){

			//insert text at the selected text
			insertTextAtCursor(item_value+' ');

			//hide the tooltip
			hideTooltip();

		}, selectActiveStateDelay + selectFadeOutSpeed)

	});

	//font commands menu
	$(document).on('mouseup', '[data-select-menu-name="font-commands"] li', function(){

		//variables
		var item_value = $(this).attr('data-select-item-value');
		var item_name = $(this).text();

		//wait a little
		setTimeout(function(){

			//toggle font style
			toggleFontStyle(item_value);

			setSaveActive();

		}, selectActiveStateDelay + selectFadeOutSpeed)

	})


	//code editor modules menu
	$(document).on('mouseup', '[data-select-menu-name="modules-list"] li', function(){

		//variables
		var el = $(this);
		var module_name = $(el).text();

		//wait a little
		setTimeout(function(){

			//if module name is all, present all modules
			if(module_name == 'All Modules'){

				//open the module in the code editor
				openCodeEditorModule(module_name);

				//update the name of the module title
				updateCodeEditorModuleName(module_name);

				//stop event from running further
				return false;

			}

			//variables
			module_eq = $(el).attr('data-select-item-value');
			var module_contents = $('#code-editor-iframe').contents().find('[data-module]').eq(module_eq)[0].outerHTML;
			var offset = $('#code-editor-iframe').contents().find('[data-module]').eq(module_eq).position();

			//update code editor module
			openCodeEditorModule(module_name, module_contents, module_eq);

			//scroll to module
			scrollToCodeEditorModule(offset);

			//update the name
			updateCodeEditorModuleName(module_name);

			//switch tab to html
			switchCodeEditorTab('[data-tab-name="html"]');

		}, selectActiveStateDelay + selectFadeOutSpeed)

	});

	//mouseup on body
	$(document).on('mouseup', 'body', function(e){

		//set module is active flag to false
		moduleActiveFlag = false;

	});

	//mouseup on body
	$(document).on('mouseup', 'body', function(){

		//set isMouseDown flag to false
		isMouseDown = false;
		textSelectionHasTable = false;

	});

	document.onmouseup = document.onkeyup = document.onselectionchange = function() {
	  getSelectionHtml();
	};

	//slider-output adapt font-size
	$(document).on('keyup', '.slider-output', function(){

		//variables
		adaptOutput(this);

	})






	/* right clicks */
	$(document).on('contextmenu', '#canvas, #template-editing-canvas', function(e){

		// e.preventDefault();
        //
		// //switchCanvasBackground();
        //
		// return false;

	})

	$(document).on('contextmenu', '#template-canvas, #template-top-bar, .highlighter-container, #image-tooltip, table', function(e){

		e.stopImmediatePropagation();

	});










	/* Selectstart events */

	//prevent text select on menu item
	$(document).on('selectstart', '.select-menu, [data-select-items]', function(e){

		e.originalEvent.preventDefault();

	});









	/* Scroll events */

	//canvas on scroll
	$('#canvas').scroll(function() {

		//adjust the template reset bar
		adjustResetTemplateBar();

	});

	//vault modules canvas scroll
	$('#vault-modules-canvas').scroll(function(){

		if(vaultMaximumScrollFlag){ return false; }

		detectVaultScroll();

	});

	$('#image-database-canvas').scroll(function(){

		if(imageDatabaseMaximumScrollFlag){ return false; }

		detectImageDatabaseScroll();

	});












	/* Keyup events */

	//keyup image link
	$(document).on('keyup', '#change-image-link-input-field', function(){

		imageUrl = $(this).val();

		updateImageLink(imageUrl);

	})

	//find and replace keyup
	$(document).on('keyup', '#code-editor-find', function(){

		//variables
		findValue = $(this).find('input[type="text"]').val();

		if(findValue == ''){ adjustFindAndReplaceButton(false); }
		else { adjustFindAndReplaceButton(true); }

	})

	//on keyup colorpicker value
	$(document).on('keyup', '.colorpicker-value', function(){

		//variables
		colorpickerValueLength = $(this).val().length;
		colorpickerValue = $(this).val();

		//if length is minimum of 2
		if(colorpickerValueLength > 2){

			var brightness = detectBrightness(colorpickerValue);
			$(this).css('color',brightness);

			updateModuleColor(this);
			$(this).css('background-color', colorpickerValue)
			$('.blank-swatch [data-color]').css('background-color', colorpickerValue);
			$('.blank-swatch [data-color]').attr('data-color', colorpickerValue)

		}

	});

	//on keyup the quick brown fox
	$(document).on('keyup', '.font-preview-text', function(){

		//variables
		text = $(this).text();

		$('.font-preview-text:not(:focus)').text(text);

	})

	//on keyup of the code editor
	$(document).on('keyup', editor, function(event) {

		if(codeEditorTimeoutFlag){

			//updateCodePreview(); return false;

		}
		else { activateCodeEditorSave(); }

		if (event.metaKey == 224 || event.keyCode == 17 || event.keyCode == 16 || event.keyCode == 91 || event.keyCode == 93 || event.keyCode == 18  || event.keyCode == 37  || event.keyCode == 38  || event.keyCode == 39  || event.keyCode == 40) {

			return false;

		}

		codeEditorTimeoutFlag = true;
		codeEditorTimeoutSeconds = setTimeout(function(){

			codeEditorTimeoutFlag = false;

		}, codeEditorSaveButtonTimeout);

		//update the code preview
		//updateCodePreview();

    });

    //on keyup of template editing canvas 'a' or 'span' tag
    $(document).on('keyup', '#template-editing-canvas a, #template-editing-canvas span', function (e) {

		//keep the element in tact
		keepElementInTact(this);


	});

	//template-editing-canvas 'a'
	$(document).on('keyup', '#template-editing-canvas', function (e) {

		//variables
		var el = getSelectionContainerElement();

		//if element is either 'a' or a 'span'
		if($(el).is('a') || $(el).is('span')){

			//variables
			var text = $(el).text();

			//add content editable of true to the element
			$(el).attr('contenteditable','true')

			//remove contenteditable from the parent
			$(el).parent().removeAttr('contenteditable');

			//if keycode is enter
			if (e.keyCode == 32){


			}

		}

	});

	//keyup create demo
	$(document).on('keyup', '.create-preview-checkout-link', function(){

		detectMarketPlace(this);

	});

	$(document).on('keyup', '#create-preview-form input[type="text"]', function(){

		checkCreatePreviewSettings();

	});










	/* Load events */

	//on load of code editor iframe
	$('#code-editor-iframe').load(function(){

		//initialise iframe
		initialiseIframe();

	});














	/* Resize events */

	//on window resize
	$(window).on('resize', function(){

		//hide the tooltip
		hideTooltip();

		if($('[data-space="image-editor-canvas"]').hasClass('active')){


		}

		else {

			//hide the image tooltip
			hideImageTooltip()

		}

	});










	/* Keypress events */

	//intercept keypress of create-edit-link
	$(document).on('keyup', '#create-edit-link', function (e) {

		e.stopImmediatePropagation();
		e.stopPropagation();

		//if keycode is 'enter'
		if (e.which == 13) {

			//variables
			var link = $('#link-value-holder').val();

			//change link
			changeLink(link);

			//stop script from running further
			return false;

		}

		//if keycode is 'escape'
		if (e.keyCode == 27){

			if($('.create-edit-link-button').is(':visible')){

				showMainTooltip();

			}

			else {

				//hide tooltip
				hideTooltip();

			}

		}

	});

	//intercept keypress of create-edit-link
	$(document).on('keypress', '#change-image-link-input-field', function (e) {

		//if keycode is 'enter'
		if (e.which == 13) {

			//variables
			var link = $('#change-image-link-input-field').val();

			hideCreateImageLinkTooltip();

			//stop script from running further
			return false;

		}

		//if keycode is 'escape'
		if (e.keyCode == 27){

			$('.selected-image').parent('a').attr('href', currentUrl)


			//hide tooltip
			hideTooltip();

		}

	});

	//keypress on body
	$(document).on('keypress', 'body', function (e) {

		//if 'escape'
		if (e.keyCode == 27){

			if($('#select-menu-wrapper').is(':visible')){

			}

			else if($('#change-image-link-input-field').is(':visible')){

				hideCreateImageLinkTooltip();

			}

			else {

				//hide tooltip
				hideTooltip();

				//hide image tooltip
				hideImageTooltip();

				//clear selection
				clearSelection();

				//hideLivePreview();

				closePopup();

			}

		}

	})











	/* Paste events */

	//on paste of clipboard
	$(document).on('paste', '[contenteditable="true"]', function(e) {

		//variables
		var text = '';
		var that = $(this);

		//gibberish
		if (e.clipboardData)
		    text = e.clipboardData.getData('text/plain');
		else if (window.clipboardData)
		    text = window.clipboardData.getData('Text');
		else if (e.originalEvent.clipboardData)
		    text = $('<div></div>').text(e.originalEvent.clipboardData.getData('text'));


		if (document.queryCommandSupported('insertText')) {
		    document.execCommand('insertHTML', false, $(text).html());
		    return false;
		}
		else { // IE > 7
		    that.find('*').each(function () {
		         $(this).addClass('within');
		    });

		    setTimeout(function () {
		          // nochmal alle durchlaufen
		          that.find('*').each(function () {
		               // wenn das element keine klasse 'within' hat, dann unwrap
		               // http://api.jquery.com/unwrap/
		               $(this).not('.within').contents().unwrap();
		          });
		    }, 1);
		}

	});










	/* Focus events */
    $(window).focus(function() {

        if($('[data-vault-import-string]').attr('data-vault-import-string') == getCookie('localStorageImportModules') && $('[data-vault-favorite-string]').attr('data-vault-favorite-string') == getCookie('localStorageFavoriteModules')){ return false; }

        if($('[data-menu-section="modules"] [data-sidebar-module-identifier]').length > 0 && getCookie('localStorageImportModules') == '' && getCookie('localStorageFavoriteModules') == ''){ return false; }

        setTimeout(function(){

            if(mode == 'vault'){
                initialiseModulesFromCookie();
            }

        }, 500)


	});

	//mousedown on colorpicker value
	$(document).on('focus, mousedown', '.colorpicker-value', function(e){

		//stop other events from kicking in
		e.stopImmediatePropagation();

		//set flag to true
		//colorSliderOpacityMouseDown = true;
		colorPickerElement = $(this);

        $('.targeted-text-selection').removeClass('targeted-text-selection')

		if(savedColorpickerValue != false && blankSwatchExists != false){

			newlyCreatedSwatch = true;

			saveSwatch(savedColorpickerValue);
			savedColorpickerValue = false;
			blankSwatchExists = false;

		}

		if(newlyCreatedSwatch != false){

			//add new color
			addNewColor();
			newlyCreatedSwatch = false;

		}

		if($(this).hasClass('unfocussed')){

			//hide color opacity slider
			hideColorOpacitySlider();

		}

		//add/remove unfocussed state
		$('.colorpicker-value').addClass('unfocussed');
		$(this).removeClass('unfocussed');

		//hide tooltip
		hideTooltip();

		//hide image tooltip
		hideImageTooltip();

		//if the element has data-opacity-addon
		if($(this).attr('data-opacity-addon')){

			//variables
			var attr_name = $(this).attr('data-opacity-addon');

			//if attribute name is true
			if(attr_name == 'true'){

				//show color opacity slider
				showColorOpacitySlider(colorPickerElement);


			}

		}

		//show swatches
		showStylesSwatches();

	});

	//on focus colorpicker value
	$(document).on('focus', '.image-editing-color-field', function(){

		showImageOverlayColorpicker();

	});









    /* Focus events */


	/* Blur events */

	//on blur of colorpicker value
	$(document).on('blur', '.colorpicker-value', function(){

		//if colorSliderOpacityMousedown is not present
		if(!colorSliderOpacityMouseDown){

			//add unfocussed state
			$(this).addClass('unfocussed');

		}


	});

	//on blur slider-output
	$(document).on('blur', '.slider-output', function(e){

		e.stopPropagation();

		//variables
		currentFontSize = parseInt($(this).val());
		minimumFontSize = parseInt($(this).closest('li').find('.appearances-slider').attr('min'));
		currentSliderValue = parseInt($(this).next('.appearances-slider').val());

		if(isNaN(currentFontSize) || currentFontSize < 10){

			$(this).val(currentSliderValue)

		}

		// if(currentFontSize < minimumFontSize){
		//
		// 	$(this).closest('li').find('.appearances-slider').attr('val', minimumFontSize);
		// 	$(this).closest('li').find('.appearances-slider').val(minimumFontSize);
		// 	$(this).val(minimumFontSize);
		//
		// 	//adapt font size
		// 	adaptOutput(this);
		//
		// }

	})

	//on keyup the quick brown fox
	$(document).on('blur', '.font-preview-text', function(){

		//variables
		fontPreviewText = $('.font-preview-text').text();

		if(fontPreviewText == ''){ $('.font-preview-text').html('<span contenteditable="true">The Quick Brown Fox Jumped Over The Lazy Dog</span>'); }

	});

});
