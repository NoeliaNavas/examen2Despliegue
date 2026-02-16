import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetailComponent {
       post$!: Observable<Post>;

       constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostsService
       ){
          this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
              const id = Number(params.get('id'));
              return this.postService.getById(id);
            })
          )
       }
         deletePost(id: number) {
    const ok = confirm('¿Seguro que quieres borrar este post?');
    if (!ok) return;

    this.postService.delete(id).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (e) => console.error('Error borrando:', e),
    });
  }
}