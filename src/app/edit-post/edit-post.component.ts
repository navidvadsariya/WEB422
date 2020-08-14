import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;
  querySub: any;

  constructor(private postData: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.postData.getPostById(id).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    })
  }
  formSubmit(): void {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim()); // convert the string to an array and remove whitespace
    this.postData.updatePostById(this.blogPost._id, this.blogPost)
      .subscribe(() => this.router.navigate(['admin']));
  }
  deletePost(id):void{
    this.postData.deletePostById(id).subscribe(() => this.router.navigate(['admin']));
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }
}
