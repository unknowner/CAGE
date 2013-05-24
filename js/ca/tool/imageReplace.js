tool('ImageReplace');

tools.ImageReplace.settings = function() {
	tools.ImageReplace.runtimeUpdate();
	tools.Settings.heading('Image Replacer');
	tools.Settings.text('Use local stored images to reduce loading time and save bandwidth.');
	tools.Settings.onoff('Use local images', tools.ImageReplace.runtime.onOff, 'cage.Image.Replace.OnOff', tools.ImageReplace.runtimeUpdate);
	tools.Settings.file('Set local image directory', 'cage.Image.Replace.Directory', function(_files) {
		for ( var i = 0, f; f = _files[i]; i++) {
			if (!f.type.match('image.*')) {
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(theFile) {
				return function(e) {
					tools.ImageReplace.runtime.images[theFile.name] = e.target.result;
				};
			})(f);
			reader.readAsDataURL(f);
		}
		window.setTimeout(function() {
			addFunction(function(data) {
				window['cageImageReplaceData'] = data;
			}, JSON.stringify(tools.ImageReplace.runtime), true, true);

		}, 2000);
	});
};

tools.ImageReplace.runtimeUpdate = function() {
	if (!tools.ImageReplace.runtime) {
		tools.ImageReplace.runtime = {
			onOff : item.get('cage.Image.Replace.OnOff', false),
			images : {}
		};
	} else {
		tools.ImageReplace.runtime.onOff = item.get('cage.Image.Replace.OnOff', false);
	}
	addFunction(function(data) {
		window['cageImageReplaceData'] = data;
	}, JSON.stringify(tools.ImageReplace.runtime), true, true);
};

tools.ImageReplace.init = function() {
	tools.ImageReplace.runtimeUpdate();
	addFunction(function() {
		window['cageImageReplace'] = function(_data) {
			if (cageImageReplaceData) {
				var _count = 0;
				$('img', _data).each(function(_i, _e) {
					var _img = /\w*.\w{3}$/.exec($(_e).attr('nosrc'))[0].toString();
					if (cageImageReplaceData.images[_img]) {
						$(_e).attr('nosrc', cageImageReplaceData.images[_img]);
						console.log(_img);
						_count += 1;
					}
				});

				$('*[style]', _data).each(function(_i, _e) {
					if ($(_e).css('backgroundImage')) {
						var _css = $(_e).css('backgroundImage');
						var _match = /(\w*.\w{3})\)/g.exec(_css);
						if (_match !== null) {
							var _img = _match[1];
							if (cageImageReplaceData.images[_img]) {
								$(_e).css('backgroundImage', 'url(' + cageImageReplaceData.images[_img] + ')');
								_count += 1;
							}
						}
					}
				});

				console.log('ImageReplace - done:', _count);
			}
			return _data;
		};
	}, null, true, true);
};
