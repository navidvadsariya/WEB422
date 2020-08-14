import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];
  querySub: any;
  constructor(private postData: PostService,private router: Router) { }

  ngOnInit(): void {
    this.postData.getAllPosts().subscribe(data => this.blogPosts = data);
  }
  rowClicked(e, id) {
    this.router.navigate(['/admin/post', id]);
  }
  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }
}
