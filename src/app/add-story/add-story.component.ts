import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpServiceService } from '../http-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss'],
})
export class AddStoryComponent {
  catId: any = '';
  public editor = ClassicEditor;
  storyContent: string = '';
  storyTitle: string = '';
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpServiceService,
    private location: Location
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.catId = routeParams.get('categoryId');
    console.log('this.catId: ', this.catId);
    if (!this.catId) return;
  }

  // ---- check blank, undefined or null value
  isBlank(val: string): boolean {
    return !(val != '' && val != undefined && val != null);
  }

  makeId(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter: number = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter++;
    }
    return result;
  }

  addStory() {
    let errorMsg = '';
    if (this.isBlank(this.storyTitle)) {
      errorMsg = 'Please enter a title';
    } else if (this.isBlank(this.storyContent)) {
      errorMsg = 'Please enter a content';
    }

    if (errorMsg) {
      return;
    }

    console.log(this.storyContent);
    let obj = {
      desc: this.storyContent,
      title: this.storyTitle,
      isFav: false,
      isRead: false,
      timestamp: new Date().getTime(),
    };
    console.log('obj: ', obj);

    this.httpService.addStory(this.catId, this.makeId(20), obj).then(
      () => {
        this.location.back();
      },
      (err) => {
        this.location.back();
      }
    );
  }
}
