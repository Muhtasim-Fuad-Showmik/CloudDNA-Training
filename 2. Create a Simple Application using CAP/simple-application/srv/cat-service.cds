using my.customerdocs as my from '../db/data-model';

service CatalogService  {
    entity Customer         as projection on my.Customer;
    entity CustomerDocument as projection on my.CustomerDocument;
}
