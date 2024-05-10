import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { plainToInstance } from 'class-transformer';
import PostModel from './posts.model';
import PostDto from './posts.dto';

@Injectable()
class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM posts
    `);
    return plainToInstance(PostModel, databaseResponse.rows);
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM posts WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(PostModel, entity);
  }

  async create(postData: PostDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO posts (
        title,
        post_content
      ) VALUES (
        $1,
        $2
      ) RETURNING *
    `,
      [postData.title, postData.content],
    );
    return plainToInstance(PostModel, databaseResponse.rows[0]);
  }

  async update(id: number, postData: PostDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE posts
      SET title = $2, post_content = $3
      WHERE id = $1
      RETURNING *
    `,
      [id, postData.title, postData.content],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(PostModel, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM posts WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default PostsRepository;