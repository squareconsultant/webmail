/* spaces */
openSpaceSpeed = 200; //how fast the space should be flicked [250]
openSpaceDelay = 25; //how long the next space should be flicked [50]
globalAnimationSpeed = 200; //how long the next space should be flicked [50]
popupSpeed = 0.42;

/* save button */
saveButtonTransformHeight = '18px'; //define the height the save button shoild transform to [18px]
saveButtonSpeed = 200; //how fast should the save button transform to a loading bar [200]
saveButtonFeedbackSuccessIcon = '../img/icons/save-success.png'; //the path to the success icon of the save button

/* credits bar */
creditsBarMessage = '27,134 credits'; //set the message in the bar. Leave empty if you want to add your own message in HTML
creditsBarURL = 'http://www.google.com'; //redirect to a URL when you click on the credits bar. [leave blank / url / false]
creditsBarOpenWindow = true; //should the URL open in a new window. [true / false]

/* user section */
logoOnly = false; //whether the user avatar should be circular [false / true]
logoImage = 'img/framework/avatar.png'; //path to your logo or avatar [avatar = 48 x 48], [logo ex. http://www.bowerbirdvintage.com.au/wp-content/uploads/2014/08/ceros-logo-light-grey.png]
logoURL = 'https://www.stampready.net'; // the url of the Logo/avatar
logoOpenWindow = true;
userSectionSpeed = 250;

/* preview url */
numberOfCharacters = 40; //amount of characters the preview url should present
stripHttp = true; //whether to present the url without http, https and www
ifUrlExists = true; //whether to check if the url exists. Preview url turns red if it doesn't
ignoreWords = ['sr_','mailto:']; //if any of those words exists in the url, url checker will not run

/* editing canvas */
preventOpeningURL = true; //whether or not an url within the editing canvas should open in a new window

/* crop */
startAtCenter = true; // start crop tool at center. false for top left

/* version */
versionSnapshotRate = 60000 * 5; // how often should we snap a version. standard 5 minutes (60000 * 5)
maxVersionSnapshots = 10;
snapshotActivityTimeout = 60000; //set to 1 minute

/* author mode */
authorMode = true;

/* select active state */
selectActiveStateDelay = 70;
selectFadeOutSpeed = 200;

/* fonts */
fontsList = 'Proxima N W01 At Smbd[Proxima N W01 At Smbd, Arial, Helvetica, sans-serif];Proxima N W01 At Reg[Proxima N W01 At Reg, Arial, Helvetica, sans-serif];ProximaNW01-AltLightReg[ProximaNW01-AltLightReg, Arial, Helvetica, sans-serif];Arial[Arial, Helvetica, sans-serif];Helvetica[Helvetica, Arial, sans-serif];Times[Times, Helvetica, Arial, sans-serif]';

/* vault */
vaultColumns = 3;
vaultFetchCount = 1;

/* font sub family default */
font_sub_family = 'regular';

/* tooltip present */
tooltipTimeout = 3000;

/* colorize timeout */
colorizeTimeout = 100; //how often should colorizing images update? update too fast and it will result in empty images, so be reasonable

/* flags */
stopScanningFlag = false;
colorizeTimeoutFlag = false;

/* sub-menu */
offsetSubmenu = 6;
offsetSubmenuAnimationDistance = 10;
navigationSubmenuTimeout = false;

/* module dragging */
moduleActiveFlag = false;
placeHolderFlag = false;
cursorPosition = false;
maxElementHeight = 200;

/* repeatable button timeout */
repeatableButtonTimeout = false;
tokenRepeatable = false;
repeatableButtonRemovedTimeout = false;
buttonDisabled = false;

/* btn false */
buttonFalseBackgroundColor = '#ececec';
buttonFalseColor = '#919191';

/* memory index // cmd + z */
memoryObject = { };
memoryIndex = 0;
maxMemoryIndex = 20;
failsaveMemory = false;

/* highlight */
highlightTimeout = 500;

/* vault */
scrollMaximumreachedThreshold = 5;
vaultMaximumScrollFlag = false;
vaultSorting = 'random';
vaultFetchModulesAmount = 9;
newlyImportedModules = 0;

/* image databse */
imageDatabaseMaximumScrollFlag = false;
imageDatabaseFetchCount = 0;
imageDatabaseTokensArray = [];
imageDatabaseFetchModulesAmount = 9;
imageDatabaseSorting = 'random';
initialiseImageDatabaseFlag = false;
imageIsFromDatabase = false;

//first time filter flag
imageFilter = false;

/* grid timeout */
gridTimeoutDelay = 1000;
gridTimeout = false;
originalImageData = '';
originalSource = '';
imageLoaded = false;
originalImageSource = '';
editedImageToken = '';
saveImageFlag = false;

/* navigation */
hasClickedModule = false;

/* global */
continueToSendFlag = false;

/* module option */
moduleOptionDragFlag = false;
newMousePosY = 0;

/* text selection */
textSelectionHasTable = false;

clickedElement = false;
clickedElementColor = false;
clickedElementBgColor = false;

/* convert base to real image timeout */
convertBase64ToImagesTimeout = false;
convertBase64ToImagesTimeoutMS = 5000;

/* edit background flag */
editImageFlag = false;
editBackgroundImageFlag = false;

/* optimzer */
campaignOptimizerTimeout = false;
fontDetectionTimeout = false;
sensitiveWordsArray = [];

/* template mode */
templateGrouping = false;
moduleGroupingString = '';

outOfCanvasFlag = false;
overCanvasFlag = false;

/* swatch */
maxAmountSwatches = 42;
maxAmountPalettes = 9;
blankSwatchExists = true;

/* color picker */
saveSwatchTimeoutBoolean = false;
saveSwatchTimeout = 5000;
savedColorpickerValue =  false;
newlyCreatedSwatch = false;
effectAllModules = true;
effectTarget = '#template-editing-canvas';

moduleClickDisable = false;
codeEditorTimeoutFlag = false;
codeEditorSaveButtonTimeout = 3000;
findOccurencesTimer = false;
findOccurencesMessageTimer = false;

newlyCreatedColor = false;
memoryElement = false;

editLinkMode = false;

memoryclickedElementBgColor = '';
editableMode = false;

/* feed language array */
feedLanguageArray = [{"nl":"Lees Meer", "ru":"Brak rakr", "eng":"Read More"}];

avatarMenu = false;
saveTimeout = false;
notificationTimeout = false;

finishImageDatabase = false;
prefixImageUpload = '../editor-3-5/uploads/image_uploads/thumbnail';

image_gallery_columns_images = 3;
image_gallery_columns_icons = 6;

gridSnapSizes = '';

registerFlag = false;

//demo popup timeout
demoTimeout = 300000;

changingFontFlag = false;

vaultDoctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>';

spaceFlag = false;

//dropdowns vault
dropdownTimeout = false;
dropdownTypeLeave = false;
