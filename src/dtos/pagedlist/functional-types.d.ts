//SECTION Definições
declare type PaginationSortOptions = "asc" | "desc"

//SECTION Tipos
/** Representa um valor que pode ser usado para indexar objetos, limitado à `string` e `number` */
declare type Index = string | number;
/** Representa um objeto fortemente tipado de maneira mais legivel */
declare type Dictionary<TVal = string, TKey extends Index = string> = { [key in TKey]: TVal }
/** Representa uma chave para uma propriedade de um objeto */
declare type Key<TVal> = undefined | keyof TVal;
/** Representa uma propriedade de um objeto */
declare type Prop<TObj> = TObj[keyof TObj];
/** Representa um enum */
declare type EnumType = { [key: string]: Index };

//SECTION Pares
declare type CardCounter<TKey extends Index = string> = { value: TKey, enable: boolean }
declare type NameClass<TKey extends Index = string> = { name: TKey, class: string }
declare type NameId<TVal = string, TKey extends Index = string> = { name: TKey, id: TVal }
declare type NameValue<TVal = number, TKey extends Index = string> = { name: TKey, value: TVal }
declare type PairKeyValue<TVal = string, TKey extends Index = string> = { key: TKey, value: TVal }
declare type SimpleItem<TVal = string> = { id: string, name: TVal };