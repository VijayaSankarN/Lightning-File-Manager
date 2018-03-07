@isTest
public class FileManagerController_AC_Test {
    @isTest static void ContentDocument_Test()
    {
        ContentVersion contentVersionInsert = new ContentVersion(
            Title = 'Test',
            PathOnClient = 'Test.jpg',
            VersionData = Blob.valueOf('Test Content Data'),
            IsMajorVersion = true
        );
        insert contentVersionInsert;
        
        // Test INSERT & SELECT
        ContentVersion contentVersionSelect = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id = :contentVersionInsert.Id LIMIT 1];
        List<ContentDocumentLink> documents = FileManagerController_AC.getRelatedFiles(UserInfo.getUserId());
        System.assertEquals(documents.size(), 1);
        
        // Test DELETE
        FileManagerController_AC.deleteContentDocument(contentVersionSelect.ContentDocumentId);
        documents = FileManagerController_AC.getRelatedFiles(UserInfo.getUserId());
        System.assertEquals(documents.size(), 0);
    }
}