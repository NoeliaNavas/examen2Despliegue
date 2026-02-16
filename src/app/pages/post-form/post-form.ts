import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts';
import { Post } from '../../models/post';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostFormComponent {
  postId?: number;

  form = new FormGroup({
    title: new FormControl('',{nonNullable: true}),
    body: new FormControl('', {nonNullable: true})
  })
constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
// Si hay :id => modo editar => cargamos el post y rellenamos el form
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null);
        this.postId = Number(id);
        return this.postsService.getById(this.postId);
      })
    ).subscribe(post => {
      if (post) {
        this.form.patchValue({
          title: post.title,
          body: post.body,
        });
      }
    });

  }

  save() {
    const payload: Post = {
      userId: 1,
      title: this.form.controls.title.value,
      body: this.form.controls.body.value,
      id: this.postId ?? 0, // no es necesario, pero no molesta
    };

    // si hay postId => PUT, si no => POST
    const request$ = this.postId
      ? this.postsService.update(this.postId, payload)
      : this.postsService.create(payload);

    request$.subscribe({
      next: (res) => this.router.navigate(['/posts', res.id ?? this.postId ?? 1]),
      error: (e) => console.error('Error guardando:', e),
    });


}
}