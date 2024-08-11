import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { AddStoryComponent } from './add-story/add-story.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "stories-list/:categoryId",
    component: StoriesListComponent
  },
  {
    path: "add-story/:categoryId",
    component: AddStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
