import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name_ar', length: 100 })
  nameAr: string;

  @Column({ name: 'name_en', length: 100 })
  nameEn: string;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ length: 50, nullable: true })
  icon: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
