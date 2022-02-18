import { Component , OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from '../post.model';
import { PostsService } from "../posts.service";
@Component({

  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts=[

  //   { title:'First Post' , content: 'this is first post' },
  //   { title:'Second Post', content: 'this is second post' },
  //   { title:'Third Post' , content: 'this is third post'  },
  //   { title:'Second Post', content: 'this is second post' },
  //   { title:'Second Post', content: 'this is second post' },
  //   { title:'Second Post', content: 'this is second post' },
  //   { title:'Second Post', content: 'this is second post' },
  // ];
   posts: Post[] = [];

   private postsSub : Subscription;

  constructor(public postsService : PostsService){ }

  ngOnInit() {

    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) =>{

      this.posts = posts;

    });

  }

  onDelete(postId: string){

    this.postsService.deletePost(postId);

  }

  ngOnDestroy(){

    this.postsSub.unsubscribe();

  }


}
