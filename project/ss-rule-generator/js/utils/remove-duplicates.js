jQuery(document).ready(function() {
	
	// Removing Duplicate Lines
	jQuery('#removetext').click(function(e) {
  
		e.preventDefault();
		
		// Starting Variables
		var data = jQuery('#duplicatetextinput').val().split(/\r?\n/);
		var removeEmpty = jQuery('#removeempty').prop("checked");
		var caseSensitive = jQuery('#casesensitive').prop("checked");
		var totalRemoved = 0;
		var totalEmptyRemoved = 0;
		
		// Process Textarea Data
		var seen = {};
		var result = [];
		var len = data.length;
		var j = 0;
		
		if (removeEmpty === false && caseSensitive === false) {
			for(var i = 0; i < len; i++) {
				item = data[i];
				itemCase = item.toUpperCase();
				if (item === "") {
					result[j++] = item;
				} else if (seen[itemCase] !== 1) {
						seen[itemCase] = 1;
						result[j++] = item;
					}
			}
		}
		
		if (removeEmpty === true) {
		var cleaned = data.filter(n => n);
		len = cleaned.length;
		totalEmptyRemoved = data.length - cleaned.length;
			for(var i = 0; i < len; i++) {
				item = cleaned[i];
				if (seen[item] !== 1) {
					seen[item] = 1;
					result[j++] = item;
				}
			}      
		}
		
		if (removeEmpty === false && caseSensitive === true) {
			for(var i = 0; i < len; i++) {
				item = data[i];
				if (item === "") { 
				result[j++] = item;
				} else if (seen[item] !== 1) {
					seen[item] = 1;
					result[j++] = item;
				}
			}
		}
		
		//data=data;

		// Write Results To Textarea
		jQuery('#duplicatetextinput').val(result.join('\n').replace(/^(,| )+(?=\[)/gm,""));
		
		// Write Output Stats
		if (removeEmpty == true && totalEmptyRemoved > 0) {
			totalRemoved = (data.length - result.length) - totalEmptyRemoved;
			jQuery('#totalremoved').html("There was a total of <b>" + totalRemoved + "</b> duplicates and <b>" + totalEmptyRemoved + "</b> empty lines removed.");     
		} else {
			totalRemoved = data.length - result.length; 
			jQuery('#totalremoved').html("There was a total of <b>" + totalRemoved + "</b> duplicates removed.");
		}
	
  	});
 
 
    // Select All Text
		jQuery('#selecttext').click(function(e)	{
		e.preventDefault();
		jQuery('#duplicatetextinput').select();
    });

	
  	// Clear All Text
		jQuery('#cleartext').click(function(e)	{	
		e.preventDefault();
		jQuery('#duplicatetextinput').val('');	
    });

    
	// Load File - Button Trigger	
	jQuery("#loadfile").click(function(){
        jQuery('#loadfile2').trigger('click');
	});
	
	
   	// Load File - Text Only
  	jQuery('#loadfile2').click(function() {
   
		var fileInput = jQuery('#loadfile2');
		var fileDisplayArea = jQuery('#duplicatetextinput');

		jQuery(fileInput).change(function() {
			var file = jQuery(fileInput).prop('files')[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();
				reader.onload = function() {
					jQuery(fileDisplayArea).val(reader.result);
				}
					reader.readAsText(file);	
				} else {
					jQuery(fileDisplayArea).val("File not supported!");
					}
      });
   
   	});
	
	
	// Save To Text File
	jQuery('#savefile').click(function() {
		var textToSave = jQuery('#duplicatetextinput').val();
		var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
		var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
		var fileNameToSaveAs = jQuery('#savefilename').val()
		
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = textToSaveAsURL;
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	 
		downloadLink.click();
	});
	
	function destroyClickedElement(event)
	{
		document.body.removeChild(event.target);
	};
    
});