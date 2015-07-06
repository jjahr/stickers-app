console.log("app.js");

var photo;
var canvas;
var debug_autoLoadImage = true;

var sticker_urls = [
	'img/stickers/1.png',
	'img/stickers/2.png',
	'img/stickers/3.png',
	'img/stickers/4.png'
]
var stickers = [];
var stickerButtons;
var sticker_cornerColor = 'rgba(255,200,0,1)';
var sticker_borderColor = 'rgba(255,200,0,1)';

fabric.Sticker = fabric.util.createClass(fabric.Image, {
	type: 'sticker',

});

$(function() {
	console.log('app.js jquery init');

	// Upload image to page
	// http://jsfiddle.net/ja0tyj0f/280/

	if(debug_autoLoadImage==true) {
		var e = {
			target: {
				result: 'img/debug/photo.jpg'
			}
		}
		initCanvasWithImage(e);
	}

    $(".upload:file").change(function () {
    	console.log('file upload change handler')
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = initCanvasWithImage;
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Toolbar click handlers
    $('.page2 .toolbar .delete').click(toolbar_delete);
    $('.page2 .toolbar .delete-all').click(toolbar_deleteAll);
    $('.page2 .toolbar .start-over').click(toolbar_startOver);
    $('.page2 .toolbar .save').click(toolbar_save);
});

function initCanvasWithImage(e) {
	console.log('initCanvasWithImage()');
    // $('img.upload').attr('src', e.target.result);

    // Init canvas
	canvas = new fabric.Canvas('canvas');
	canvas.setHeight(500);
	canvas.setWidth(800);


	// Load photo onto canvas
    // http://fabricjs.com/fabric-intro-part-1/#images
    // http://fabricjs.com/docs/fabric.Object.html
    var imageURL = e.target.result;

    fabric.Image.fromURL(e.target.result, function(oImg) {
		// Handler fires when image has loaded
	  	photo = oImg;
	  	// photo.hasControls = false;
	  	// photo.hasRotatingPoint = false;
	  	photo.selectable = false;
	  	canvas.add(photo);
	  	updateCanvas();
	});

    // Sticker click events
    stickerButtons = $('.page2 ul.stickers img');
    stickerButtons.click(stickerButtonClickHandler);


    // Load stickers

  //   for(var i=0; i<sticker_urls.length; i++) {
	 //    fabric.Image.fromURL(sticker_urls[i], function(oImg) {
		// 	// Handler fires when image has loaded
		//   	stickers[i] = oImg;
		//   	canvas.add(oImg);
		//   	updateCanvas();		  	
		// });
  //   }

	// var imgInstance = new fabric.Image(image, {
	//   left: 0,
	//   top: 0,
	//   angle: 0,
	//   centeredScaling: true
	// });
	// canvas.add(imgInstance);

};

function stickerClickHandler(event) {
	// Called when we click a sticker on the canvas.

	// Bring this sticker to front.
	// this.bringToFront()
}

function stickerButtonClickHandler(event) {
	var url = $(this).attr('src');
	console.log('stickerButtonClickHandler: ' + url);

	// Load new fabric image from this sticker's URL
    fabric.Image.fromURL(url, function(oImg) {
		// Handler fires when image has loaded

		// Create new sticker
	  	var sticker = oImg;
	  	// Position
	  	sticker.top = canvas.height/2;
	  	sticker.left = canvas.width/2;
	  	// Behavior
	  	sticker.selectable = true;
	  	sticker.centeredScaling = true;
	  	stickers.lockScalingFlip = true;
	  	// Controls appearance
	  	var borderColor = 'rgba(255,200,0,1)';
	  	sticker.borderColor = borderColor;
	  	sticker.cornerColor = borderColor;
	  	sticker.transparentCorners = false;
	  	sticker.padding = 0;
	  	sticker.rotatingPointOffset = 40;
	  	sticker.borderOpacityWhenMoving = 0.4;
	  	sticker.cornerSize = 16;
	  	sticker.hasBorders = true;
	  	sticker.isSticker = true;
	  	sticker.name = 'sticker';
	  	// Add to stickers array
	  	stickers.push(sticker);

	  	canvas.add(sticker);
	  	updateCanvas();
	});


	event.preventDefault();
}


function toolbar_delete(event) {
	// Delete selected stickers.
	if(canvas.getActiveGroup()) {
		console.log('toolbar_delete: deleting group');
	      canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
	      canvas.discardActiveGroup().renderAll();
    } else {
		console.log('toolbar_delete: deleting object');
      canvas.remove(canvas.getActiveObject());
    }
	event.preventDefault();
}

function toolbar_deleteAll(event) {
	canvas.forEachObject(function(obj) {
	    console.log(obj.name);
	    if(obj.name == 'sticker') {
	    	obj.remove();
	    }
	    // if(obj.isSticker == true) {
	    // 	obj.remove();
	    // }
	});
	event.preventDefault();

}

function toolbar_startOver(event) {

}

function toolbar_save(event) {

}

function updateCanvas() {

	// Resize Photo
	if(photo) {
		photo.scaleX = canvas.width/photo.width;
		photo.scaleY = photo.scaleX;
		photo.top = 0;
		photo.left = 0;
	}

	// Resize buttons

	// Scale up/down photo to fit canvas.
	// var fitX = photo.width/canvas.width;
	// var fitY = photo.height/canvas.height;
	// if( fitX >= fitY ) {
	// 	// Scale down so width fits
	// 	photo.scaleX = canvas.width/photo.width;
	// 	photo.scaleY = photo.scaleX;
	// } else {
	// 	// Scale down so height fits
	// 	photo.scaleY = canvas.height/photo.height;
	// 	photo.scaleX = photo.scaleY;
	// }

  	canvas.renderAll();
}