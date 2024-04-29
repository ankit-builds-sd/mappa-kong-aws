export class Single<T> {
  private _collection: T[] = [];
  constructor(collection: T[]) {
    this._collection.push(...collection);
  }

  public get() {
    if (this._collection.length > 1)
      throw new Error(
        'Single cannot return object with base collection with size more than 1'
      );
    if (this._collection.length === 0) return null;
    return this._collection[0];
  }
}
