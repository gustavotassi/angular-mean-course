import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  panelOpenState = false;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((res: Post[]) => {
        this.posts = res;
      });
  }

  ngOnDestroy(): void {
    // prevent memory leaks
    this.postsSub.unsubscribe();
  }

  verifyContent(content: string): any {
    if (this.panelOpenState) {
      return '';
    } else {
      if (content.length > 45) {
        return content.substring(0, 45) + '...';
      } else {
        return content;
      }
    }
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}
