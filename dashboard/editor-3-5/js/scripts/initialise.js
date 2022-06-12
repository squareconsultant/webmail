$(document).ready(function() {

	//variables
	isRunning = '';
	isSidebarExpended = false;
	retinaFlag = false;
	circularFlag = false;
	cropFlag = true;
	module_eq = 0;
	completeTemplateCode = false;
	colorSliderOpacityMouseDown = false;
	lastSavedMessageTimeout = '';
	snapshotChangeActivity = false;
	isMouseDown = false;
	selectMenuFlag = false;
	t = 0;
	window_width = $(window).width();
	sidebar_width = $('#sidebar').width();
	hideVaultModuleOptionsTimeout = false;
	showVaultModuleOptionsTimeout = false;
	filterVaultTimeout = false;
	filterImageDatabaseTimeout = false;
	module_height = 0;
	initialiseVaultFlag = false;
	currentPalette = $('#styles-swatches h6 span').text();

	//set the credits bar message
	$('#credits-bar').html(creditsBarMessage);

	//initialise subsitute for blank swatch
	$('#colorpicker').farbtastic('#colorpicker-mirror');

	$('#image-editing-canvas-colorpicker').farbtastic('.image-editing-color-field');

	if(currentPalette == 'Base Colors'){

		$('#swatches-edit-button').hide();

	}

	if(hidden == '1'){ requestPopup('unavailable'); }

	//if only logo
	if(logoOnly){

		$('#user-name').remove();
		$('#user-avatar').css('width','100%');
		$('#user-avatar img').css('width','auto');
		$('#user-avatar img').css('border-radius','0px');
		$('#user-avatar').css('text-align','center');

	}

	//determine the url of the creditsbar
	$(document).on('click', '#credits-bar', function(){

		//if empy or false, ignore
		if(creditsBarURL == '' || creditsBarURL == false){

			return false;

		}

		//if open new window is set to true
		if(creditsBarOpenWindow){

			window.open(creditsBarURL);

		}

		//if open window is set to false
		else {

			$(location).attr('href',creditsBarURL);

		}

	});

	//whether or not an URL should open
	$(document).on('click', '#template-editing-canvas a', function(e){

		e.preventDefault();
		url = $(this).attr('href');

		if(!preventOpeningURL){

			window.open(url);

		}

	});

	initialiseLocalStorageSettings();

	// //drag and resize for crop
	// $('#crop-window').resizable({
	//   minWidth: 50,
	//   minHeight: 50,
	//   containment: '.image-transparent-background',
	//   aspectRatio: true
	// });

	initialiseResizable();

	$('#crop-window').draggable({
	    containment: '.image-transparent-background',
	    delay: 150,
	    start: function(event, ui) {
	        isDraggingMedia = true;
		   $('.grid-line').fadeIn(globalAnimationSpeed);
	    },
	    drag: function(event, ui) {

		    detectCropCenter();

	    },
	    stop: function(event, ui) {
	        isDraggingMedia = false;
		   $('.grid-line').fadeOut(globalAnimationSpeed);
	    }
	});
	$('#code-editor-main-left').resizable({
		minWidth: $(window).width() * 0.3,
		maxWidth: $(window).width() * 0.9,
		grid: [10],
		handles: 'e, w',
		start: function(event, ui) {

			//append transparent div over iframe, in order to prevent hijacking
			$('#code-editor-iframe').closest('.code-editor-section-holder').append('<div class="transparent-overlay"></div>')

		},
		resize: function(event, ui) {

			if(($('#code-editor-main-left').width()) > ($(window).width() * 0.9 - 11)){

				$('#code-editor-main-left').css('width','100%');
				$('#code-editor-main-left .resize-handle').hide();

			}

			else {

				$('#code-editor-main-left .resize-handle').show();

			}

		},
		stop: function(event, ui) {

			//remove transparent overlay
			$('.transparent-overlay').remove();

			//refresh the code editor
			editor.refresh();

		}
	});
	$('#mobile-preview-wrapper').resizable({
		minWidth: 320,
		maxWidth: $(window).width() * 0.85,
		grid: [5],
		handles: 'e, w',
		start: function(event, ui) {

			//append transparent div over iframe, in order to prevent hijacking
			$('#mobile-preview-wrapper').append('<div class="transparent-overlay"></div>');

			hideDevicePreviewBars();

		},
		resize: function(event, ui) {

			//variables
			var format = $('#mobile-preview-wrapper').width();

			//rename the screen format
			$('.preview-screen-format').text(format+'px');

		},
		stop: function(event, ui) {

			//remove transparent overlay
			$('.transparent-overlay').remove();

			//present device preview bars
			//showDevicePreviewBars();

			//refresh the code editor
			editor.refresh();

		}
	});

	//append handler
	$('#code-editor-main-left .ui-resizable-e').append('<div class="resize-handle"></div>')
	$('#mobile-preview-wrapper .ui-resizable-e, #mobile-preview-wrapper .ui-resizable-w').append('<div class="resize-handle hidden"></div>')

	//fetch path to code mirror theme
	var codemirrorTheme = $('.codemirror-theme').attr('href');

	//fetch the file name
	var fileNameIndex = codemirrorTheme.lastIndexOf("/") + 1;
	var filename = codemirrorTheme.substr(fileNameIndex);
	var filename = filename.replace('.css', '');

	//initialise codemirror
	editor = CodeMirror.fromTextArea(document.getElementById("code"), {
		mode: 'text/html',
		autoCloseTags: true,
		theme : filename,
		lineNumbers: true,
		lineWrapping: true,
		smartIndent: true,
		styleActiveLine: true,
		indentWithTabs: true
	});

	editor.setSize('100%', '100%');

	//iframe
	iframe = $('body', $('#code-editor-iframe')[0].contentWindow.document);
	iframeVault = $('body', $('#vault-module-preview-iframe')[0].contentWindow.document);
	iframePreview = $('body', $('#preview-iframe')[0].contentWindow.document);

	//initialise highlighter
	$('#template-editing-canvas').highlighter({
		'selector': '.highlighter-container',
		'minWords': 0,
		'complete': function (data) {

			resetTooltip();
			showTooltip();

		}
	});

	initialiseMode(mode);

	//initialise swatches for styles
	initialiseStylesSwatches();

	//initialise vault modules
	//initialiseModulesFromVault();

	//preload certain images
	preloadUI();

	initialiseSortable();

	//initialise (gr)avatar
	initialiseAvatar();

	//save the first state of template in memory
	//saveTemplateToMemory();

	//check empty state
	checkEmptyCanvas();

	//clean the canvas
	cleanTemplateCanvas();

	activateNavigationItem('[data-title="Modules"]');

	//initialise meta
	initialiseMeta();

	setTimeout(function(){

		openSection('Modules');
		//initialiseModules();

		setTimeout(function(){

			//initialiseModulesFromVault();

			//save the first state of template in memory
			//saveTemplateToMemory();

		}, 400)

		//activateNavigationItem('[data-title="Modules"]');

	}, 1000);

	setInterval(function(){

		//create a version
		createVersionSnapshot();

	}, versionSnapshotRate);

	if(mode != 'demo'){

		var time = getFirstSelectItem('template-versions', 'name');
		if(time !== ''){

			var count_states = countSelectItems('template-versions');
			var offset = count_states * 19;
			$('[data-select-name="template-versions"]').attr('data-select-offset-top',offset);

			updateVersionTime(time);

		}

	}

	if(mode == 'demo'){

		$('#template-versions-bar').show();

		$(document).find('#code-editor-main-left').bind("cut copy",function(e) {

			e.preventDefault();
			requestPopup('unpaid');

		});

		setTimeout(function(){

			requestPopup('unpaid');

		}, demoTimeout)

	}

});
