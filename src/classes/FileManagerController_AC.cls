public class FileManagerController_AC {
	@AuraEnabled
    public static void deleteContentDocument(Id ContentDocumentId) {
        Database.delete(ContentDocumentId);
    }
    
    @AuraEnabled
    public static List<ContentDocumentLink> getRelatedFiles(Id LinkedEntityId) {
        return [
            SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :LinkedEntityId
        ];
    }
}