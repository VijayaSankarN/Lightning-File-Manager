({   
    checkFileList: function(component, event, helper) {
    	var fileList = component.get("v.fileList");
        if(!fileList.length) {
            var fileId = component.get("v.recordId");
            helper.getFileList(component, fileId);
        }
    },
    
	handleUploadFinished: function (component, event, helper) {
        var uploadedFiles = event.getParam("files");
        var existingFiles = component.get("v.fileList") || [];
        var newFiles = [];
        uploadedFiles.forEach(function(file) {
            newFiles.push({
                ContentDocumentId: file.documentId
            });
        })
        existingFiles.forEach(function(file) {
            newFiles.push({
                ContentDocumentId: file.ContentDocumentId
            });
        })
        component.set("v.fileList", newFiles);
    },
    
    deleteFile: function(component, event, helper) {
        if(confirm('Are you sure you want to delete this file?')) {
            var fileId = event.getSource().get("v.value");
            helper.deleteFile(component, fileId);
        }
    }
})