$(document).ready(function() {

	//variables
	meterIsAnimatingFlag = false;//boolean of meter animating
	stopCallibrationFlag = false;
	percentage = 0;//set start percentage
	pauseTask = 700;//how long does scanning need to wait per task?
	delayStartScanning = 2000;//how long we need to wait before we start the scan
	sensitiveWords = ['test','discovered'];
	hasSensitiveWords = false;
	hasEmptyURLS = false;

	//first make sure to stop rendering the css of the template dump
	//$('#template-editing-canvas style').get(0).disabled = true;

});

$(document).on('click', '.show-senstive-words:not([data-sensitive-words=""])', function(){

	closePopup();

	hasEmptyURLS = false;
	hasSensitiveWords = false;

	setTimeout(function(){

		//set popup parameters
		headline = sensitiveWordsArray.length+' Sensitive Words Found';
		paragraph = 'The following words may decrease your deliverability rate. Consider changing them.<br/><br/><span class="font-bold">'+sensitiveWordsArray+'</span>';

		btnFalse = 'I understand';
		invert = true;

		//open popup
		openPopup();

	}, 750)

});

$(document).on('click', '.remove-empty-urls-button:not(.list-good)', function(){

	closePopup();

	hasEmptyURLS = false;
	hasSensitiveWords = false;

	setTimeout(function(){

		//set popup parameters
		headline = 'Remove Invisible and Empty URLS';
		paragraph = 'Are you sure you want to remove any invisible and empty URLS found throughout your newsletter? URLS that contain no link isn\'t useful for subscribers. These URLS are often leftovers from editing.';
		btnTrue = 'Remove';
		btnTrueId = 'remove-empty-urls-confirm';
		btnTrueFunction = 'removeEmptyUrls();';

		btnFalse = 'Nevermind';

		//open popup
		openPopup();

	}, 750)

});

function removeEmptyUrls(){

	//if links are empty or hashtag
	$('#template-editing-canvas a').each(function(){

		var el = $(this);
		var attr = $(this).attr('href');
		var elContents = $(this).text();
		var elContentsHtml = $(this).html();

		if(attr == undefined || attr == '' || attr == '#'){

			if(elContents == '' && elContentsHtml == ''){

				$(el).remove();

			}

			else {

				$(el).contents().unwrap();

			}

		}

	});

	setSaveActive();

	//save template to memory
    saveTemplateToMemory();

	closePopup();

	setTimeout(function(){

		//notification
		notification('success','Success','Invisible and empty URLS removed', false);

	}, 750);

}

function resetCampaignOptimizer(){

	percentage = 0;

	$('#percentage .score').text(percentage);

	$('#campaign-optimizer-body li').remove();

	$('#campaign-optimizer-top, #gear, #meter').css('transition','all 0.8s ease')

	$('#meter').css('transform','rotate(-90deg)')

	$('#gear, #meter').css('opacity','1');

	$('#campaign-optimizer-top').css('height','200px');

	$('#campaign-optimizer-body').css('overflow','auto');

	$('#campaign-optimizer').css('padding-top','200px');

	$('#calipers-shadow').css('transform','rotate(-5deg)');

	$('#campaign-optimizer-top').removeClass('good').removeClass('average');
	$('#campaign-optimizer-top').addClass('bad');

	$('.list-warning').removeClass('list-warning')

	clearTimeout(campaignOptimizerTimeout);

}

function setMeter(percentage){

	//variables
	current_score = parseInt($('.score').text());

	meterIsAnimatingFlag = true;

	var degree = 180 * percentage;
	var degree = degree / 100;
	var degree = Math.round(-90 + degree);

	if(percentage < 40){ score = 'bad'; }
	else if(percentage > 39 && percentage < 80){ score = 'average'; }
	else if(percentage > 79){ score = 'good'; }
	var shadow_degree = degree / 15;

	//set parameter agree on element
	$('#meter').attr('data-degree',degree);

	//rotate the meter
	$('#meter').css('transform','rotate('+degree+'deg)');

	//
	$('#calipers-shadow').css('transform','rotate('+shadow_degree+'deg)');
	$('#campaign-optimizer-top').removeClass('bad').removeClass('average').removeClass('normal').removeClass('good').addClass(score);

	if(current_score < percentage){

		t = setInterval(function(){

			if(current_score >= percentage){ clearInterval(t); return false; }

			current_score = current_score + 1;

			$('.score').text(current_score);

		}, 7);

	}

	else {

		t = setInterval(function(){

			if(current_score <= percentage){ clearInterval(t); return false; }

			current_score = current_score - 1;

			$('.score').text(current_score);

		}, 7);

	}

	setTimeout(function(){

		meterIsAnimatingFlag = false;

	}, 800)

}

//callibration
function initialiseCalibration(){

	stopCallibrationFlag = false;

	setInterval(function(){

		if(meterIsAnimatingFlag){ return false; }
		if(stopCallibrationFlag){ var current_percentage = parseInt($('.score').text()); setMeter(current_percentage); return false; }

		var current_degree = parseInt($('[data-degree]').attr('data-degree'));
		var min_offset = -1000;
		var max_offset = 1000;
		var degree_offset = Math.floor(Math.random() * (max_offset - min_offset + 1)) + min_offset;
		var degree_offset = degree_offset / 100;
		var new_degree = current_degree + degree_offset;

		$('#meter').css('transform','rotate('+new_degree+'deg)');

		//console.log(new_degree);

	}, 200)

}

//scanning
function startScanning(){

	//variables
	template_html = $('#template-editing-canvas [data-template-type="html"]').html();

	//search for media queries, if found
	if($('#template-editing-canvas [data-template-type="headers"]').html().indexOf('@media') >= 0){

		//set list variables
		type = 'good';
		btnText = 'Yes';

		//set percentage
		adjustPercentage(12, 'increase');
		setMeter(percentage);

	}

	//if no media queries are found
	else {

		//set list variables
		type = 'warning';
		btnText = 'Not found';

	}

	//add list
	addList('Mobile compatible',type,btnText);

	//wait a little before scanning the next task
	campaignOptimizerTimeout = setTimeout(function(){

		//if stop flag is set
		if(stopScanningFlag){ return false; }

		//variables
		hasAltAttributes = true;

		//detect if images has an alt attribute
		$('#template-editing-canvas img').each(function(){

			var attr = $(this).attr('alt');

			if(attr == undefined){

				hasAltAttributes = false;

			}

		});

		if(!hasAltAttributes){

			type = 'warning';
			btnText = 'Some missing';

		}

		else {

			type = 'good';
			btnText = 'Yes';

			//set percentage
			adjustPercentage(8, 'increase');
			setMeter(percentage);

		}

		addList('Images has ALT text', type, btnText, 'test', 'Edit ALT tags[edit_alt_tags]');

		//wait a little before scanning the next task
		campaignOptimizerTimeout = setTimeout(function(){

			//if stop flag is set
			if(stopScanningFlag){ return false; }

			//detect if template has an unsubscribe link
			if(template_html.indexOf('sr_unsubscribe') >= 0 || template_html.indexOf('*|unsubscribe|*') >= 0){

				type = 'good';
				btnText = 'Yes';

				//set percentage
				adjustPercentage(12, 'increase');
				setMeter(percentage);

			}

			else {

				type = 'warning';
				btnText = 'Not found';

			}

			//add list
			addList('Has unsubscribe link',type,btnText);

			//wait a little before scanning the next task
			campaignOptimizerTimeout = setTimeout(function(){

				//if stop flag is set
				if(stopScanningFlag){ return false; }
				//variables
				hasBackgroundImages = false;

				//scan for background images
				$('#template-editing-canvas').find('table, td').each(function(){

					var attr = $(this).attr('background');

					if ($(this).css('background-image') != 'none') {

						hasBackgroundImages = true;

					}

					else if(attr != undefined){

						hasBackgroundImages = true;

					}

				});

				if(hasBackgroundImages){

					type = 'warning';
					btnText = 'Yes';

				}

				else {

					type = 'good';
					btnText = 'No';

					//set percentage
					adjustPercentage(13, 'increase');
					setMeter(percentage);

				}

				//add list
				addList('Has background images',type,btnText);

				//wait a little before scanning the next task
				campaignOptimizerTimeout = setTimeout(function(){

					//if stop flag is set
					if(stopScanningFlag){ return false; }

					maxTableHeight = 0;

					$('#template-editing-canvas table').each(function(){

						tableHeight = parseInt($(this).height());

						if(tableHeight > maxTableHeight){ maxTableHeight = tableHeight; }

					});

					if(maxTableHeight > 1789){

						type = 'error';
						btnText = 'No';

					}

					else {

						type = 'good';
						btnText = 'Yes';

						//set percentage
						adjustPercentage(12, 'increase');
						setMeter(percentage);

					}

					//add list
					addList('Reasonable email length',type, btnText);

					//wait a little before scanning the next task
					campaignOptimizerTimeout = setTimeout(function(){

						//if stop flag is set
						if(stopScanningFlag){ return false; }

						//variables
						img_array = [];

						$('#template-editing-canvas img').each(function(){

							//variables
							img_src = $(this).attr('src');

							img_array.push(img_src);


						});

						//count how many items the array hold
						array_count = img_array.length;

						//if the array has more than 0 items, make sure to convert them
						if(array_count >= 0){

							$.ajax({
							    type: "POST",
							    dataType: "html",
							    url: "http://www.stampready.net/dashboard/editor-3-beta/scripts/functions.php?func=fetchImageSize",
							    data: { img_array: img_array },
							}).done(function(data) {

								//alert(data)

								if(data > 400000){

									type = 'error';
									btnText = 'No';

								}

								else {

									type = 'good';
									btnText = 'Yes';

									//set percentage
									adjustPercentage(13, 'increase');
									setMeter(percentage);

								}

								//add list
								addList('Reasonable image weight',type, btnText);

								//wait a little before scanning the next task
								campaignOptimizerTimeout = setTimeout(function(){

									//if stop flag is set
									if(stopScanningFlag){ return false; }

									sensitiveWordsCount = 0;

									$.ajax({
									    type: "POST",
									    dataType: "json",
									    url: "http://www.stampready.net/dashboard/editor-3-beta/scripts/functions.php?func=fetchSensitiveWords",
									    data: { },
									}).done(function(data) {

										sensitiveWordsArray = [];

										//for each value returned
										for (i=0;i<data.length;i++){

											if(template_html.indexOf(data[i]) >= 0){

												hasSensitiveWords = true;
												sensitiveWordsCount++;

												sensitiveWordsArray.push(data[i]);

											}

										}

										if(!hasSensitiveWords){

											type = 'good';
											btnText = 'No';

											//set percentage
											adjustPercentage(13, 'increase');
											setMeter(percentage);

										}

										else {

											type = 'error';
											btnText = sensitiveWordsCount+' found';

										}

										//add list
										addList('Contains Sensitive words',type, btnText);

										//wait a little before scanning the next task
										campaignOptimizerTimeout = setTimeout(function(){

											//if stop flag is set
											if(stopScanningFlag){ return false; }

											emptyURLScount = 0;

											//if links are empty or hashtag
											$('#template-editing-canvas a').each(function(){

												var el = $(this);
												var attr = $(this).attr('href');

												if(attr == undefined || attr == '' || attr == '#'){

													hasEmptyURLS = true;
													emptyURLScount++;

												}

											});

											if(!hasEmptyURLS){

												type = 'good';
												btnText = 'No';

												//set percentage
												adjustPercentage(7, 'increase');
												setMeter(percentage);

											}

											else {

												type = 'warning';
												btnText = emptyURLScount+' found';

											}

											//add list
											addList('Invisible/Empty URLS',type, btnText, 'test', 'Edit URLS[edit_urls];Unbind as URLS[unbind_urls]');

											fontDetectionTimeout = setTimeout(function(){

												//if stop flag is set
												if(stopScanningFlag){ return false; }

												fontCount = $('[data-template-type="headers"]').find('[data-font-name]').length;

												if(fontCount < 2){

													type = 'good';
													btnText = 'No';

													//set percentage
													adjustPercentage(10, 'increase');
													setMeter(percentage);

												}

												else {

													type = 'warning';
													btnText = fontCount+' found';

												}

												//add list
												addList('Too many fonts installed',type, btnText, 'test', '');

												stopCallibration();

											}, pauseTask);

										}, pauseTask);

									});

								}, pauseTask);

							});

						}

					}, pauseTask);

				}, pauseTask);

			}, pauseTask);

		}, pauseTask);

	}, pauseTask)

}

function adjustPercentage(amount, type){

	if(type == 'increase'){

		percentage = percentage + amount;

	}

	else if(type == 'decrease'){

		percentage = percentage - amount;

	}

}

function addList(text, type, buttonText, selectName, selectItems){

	//variables
	var token = Math.random().toString(36).substr(2);

	if(selectName == undefined){

		selectString = '';

	}

	else {

		selectString = ' data-select-name="'+selectName+'" data-select-items="'+selectItems+'"';

	}

	selectString = '';

	if(text == 'Invisible/Empty URLS'){

		$('#campaign-optimizer-body ul').prepend('<li data-token="'+token+'">'+text+' <div class="result-list remove-empty-urls-button list-'+type+'"'+selectString+'>'+buttonText+'</div></li>');

	}

	else if(text == 'Contains Sensitive words'){

		$('#campaign-optimizer-body ul').prepend('<li data-token="'+token+'">'+text+' <div class="result-list show-senstive-words list-'+type+'"'+selectString+' data-sensitive-words="'+sensitiveWordsArray+'">'+buttonText+'</div></li>');

	}

	else {

		$('#campaign-optimizer-body ul').prepend('<li data-token="'+token+'">'+text+' <div class="result-list list-'+type+'"'+selectString+'>'+buttonText+'</div></li>');

	}

	$('[data-token="'+token+'"]').animate({

		'opacity':'1',
		'margin-left':'0px'

	}, 500);

	$('[data-token="'+token+'"] .result-list').animate({

		'right':'20px'

	}, 500);

}

function getRows(selector) {
    var height = $(selector).height();
    var font_size = $(selector).css('font-size');
    var scale = 1.15
    var line_height = Math.floor(parseInt(font_size) * scale);
    var rows = height / line_height;
    return Math.round(rows);
}

function stopCallibration(){

	stopCallibrationFlag = true;

	$('#gear, #meter').css('transition','none')

	//animate the button
	$('#gear, #meter').animate({
		'opacity': '0'
	}, { duration: globalAnimationSpeed * 1.2, easing: 'easeOutCubic', complete:  function() {

		setTimeout(function(){

			$('#campaign-optimizer-top').css({'height':'110px'});

			$('#campaign-optimizer-body').css('overflow','hidden');

			$('#campaign-optimizer').css({'padding-top':'85px'});

		}, 500)

	}});

	// $('#campaign-optimizer-top').css('transition','none')
	//
	// $('#campaign-optimizer-top').animate({'height':'110px'}, globalAnimationSpeed * 4);
	//
	// $('#campaign-optimizer-body').css('overflow','hidden')
	//
	// $('#campaign-optimizer').animate({'padding-top':'85px'}, globalAnimationSpeed * 4)

}
