import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

export default Artist;
