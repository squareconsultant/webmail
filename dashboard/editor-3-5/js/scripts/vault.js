//initialise vault
function initialiseVault(){

	//variables
	vault_field = $('#vault-modules-canvas');
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
	hideVaultEmptyState();

	//set the maximum scroll flag to false
	vaultMaximumScrollFlag = true;

	setTimeout(function(){

		//retrieve filter settings
		filter_type = '';
		filter_category = '';
		filter_favorite = '';
		filter_import = '';
		filter_sorting = '';
		vaultFetchCount = 1;

		//filter type
		filter_type = '['+$('[data-dropdown="type"] .dropdown-result').text().toLowerCase()+']';

		//filter category
		filter_category = '['+$('[data-dropdown="category"] .dropdown-result').text().toLowerCase()+']';

		//filter category
		filter_sorting = $('[data-dropdown="mode"] .dropdown-result').text().toLowerCase();

		//filter_import
		if($('.imported-favorited-switch-wrapper .imported').hasClass('active')){ filter_import = $('body').attr('data-vault-import-string'); }

		//filter_favorite
		if($('.imported-favorited-switch-wrapper .favorited').hasClass('active')){ filter_favorite = $('body').attr('data-vault-favorite-string'); }

		if(filter_category == '[all]'){ filter_category = ''; }
		if(filter_type == '[all]'){ filter_type = ''; }
		if(filter_sorting == '[all]'){ filter_sorting = ''; }

		importString = $('[data-vault-import-string]').attr('data-vault-import-string');
		favoriteString = $('[data-vault-favorite-string]').attr('data-vault-favorite-string');

		if($('.imported.switch-section').hasClass('active')){

			if(importString == ''){ showVaultEmptyState(); return false; }

		}

		if($('.favorited.switch-section').hasClass('active')){

			if(favoriteString == ''){ showVaultEmptyState(); return false; }

		}

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "json",
		    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=fetchVaultModules",
		    data: { filter_type: filter_type, filter_category: filter_category, filter_sorting: filter_sorting, filter_favorite: filter_favorite, filter_import: filter_import, fetch_offset: vaultFetchCount }
		}).done(function(data) {

			//variables
			modulesListLength = data.length;
			modulesList = data;
			var ul_identifier = 1;

			if(data == 'null' || data == null || !data){ showVaultEmptyState(); return false; }

			//hide loader
			$('.filter-loader').fadeOut(globalAnimationSpeed);

			for(var i = 0; i < modulesListLength; i++) {

				//variables
				token = modulesList[i]['token'];
				firstCharacterOfToken = token.substring(0, 1);
				stars = modulesList[i]['stars'];
				extension = modulesList[i]['extension'];

				//find ul identifier
				$(vault_field).find('ul[data-vault-column="'+ul_identifier+'"]').append('<li data-vault-module-identifier="'+token+'"><div class="vault-module-image-wrapper"><img src="../vault/thumbnails/'+firstCharacterOfToken+'/'+token+'/thumbnail.'+extension+'" class="nodrag"></div><div class="module-details"><div class="item-contents-stars clear-fix">'+stars+'</div><div class="import-module"></div><div class="favorite-module"></div><a href="https://stampready.net/vault/module/?id='+token+'" target=_blank class="view-button">View Module</a></div></li>');

				//increase identifier
				ul_identifier++;

				//if identifier is 4, return to 1
				if(ul_identifier == 4){ ul_identifier = 1; }

			}

			// //for each module
			// for (i = 0; i < (data.length - 1); i++){
			//
			// 	//the value
			// 	string = data[i].split('[')[1].split(']')[0];
			// 	token = string.substring(string.lastIndexOf("token=")+6,string.lastIndexOf("P1"));
			// 	date = string.substring(string.lastIndexOf("date=")+10,string.lastIndexOf("P2"));
			//
			// 	//find ul identifier
			// 	$(vault_field).find('ul[data-vault-column="'+ul_identifier+'"]').append('<li data-vault-module-identifier="'+token+'"><img src="../vault/thumbnails/'+date+'/'+token+'/thumbnail.png"></li>');
			//
			// 	//increase identifier
			// 	ul_identifier++;
			//
			// 	//if identifier is 4, return to 1
			// 	if(ul_identifier == 4){ ul_identifier = 1; }
			//
			// }

			//show modules
			$(vault_field).find('ul li').animate({

				transform: 'scale(1)',
				'opacity':1

			}, { duration: openSpaceSpeed * 1.4, easing: 'easeOutQuart', complete:  function() {

			}});

			//initialise favorites
			initialiseFavorites();

			//initialise imports
			initialiseImports();

			initialiseTags();

			//set initialise vault flag to true, so it won't auto load again
			initialiseVaultFlag = true;

			if(modulesListLength < 21){

				//set the maximum scroll flag to false
				vaultMaximumScrollFlag = true;

			}

			else {

				//set the maximum scroll flag to false
				vaultMaximumScrollFlag = false;

			}

		});

	}, openSpaceSpeed * 2.1)

}

//show vault module options
function showVaultModuleOptions(module){

	//variables
	var vault_options = $('#vault-options-initialise').html();
	var vault_option_width = $('.vault-option').width();
	var vault_option_height = $('.vault-option').height();
	var vault_option_position_left = 0;
	var vault_option_position_right = 0;
	var vault_option_position_pause = 0;
	var vault_option_position_pause_step = 60;
	var favorite_status = $(module).attr('data-vault-favorite-status');
	var import_status = $(module).attr('data-vault-import-status');

	//empty all options
	$(module).find('.vault-options-bar').empty();

	//create options bar and append the options
	$(module).append('<div class="vault-options-bar">'+vault_options+'</div>');

	if(favorite_status == 'true'){

		//find favorite button and add status
		$(module).find('[data-vault-option-type="favorite"]').addClass('active');

	}

	if(import_status == 'true'){

		//find favorite button and add status
		$(module).find('[data-vault-option-type="import"]').addClass('active');

	}

	//animate the options bar
	$('.vault-options-bar').slideDown(250, 'easeOutBack');

	//loop through each option and position them correctly
	$(module).find('.vault-options-bar .vault-option[data-vault-option-direction="left"]').each(function(){

		$(this).css({
			'left': vault_option_position_left+'px',
			'bottom': '-'+vault_option_height+'px'
		})
		vault_option_position_left = vault_option_position_left + vault_option_width;

	})

	$(module).find('.vault-options-bar .vault-option[data-vault-option-direction="right"]').each(function(){

		$(this).css({
			'right': vault_option_position_right+'px',
			'bottom': '-'+vault_option_height+'px'
		})
		vault_option_position_right = vault_option_position_right + vault_option_width;

	});

	$('.vault-options-bar .vault-option').each(function(){

		var el = $(this);

		setTimeout(function(){

			$(el).animate({

				'bottom': 0

			}, { duration: globalAnimationSpeed, easing: 'easeOutBack', complete:  function() {


			}})

		}, vault_option_position_pause)

		vault_option_position_pause = vault_option_position_pause + vault_option_position_pause_step;


	})
}

//hide vault module options
function hideVaultModuleOptions(event){

	$('.vault-options-bar .vault-option').fadeOut(150)

	$('.vault-options-bar').slideUp(250, "easeInBack", function() {

		$(event).find('.vault-options-bar').remove();

	});

}

//show vault html of vault module
function showVaultModuleHtml(event){

	//variables
	var token = $(event).closest('li').attr('data-vault-module-identifier');
	//remove scrollbar
	$('#vault-modules-canvas').css('overflow','hidden');

	//fetch html via token
	$('#html-checker').load('http://www.stampready.net/dashboard/editor-3-beta/vault/'+token+'/index.html',function(data){

		var module_html = $('#html-checker').html();
		module_height = $('#html-checker').height();
		//alert(module_height)

		//append to iframe
		$('#vault-module-preview-iframe').contents().find('body').html(module_html);

		//resize iframe
		$('#vault-module-preview-iframe').css('height',module_height+'px');
		$('#vault-module-preview-iframe').css('margin-top','-'+(module_height)+'px');

		//width: 800px; height: 400px; background-color: #FFF; border: 0; position: absolute; left: 50%; margin-left: -400px; top: 0%; margin-top: -400px;

	});

	//animate the preview canvas
	$('#vault-module-preview-canvas').animate({

		'height': '100%',

	}, { duration: globalAnimationSpeed * 2.4, easing: 'easeInOutCubic', complete:  function() {

		$('#vault-module-preview-iframe').animate({

			'margin-top':'-'+(module_height/2)+'px',
			'top':'50%'

		}, { duration: globalAnimationSpeed * 2.4, easing: 'easeOutQuart', complete:  function() {

		}})

	}});

}

//hide html of vault module
function hideVaultModuleHtml(){

	$('#vault-module-preview-iframe').animate({

		'margin-top':'-'+module_height+'px',
		'top':'0%'

	}, { duration: globalAnimationSpeed * 2.4, easing: 'easeInOutCubic', complete:  function() {

		$('#vault-module-preview-canvas').animate({

			'height': '0%',

		}, { duration: globalAnimationSpeed * 2.4, easing: 'easeOutQuart', complete:  function() {

			$('#vault-modules-canvas').css('overflow','');

		}})

	}})

}

//add to favorites
function addModuleToFavorite(event){

	//variables
	var module_identifier = $(event).closest('li').attr('data-vault-module-identifier');
	var favorite_string = cleanVaultString(event, module_identifier, 'favorite');

	//add idenftifier to body
	$('body').attr('data-vault-favorite-string',favorite_string+'['+module_identifier+']');
	$(event).closest('li').attr('data-vault-favorite-status','true');

	showFavoriteAnimation(event);

}

//remove from favorites
function removeModuleFromFavorite(event){

	//variables
	var module_identifier = $(event).closest('li').attr('data-vault-module-identifier');
	var favorite_string = cleanVaultString(event, module_identifier, 'favorite');

	//add idenftifier to body
	$('body').attr('data-vault-favorite-string',favorite_string);
	$(event).closest('li').attr('data-vault-favorite-status','false');

}

//add to import
function addModuleToImport(event){

	//variables
	var module_identifier = $(event).closest('li').attr('data-vault-module-identifier');
	var event = $('[data-vault-module-identifier="'+module_identifier+'"]');
	var import_string = cleanVaultString(event, module_identifier, 'import');

	//add idenftifier to body
	$('body').attr('data-vault-import-string',import_string+'['+module_identifier+']');
	$(event).attr('data-vault-import-status','true');

	$(event).find('.import-module').addClass('active')

	$(event).find('.vault-module-image-wrapper').append('<div class="module-imported-overlay"><img src="img/icons/imported.png"></div>');
	$(event).find('.module-imported-overlay').fadeIn(250, "easeInBack", function() {

		$(event).find('.module-imported-overlay img').animate({

			'margin-top': '-30px',
			'top': '50%'

		}, { duration: globalAnimationSpeed * 1.8, easing: 'easeOutBack', 'queue': false, complete:  function() {

			setTimeout(function(){

				$(event).find('.module-imported-overlay img').fadeOut(250);
				$(event).find('.module-imported-overlay').animate({

					backgroundColor: 'rgba(29, 20, 88, 0.75)'

				}, 500)

			}, 500)

		}});

	});

}

//remove from import
function removeModuleFromImport(event){

	//variables
	var module_identifier = $(event).closest('li').attr('data-vault-module-identifier');
	var import_string = cleanVaultString(event, module_identifier, 'import');

	//add idenftifier to body
	$('body').attr('data-vault-import-string',import_string);
	$(event).closest('li').attr('data-vault-import-status','false');

	$(event).closest('li').find('.import-module').removeClass('active')
	$(event).closest('li').find('.module-imported-overlay').remove();

}

//clean the string of type
function cleanVaultString(event, module_identifier, name){

	var string = $('body').attr('data-vault-'+name+'-string');

	var re = new RegExp('\\['+module_identifier+'\\]',"g");
	return string.replace(re, '');

}

//animate the favorite animation
function showFavoriteAnimation(event){

	//variables
	var positionObj = $(event).offset();
	var positionContainer = $('#vault-modules-canvas').offset();
	var vault_option_width = $('.vault-option').width();
	var vault_option_height = $('.vault-option').height() - 40;
	var vault_option_left = $(event).css('left');
	var animation_distance = Math.floor(Math.random() * 30) + 40;
	var animation_wiggle_distance = Math.floor(Math.random() * 8) + 2;
	var token = createToken();
	var scrollPos = $('#vault-modules-canvas').scrollTop();
	var vault_option_height = $('.vault-option').height() - 40 + scrollPos;

	//append heart over heart
	$('#vault-modules-canvas').append('<div class="module-favorite-animation" data-favorite-animation-mark="'+token+'" style="width: '+vault_option_width+'px; left: '+(positionObj.left - positionContainer.left + 4)+'px; top: '+(positionObj.top - positionContainer.top + vault_option_height)+'px;"></div>');

	//animate the heart
	$('[data-favorite-animation-mark="'+token+'"]').animate({

		'top': (positionObj.top - positionContainer.top) + vault_option_height - animation_distance+'px',
		'opacity':1,
		transform: 'scale(1.5)'

	}, { duration: globalAnimationSpeed * 6, easing: 'easeOutQuart', 'queue': false, complete:  function() {

	}});

	$('[data-favorite-animation-mark="'+token+'"]').animate({

		'left': (positionObj.left - positionContainer.left + 4) + animation_wiggle_distance +'px'

	}, { duration: globalAnimationSpeed, easing: 'easeInOutCubic', complete:  function() {

		$('[data-favorite-animation-mark="'+token+'"]').animate({

			'left': (positionObj.left - positionContainer.left + 4) - animation_wiggle_distance +'px'

		}, { duration: globalAnimationSpeed, easing: 'easeInOutCubic', complete:  function() {

			$('[data-favorite-animation-mark="'+token+'"]').animate({

				'left': (positionObj.left - positionContainer.left + 4) + animation_wiggle_distance +'px',
				'opacity': 0

			}, { duration: globalAnimationSpeed, easing: 'easeInOutCubic', complete:  function() {

				$('[data-favorite-animation-mark="'+token+'"]').remove();

			}})

		}})

	}})

}

//initiailise favorites to modules
function initialiseFavorites(){

	//fetch favorite array from body
	var favorite_string = $('body').attr('data-vault-favorite-string');
	var favorite_string = favorite_string.split(']');

	//for each item
	for (i = 0; i < (favorite_string.length-1); i++){

		//the value
		var value = favorite_string[i].split('[')[1].split(']')[0];

		$('li[data-vault-module-identifier="'+value+'"]').attr('data-vault-favorite-status','true').addClass('active');
		$('li[data-vault-module-identifier="'+value+'"] .favorite-module').addClass('active');

		//if the user is browsing in the imported section, don't do anything extra
		if($('.favorited-filter').hasClass('active')){ }
		else {

			//add overlay
			//$('li[data-vault-module-identifier="'+value+'"]').find('.vault-module-image-wrapper').prepend('<div class="module-imported-overlay" style="display: block; background-color: transparent;"></div>');

			// $('li[data-vault-module-identifier="'+value+'"]').find('.module-imported-overlay').animate({
			//
			// 	backgroundColor: 'rgba(29, 20, 88, 0.5)'
			//
			// }, 1000)

		}

		//$('li[data-vault-module-identifier="'+value+'"]').attr('data-vault-favorite-status','true');

	}

}

//initiailise favorites to modules
function initialiseImports(){

	//fetch favorite array from body
	var import_string = $('body').attr('data-vault-import-string');
	var import_string = import_string.split(']');

	$('li[data-vault-module-identifier]').attr('data-vault-import-status','false')
	$('li[data-vault-module-identifier]').removeClass('active')

	//for each item
	for (i = 0; i < (import_string.length-1); i++){

		//the value
		var value = import_string[i].split('[')[1].split(']')[0];

		$('li[data-vault-module-identifier="'+value+'"]').attr('data-vault-import-status','true').addClass('active');
		$('li[data-vault-module-identifier="'+value+'"] .import-module').addClass('active');

		//if the user is browsing in the imported section, don't do anything extra
		if($('.imported-filter').hasClass('active')){ }
		else {

			//add overlay
			$('li[data-vault-module-identifier="'+value+'"]').find('.vault-module-image-wrapper').prepend('<div class="module-imported-overlay" style="display: block; background-color: transparent;"></div>');

			// $('li[data-vault-module-identifier="'+value+'"]').find('.module-imported-overlay').animate({
			//
			// 	backgroundColor: 'rgba(29, 20, 88, 0.5)'
			//
			// }, 1000)

		}

	}

}

//initialiseModules
function initialiseModulesFromVault(){


	//variables
	modules_count = $('[data-menu-section="modules"] li').size();

	//remove all active states from modules
	$('[data-sidebar-module-identifier]').removeClass('active');

	//if modules count is zero, animate the add new module button
	if(modules_count > 0){

		//animateAddNewVaultModuleButton();

	}

	//detect wich type module should be loaded
	if($('.modules-vault-tab-import').hasClass('active')){ vaultModuleType = 'import'; }
	else { vaultModuleType = 'favorite'; }


	//variables
	var module_identifiers = $('[data-vault-'+vaultModuleType+'-string]').attr('data-vault-'+vaultModuleType+'-string').split('[');


	$('[data-sidebar-module-identifier]').removeClass('active');

	// Iterate through each value
	for(var i = 1; i < module_identifiers.length; i++){


		//variables
		var module_identifier = module_identifiers[i].replace(']','');

		//if module exists, ignore
		if ($('[data-sidebar-module-identifier="'+module_identifier+'"]').length > 0) {

		    //mark as added
		    $('[data-sidebar-module-identifier="'+module_identifier+'"]').addClass('active');

		}

		//else, add
		else {


			firstCharacterOfToken = module_identifier.substring(0, 1);

			//add module
			$('[data-menu-section="modules"]').prepend('<li data-sidebar-module-identifier="'+module_identifier+'" data-module-type="vault" class="active"><img draggable="false" src="../vault/thumbnails/'+firstCharacterOfToken+'/'+module_identifier+'/thumbnail.png"></li>');

			$('[data-sidebar-module-identifier="'+module_identifier+'"]').find('img').animate({

				'margin-left':'0px',
				'opacity': 1

			}, 500);

		}

	}

	setTimeout(function(){


		//remove all that has not active
		$('[data-sidebar-module-identifier]').each(function(){

			if($(this).hasClass('active')) {}
			else {

				$(this).slideUp(200, "easeInQuart", function() {

					//remove active state
					$(this).remove();

					detectVaultModulesEmptyState();

				});

			}

		});

		detectVaultModulesEmptyState();

		//initialise draggable
		initialiseDraggable();

		//set newlyImportedModules variable to zero
		newlyImportedModules = 0;

		//and set the message back to original
		adjustBackfromVaultButtonMessage('decrement');


	}, 500);

	detectVaultModulesEmptyState();

}

//animate add new vault module
function animateAddNewVaultModuleButton(){

	//animate the button
	$('.add-new-vault-module-button').animate({

		'top':'-100px',
		'margin-top': 0,

	}, { duration: openSpaceSpeed * 2.4, easing: 'easeInBack', complete:  function() {

		$('.add-new-vault-module-button').css({

			'width': '46px',
			'height': '46px',
			'margin-left':'-23px',
			'border-radius':'0',
			'background-size':'16px'

		});

		$('.add-new-vault-module-button').animate({

			'top': 0

		}, { duration: openSpaceSpeed * 2, easing: 'easeOutQuart', complete:  function() {

		}})

	}});

}

//show vault empty state
function showVaultEmptyState(){

	$('.vault-empty-state').show();

}

//hide vault empty state
function hideVaultEmptyState(){

	$('.vault-empty-state').hide();

}

//show vault modules
function showVaultModules(type){

	//variables
	var module_identifiers = $('[data-vault-'+type+'-string]').attr('data-vault-'+type+'-string').split('[');

	//empty menu
	$('[data-menu-section="modules"] li').remove();

	//remove active state
	$('#menu-modules-vault-tabs div').removeClass('active');

	//active current tab
	$('.modules-vault-tab-'+type).addClass('active')

	// Iterate through each value
	for(var i = 1; i < module_identifiers.length; i++){

		//variables
		var module_identifier = module_identifiers[i].replace(']','');
		firstCharacterOfToken = module_identifier.substring(0, 1);

		//append module
		$('[data-menu-section="modules"]').prepend('<li data-sidebar-module-identifier="'+module_identifier+'" data-module-type="vault" class="active"><img src="../vault/thumbnails/'+firstCharacterOfToken+'/'+module_identifier+'/thumbnail.png" style="opacity: 1; margin-left: 0px;"></li>')

	}

	initialiseDraggable();

	detectVaultModulesEmptyState();

}

//save imported and favorited modules
function saveImportedFavoritedModules(){

	//variables
	importString = $('[data-vault-import-string]').attr('data-vault-import-string');
	favoriteString = $('[data-vault-favorite-string]').attr('data-vault-favorite-string');

	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "http://www.stampready.net/dashboard/editor-3-5/scripts/functions.php?func=saveImportedFavoritedModules",
	    data: { importString: importString, favoriteString: favoriteString }
	}).done(function(data) {

		document.cookie = "localStorageImportModules="+importString+"; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
		document.cookie = "localStorageFavoriteModules="+favoriteString+"; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";

	});

}

function detectVaultModulesEmptyState(){

	modules_count = $('[data-menu-section="modules"] li').size();

	if(modules_count > 0){

		//remove vault button
		$('.empty-state-vault-module-bar').hide();

	}

	else {

		//show vault button
		$('.empty-state-vault-module-bar').show();

	}

}

function initialiseSection(dropdownTypeValue){

    //variables
    var selectedDropdown = $('[data-dropdown-item="'+dropdownTypeValue+'"]');

    //$(selectedDropdown).remove();

    filterHasChanged = true;
    resetDropdowns();
    changeDropdownResult(selectedDropdown);

    //variables
    var headerHeight = $('#store-header-wrapper').height();
    $('html, body').animate({ scrollTop: headerHeight+10+'px' }, 600);

}

function resetDropdowns(){

    $('[data-dropdown="mode"] > div').text('New');
    $('[data-dropdown="type"] > div').text('All');
    $('[data-dropdown="category"] > div').text('All');
    $('.switch-section.active').removeClass('active');

}

function openDropdown(event){

    $(event).next('ul').slideDown(globalAnimationSpeed);

}

function closeDropdown(event){


    $(event).find('ul').slideUp(globalAnimationSpeed);

}

//change dropdown result
function changeDropdownResult(event){

    if(!filterHasChanged){ return false; }

    //variables
    var result = $(event).text();

    //reflect result
    $(event).closest('.dropdown').find('.dropdown-result').text(result);

    closeDropdown($(event).closest('.dropdown'));

    setTimeout(function(){

        $(event).closest('.dropdown').find('[data-dropdown-item]').show();
        $(event).closest('.dropdown').find('[data-dropdown-item="'+result+'"]').hide();

    }, globalAnimationSpeed)

    //wait a little bit before fetching result
    initialiseVault();

}

function initialiseTags(){

    moduleTags = ['Architectural', 'Art', 'Baby', 'Beauty', 'Business', 'Cars & Bikes', 'Clothes', 'Creative', 'Development', 'Education', 'Entertainment', 'Faith', 'Fashion', 'Finance', 'Fitness', 'Food & Drinks', 'Gaming', 'Health', 'Hotel', 'Industrial', 'Interior', 'Law', 'Love', 'Luxury', 'Medical', 'Multipurpose', 'Music', 'Nature', 'Networks', 'Non-profit', 'People', 'Pets', 'Photography', 'Politics', 'Real Estate', 'Retro', 'Sale', 'Seasonal', 'Simple', 'Sport', 'Technology', 'Themed events', 'Travel', 'Wedding'];

    for (i = 0; i < moduleTags.length; i++) {

        $('[data-dropdown="category"] ul').append('<li data-dropdown-item="'+moduleTags[i].charAt(0).toUpperCase() + moduleTags[i].slice(1)+'">'+moduleTags[i].charAt(0).toUpperCase() + moduleTags[i].slice(1)+'</li>');

    }

}
