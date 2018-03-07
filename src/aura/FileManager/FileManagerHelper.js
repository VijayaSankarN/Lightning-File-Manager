({
    getFileList: function(component, LinkedEntityId) {
        var action = component.get("c.getRelatedFiles");
        
        action.setParams({
            "LinkedEntityId": LinkedEntityId
        });
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var fileList = response.getReturnValue();
                component.set("v.fileList", fileList);
            } else {
                component.find('notifLib').showToast({
                    "title": "Failed!",
                    "variant": "error",
                    "message": "Failed to fetch related files"
                });                
            }
        });
        
        $A.enqueueAction(action);
    },
    
	deleteFile: function(component, ContentDocumentId) {
        var action = component.get("c.deleteContentDocument");

        action.setParams({
            "ContentDocumentId": ContentDocumentId
        });
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var fileList = component.get("v.fileList");
                var fileList_updated = this.removeIndexByKey(fileList, 'ContentDocumentId', ContentDocumentId);
                component.set("v.fileList", fileList_updated);
                
                component.find('notifLib').showToast({
                    "title": "Success!",
                    "variant": "success",
                    "message": "File has been deleted successfully"
                });
            } else {
                component.find('notifLib').showToast({
                    "title": "Failed!",
                    "variant": "error",
                    "message": "File deletion failed"
                });                
            }
        });
        
        $A.enqueueAction(action);
	},
    
    removeIndexByKey: function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                array.splice(i, 1);
            }
        }
        return array;
    }
})