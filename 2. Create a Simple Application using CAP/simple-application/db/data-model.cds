namespace my.customerdocs;

entity Customer {
    key CustomerId        : Integer;
        FirstName         : String;
        LastName          : String;
        AcademicTitle     : String;
        Phone             : String;
        Email             : String;
        Gender            : String;
        Website           : String;
        CustomerDocuments : Association to many CustomerDocument
                                on CustomerDocuments.Customer = $self;
}

entity CustomerDocument {
    key DocId        : Integer;
    key Customer   : Association to Customer;
        DocumentName : String;
        DocumentType : String;
        Content      : String;
        CreateTime   : Time;
        CreateDate   : Date;
        CreatedBy    : String;
}
