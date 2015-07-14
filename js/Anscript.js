var canvas;
var context;
var img;
var a = 1000;
var b = 618;

function _id(id)
{
	return document.getElementById(id);
}

function invertColor()
{
	img = _id('image');
	
	if(img.width > a)
	{
		img.width = a;
		img.height = b;
	}
	
	if(img.height > a)
	{
		img.height = a;
		img.width = b;
	}
	
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);
	
	var imageData = context.getImageData(0, 0, img.width, img.height);
	var data = imageData.data;
	
	for (var i = 0; i < data.length; i += 4) {
		data[i] = 255 - data[i];
		data[i + 1] = 255 - data[i + 1];
		data[i + 2] = 255 - data[i + 2];
		data[i + 3] = 255;
	}
	
	context.putImageData(imageData, 0, 0);
}

function Output(msg)
{
	var m = _id("source");
	m.innerHTML = msg;
}

function ParseFile(file)
{
	if (file.type.indexOf("image") == 0) {
		var reader = new FileReader();
		reader.onload = function(e) {
			Output('<img id="image" src="' + e.target.result + '"></p>');
		}
		reader.readAsDataURL(file);
	}
}

function fileSelected()
{
	var file = _id('file').files[0];
	ParseFile(file);
}

window.onload = function() {
	canvas = _id("invert");
	context = canvas.getContext("2d");
};