namespace myProject;

using { cuid ,
        managed,
        sap.common.CodeList
} from '@sap/cds/common';

entity Books : cuid , managed {
        title       : localized String(255);
        authors     : Association to Authors;
        genre       : Genre;
        publCountry : String(3);
        stock       : NoOfBooks;
        price       : Price;
        isHardcover : Boolean;
}

type Genre     : Integer enum {
    fiction     = 1;
    non_fiction = 2;
}

type NoOfBooks : Integer;

type Price {
    amount   : Decimal;
    currency : String(3);
}


entity Authors : cuid , managed {
        name        : String(100);
        dateOfBirth : Date;
        dateOfDeath : Date;
        epoch       : Association to Epochs ;
        books       : Association to many Books
                        on books.authors = $self;
}

entity Epochs : CodeList {
    key ID : Integer;
    
}