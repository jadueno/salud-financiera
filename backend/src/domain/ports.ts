export interface Repository<T, TNew> {
  list(): Promise<T[]>;
  create(entity: TNew): Promise<T>;
  update(id: string, entity: TNew): Promise<T | null>;
  remove(id: string): Promise<boolean>;
}
